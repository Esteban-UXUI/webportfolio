/* ═══════════════════════════════════════════════════════════════════════════
   SWUP + GSAP — TRANSICIÓN DE PÁGINA MULTICAPA TIPO "SLIDE"  (60fps)
   ───────────────────────────────────────────────────────────────────────────
   Objetivo:
   • Swup v2 (ultra-liviano, ~15 KB) intercepta los clics en enlaces internos
     y reemplaza el contenido de #swup SIN recargar la página → la animación
     nunca se rompe porque el DOM no se destruye por completo.
   • GSAP anima 2 capas fijas usando EXCLUSIVAMENTE transform: translateX()
     + will-change (GPU). No se toca layout ni paint → 60fps estables.

   Ciclo de vida de Swup v2 (orden real de eventos):
     1) animationOutStart  → las capas cubren la pantalla (salida)
     2) swup.trigger('animationOutEnd') → Swup hace fetch + swap del DOM
     3) contentReplaced    → re-ejecutamos los scripts de la página nueva
     4) animationInStart   → las capas se retiran escalonadas (revelan contenido)
     5) swup.trigger('animationInEnd') → Swup marca la navegación como completa
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 0. GUARD: si Swup no cargó (CDN caído), la web funciona normal ── */
  if (typeof Swup === 'undefined') return;

/* ── 1. INICIALIZAR SWUP v2 ──
     containers : el único contenedor que se intercambia entre páginas.
     animateHistoryBrowsing : aplica la misma transición con back/forward.
     cache : false → siempre trae HTML fresco (evita estilos stale por página). */
  let swup;
  try {
    swup = new Swup({
      containers: ['#swup'],
      animateHistoryBrowsing: true,
      cache: false,
    });
  } catch (e) {
    console.warn('Swup init failed, navigation will work normally:', e);
    return;
  }

  /* ── 2. REFERENCIAS A LAS CAPAS DE TRANSICIÓN ──
     Capa púrpura  : cubre la pantalla en la salida.
     Capa reveal   : capa superior; se retira PRIMERO en la entrada. */
  const purple = document.querySelector('.page-transition--purple');
  const reveal = document.querySelector('.page-transition--reveal');

  // Duración / easing premium (power4 = curva "de lujo", muy suave al inicio/fin)
  const DUR = 0.6;
  const EASE = 'power4.inOut';
  const STAGGER = 0.12;

/* ── 3. SALIDA: las capas cubren la pantalla (vienen desde la izquierda) ── */
  swup.on('animationOutStart', () => {
    // Safety timeout: si GSAP falla, la navegación continúa igual
    let done = false;
    const safety = setTimeout(() => {
      if (!done) { done = true; swup.trigger('animationOutEnd'); }
    }, 2000);

    try {
      const tl = gsap.timeline({
        onComplete: () => {
          if (!done) { done = true; clearTimeout(safety); swup.trigger('animationOutEnd'); }
        },
      });

      // Si las capas no existen, forzar navegación directa
      if (!purple || !reveal) {
        if (!done) { done = true; clearTimeout(safety); swup.trigger('animationOutEnd'); }
        return;
      }

      // xPercent se traduce a `transform: translateX(-100%)` → GPU puro.
      tl.set([purple, reveal], { xPercent: -100 })
        .to(purple, { xPercent: 0, duration: DUR, ease: EASE })
        .to(reveal, { xPercent: 0, duration: DUR, ease: EASE }, `-=${DUR - STAGGER}`);
    } catch (e) {
      if (!done) { done = true; clearTimeout(safety); swup.trigger('animationOutEnd'); }
    }
  });

  /* ── 4. CONTENIDO REEMPLAZADO → re-ejecutar los scripts de la página entrante ──
     Swup ya insertó el HTML nuevo dentro de #swup. Aquí re-ejecutamos:
       - Scripts inline con `data-swup-reinit`
       - Scripts inline con `type="module"` y `data-swup-reinit`
     También reseteamos scroll, Lenis y ScrollTrigger. */
  swup.on('contentReplaced', () => {
    // (a) Re-ejecutar scripts inline con data-swup-reinit (no module)
    document.querySelectorAll('#swup script[data-swup-reinit]:not([type="module"])').forEach((oldScript) => {
      const fresh = document.createElement('script');
      fresh.textContent = oldScript.textContent;
      if (oldScript.hasAttribute('data-swup-reinit')) fresh.setAttribute('data-swup-reinit', '');
      oldScript.replaceWith(fresh);
    });

    // (b) Re-ejecutar scripts module con data-swup-reinit
    document.querySelectorAll('#swup script[data-swup-reinit][type="module"]').forEach((oldScript) => {
      const fresh = document.createElement('script');
      fresh.type = 'module';
      fresh.textContent = oldScript.textContent;
      if (oldScript.hasAttribute('data-swup-reinit')) fresh.setAttribute('data-swup-reinit', '');
      oldScript.replaceWith(fresh);
    });

    // (c) Reset de scroll
    window.scrollTo(0, 0);
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });

    // (d) Recalcular triggers de scroll + actualizar tema del cursor por página
    requestAnimationFrame(() => ScrollTrigger.refresh());
    if (window.__updateCursorTheme) window.__updateCursorTheme();
  });

/* ── 5. ENTRADA: retirar las capas escalonadas → revelar la página nueva ──
     Orden: primero sale la capa "reveal" (arriba), luego la púrpura.
     El pequeño solapamiento (STAGGER) da sensación de profundidad. */
  swup.on('animationInStart', () => {
    let done = false;
    const safety = setTimeout(() => {
      if (!done) { done = true; swup.trigger('animationInEnd'); }
    }, 2000);

    try {
      const tl = gsap.timeline({
        onComplete: () => {
          if (!done) { done = true; clearTimeout(safety); swup.trigger('animationInEnd'); }
        },
      });

      if (!purple || !reveal) {
        if (!done) { done = true; clearTimeout(safety); swup.trigger('animationInEnd'); }
        return;
      }

      tl.to(reveal, { xPercent: 100, duration: DUR, ease: EASE, delay: 0.05 })
        .to(purple, { xPercent: 100, duration: DUR, ease: EASE }, `-=${DUR - STAGGER}`);
    } catch (e) {
      if (!done) { done = true; clearTimeout(safety); swup.trigger('animationInEnd'); }
    }
  });
})();
