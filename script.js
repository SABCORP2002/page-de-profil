document.addEventListener('DOMContentLoaded', function () {

  var loader = document.getElementById('loader');
  if (loader) {
    setTimeout(function () {
      loader.classList.add('out');
    }, 1200);
  }

  if (window.innerWidth > 768) {
    var cursor      = document.getElementById('cursor');
    var cursorTrail = document.getElementById('cursorTrail');
    var trailX = 0, trailY = 0;
    var mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    function animateTrail() {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top  = trailY + 'px';
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
  }

  var nav      = document.getElementById('nav');
  var burger   = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  var allLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (burger) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  allLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      burger && burger.classList.remove('open');
      navLinks && navLinks.classList.remove('open');
    });
  });

  var sections = document.querySelectorAll('section[id], header[id]');
  function setActiveLink() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (section) {
      var top    = section.offsetTop - 120;
      var bottom = top + section.offsetHeight;
      var id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < bottom) {
        allLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', setActiveLink);

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var top = target.offsetTop - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal="left"], [data-reveal="right"]');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        var fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          var w = fill.getAttribute('data-w');
          setTimeout(function () { fill.style.width = w + '%'; }, 200);
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  var statsAnimated = false;
  var statNums = document.querySelectorAll('.stat-num[data-count]');

  function animateStats() {
    if (statsAnimated) return;
    var about = document.querySelector('.about');
    if (!about) return;
    var rect = about.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      statsAnimated = true;
      statNums.forEach(function (el) {
        var target   = parseInt(el.getAttribute('data-count'));
        var duration = 1800;
        var steps    = 50;
        var step     = target / steps;
        var current  = 0;
        var interval = setInterval(function () {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(interval);
          } else {
            el.textContent = Math.floor(current);
          }
        }, duration / steps);
      });
    }
  }
  window.addEventListener('scroll', animateStats);
  animateStats();

  var filterBtns = document.querySelectorAll('.filter');
  var projCards  = document.querySelectorAll('.proj-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var cat = btn.getAttribute('data-cat');

      projCards.forEach(function (card) {
        var cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat === cat) {
          card.classList.remove('hidden');
          card.classList.add('showing');
          setTimeout(function () { card.classList.remove('showing'); }, 400);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  var backdrop = document.getElementById('backdrop');
  var currentModal = null;

  window.openModal = function (id) {
    if (currentModal) currentModal.classList.remove('open');
    var modal = document.getElementById(id);
    if (!modal) return;
    currentModal = modal;
    modal.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    var scroll = modal.querySelector('.modal-scroll');
    if (scroll) scroll.scrollTop = 0;
  };

  window.closeModal = function () {
    if (currentModal) currentModal.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    currentModal = null;
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeModal();
  });

  var form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
    });
  }

  var backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 500) {
        backTop.classList.add('show');
      } else {
        backTop.classList.remove('show');
      }
    });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var titleLines = document.querySelectorAll('.hero-title-line');
  titleLines.forEach(function (line, idx) {
    var text = line.textContent;
    line.textContent = '';
    var delay = idx * 250 + 600;
    setTimeout(function () {
      var i = 0;
      var timer = setInterval(function () {
        line.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(timer);
      }, 35);
    }, delay);
  });

  var heroBgImg = document.querySelector('.hero-bg-img');
  if (heroBgImg) {
    window.addEventListener('scroll', function () {
      var scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroBgImg.style.transform = 'translateY(' + scrolled * 0.3 + 'px)';
      }
    });
  }

});