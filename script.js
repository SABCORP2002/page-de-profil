document.addEventListener('DOMContentLoaded', function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');
  var backTop = document.getElementById('backTop');
  var heroBgImg = document.querySelector('.hero-bg-img');
  var allLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id], header[id]');

  var loader = document.getElementById('loader');
  if (loader) {
    setTimeout(function () {
      loader.classList.add('out');
    }, prefersReducedMotion ? 200 : 900);
  }

  var canUseCustomCursor = window.innerWidth > 768 && !prefersReducedMotion;
  if (canUseCustomCursor) {
    document.body.classList.add('use-custom-cursor');
  } else {
    document.body.classList.remove('use-custom-cursor');
  }

  if (canUseCustomCursor) {
    var cursor = document.getElementById('cursor');
    var cursorTrail = document.getElementById('cursorTrail');
    if (cursor && cursorTrail) {
      var trailX = 0;
      var trailY = 0;
      var mouseX = 0;
      var mouseY = 0;

      document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      });

      function animateTrail() {
        trailX += (mouseX - trailX) * 0.12;
        trailY += (mouseY - trailY) * 0.12;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
      }
      animateTrail();

      var hoverEls = document.querySelectorAll('a, button, .filter, .skill-card, .proj-card, input, textarea, .contact-card');
      hoverEls.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          cursor.classList.add('hovered');
          cursorTrail.classList.add('hovered');
        });
        el.addEventListener('mouseleave', function () {
          cursor.classList.remove('hovered');
          cursorTrail.classList.remove('hovered');
        });
      });
    } else {
      document.body.classList.remove('use-custom-cursor');
    }
  }

  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  allLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (burger) burger.classList.remove('open');
      if (navLinks) navLinks.classList.remove('open');
    });
  });

  function setActiveLink(scrollY) {
    sections.forEach(function (section) {
      var top = section.offsetTop - 120;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < bottom) {
        allLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal="left"], [data-reveal="right"]');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        var fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          var width = fill.getAttribute('data-w');
          setTimeout(function () {
            fill.style.width = width + '%';
          }, 150);
        }
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  var statsAnimated = false;
  var statNums = document.querySelectorAll('.stat-num[data-count]');
  function animateStats() {
    if (statsAnimated || !statNums.length) return;
    var about = document.querySelector('.about');
    if (!about) return;
    if (about.getBoundingClientRect().top > window.innerHeight * 0.8) return;
    statsAnimated = true;

    statNums.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var start = performance.now();
      var duration = prefersReducedMotion ? 1 : 1200;

      function step(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.floor(target * eased));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = String(target);
        }
      }
      requestAnimationFrame(step);
    });
  }

  var filterBtns = document.querySelectorAll('.filter');
  var projCards = document.querySelectorAll('.proj-card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-cat');

      projCards.forEach(function (card) {
        var matches = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.classList.toggle('hidden', !matches);
        if (matches) {
          card.classList.add('showing');
          setTimeout(function () { card.classList.remove('showing'); }, 400);
        }
      });
    });
  });

  var backdrop = document.getElementById('backdrop');
  var currentModal = null;

  function closeModal() {
    if (currentModal) currentModal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    currentModal = null;
  }

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    if (currentModal) currentModal.classList.remove('open');
    currentModal = modal;
    modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    var scroll = modal.querySelector('.modal-scroll');
    if (scroll) scroll.scrollTop = 0;
    var closeBtn = modal.querySelector('[data-modal-close]');
    if (closeBtn) closeBtn.focus();
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  document.querySelectorAll('[data-modal-target]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openModal(trigger.getAttribute('data-modal-target'));
    });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(trigger.getAttribute('data-modal-target'));
      }
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  var form = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  var formSuccessText = document.getElementById('formSuccessText');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = form.querySelector('#email');
      var name = form.querySelector('#name');
      var message = form.querySelector('#message');
      var emailOk = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      var nameOk = name && name.value.trim().length >= 2;
      var messageOk = message && message.value.trim().length >= 10;
      if (!emailOk || !nameOk || !messageOk) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (!response.ok && response.type !== 'opaque') {
          throw new Error('submit failed');
        }
        form.reset();
        if (formSuccess) {
          if (formSuccessText) formSuccessText.textContent = 'Message envoye avec succes !';
          formSuccess.classList.add('show');
        }
      }).catch(function () {
        if (formSuccess) {
          if (formSuccessText) formSuccessText.textContent = 'Erreur lors de l envoi. Veuillez reessayer.';
          formSuccess.classList.add('show');
        }
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.pageYOffset;

      if (nav) nav.classList.toggle('scrolled', y > 60);
      setActiveLink(y);
      animateStats();

      if (backTop) backTop.classList.toggle('show', y > 500);
      if (heroBgImg && !prefersReducedMotion && y < window.innerHeight) {
        heroBgImg.style.transform = 'translateY(' + y * 0.3 + 'px)';
      }

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
