# TODO: Eliminar Google Translate de todas las páginas

- [x] index.html — eliminar bloque Google Translate
- [x] caso-en-proceso.html — eliminar bloque Google Translate
- [x] mia-case-study.html — eliminar bloque Google Translate
- [x] Sentria_Netdata_CaseStudy.html — eliminar bloque Google Translate
- [x] Verificar con grep que no queden referencias a Google Translate

## Fix: Navegación entre páginas (Swup)
- [x] Agregar safety timeout de 2s en `animationOutStart` y `animationInEnd` para evitar que la transición se quede atascada
- [x] Agregar try/catch en Swup initialization
- [x] Las cards ahora abren los case studies correctamente

## Verificación final
- [x] 0 referencias a Google Translate en todos los archivos HTML
- [x] `data-swup-reinit` añadido a todos los scripts page-specific
- [x] `swup-transition.js` con safety timeouts para navegación fluida
- [x] Solo queda `files/i18n.js` con el sistema de traducción **propio** (no Google Translate) — se conserva para el nuevo método

