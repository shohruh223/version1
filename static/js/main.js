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

// Reusable toast message
function showToast(message) {
  const msgBox = document.createElement('div');
  msgBox.style.cssText =
    'position:fixed; top:20px; right:20px; background:var(--gold-grad); color:#000; padding:15px 25px; border-radius:8px; z-index:9999; font-weight:800; box-shadow:0 10px 25px rgba(184, 134, 11, 0.3); font-family:Montserrat, sans-serif; transition: opacity 0.3s ease;';
  msgBox.textContent = message;
  document.body.appendChild(msgBox);

  setTimeout(() => {
    msgBox.style.opacity = '0';
    setTimeout(() => msgBox.remove(), 300);
  }, 3500);
}

// Contact form (contact.html)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim();
    const emailAddr = document.getElementById('emailAddr')?.value.trim();
    const phoneNum = document.getElementById('phoneNum')?.value.trim();

    if (!fullName || !emailAddr || !phoneNum) {
      showToast("Please fill out all required fields.");
      return;
    }

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, emailAddr, phoneNum })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        showToast("Something went wrong. Please try again.");
        return;
      }

      showToast("Sent ✅ Our team will reach out shortly.");
      contactForm.reset();
    } catch {
      showToast("Network error. Please try again.");
    }
  });
}

// Optional: older/demo form id (if any other page has it)
const mainContactForm = document.getElementById('mainContactForm');
if (mainContactForm) {
  mainContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("Your request has been sent! Our dispatcher will reach out soon.");
    e.target.reset();
  });
}