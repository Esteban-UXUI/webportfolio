const GOOGLE_UI_SELECTORS = [
    '#google_translate_element',
    '.goog-te-banner-frame',
    '.goog-te-banner-frame.skiptranslate',
    '.goog-te-menu-frame',
    '.goog-te-balloon-frame',
    '.goog-tooltip',
    '.goog-te-tooltip',
    '.goog-logo-link',
    '.goog-te-spinner',
    '.goog-te-spinner-pos',
    '#goog-gt-tt',
    '.goog-te-gadget',
    '.goog-te-gadget-icon',
    '.goog-te-gadget-simple',
    '.goog-te-combo',
    '.goog-toaster',
    '.goog-gt-translate',
    '.goog-wrap',
    '.goog-te-spinner',
    '.goog-te-banner',
    'iframe[src*="translate.google.com"]',
    'iframe[src*="translate.googleapis.com"]',
    'iframe[src*="translate.googleusercontent.com"]'
];

const GOOGLE_HIDE_STYLE_ID = 'google-translate-hide-style';
const BODY_STYLE_OVERRIDES = {
    top: '0px',
    marginTop: '0px',
    margin: '0px',
    position: 'static',
    transform: 'none'
};

function hideElement(element) {
    if (!(element instanceof HTMLElement)) return;
    element.style.setProperty('display', 'none', 'important');
    element.style.setProperty('visibility', 'hidden', 'important');
    element.style.setProperty('opacity', '0', 'important');
    element.style.setProperty('width', '0px', 'important');
    element.style.setProperty('height', '0px', 'important');
    element.style.setProperty('max-height', '0px', 'important');
    element.style.setProperty('overflow', 'hidden', 'important');
    element.style.setProperty('position', 'absolute', 'important');
    element.style.setProperty('top', '0px', 'important');
    element.style.setProperty('left', '0px', 'important');
    element.setAttribute('aria-hidden', 'true');
}

function sanitizeBodyStyles() {
    [document.documentElement, document.body].forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        Object.entries(BODY_STYLE_OVERRIDES).forEach(([property, value]) => {
            node.style.setProperty(property, value, 'important');
        });
    });
}

function injectHideStyles() {
    if (document.getElementById(GOOGLE_HIDE_STYLE_ID)) return;

    const css = `
        #${GOOGLE_HIDE_STYLE_ID},
        #google_translate_element,
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        .goog-te-menu-frame,
        .goog-te-balloon-frame,
        .goog-tooltip,
        .goog-te-tooltip,
        .goog-logo-link,
        .goog-te-spinner,
        .goog-te-spinner-pos,
        #goog-gt-tt,
        .goog-te-gadget,
        .goog-te-gadget-icon,
        .goog-te-gadget-simple,
        .goog-te-combo,
        .goog-toaster,
        .goog-gt-translate,
        .goog-wrap,
        .goog-te-banner,
        .goog-te-banner-frame.skiptranslate,
        iframe[src*="translate.google.com"],
        iframe[src*="translate.googleapis.com"],
        iframe[src*="translate.googleusercontent.com"],
        [class*="goog-te-"],
        [class*="goog-gt-"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            max-width: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        html,
        body {
            top: 0 !important;
            margin-top: 0 !important;
            margin: 0 !important;
            transform: none !important;
            position: static !important;
        }
    `;

    const style = document.createElement('style');
    style.id = GOOGLE_HIDE_STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
}

function removeElement(element) {
    if (!element || !element.parentNode) return;
    element.parentNode.removeChild(element);
}

function sanitizeGoogleUI() {
    injectHideStyles();
    sanitizeBodyStyles();

    GOOGLE_UI_SELECTORS.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
            hideElement(element);
            if (element instanceof HTMLElement && element.tagName.toLowerCase() === 'iframe') {
                removeElement(element);
            }
        });
    });

    document.querySelectorAll('[id^="google_translate_element"]').forEach((element) => {
        hideElement(element);
    });
    document.querySelectorAll('[class*="goog-te-"]').forEach((element) => {
        hideElement(element);
    });
    document.querySelectorAll('[class*="goog-gt-"]').forEach((element) => {
        hideElement(element);
    });
    document.querySelectorAll('iframe').forEach((iframe) => {
        if (iframe instanceof HTMLIFrameElement && iframe.src && /translate\.(google\.com|googleapis\.com|googleusercontent\.com)/.test(iframe.src)) {
            hideElement(iframe);
            if (iframe.parentElement && /goog/i.test(iframe.parentElement.className + iframe.parentElement.id)) {
                removeElement(iframe.parentElement);
            } else {
                removeElement(iframe);
            }
        }
    });
}

function shouldHideNode(node) {
    if (!(node instanceof HTMLElement)) return false;
    const tagName = node.tagName.toLowerCase();
    if (tagName === 'iframe' && node.src && /translate\.(google\.com|googleapis\.com|googleusercontent\.com)/.test(node.src)) return true;
    if (node.className && node.className.toString().includes('goog-te-')) return true;
    if (node.className && node.className.toString().includes('goog-gt-')) return true;
    if (node.id && node.id.toString().includes('google_translate')) return true;
    return false;
}

function inspectNode(node) {
    if (node instanceof HTMLElement && shouldHideNode(node)) {
        hideElement(node);
    }

    if (node instanceof HTMLElement) {
        node.querySelectorAll(GOOGLE_UI_SELECTORS.join(',')).forEach(hideElement);
    }
}

/**
 * Observa cambios DOM que Google Translate pueda inyectar y corrige el estilo.
 * Devuelve una función para desconectar el observer.
 */
export function observeGoogleMutations() {
    sanitizeGoogleUI();

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'attributes') {
                sanitizeBodyStyles();
                inspectNode(mutation.target);
            }

            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(inspectNode);
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    return observer;
}

export function forceHideGoogleUi() {
    sanitizeGoogleUI();
}
