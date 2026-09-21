const events = [];

function track(name, params) {
  events.push({ name, params, at: Date.now() });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  const ga = document.querySelector('meta[name="ga-id"]')?.getAttribute('content');
  if (ga && window.gtag) window.gtag('event', name, params);
}

function loadAnalytics() {
  const gtm = document.querySelector('meta[name="gtm-id"]')?.getAttribute('content');
  const ga = document.querySelector('meta[name="ga-id"]')?.getAttribute('content');
  const clarity = document.querySelector('meta[name="clarity-id"]')?.getAttribute('content');
  if (gtm && !document.getElementById('ri-gtm')) {
    const script = document.createElement('script');
    script.id = 'ri-gtm';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtm}`;
    document.head.appendChild(script);
  }
  if (ga && !document.getElementById('ri-ga')) {
    const script = document.createElement('script');
    script.id = 'ri-ga';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ga);
  }
  if (clarity && !document.getElementById('ri-clarity')) {
    const script = document.createElement('script');
    script.id = 'ri-clarity';
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${clarity}`;
    document.head.appendChild(script);
  }
}

window.addEventListener('ri:consent', (event) => {
  if (event.detail === 'rejected') return;
  loadAnalytics();
});

document.addEventListener('click', (event) => {
  const link = event.target?.closest?.('[data-event="affiliate_click"]');
  if (!link) return;
  track('affiliate_click', {
    page_path: location.pathname,
    service: link.getAttribute('data-service') || undefined,
    location: link.getAttribute('data-location') || undefined,
    placement: link.getAttribute('data-placement'),
    clickref: link.getAttribute('data-clickref'),
  });
});

window.addEventListener('ri:calculator_complete', (event) => {
  track('calculator_complete', event.detail);
});

document.addEventListener('click', (event) => {
  const need = event.target?.closest?.('[data-need]');
  if (need) track('service_select', { service: need.getAttribute('data-need') });
});

document.addEventListener('toggle', (event) => {
  const el = event.target;
  if (el instanceof HTMLDetailsElement && el.dataset.event === 'faq_open') {
    track('faq_open', { question: el.querySelector('summary')?.textContent });
  }
});

let scrolled = false;
window.addEventListener(
  'scroll',
  () => {
    if (scrolled || window.scrollY < window.innerHeight * 0.5) return;
    scrolled = true;
    track('scroll_depth', { page_path: location.pathname, depth: 50 });
  },
  { passive: true },
);

document.addEventListener('click', (event) => {
  const geo = event.target?.closest?.('[data-geo-nav]');
  if (geo) {
    track('geo_nav', {
      page_path: location.pathname,
      location: geo.getAttribute('data-geo-nav'),
    });
  }
});

window.__riDebugEvents = events;
