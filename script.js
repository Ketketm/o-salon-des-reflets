// O Salon des Reflets — interactions sobres
// Vanilla JS, défer, respecte prefers-reduced-motion.

(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const drawer = document.querySelector('[data-drawer]');
  const stickyCta = document.querySelector('[data-sticky-cta]');
  const yearEl = document.querySelector('[data-year]');

  // -----------------------------------------------------------------------
  // Année courante dans le footer
  // -----------------------------------------------------------------------
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -----------------------------------------------------------------------
  // Header transparent → opaque au scroll
  // Sticky CTA mobile : visible après 200px de scroll
  // -----------------------------------------------------------------------
  let lastScrolled = false;
  let lastStickyVisible = false;

  const onScroll = () => {
    const y = window.scrollY;
    const scrolled = y > 80;
    const showSticky = y > 200;

    if (scrolled !== lastScrolled) {
      header.classList.toggle('is-scrolled', scrolled);
      lastScrolled = scrolled;
    }
    if (stickyCta && showSticky !== lastStickyVisible) {
      stickyCta.classList.toggle('is-visible', showSticky);
      lastStickyVisible = showSticky;
    }
  };

  // rAF throttle
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  // -----------------------------------------------------------------------
  // Drawer mobile (hamburger)
  // -----------------------------------------------------------------------
  if (menuToggle && drawer) {
    const closeMenu = () => {
      header.classList.remove('is-menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    const openMenu = () => {
      header.classList.add('is-menu-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    menuToggle.addEventListener('click', () => {
      if (header.classList.contains('is-menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('is-menu-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // -----------------------------------------------------------------------
  // Reveal au scroll (IntersectionObserver)
  // -----------------------------------------------------------------------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (!reduceMotion && 'IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // -----------------------------------------------------------------------
  // Smooth scroll : compense l'offset du header sticky pour les ancres
  // -----------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  // -----------------------------------------------------------------------
  // Photos non livrées : placeholder visuel automatique
  // Les <img> qui échouent au chargement déclenchent un placeholder
  // bicolore avec le nom du fichier attendu.
  // -----------------------------------------------------------------------
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      const pic = img.closest('picture') || img.parentElement;
      if (!pic) return;
      const filename = (img.getAttribute('src') || '').split('/').pop() || 'photo';
      pic.classList.add('photo-placeholder');
      pic.setAttribute('data-filename', filename);
    }, { once: true });
  });

  // -----------------------------------------------------------------------
  // Compteur animé sur le score avis (5,0 anime 0 → 5,0)
  // + déclenche les barres critères et les étoiles via .is-counted
  // -----------------------------------------------------------------------
  const counterStat = document.querySelector('[data-counter]');
  const scoreEl = counterStat ? counterStat.querySelector('[data-counter-target]') : null;

  if (counterStat && scoreEl && 'IntersectionObserver' in window) {
    const target = parseFloat(scoreEl.dataset.counterTarget) || 0;
    const decimals = parseInt(scoreEl.dataset.counterDecimals || '0', 10);

    const formatScore = (n) => n.toFixed(decimals).replace('.', ',');

    if (reduceMotion) {
      counterStat.classList.add('is-counted');
      scoreEl.textContent = formatScore(target);
    } else {
      scoreEl.textContent = formatScore(0);

      const counterIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          counterStat.classList.add('is-counted');
          counterIO.unobserve(entry.target);

          const duration = 1200;
          const start = performance.now();
          const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

          const step = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const value = target * ease(t);
            scoreEl.textContent = formatScore(value);
            if (t < 1) requestAnimationFrame(step);
            else scoreEl.textContent = formatScore(target);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.4 });

      counterIO.observe(counterStat);
    }
  }

  // -----------------------------------------------------------------------
  // Maps preview au survol de l'adresse (lazy iframe injection)
  // Gère plusieurs adresses (Infos + Footer)
  // -----------------------------------------------------------------------
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-address-preview]').forEach(addressEl => {
      const slot = addressEl.querySelector('[data-address-preview-slot]');
      if (!slot) return;
      let loaded = false;
      const injectIframe = () => {
        if (loaded) return;
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.google.com/maps?q=200+Boulevard+Vincent+Auriol,+82000+Montauban&output=embed&z=16';
        iframe.title = 'Carte Google Maps du salon';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.setAttribute('aria-hidden', 'true');
        slot.appendChild(iframe);
        loaded = true;
      };
      addressEl.addEventListener('mouseenter', injectIframe, { once: true });
      addressEl.addEventListener('focusin', injectIframe, { once: true });
    });
  }

  // -----------------------------------------------------------------------
  // Widget contact flottant (toggle menu)
  // -----------------------------------------------------------------------
  const contactWidget = document.querySelector('[data-contact-widget]');
  const contactToggle = document.querySelector('[data-contact-toggle]');
  const contactMenu = document.querySelector('[data-contact-menu]');
  if (contactWidget && contactToggle && contactMenu) {
    const closeWidget = () => {
      contactWidget.classList.remove('is-open');
      contactToggle.setAttribute('aria-expanded', 'false');
      contactMenu.setAttribute('aria-hidden', 'true');
    };
    const openWidget = () => {
      contactWidget.classList.add('is-open');
      contactToggle.setAttribute('aria-expanded', 'true');
      contactMenu.setAttribute('aria-hidden', 'false');
    };
    contactToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (contactWidget.classList.contains('is-open')) closeWidget();
      else openWidget();
    });
    document.addEventListener('click', (e) => {
      if (!contactWidget.contains(e.target) && contactWidget.classList.contains('is-open')) {
        closeWidget();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactWidget.classList.contains('is-open')) {
        closeWidget();
        contactToggle.focus();
      }
    });
  }

  // -----------------------------------------------------------------------
  // Top trust ribbon (mesure hauteur réelle + masque après scroll)
  // -----------------------------------------------------------------------
  const ribbon = document.querySelector('[data-trust-ribbon]');
  if (ribbon) {
    document.body.classList.add('has-ribbon');
    const setRibbonHeight = () => {
      const h = ribbon.offsetHeight || 36;
      document.documentElement.style.setProperty('--ribbon-h', h + 'px');
    };
    setRibbonHeight();
    window.addEventListener('resize', setRibbonHeight);

    let ribbonHidden = false;
    const onRibbonScroll = () => {
      const y = window.scrollY;
      const shouldHide = y > 600;
      if (shouldHide !== ribbonHidden) {
        document.body.classList.toggle('is-ribbon-hidden', shouldHide);
        ribbonHidden = shouldHide;
      }
    };
    window.addEventListener('scroll', onRibbonScroll, { passive: true });
    onRibbonScroll();
  }

  // -----------------------------------------------------------------------
  // Scroll progress bar (haut de page)
  // -----------------------------------------------------------------------
  const progressBar = document.querySelector('[data-scroll-progress]');
  if (progressBar) {
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressBar.style.setProperty('--progress', pct + '%');
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  // -----------------------------------------------------------------------
  // Cursor glow sur le hero (suit la souris)
  // -----------------------------------------------------------------------
  const heroEl = document.querySelector('.hero');
  const cursorGlow = document.querySelector('[data-cursor-glow]');
  if (heroEl && cursorGlow && window.matchMedia('(hover: hover)').matches && !reduceMotion) {
    heroEl.addEventListener('mousemove', (e) => {
      const rect = heroEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cursorGlow.style.setProperty('--cursor-x', x + '%');
      cursorGlow.style.setProperty('--cursor-y', y + '%');
    });
  }

  // -----------------------------------------------------------------------
  // Tilt 3D des photos galerie au mousemove (desktop uniquement)
  // -----------------------------------------------------------------------
  const galerieItems = document.querySelectorAll('.galerie__item');
  if (galerieItems.length && window.matchMedia('(hover: hover)').matches && !reduceMotion) {
    galerieItems.forEach(item => {
      const pic = item.querySelector('picture');
      if (!pic) return;

      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;   // 0 .. 1
        const y = (e.clientY - rect.top) / rect.height;   // 0 .. 1
        const rotY = (x - 0.5) * 6;   // -3 .. +3 deg
        const rotX = (0.5 - y) * 6;
        pic.style.setProperty('--tilt-x', rotX.toFixed(2) + 'deg');
        pic.style.setProperty('--tilt-y', rotY.toFixed(2) + 'deg');
      });

      item.addEventListener('mouseleave', () => {
        pic.style.setProperty('--tilt-x', '0deg');
        pic.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  // -----------------------------------------------------------------------
  // Fleuron draw-in lorsqu'il entre dans le viewport
  // -----------------------------------------------------------------------
  const fleurons = document.querySelectorAll('.fleuron');
  if (fleurons.length && 'IntersectionObserver' in window) {
    const fleuronIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          fleuronIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    fleurons.forEach(f => fleuronIO.observe(f));
  }

  // -----------------------------------------------------------------------
  // Avant/Après slider draggable (mouse + touch + keyboard)
  // -----------------------------------------------------------------------
  document.querySelectorAll('[data-ba]').forEach(slider => {
    const viewport = slider.querySelector('.ba__viewport');
    const handle = slider.querySelector('[data-ba-handle]');
    if (!viewport || !handle) return;

    let dragging = false;

    const setPos = (clientX) => {
      const rect = viewport.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      viewport.style.setProperty('--pos', pct + '%');
      handle.setAttribute('aria-valuenow', Math.round(pct));
    };

    const onDown = (e) => {
      dragging = true;
      document.body.style.cursor = 'ew-resize';
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(x);
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(x);
      if (e.touches) e.preventDefault();
    };
    const onUp = () => {
      dragging = false;
      document.body.style.cursor = '';
    };

    viewport.addEventListener('mousedown', onDown);
    viewport.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    window.addEventListener('touchcancel', onUp);

    // Keyboard accessibility on focused handle
    handle.addEventListener('keydown', (e) => {
      const current = parseFloat(getComputedStyle(viewport).getPropertyValue('--pos')) ||
                      parseFloat(viewport.style.getPropertyValue('--pos')) || 50;
      let next = current;
      if (e.key === 'ArrowLeft')  next = Math.max(0, current - 5);
      if (e.key === 'ArrowRight') next = Math.min(100, current + 5);
      if (e.key === 'Home')       next = 0;
      if (e.key === 'End')        next = 100;
      if (next !== current) {
        viewport.style.setProperty('--pos', next + '%');
        handle.setAttribute('aria-valuenow', Math.round(next));
        e.preventDefault();
      }
    });
  });

  // -----------------------------------------------------------------------
  // Lien de navigation actif (suit la section en cours de visualisation)
  // -----------------------------------------------------------------------
  const navLinks = document.querySelectorAll('[data-nav] a');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const sectionById = new Map();
    navLinks.forEach(link => {
      const id = link.getAttribute('href');
      if (!id || !id.startsWith('#')) return;
      const section = document.querySelector(id);
      if (section) sectionById.set(section, link);
    });

    const setActive = (link) => {
      navLinks.forEach(l => l.classList.toggle('is-active', l === link));
    };

    const sectionIO = new IntersectionObserver((entries) => {
      // Choisir la section avec le plus grand ratio d'intersection
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length === 0) return;
      const link = sectionById.get(visible[0].target);
      if (link) setActive(link);
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    sectionById.forEach((_, section) => sectionIO.observe(section));
  }
})();
