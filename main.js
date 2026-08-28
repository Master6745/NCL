// ==========================================
// 1. MOBILE MENU TOGGLE LOGIC (< 720px)
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  });
}

// ==========================================
// 2. DYNAMIC GALLERY AUTO-SLIDER (Every 4s)
// ==========================================
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const intervalTime = 4000; // 4 seconds

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

// Auto-advance slides every 4 seconds
setInterval(() => {
  if (slides.length > 0) {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
}, intervalTime);

// Allow user to click dots to switch slides
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});