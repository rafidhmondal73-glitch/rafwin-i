const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// Mobile navigation
const menuBtn = $('.menu-btn');
const mobileMenu = $('.mobile-menu');
menuBtn?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});
$$('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
}));

// Reveal-on-scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

// Counters
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1100;
    const tick = now => {
      const p = Math.min((now-start)/duration,1);
      const eased = 1-Math.pow(1-p,3);
      el.textContent = Math.round(target*eased) + (target === 100 ? '%' : target === 24 ? 'h' : '+');
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.7});
$$('[data-count]').forEach(el => counterObserver.observe(el));

// Cursor glow / desktop only
const glow = $('.cursor-glow');
window.addEventListener('pointermove', e => {
  if (window.matchMedia('(pointer:fine)').matches) {
    glow.style.left = e.clientX+'px'; glow.style.top = e.clientY+'px';
  }
});

// Subtle magnetic CTA
$$('.magnetic').forEach(btn => {
  btn.addEventListener('pointermove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.08}px, ${(e.clientY-r.top-r.height/2)*.08}px)`;
  });
  btn.addEventListener('pointerleave', () => btn.style.transform='');
});

// Demo contact flow. Replace with Formspree, Resend, your API, or backend endpoint.
$('#contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const status = $('#form-status');
  status.textContent = 'Thanks — your brief is ready to send. Connect this form to your inbox/backend.';
  status.style.color = '#65ffb0';
});

$('#year').textContent = new Date().getFullYear();
