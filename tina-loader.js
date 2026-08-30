document.addEventListener("DOMContentLoaded", () => {
  fetch('/content/data/info.json')
    .then(response => {
      if (!response.ok) throw new Error('Data file not found');
      return response.json();
    })
    .then(data => {
      // 1. Text Content
      const textElements = document.querySelectorAll('[data-tina]');
      textElements.forEach(el => {
        const field = el.getAttribute('data-tina');
        if (data[field]) {
          // If the text contains HTML (like <br> or <span>), we use innerHTML
          // But to be safe with simple strings, we can just use innerHTML or textContent
          // Since heroTitle has <br> and <span> in the original, we should use innerHTML
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
            // It's a whatsapp link. Let's update the phone number in the wa.me URL
            // Original URL format: https://wa.me/5582988754135?text=...
            const currentHref = el.getAttribute('href');
            if (currentHref && currentHref.includes('wa.me/')) {
              const urlParts = currentHref.split('?');
              const newHref = `https://wa.me/${data[field]}${urlParts.length > 1 ? '?' + urlParts[1] : ''}`;
              el.setAttribute('href', newHref);
            }
          } else if (field === 'email') {
            el.setAttribute('href', `mailto:${data[field]}`);
          } else if (field === 'phoneLabel') {
            // Keep digits only for tel:
            const digits = data[field].replace(/\D/g, '');
            el.setAttribute('href', `tel:+55${digits}`); // assuming BR country code
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
