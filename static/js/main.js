// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

function toggleMenu(force) {
  if (!navLinks || !menuBtn) return;
  const next = typeof force === 'boolean' ? force : !navLinks.classList.contains('active');
  navLinks.classList.toggle('active', next);
  menuBtn.setAttribute('aria-expanded', String(next));
}

if (menuBtn) menuBtn.addEventListener('click', () => toggleMenu());

// Click link -> mobile menu yopilsin
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  toggleMenu(false);
});

// Form demo (faqat contact page’da bo‘lsa ishlaydi)
const form = document.getElementById('mainContactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Your request has been sent! Our dispatcher will reach out soon.");
    e.target.reset();
  });
}