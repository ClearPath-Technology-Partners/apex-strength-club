/* Page interactivity: nav, hamburger, FAQ accordion, lightbox, video guard, mailto form. */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initNavDropdown();
  initFaq();
  initLightbox();
  initVideoGuard();
  initMailtoForm();
  initScrollReveal();
});

/* Pop elements in from the sides (or up) as they scroll into view. */
function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

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

/* "More" nav dropdown: click-to-toggle (works for touch/keyboard), CSS handles hover on desktop. */
function initNavDropdown() {
  const dropdowns = document.querySelectorAll(".nav-dropdown");
  if (!dropdowns.length) return;

  const closeAll = () => {
    dropdowns.forEach((dd) => {
      dd.classList.remove("is-open");
      dd.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
    });
  };

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector(".nav-dropdown-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.contains("is-open");
      closeAll();
      dd.classList.toggle("is-open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
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

    // A single play() call at DOMContentLoaded often fires before the video
    // has buffered anything on a real mobile connection (vs. instant on a
    // local dev server) — the rejected promise gets swallowed and the video
    // just sits there, which is what makes mobile browsers surface a native
    // play button. Retry as more data becomes available, and once more on
    // the first tap/scroll as a last resort so it never gets stuck paused.
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    ["touchstart", "click", "scroll"].forEach((evt) =>
      document.addEventListener(evt, tryPlay, { once: true, passive: true })
    );
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
