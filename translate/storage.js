const STORAGE_KEY = 'translate_user_preference';

/**
 * Lee la preferencia de idioma guardada en localStorage.
 * Devuelve 'es', 'en' o null si no hay preferencia.
 */
export function getSavedLanguage() {
    try {
        return window.localStorage?.getItem(STORAGE_KEY);
    } catch (error) {
        return null;
    }
}

/**
 * Guarda la preferencia de idioma en localStorage.
 */
export function saveLanguage(language) {
    try {
        if (!language) return;
        window.localStorage?.setItem(STORAGE_KEY, language);
    } catch (error) {
        // Silencioso por compatibilidad con navegadores privados.
    }
}

/**
 * Elimina la preferencia guardada.
 */
export function clearSavedLanguage() {
    try {
        window.localStorage?.removeItem(STORAGE_KEY);
    } catch (error) {
        // No importa si no se puede eliminar.
    }
}
