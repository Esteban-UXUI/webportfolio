import { forceHideGoogleUi, observeGoogleMutations } from './observer.js';

const GOOGLE_SCRIPT_URL = 'https://translate.google.com/translate_a/element.js?cb=__googleTranslateInit';
const HIDDEN_ROOT_ID = 'google-translate-hidden-root';
let loadPromise = null;
let mutationObserver = null;
let elementCreated = false;

function createHiddenRoot() {
    let root = document.getElementById(HIDDEN_ROOT_ID);
    if (root) return root;

    root = document.createElement('div');
    root.id = HIDDEN_ROOT_ID;
    root.setAttribute('aria-hidden', 'true');
    root.style.position = 'absolute';
    root.style.top = '-9999px';
    root.style.left = '-9999px';
    root.style.width = '1px';
    root.style.height = '1px';
    root.style.overflow = 'hidden';
    root.style.opacity = '0';
    root.style.pointerEvents = 'none';
    document.body.appendChild(root);
    return root;
}

function setGoogleTranslateCookie(targetLanguage) {
    if (!targetLanguage) return;
    const value = `/es/${targetLanguage}`;
    const domain = location.hostname;
    const cookieParts = ['googtrans=' + value, 'path=/', 'SameSite=Lax'];

    if (domain !== 'localhost') {
        cookieParts.push('domain=' + domain);
    }

    document.cookie = cookieParts.join('; ');
}

function clearGoogleTranslateCookie() {
    const domain = location.hostname;
    const cookieParts = ['googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax'];

    if (domain !== 'localhost') {
        cookieParts.push('domain=' + domain);
    }

    document.cookie = cookieParts.join('; ');
}

function initializeTranslateElement() {
    if (elementCreated || !window.google || !window.google.translate) return;

    const root = createHiddenRoot();

    try {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: 'es',
                includedLanguages: 'es,en',
                autoDisplay: false,
                multilanguagePage: true,
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
            },
            root.id
        );
        elementCreated = true;
    } catch (error) {
        console.warn('Google Translate initialization failed:', error);
    }
}

function loadScript() {
    if (loadPromise) return loadPromise;

    loadPromise = new Promise((resolve, reject) => {
        if (window.google && window.google.translate) {
            initializeTranslateElement();
            forceHideGoogleUi();
            if (!mutationObserver) mutationObserver = observeGoogleMutations();
            resolve(window.google.translate);
            return;
        }

        window.__googleTranslateInit = () => {
            initializeTranslateElement();
            forceHideGoogleUi();
            if (!mutationObserver) mutationObserver = observeGoogleMutations();
            resolve(window.google.translate);
        };

        const script = document.createElement('script');
        script.src = GOOGLE_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            /* El callback __googleTranslateInit se encargará de resolver. */
            forceHideGoogleUi();
        };
        script.onerror = () => reject(new Error('No se pudo cargar Google Translate.'));
        document.head.appendChild(script);
    });

    return loadPromise;
}

function getGoogleCombo() {
    return document.querySelector('select.goog-te-combo');
}

function triggerLanguageChange(language) {
    const combo = getGoogleCombo();
    if (!combo) return false;

    combo.value = language;
    combo.dispatchEvent(new Event('change'));
    combo.dispatchEvent(new Event('change', { bubbles: true }));
    forceHideGoogleUi();
    return true;
}

export async function loadGoogleTranslate(language) {
    if (language !== 'es') {
        setGoogleTranslateCookie(language);
    }

    await loadScript();
    forceHideGoogleUi();
    pollHideGoogleUi();
    return window.google?.translate;
}

export async function applyLanguage(language) {
    if (language === 'es') {
        clearGoogleTranslateCookie();
        if (!loadPromise) {
            forceHideGoogleUi();
            return;
        }
        await loadPromise;
        triggerLanguageChange('es');
        pollHideGoogleUi();
        return;
    }

    setGoogleTranslateCookie(language);
    await loadGoogleTranslate(language);
    if (!triggerLanguageChange(language)) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        triggerLanguageChange(language);
    }
    pollHideGoogleUi();
}

export { clearGoogleTranslateCookie };

function pollHideGoogleUi(timeout = 1200) {
    const intervalMs = 80;
    const end = Date.now() + timeout;

    const tick = () => {
        forceHideGoogleUi();
        if (Date.now() < end) {
            window.setTimeout(tick, intervalMs);
        }
    };

    tick();
}

export function isGoogleLoaded() {
    return Boolean(window.google && window.google.translate && elementCreated);
}

export function getCurrentGoogleLanguage() {
    const combo = getGoogleCombo();
    return combo?.value || null;
}
