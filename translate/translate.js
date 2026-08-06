import { applyLanguage, clearGoogleTranslateCookie, isGoogleLoaded } from './googleLoader.js';
import { getSavedLanguage, saveLanguage } from './storage.js';

const LANGUAGES = {
    es: { code: 'es', label: 'Español', emoji: '🇪🇸' },
    en: { code: 'en', label: 'English', emoji: '🇺🇸' }
};
const BUTTON_ID = 'translate-float-button';
const NO_TRANSLATE_SELECTORS = [
    'header',
    'nav',
    '.navbar',
    '.menu',
    '.menu-item',
    '.overlay',
    '.modal',
    '.popup',
    '[role="dialog"]',
    '[role="banner"]',
    '[role="navigation"]',
    '[data-no-translate]'
];
let currentLanguage = 'es';

function createFloatingButton() {
    if (document.getElementById(BUTTON_ID)) return;

    const button = document.createElement('button');
    button.id = BUTTON_ID;
    button.type = 'button';
    button.className = 'translate-toggle-button';
    button.setAttribute('aria-label', 'Cambiar idioma a English');
    button.setAttribute('aria-live', 'polite');
    button.setAttribute('title', 'Cambiar idioma');
    button.innerHTML = `${LANGUAGES.en.emoji} ${LANGUAGES.en.label}`;
    button.addEventListener('click', handleButtonClick);
    button.addEventListener('keydown', handleKeyboardActivation);

    document.body.appendChild(button);
}

function updateButtonState(language) {
    const button = document.getElementById(BUTTON_ID);
    if (!button) return;

    if (language === 'en') {
        button.innerHTML = `${LANGUAGES.es.emoji} ${LANGUAGES.es.label}`;
        button.setAttribute('aria-label', 'Cambiar idioma a Español');
        button.setAttribute('title', 'Cambiar a Español');
    } else {
        button.innerHTML = `${LANGUAGES.en.emoji} ${LANGUAGES.en.label}`;
        button.setAttribute('aria-label', 'Cambiar idioma a English');
        button.setAttribute('title', 'Cambiar a English');
    }
}

function handleKeyboardActivation(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleButtonClick();
    }
}

function handleButtonClick() {
    const nextLanguage = currentLanguage === 'en' ? 'es' : 'en';
    setLanguage(nextLanguage);
}

function markUserInterfaceNoTranslate() {
    NO_TRANSLATE_SELECTORS.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
            if (!(element instanceof HTMLElement)) return;
            element.classList.add('notranslate');
            element.setAttribute('translate', 'no');
        });
    });
}

function scheduleRestore(language) {
    const restoreTask = () => {
        if (language === 'en') {
            setLanguage('en');
        }
    };

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(restoreTask, { timeout: 1000 });
    } else {
        window.setTimeout(restoreTask, 500);
    }
}

async function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    updateButtonState(language);
    saveLanguage(language);

    if (language === 'es') {
        clearGoogleTranslateCookie();
        if (isGoogleLoaded()) {
            await applyLanguage('es');
        }
        return;
    }

    await applyLanguage(language);
}

function bindSwupEvents() {
    document.addEventListener('swup:contentReplaced', () => {
        markUserInterfaceNoTranslate();
        if (currentLanguage === 'en') {
            setLanguage('en');
        }
    });
}

function initTranslationWidget() {
    createFloatingButton();
    markUserInterfaceNoTranslate();
    bindSwupEvents();

    const savedLanguage = getSavedLanguage();
    if (savedLanguage === 'en') {
        currentLanguage = 'en';
        updateButtonState('en');
        scheduleRestore(savedLanguage);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslationWidget);
} else {
    initTranslationWidget();
}
