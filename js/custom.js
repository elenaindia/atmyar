document.addEventListener('DOMContentLoaded', function () {

  /* ===================== CITY TABS ===================== */
  var cityTabs = document.querySelectorAll('.city-tab');
  var cityNameLabel = document.getElementById('cityNameLabel');
  var cityNames = { yaroslavl: 'Ярославле', sochi: 'Сочи' };

  cityTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      cityTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var city = tab.getAttribute('data-city');
      if (cityNameLabel && cityNames[city]) {
        cityNameLabel.textContent = cityNames[city];
      }
    });
  });

  /* ===================== BOOKING FORM VALIDATION ===================== */
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var checkin = document.getElementById('checkin');
      var checkout = document.getElementById('checkout');
      var valid = true;

      [checkin, checkout].forEach(function (field) {
        if (!field.value) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (checkin.value && checkout.value && checkout.value <= checkin.value) {
        checkout.classList.add('is-invalid');
        valid = false;
      }

      if (valid) {
        alert('Спасибо! Мы подобрали варианты и свяжемся с вами в ближайшее время.');
        bookingForm.reset();
      }
    });
  }

  /* ===================== CONTACT MODAL FORM VALIDATION ===================== */
  var contactSubmitBtn = document.getElementById('contactSubmitBtn');
  var contactForm = document.getElementById('contactForm');
  if (contactSubmitBtn && contactForm) {
    contactSubmitBtn.addEventListener('click', function () {
      var inputs = contactForm.querySelectorAll('input[required]');
      var valid = true;
      inputs.forEach(function (input) {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          valid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });
      if (valid) {
        alert('Спасибо! Ваша заявка отправлена менеджеру.');
        contactForm.reset();
        var modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
        if (modal) modal.hide();
      }
    });
  }

  /* ===================== MIN DATE FOR BOOKING ===================== */
  var today = new Date().toISOString().split('T')[0];
  var checkinEl = document.getElementById('checkin');
  var checkoutEl = document.getElementById('checkout');
  if (checkinEl) checkinEl.setAttribute('min', today);
  if (checkoutEl) checkoutEl.setAttribute('min', today);
  if (checkinEl) {
    checkinEl.addEventListener('change', function () {
      if (checkoutEl) checkoutEl.setAttribute('min', checkinEl.value);
    });
  }

  /* ===================== SCROLL REVEAL (light) ===================== */
  var revealEls = document.querySelectorAll('.section-padding');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });

});