/*
  Shared markup for every page — injected at load into placeholder divs.
  Edit NAV/FOOTER/etc. here only; never copy this markup into a page directly.

  Wire-up per page:
    <div id="nav-ph"></div> ... <div id="footer-ph"></div>
    <div id="sticky-cta-ph"></div>
    <script src="assets/js/components.js?v=1"></script>
    <script>
      document.getElementById('nav-ph').innerHTML = NAV(document.body.dataset.page);
      document.getElementById('footer-ph').innerHTML = FOOTER;
      document.getElementById('sticky-cta-ph').innerHTML = MOBILE_STICKY_CTA;
      document.getElementById('year').textContent = new Date().getFullYear();
    </script>
*/

const CLEARPATH_URL = "https://www.clearpathtechnology.org/"; // constant across every ClearPath build

// Primary conversion link — Founding 50 signup (GymInsight)
const GYMINSIGHT_URL = "https://guru.gyminsight.com/join/woMivneUurTjLHj?optionId=ec7e93fc-0196-472d-82eb-3a60684f3c2f";

// CONFIRM before launch: phone number and business email are not yet public.
const APEX_EMAIL = "hello@apexstrengthclub.com"; // placeholder — swap for the real inbox
const APEX_ADDRESS_LINE1 = "4345 Liberty Avenue";
const APEX_ADDRESS_LINE2 = "Vermilion, OH 44089";
// Found via public search (Facebook page name/location match) — confirm ownership before publishing.
const APEX_FACEBOOK_URL = "https://www.facebook.com/p/Apex-strength-Club-61581613797288/";

function NAV(active) {
  const links = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "memberships.html", label: "Memberships", key: "memberships" },
    { href: "amenities.html", label: "Amenities", key: "amenities" },
    { href: "about.html", label: "About", key: "about" },
    { href: "updates.html", label: "Updates", key: "updates" },
    { href: "contact.html", label: "Contact", key: "contact" },
  ];
  const linkItems = links
    .map(
      (l) =>
        `<li><a href="${l.href}"${l.key === active ? ' class="is-active" aria-current="page"' : ""}>${l.label}</a></li>`
    )
    .join("");

  return `
<nav class="site-nav" id="site-nav">
  <a href="index.html" class="nav-logo">
    <img src="assets/images/favicon/logo-nav.png" alt="Apex Strength Club logo" width="46" height="46">
    <span class="nav-logo-text">Apex<span>Strength Club</span></span>
  </a>
  <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links" id="nav-links">
    ${linkItems}
  </ul>
  <div class="nav-actions">
    <a href="${GYMINSIGHT_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm nav-cta desktop-only">Claim Founding 50</a>
  </div>
</nav>
`;
}

const FOOTER = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col footer-brand">
        <img src="assets/images/favicon/logo-nav.png" alt="Apex Strength Club logo" width="44" height="44">
        <p>Premium 24/7 strength training, recovery, and bodybuilding culture coming to Vermilion, Ohio. Family-owned, built for the committed.</p>
        <div class="footer-social">
          <a href="${APEX_FACEBOOK_URL}" target="_blank" rel="noopener noreferrer" aria-label="Apex Strength Club on Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5H16l.5-3.5h-3V7.7c0-1 .3-1.7 1.8-1.7H16.6V2.8C16.2 2.7 15 2.6 13.7 2.6c-2.8 0-4.7 1.7-4.7 4.8V10H6v3.5h3v7.5h4.5z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <p>${APEX_ADDRESS_LINE1}<br>${APEX_ADDRESS_LINE2}</p>
        <a href="mailto:${APEX_EMAIL}">${APEX_EMAIL}</a>
        <a href="contact.html">Join the email list</a>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="memberships.html">Founding 50 Membership</a>
        <a href="amenities.html">Amenities</a>
        <a href="about.html">About Apex</a>
        <a href="updates.html">Construction Updates</a>
      </div>
      <div class="footer-col">
        <h4>Hours &amp; Access</h4>
        <p>24/7 app-based member access</p>
        <p>Opening late August&ndash;September</p>
        <a href="privacy-policy.html">Privacy Policy</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="year"></span> Apex Strength Club. All rights reserved.</p>
      <p class="footer-credit">
        <a href="${CLEARPATH_URL}" target="_blank" rel="noopener noreferrer">Website by ClearPath Technology Partners</a>
      </p>
    </div>
    <div class="footer-disclaimers">
      <p>Founding 50 memberships are limited to the first 50 members. Card will not be charged until official opening. Terms subject to final membership agreement.</p>
      <p>Interior, exterior, and facility images shown are renderings for preview purposes and may not reflect final layout or finishes.</p>
      <p>Fitness and recovery services are not medical advice. Consult a qualified professional before beginning any new training, wellness, or recovery program.</p>
    </div>
  </div>
</footer>
`;

const MOBILE_STICKY_CTA = `
<div class="mobile-sticky-cta">
  <a href="${GYMINSIGHT_URL}" target="_blank" rel="noopener noreferrer" class="msc-claim">Claim Founding 50</a>
  <a href="contact.html" class="msc-secondary" aria-label="Contact and email signup">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>
  </a>
</div>
`;

// Static Google Maps embed built from the confirmed address — no API key needed.
const MAP_SECTION = `
<div class="map-section">
  <iframe
    src="https://www.google.com/maps?q=${encodeURIComponent(APEX_ADDRESS_LINE1 + ", " + APEX_ADDRESS_LINE2)}&output=embed"
    width="100%" height="440" style="border:0;"
    allowfullscreen loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Apex Strength Club location map">
  </iframe>
</div>
`;
