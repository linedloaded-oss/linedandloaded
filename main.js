/**
 * Lined & Loaded — main.js
 * Handles: mobile nav, smooth scroll, scroll animations, form submission
 * No dependencies — pure vanilla JS.
 */

(function () {
  'use strict';

  /* ============================================================
     MOBILE NAV TOGGLE
  ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close mobile nav when a link inside it is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('is-open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ============================================================
     SMOOTH SCROLL — for all anchor links to #id targets
     (CSS scroll-behavior handles most cases; JS handles
      mobile sticky bar and any edge cases)
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Account for sticky nav height
      const navHeight = document.querySelector('.nav-header')
        ? document.querySelector('.nav-header').offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  /* ============================================================
     INTERSECTION OBSERVER — Fade-in on scroll
  ============================================================ */
  if ('IntersectionObserver' in window) {
    const fadeItems = document.querySelectorAll('.fade-in-scroll');

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Once visible, no need to keep observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    // Fallback: show all immediately for older browsers
    document.querySelectorAll('.fade-in-scroll').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ============================================================
     QUOTE FORM — Validation + Submission
  ============================================================ */
  const form = document.getElementById('quote-form');
  const successMsg = document.getElementById('form-success');
  const errorBanner = document.getElementById('form-error');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  /* --- Field validation helpers --- */

  /**
   * Mark a field as invalid and show an error message.
   * @param {string} fieldId - The input's id attribute
   * @param {string} message - The error text to display
   */
  function setFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById('error-' + fieldId.replace('field-', ''));
    if (input) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  /**
   * Clear error state from a field.
   * @param {string} fieldId - The input's id attribute
   */
  function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById('error-' + fieldId.replace('field-', ''));
    if (input) {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  /**
   * Basic email format check.
   * @param {string} value
   * @returns {boolean}
   */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  /**
   * Validate all required fields. Returns true if form is valid.
   * @returns {boolean}
   */
  function validateForm() {
    let valid = true;

    // Name
    const name = document.getElementById('field-name').value.trim();
    if (!name) {
      setFieldError('field-name', 'Please enter your name.');
      valid = false;
    } else {
      clearFieldError('field-name');
    }

    // Phone
    const phone = document.getElementById('field-phone').value.trim();
    if (!phone) {
      setFieldError('field-phone', 'Please enter your phone number.');
      valid = false;
    } else {
      clearFieldError('field-phone');
    }

    // Email
    const email = document.getElementById('field-email').value.trim();
    if (!email) {
      setFieldError('field-email', 'Please enter your email address.');
      valid = false;
    } else if (!isValidEmail(email)) {
      setFieldError('field-email', 'Please enter a valid email address.');
      valid = false;
    } else {
      clearFieldError('field-email');
    }

    // Address
    const address = document.getElementById('field-address').value.trim();
    if (!address) {
      setFieldError('field-address', 'Please enter the property address.');
      valid = false;
    } else {
      clearFieldError('field-address');
    }

    return valid;
  }

  /* --- Live validation: clear errors as user types --- */
  ['field-name', 'field-phone', 'field-email', 'field-address'].forEach(function (id) {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', function () {
        if (input.classList.contains('is-invalid')) {
          clearFieldError(id);
        }
      });
    }
  });

  /* --- Set loading state on submit button --- */
  function setLoading(isLoading) {
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.btn-spinner');

    submitBtn.disabled = isLoading;

    if (isLoading) {
      btnText.textContent = 'Sending…';
      spinner.removeAttribute('hidden');
    } else {
      btnText.textContent = 'Get My Quote →';
      spinner.setAttribute('hidden', '');
    }
  }

  /* --- Form submit handler --- */
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Hide any existing banners
    errorBanner.hidden = true;

    // Validate
    const isValid = validateForm();
    if (!isValid) {
      // Scroll to first invalid field
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        const navHeight = document.querySelector('.nav-header')
          ? document.querySelector('.nav-header').offsetHeight
          : 0;
        const top =
          firstInvalid.getBoundingClientRect().top + window.scrollY - navHeight - 24;
        window.scrollTo({ top: top, behavior: 'smooth' });
        firstInvalid.focus();
      }
      return;
    }

    // Gather form data. The SMS opt-in checkbox is optional — we only set
    // sms_opt_in to true if the user explicitly checked the box. The CRM
    // webhook only sends the confirmation SMS when this is true, so we are
    // not implicitly opting people in via form submission.
    const optInEl = document.getElementById('field-optin');
    const payload = {
      name:       document.getElementById('field-name').value.trim(),
      phone:      document.getElementById('field-phone').value.trim(),
      email:      document.getElementById('field-email').value.trim(),
      address:    document.getElementById('field-address').value.trim(),
      spots:      document.getElementById('field-spots').value.trim() || null,
      message:    document.getElementById('field-message').value.trim() || null,
      sms_opt_in: !!(optInEl && optInEl.checked),
      source:     window.location.pathname.includes('quote') ? 'quote-page' : 'home-page',
    };

    setLoading(true);

    try {
      // ----------------------------------------------------------------
      // POST JSON to webhook.
      // Replace YOUR_WEBHOOK_URL_HERE with your actual endpoint,
      // e.g. a Zapier Webhook, Make (Integromat) webhook, or Formspree URL.
      // ----------------------------------------------------------------
      const WEBHOOK_URL = 'https://sweet-luck-production-2bcd.up.railway.app/api/webhook/lead';

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Server returned ' + response.status);
      }

      // SUCCESS: hide form, show success card
      form.hidden = true;
      successMsg.hidden = false;

      // Scroll success message into view
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (err) {
      // ERROR: show error banner
      console.error('Form submission error:', err);
      errorBanner.hidden = false;
      errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setLoading(false);
    }
  });

})();
