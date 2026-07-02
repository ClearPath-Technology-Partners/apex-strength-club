/* Page interactivity: nav, hamburger, FAQ accordion, lightbox, video guard, mailto form. */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFaq();
  initLightbox();
  initVideoGuard();
  initMailtoForm();
});

function initNav() {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-links");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }
}

function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      item.closest(".faq-list")?.querySelectorAll(".faq-item.is-open").forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  const img = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll("[data-lightbox]").forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-lightbox");
      const cap = item.getAttribute("data-caption") || "";
      if (img) {
        img.src = src;
        img.alt = cap;
      }
      if (caption) caption.textContent = cap;
      lightbox.classList.add("is-open");
    });
  });

  const close = () => lightbox.classList.remove("is-open");
  closeBtn?.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* Hero/background videos: respect reduced-motion and data-saver, otherwise autoplay muted+looped. */
function initVideoGuard() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;

  document.querySelectorAll("video[data-bg-video]").forEach((video) => {
    if (reducedMotion || saveData) {
      // Swap for a static image so the poster frame stays visible instead of leaving a blank hero.
      const img = document.createElement("img");
      img.src = video.getAttribute("poster");
      img.alt = "";
      img.className = video.className;
      video.replaceWith(img);
      return;
    }
    video.muted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.play().catch(() => {
      /* Autoplay can be blocked; poster frame still shows via the video's poster attribute. */
    });
  });
}

/* Email signup form -> mailto fallback (no backend wired yet, see build notes). */
function initMailtoForm() {
  const form = document.getElementById("email-signup-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value?.trim() || "";
    const email = form.querySelector('[name="email"]')?.value?.trim() || "";
    const subject = encodeURIComponent("Apex Strength Club — Email List Signup");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nPlease add me to the Apex Strength Club updates list.`);
    window.location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${body}`;
    const note = form.querySelector(".form-note-status");
    if (note) note.textContent = "Opening your email app to send your signup — thanks for following the build!";
  });
}
