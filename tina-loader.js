document.addEventListener("DOMContentLoaded", () => {
  // Determine current page
  let path = window.location.pathname;
  let pageName = 'home';
  if (path.includes('sobre.html')) pageName = 'sobre';
  else if (path.includes('servicos.html')) pageName = 'servicos';
  else if (path.includes('contato.html')) pageName = 'contato';

  const fetchGlobal = fetch('/content/data/info.json').then(res => res.ok ? res.json() : {}).catch(() => ({}));
  const fetchPage = fetch(`/content/pages/${pageName}.json`).then(res => res.ok ? res.json() : {}).catch(() => ({}));

  Promise.all([fetchGlobal, fetchPage])
    .then(([globalData, pageData]) => {
      const data = { ...globalData, ...pageData };

      // 1. Text Content
      const textElements = document.querySelectorAll('[data-tina]');
      textElements.forEach(el => {
        const field = el.getAttribute('data-tina');
        if (data[field] !== undefined && data[field] !== null) {
          el.innerHTML = data[field];
        }
      });

      // 2. Src Attributes (Images/Videos)
      const srcElements = document.querySelectorAll('[data-tina-src]');
      srcElements.forEach(el => {
        const field = el.getAttribute('data-tina-src');
        if (data[field]) {
          el.setAttribute('src', data[field]);
        }
      });

      // 3. Href Attributes (Links)
      const hrefElements = document.querySelectorAll('[data-tina-href]');
      hrefElements.forEach(el => {
        const field = el.getAttribute('data-tina-href');
        if (data[field]) {
          if (field === 'phoneWhatsapp') {
            const currentHref = el.getAttribute('href');
            if (currentHref && currentHref.includes('wa.me/')) {
              const urlParts = currentHref.split('?');
              const newHref = `https://wa.me/${data[field]}${urlParts.length > 1 ? '?' + urlParts[1] : ''}`;
              el.setAttribute('href', newHref);
            }
          } else if (field === 'email') {
            el.setAttribute('href', `mailto:${data[field]}`);
          } else if (field === 'phoneLabel') {
            const digits = data[field].replace(/\D/g, '');
            el.setAttribute('href', `tel:+55${digits}`);
          } else {
            el.setAttribute('href', data[field]);
          }
        }
      });
    })
    .catch(error => {
      console.error('Error loading TinaCMS data:', error);
    });
});
