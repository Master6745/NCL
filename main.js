// ==========================================
// 1. MOBILE MENU TOGGLE & SMOOTH CLOSING
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  });

  // Automatically close mobile menu when a nav link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ==========================================
// 2. DYNAMIC GALLERY AUTO-SLIDER (Every 4s)
// ==========================================
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const intervalTime = 4000;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.remove('opacity-0', 'pointer-events-none');
      slide.classList.add('opacity-100');
    } else {
      slide.classList.remove('opacity-100');
      slide.classList.add('opacity-0', 'pointer-events-none');
    }
  });

  dots.forEach((dot, i) => {
    dot.className =
      i === index
        ? 'dot w-3 h-3 rounded-full bg-white transition'
        : 'dot w-3 h-3 rounded-full bg-white/50 transition';
  });
}

setInterval(() => {
  if (slides.length > 0) {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
}, intervalTime);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// ==========================================
// 3. ADMISSION MODAL & FORM HANDLER (SHEETS + EMAIL)
// ==========================================
const admissionModal = document.getElementById('admission-modal');

// Paste your deployed Google Apps Script Web App URL below
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzlLhPkDSOvFS3ivMylHTfP08SU06OUSTKAIrFd1YJPPDtVArb_XMGu_P54Eln_yHQ0CA/exec";

function openAdmissionModal() {
  if (admissionModal) {
    admissionModal.classList.remove('hidden');
  }
  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
  }
}

function closeAdmissionModal() {
  if (admissionModal) {
    admissionModal.classList.add('hidden');
  }
}

// Close modal when clicking outside the dialog card
if (admissionModal) {
  admissionModal.addEventListener('click', (e) => {
    if (e.target === admissionModal) {
      closeAdmissionModal();
    }
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";
  }

  const formData = {
    studentName: document.getElementById('studentName') ? document.getElementById('studentName').value : '',
    studentClass: document.getElementById('studentClass') ? document.getElementById('studentClass').value : '',
    phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
    targetExam: document.getElementById('targetExam') ? document.getElementById('targetExam').value : ''
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    alert("Thank you! Your application has been submitted successfully. We will reach out shortly.");
    closeAdmissionModal();
    e.target.reset();
  } catch (err) {
    alert("Submission failed. Please contact us directly via phone.");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Application";
    }
  }
}