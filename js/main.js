/* =============================================
   MOHAMAD AL-ABBAS · PERSONAL WEBSITE
   main.js
   ============================================= */

(function () {
  'use strict';

  /* ── NAVIGATION ─────────────────────────────── */
  const nav       = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  // Shrink nav after scrolling past ~100px
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  }, { passive: true });

  // Mobile hamburger toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', open);
      navToggle.setAttribute('aria-expanded', open);
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', false);
      });
    });

    // Close menu on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  }

  /* ── ACTIVE NAV LINK (IntersectionObserver) ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-25% 0px -70% 0px' });

    sections.forEach(s => sectionObserver.observe(s));
  }

  /* ── SCROLL REVEAL ───────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children slightly
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -48px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── PROJECT TABS ────────────────────────────── */
  const tabBtns      = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card[data-group]');

  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.tab;
        projectCards.forEach(card => {
          const match = filter === 'all' || card.dataset.group === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ── ARTICLE FILTER ──────────────────────────── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card[data-cat]');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.filter;
        articleCards.forEach(card => {
          const cats  = card.dataset.cat.split(',');
          const match = cat === 'all' || cats.includes(cat);
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ── CURRENT YEAR IN FOOTER ──────────────────── */
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();
