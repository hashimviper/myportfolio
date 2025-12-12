/* ============================================
   Mohamed Hashim - Data Analyst Portfolio
   JavaScript Functionality (revised)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // Navbar Scroll Effect
  // ============================================
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      const expanded = this.classList.toggle('active');
      mobileNav.classList.toggle('active');
      // accessibility attributes
      mobileMenuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      mobileNav.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    });
  }

  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
      if (mobileNav) mobileNav.classList.remove('active');
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      if (mobileNav) mobileNav.setAttribute('aria-hidden', 'true');
    });
  });

  // ============================================
  // Smooth Scroll for Navigation Links
  // ============================================
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function(link) {
    // guard against links that only contain '#'
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight + 4; // slight offset for visibility

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // If mobile nav is open, close it after click
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
          if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileNav.setAttribute('aria-hidden', 'true');
        }
      }
    });
  });

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');

        // Trigger skill bar animations
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(function(bar) {
          bar.style.animationPlayState = 'running';
        });
      }
    });
  }, observerOptions);

  // Observe relevant sections and cards (guard for existence)
  const sections = document.querySelectorAll('section');
  sections.forEach(function(section) {
    observer.observe(section);
  });

  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(function(card) {
    observer.observe(card);
  });

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(function(card) {
    observer.observe(card);
  });

  // ============================================
  // Active Navigation Link Highlight
  // ============================================
  const sectionElements = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 100;

    sectionElements.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Desktop nav
        document.querySelectorAll('.nav-link').forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });

        // Mobile nav
        document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Initial check

  // ============================================
  // Hover Effects for Cards
  // ============================================
  const cards = document.querySelectorAll('.skill-card, .project-card, .contact-card');

  cards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // ============================================
  // Parallax Effect for Background Elements
  // ============================================
  const heroGlows = document.querySelectorAll('.hero-glow');
  const sectionGlows = document.querySelectorAll('.section-glow');

  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;

    heroGlows.forEach(function(glow, index) {
      const speed = 0.05 * (index + 1);
      glow.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
    });

    sectionGlows.forEach(function(glow, index) {
      const speed = 0.03 * (index + 1);
      glow.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
    });
  });

  // ============================================
  // Console Welcome Message
  // ============================================
  console.log('%c Welcome to Mohamed Hashim\'s Portfolio! ',
    'background: linear-gradient(135deg, #26d9b0, #a855f7); color: #0a0f1c; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
  console.log('%c Built with passion ', 'color: #26d9b0; font-size: 12px;');

}); // DOMContentLoaded end

// ============================================
// Utility Functions
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function() {
        inThrottle = false;
      }, limit);
    }
  };
}
