document.addEventListener("DOMContentLoaded", () => {
  const currentLang = localStorage.getItem("lang") || "en";

  renderLanguageSwitcher(currentLang);
  applyLanguage(currentLang);
  resetHeaderAnimations(); // Animate headers on initial load
});

// ---------------------------
// 🌐 Language Switcher
// ---------------------------
function renderLanguageSwitcher(activeLang) {
  const switcher = document.getElementById("language-switcher");
  const langs = ["en", "nl", "fr"];
  switcher.innerHTML = "";

  const available = langs.filter(l => l !== activeLang);

  available.forEach((lang, i) => {
    const btn = document.createElement("button");
    btn.textContent = lang.toUpperCase();
    btn.className = "lang-btn hover:text-blue-600 transition-colors";
    btn.dataset.lang = lang;
    switcher.appendChild(btn);

    if (i < available.length - 1) {
      const sep = document.createElement("span");
      sep.textContent = " | ";
      switcher.appendChild(sep);
    }

    btn.addEventListener("click", () => {
      localStorage.setItem("lang", lang);
      applyLanguage(lang);
      renderLanguageSwitcher(lang);
      resetHeaderAnimations(); // Fly headers again
    });
  });
}

// ---------------------------
// 🌐 Apply Translations
// ---------------------------
function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");

    // Map headers ending with "Title" to dictionary keys
    let dictKey = key;
    if (key.endsWith("Title")) dictKey = key.replace("Title", "");

    if (translations[lang] && translations[lang][dictKey]) {
      el.textContent = translations[lang][dictKey];
    }
  });
}

// ---------------------------
// 🌬️ Fly Headers on Language Change
// ---------------------------
function resetHeaderAnimations() {
  const headers = document.querySelectorAll('.fly-header-left, .fly-header-right');

  headers.forEach(header => {
    header.classList.remove('slide-in-left', 'slide-in-right');
    header.classList.add('opacity-0');
  });

  // Trigger animation after DOM updates
  setTimeout(() => {
    animateOnScroll();
  }, 50);
}

// ---------------------------
// 🌬️ Scroll-triggered Fly Headers
// ---------------------------
function animateOnScroll() {
  const headers = document.querySelectorAll('.fly-header-left, .fly-header-right');

  headers.forEach(header => {
    const rect = header.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight * 0.8 && header.classList.contains('opacity-0')) {
      if (header.classList.contains('fly-header-left')) header.classList.add('slide-in-left');
      else header.classList.add('slide-in-right');

      header.classList.remove('opacity-0');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
