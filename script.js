// Basic site interactions: nav toggle, smooth scroll, stats counter, testimonial carousel, subscribe form.
// Enhancements: reveal-on-scroll and simple parallax tilt for hero image.
document.addEventListener('DOMContentLoaded', () => {

  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle?.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // SMOOTH SCROLL for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mainNav.classList.contains('open')) mainNav.classList.remove('open'); // close mobile nav
      }
    });
  });

  // STATS COUNTER (animates once when visible)
  const counters = document.querySelectorAll('.stats strong[data-target]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const duration = 1200;
        const start = performance.now();
        const initial = 0;
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.floor(progress * (target - initial) + initial);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  // SIMPLE TESTIMONIAL CAROUSEL (rotates text)
  const testimonials = [
    { quote: '"A calmness fills my soul... The care here has truly transformed my life."', who: '— Johnathan, Diabetes Patient' },
    { quote: '"Excellent care and fast response times. Highly recommended."', who: '— Aisha, Mother & Patient' },
    { quote: '"The telemedicine session saved us time and gave clear instructions."', who: '— Michael, Working Professional' },
  ];
  let tIndex = 0;
  const quoteEl = document.getElementById('testimonialQuote');
  const whoEl = document.getElementById('testimonialWho');
  const rotateTestimonials = () => {
    tIndex = (tIndex + 1) % testimonials.length;
    if (quoteEl) quoteEl.textContent = testimonials[tIndex].quote;
    if (whoEl) whoEl.textContent = testimonials[tIndex].who;
  };
  setInterval(rotateTestimonials, 4500); // every 4.5s

  // SUBSCRIBE FORM (basic validation + friendly message)
  const subscribeForm = document.getElementById('subscribeForm');
  const subEmail = document.getElementById('subEmail');
  subscribeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = subEmail.value.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please enter a valid email address.');
      subEmail.focus();
      return;
    }
    // simulate success (for competition demo you can replace this with real API)
    alert('Thanks — you are subscribed! (Demo)');
    subscribeForm.reset();
  });

  // REVEAL ON SCROLL (add .visible when element enters view)
  const revealEls = document.querySelectorAll('.reveal, .card, .feature-block, .post, .doc, .vision-left');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // Add 'reveal' class to common blocks (so CSS animation applies)
  document.querySelectorAll('.card, .feature-block, .post, .doc, .vision-left, .hero-right .hero-card').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  // Simple small parallax tilt for hero card on mouse move
  const heroCard = document.querySelector('.hero-right .hero-card');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const r = heroCard.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * 6; // tilt range
      const ry = (px - 0.5) * -8;
      heroCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = '';
    });
  }

});
