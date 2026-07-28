// i18n.js — Sistema de traducciones para todas las páginas del portfolio
// Uso: incluir este script en cada página y llamar initI18n() al cargar

const pageTranslations = {

  // ─────────────────────────────────────────────
  // MIA CASE STUDY
  // ─────────────────────────────────────────────
  'mia-case-study': {
    es: {
      'header-badge': 'Case Study · Proptech',
      'hero-eyebrow': 'Case Study · Ciencuadras · Grupo Bolívar · 2023—2025',
      'hero-subtitle-1': 'Motor de',
      'hero-subtitle-2': 'Inteligencia Artificial',
      'hero-desc': 'Cómo diseñé un sistema de hiperpersonalización que conecta automáticamente al comprador correcto con la propiedad correcta — antes de que él mismo sepa que la está buscando.',
      'meta-role-label': 'Mi rol',
      'meta-company-label': 'Empresa',
      'meta-duration-label': 'Duración',
      'meta-team-label': 'Equipo',
      'meta-duration-value': '2 años',
      'meta-team-value': '+10 personas',
      'kpi-1': 'Leads efectivos',
      'kpi-2': 'Venta por IA · Grupo Bolívar',
      'kpi-3': 'Usuarios activos',
      'kpi-4': 'Mejora contacto vendedor',
      's01-label': '01 · CONTEXTO Y PROBLEMA',
      's01-title': 'Una plataforma con mucho tráfico y pocas ventas reales',
      's01-p1': 'Ciencuadras es la plataforma inmobiliaria del Grupo Bolívar — uno de los grupos empresariales más grandes de Colombia con más de 80 años de historia. Tenían un problema que no era visible en el dashboard: muchísimo tráfico, muchos leads, pero muy pocas conversiones reales.',
      's01-p2': 'El buscador tradicional mostraba propiedades por filtros genéricos — precio, zona, metros cuadrados — sin entender quién era realmente el usuario ni en qué momento de su vida estaba. El resultado: usuarios que buscaban repetidamente sin encontrar, y leads que llegaban al equipo comercial sin intención real de compra.',
      's01-p3': 'La dirección del Grupo Bolívar tomó una decisión estratégica: incorporar inteligencia artificial como ventaja competitiva real. No como experimento — como producto. Yo entré a liderar la estrategia de diseño de inicio a fin.',
      'prob1-title': 'Búsquedas sin conversión',
      'prob1-desc': 'Los usuarios buscaban repetidamente sin avanzar en el funnel. El sistema no aprendía de su comportamiento.',
      'prob1-stat': '↑ Rebote alto en resultados',
      'prob2-title': 'Abandono antes del contacto',
      'prob2-desc': 'Los usuarios llegaban al punto de contactar al vendedor y se iban. El momento de mayor valor era el más frágil.',
      'prob2-stat': '↓ Tasa de contacto con vendedor',
      'prob3-title': 'Leads sin calidad real',
      'prob3-desc': 'El equipo comercial recibía contactos sin intención real de compra, desperdiciando tiempo y recursos.',
      'prob3-stat': '↑ Costo por adquisición',
    },
    en: {
      'header-badge': 'Case Study · Proptech',
      'hero-eyebrow': 'Case Study · Ciencuadras · Grupo Bolívar · 2023—2025',
      'hero-subtitle-1': 'Artificial',
      'hero-subtitle-2': 'Intelligence Engine',
      'hero-desc': 'How I designed a hyperpersonalization system that automatically connects the right buyer with the right property — before they even know they\'re looking for it.',
      'meta-role-label': 'My role',
      'meta-company-label': 'Company',
      'meta-duration-label': 'Duration',
      'meta-team-label': 'Team',
      'meta-duration-value': '2 years',
      'meta-team-value': '+10 people',
      'kpi-1': 'Effective leads',
      'kpi-2': 'AI-driven sale · Grupo Bolívar',
      'kpi-3': 'Active users',
      'kpi-4': 'Seller contact improvement',
      's01-label': '01 · CONTEXT & PROBLEM',
      's01-title': 'A platform with lots of traffic and few real sales',
      's01-p1': 'Ciencuadras is the real estate platform of Grupo Bolívar — one of Colombia\'s largest business groups with over 80 years of history. They had a problem that wasn\'t visible on the dashboard: enormous traffic, many leads, but very few real conversions.',
      's01-p2': 'The traditional search engine showed properties through generic filters — price, area, square meters — without understanding who the user really was or what stage of life they were in. The result: users repeatedly searching without finding, and leads reaching the sales team with no real purchase intent.',
      's01-p3': 'Grupo Bolívar\'s leadership made a strategic decision: incorporate artificial intelligence as a real competitive advantage. Not as an experiment — as a product. I came in to lead the design strategy from start to finish.',
      'prob1-title': 'Searches without conversion',
      'prob1-desc': 'Users searched repeatedly without advancing in the funnel. The system didn\'t learn from their behavior.',
      'prob1-stat': '↑ High bounce rate on results',
      'prob2-title': 'Drop-off before contact',
      'prob2-desc': 'Users reached the point of contacting the seller and left. The highest-value moment was the most fragile.',
      'prob2-stat': '↓ Seller contact rate',
      'prob3-title': 'Low-quality leads',
      'prob3-desc': 'The sales team received contacts with no real purchase intent, wasting time and resources.',
      'prob3-stat': '↑ Cost per acquisition',
    }
  },

  // ─────────────────────────────────────────────
  // SENTRIA NETDATA CASE STUDY
  // ─────────────────────────────────────────────
  'sentria': {
    es: {
      'header-badge': 'MDR',
      'hero-desc-1': 'Rediseño integral y modernización de una plataforma',
      'hero-desc-2': 'MDR (Managed Detection & Response)',
      'hero-desc-3': '— de una interfaz lenta y confusa a un PWA tokenizado, construido para operar bajo presión.',
      'meta-role-label': 'Rol',
      'meta-duration-label': 'Duración',
      'meta-method-label': 'Metodología',
      'meta-platform-label': 'Plataforma',
      'meta-duration-value': '3 meses (2025)',
      'stat-1': 'Menos tiempo de maquetado',
      'stat-2': 'Clics a cualquier acción crítica',
      'stat-3': 'Capas de design tokens',
      'stat-4': 'Temas · Light & Dark Mode',
      's01-label': '01 · RESUMEN EJECUTIVO Y EL DESAFÍO',
      's01-title': 'Infraestructura robusta, experiencia rota',
      's01-p1': 'Sentria Netdata es una plataforma enterprise de Managed Detection and Response (MDR), enfocada en detección, monitoreo y respuesta a amenazas de ciberseguridad en tiempo real. A pesar de una infraestructura técnica robusta, la plataforma enfrentaba un severo problema de experiencia de usuario y arquitectura visual.',
      's01-p2': 'La interfaz anterior era confusa, no transmitía jerarquía de información, resultaba lenta e ineficiente para el trabajo diario del SOC, y carecía de flexibilidad multiplataforma. Los usuarios operativos terminaban abandonando la plataforma para comunicarse por canales informales o recurrir a herramientas externas.',
      'fric1-title': 'Jerarquía inexistente',
      'fric1-desc': 'Gráficas duplicadas y datos redundantes sin contexto técnico claro, sin hashes ni jerarquía MITRE ATT&CK visible.',
      'fric2-title': 'Lentitud operativa',
      'fric2-desc': 'Bajo SLA estricto, los analistas necesitaban cambiar de pantalla para ejecutar acciones simples como bloquear una IP.',
      'fric3-title': 'Sin multiplataforma',
      'fric3-desc': 'La app móvil carecía de funcionalidad real, forzando a gerentes y analistas a depender exclusivamente del escritorio.',
      'goal-label': 'Nuestro objetivo',
      'goal-text': 'Liderar la reestructuración estratégica de Sentria durante un ciclo de 3 meses, transformándolo en un <span class="text-white font-medium">PWA</span> alojado en web y distribuido en tiendas iOS y Android, respaldado por un <span class="text-white font-medium">sistema de diseño tokenizado</span> con soporte nativo para Light y Dark Mode.',
      's02-label': '02 · ROL DE LIDERAZGO & METODOLOGÍA',
      's02-title': 'Design Thinking en un sprint de 3 meses',
      's02-desc': 'Como Lead Product Designer estuve al frente de la conceptualización, diseño visual, arquitectura de información y ejecución técnica, colaborando de cerca con ingenieros de seguridad, desarrolladores y líderes de ciberseguridad.',
      's07-label': '07 · RESULTADOS E IMPACTO DEL NEGOCIO',
      's07-title': 'De herramienta evitada a centro de mando',
      'download-label': 'DESCARGAR',
      'download-title': 'Revisa las aplicaciones',
      'download-desc': 'Sentria Netdata está disponible en las principales tiendas. Descarga la app y gestiona la seguridad de tu empresa desde cualquier lugar.',
      'footer-cta': '¿Quieres ver más proyectos o conversar sobre este caso?',
      'footer-click': 'Click para escribirme',
    },
    en: {
      'header-badge': 'MDR',
      'hero-desc-1': 'Full redesign and modernization of a',
      'hero-desc-2': 'MDR (Managed Detection & Response) platform',
      'hero-desc-3': '— from a slow, confusing interface to a tokenized PWA built to operate under pressure.',
      'meta-role-label': 'Role',
      'meta-duration-label': 'Duration',
      'meta-method-label': 'Methodology',
      'meta-platform-label': 'Platform',
      'meta-duration-value': '3 months (2025)',
      'stat-1': 'Less layout time',
      'stat-2': 'Clicks to any critical action',
      'stat-3': 'Design token layers',
      'stat-4': 'Themes · Light & Dark Mode',
      's01-label': '01 · EXECUTIVE SUMMARY & THE CHALLENGE',
      's01-title': 'Robust infrastructure, broken experience',
      's01-p1': 'Sentria Netdata is an enterprise Managed Detection and Response (MDR) platform focused on real-time cybersecurity threat detection, monitoring and response. Despite a robust technical infrastructure, the platform faced a severe user experience and visual architecture problem.',
      's01-p2': 'The previous interface was confusing, failed to convey information hierarchy, was slow and inefficient for daily SOC work, and lacked multiplatform flexibility. Operational users ended up abandoning the platform to communicate through informal channels or rely on external tools.',
      'fric1-title': 'Non-existent hierarchy',
      'fric1-desc': 'Duplicate charts and redundant data without clear technical context, no hashes or visible MITRE ATT&CK hierarchy.',
      'fric2-title': 'Operational slowness',
      'fric2-desc': 'Under strict SLA, analysts needed to switch screens to perform simple actions like blocking an IP.',
      'fric3-title': 'No multiplatform',
      'fric3-desc': 'The mobile app lacked real functionality, forcing managers and analysts to rely exclusively on desktop.',
      'goal-label': 'Our objective',
      'goal-text': 'Lead the strategic restructuring of Sentria over a 3-month cycle, transforming it into a <span class="text-white font-medium">PWA</span> hosted on the web and distributed on iOS and Android stores, backed by a <span class="text-white font-medium">tokenized design system</span> with native support for Light and Dark Mode.',
      's02-label': '02 · LEADERSHIP ROLE & METHODOLOGY',
      's02-title': 'Design Thinking in a 3-month sprint',
      's02-desc': 'As Lead Product Designer I led the conceptualization, visual design, information architecture and technical execution, working closely with security engineers, developers and cybersecurity leaders.',
      's07-label': '07 · RESULTS & BUSINESS IMPACT',
      's07-title': 'From avoided tool to command center',
      'download-label': 'DOWNLOAD',
      'download-title': 'Check the apps',
      'download-desc': 'Sentria Netdata is available in the main stores. Download the app and manage your company\'s security from anywhere.',
      'footer-cta': 'Want to see more projects or talk about this case?',
      'footer-click': 'Click to reach out',
    }
  },

  // ─────────────────────────────────────────────
  // CASO EN PROCESO
  // ─────────────────────────────────────────────
  'caso-en-proceso': {
    es: {
      'header-badge': 'En construcción',
      'hero-eyebrow': 'Case Study · Próximamente',
      'hero-line-1': 'Caso de estudio',
      'hero-line-2': 'en proceso',
      'hero-p1': 'Estoy documentando este proyecto con el mismo cuidado',
      'hero-p2': 'con el que lo diseñé. Vuelve pronto para ver el proceso completo.',
      'back-btn': 'Volver al portafolio',
      'footer-cta': '¿No quieres esperar? Escríbeme y te cuento el avance.',
    },
    en: {
      'header-badge': 'In progress',
      'hero-eyebrow': 'Case Study · Coming Soon',
      'hero-line-1': 'Case study',
      'hero-line-2': 'in progress',
      'hero-p1': 'I\'m documenting this project with the same care',
      'hero-p2': 'I put into designing it. Come back soon to see the full process.',
      'back-btn': 'Back to portfolio',
      'footer-cta': 'Don\'t want to wait? Write me and I\'ll share the progress.',
    }
  }
};

// ─────────────────────────────────────────────
// Motor de traducción — aplica a cualquier página
// ─────────────────────────────────────────────
function initI18n(pageKey) {
  let currentLang = 'es';

  function apply(lang) {
    const dict = pageTranslations[pageKey]?.[lang];
    if (!dict) return;

    // Actualizar todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (el.getAttribute('data-i18n-html') === 'true') {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Actualizar botón de idioma
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = lang === 'es' ? '🇪🇸' : '🇺🇸';
      btn.title = lang === 'es' ? 'Translate to English' : 'Traducir al Español';
    }

    document.documentElement.lang = lang;
    currentLang = lang;
  }

  // Exponer función global para el botón onclick
  window.toggleLanguage = function () {
    apply(currentLang === 'es' ? 'en' : 'es');
  };

  // Aplicar idioma inicial
  apply('es');
}
