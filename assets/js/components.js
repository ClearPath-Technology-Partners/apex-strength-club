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

const CIRROFLOW_URL = "https://www.cirroflowtech.com/";

// Membership signup links (GymInsight) — Founding 50 is sold out; these are the
// current tiers, each with its own checkout link. Single source of truth, used
// only on memberships.html; every other page's generic CTA routes to that page.
const SIGNUP_STANDARD_URL = "https://guru.gyminsight.com/join/woMivneUurTjLHj?optionId=e2c66595-0b4f-4cc5-a1ac-bde73cf1e7e6"; // $69.99/mo
const SIGNUP_FIRST_RESPONDER_URL = "https://guru.gyminsight.com/join/woMivneUurTjLHj?optionId=1bc8f5aa-43d8-453d-af09-84e054739f94"; // $64.99/mo — first responders & military
const SIGNUP_ANNUAL_URL = "https://guru.gyminsight.com/join/woMivneUurTjLHj?optionId=bb202368-a62c-4740-a666-0496cc5177de"; // $775.99/yr paid in full

// CONFIRM before launch: phone number is not yet public.
const APEX_EMAIL = "apexstrengthclub00@gmail.com";
const APEX_ADDRESS_LINE1 = "4345 Liberty Avenue";
const APEX_ADDRESS_LINE2 = "Vermilion, OH 44089";
// Found via public search (Facebook page name/location match) — confirm ownership before publishing.
const APEX_FACEBOOK_URL = "https://www.facebook.com/p/Apex-strength-Club-61581613797288/";

// Verified Google Business Profile embed for Apex Strength Club — single source of truth,
// used both on the Contact page and in the footer.
const MAPS_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.6827904318397!2d-82.3428465242122!3d41.424404071295235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883a73481b6f919f%3A0x3360d91473c4191!2sApex%20Strength%20Club!5e0!3m2!1sen!2sus!4v1783009144590!5m2!1sen!2sus";

function NAV(active) {
  const primaryLinks = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "memberships.html", label: "Memberships", key: "memberships" },
    { href: "amenities.html", label: "Amenities", key: "amenities" },
    { href: "updates.html", label: "The Build", key: "updates" },
  ];
  const moreLinks = [
    { href: "about.html", label: "About", key: "about" },
    { href: "merchandise.html", label: "Merchandise", key: "merchandise" },
    { href: "contact.html", label: "Contact", key: "contact" },
  ];
  const moreIsActive = moreLinks.some((l) => l.key === active);

  const linkItems = primaryLinks
    .map(
      (l) =>
        `<li><a href="${l.href}"${l.key === active ? ' class="is-active" aria-current="page"' : ""}>${l.label}</a></li>`
    )
    .join("");

  const moreItems = moreLinks
    .map(
      (l) =>
        `<li><a href="${l.href}"${l.key === active ? ' class="is-active" aria-current="page"' : ""}>${l.label}</a></li>`
    )
    .join("");

  return `
<a class="skip-link" href="#main-content">Skip to main content</a>
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
    <li class="nav-dropdown">
      <button class="nav-dropdown-toggle${moreIsActive ? " is-active" : ""}" aria-expanded="false" aria-haspopup="true">More <span class="caret" aria-hidden="true">&#9662;</span></button>
      <ul class="nav-dropdown-menu">
        ${moreItems}
      </ul>
    </li>
  </ul>
  <div class="nav-actions">
    <a href="memberships.html" class="btn btn-primary btn-sm nav-cta desktop-only">View Memberships</a>
  </div>
</nav>
`;
}

const FOOTER = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col footer-brand">
        <div class="footer-map">
          <iframe src="${MAPS_EMBED_SRC}" width="100%" height="180" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" title="Apex Strength Club location map"></iframe>
        </div>
        <p>Premium 24/7 strength training, recovery, and bodybuilding culture coming to Vermilion, Ohio. Family-owned, built for the committed.</p>
        <div class="footer-social">
          <a href="${APEX_FACEBOOK_URL}" target="_blank" rel="noopener noreferrer" aria-label="Apex Strength Club on Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5H16l.5-3.5h-3V7.7c0-1 .3-1.7 1.8-1.7H16.6V2.8C16.2 2.7 15 2.6 13.7 2.6c-2.8 0-4.7 1.7-4.7 4.8V10H6v3.5h3v7.5h4.5z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <address style="font-style:normal;">${APEX_ADDRESS_LINE1}<br>${APEX_ADDRESS_LINE2}</address>
        <a href="mailto:${APEX_EMAIL}">${APEX_EMAIL}</a>
        <a href="contact.html">Join the email list</a>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="memberships.html">Memberships</a>
        <a href="amenities.html">Amenities</a>
        <a href="merchandise.html">Merchandise</a>
        <a href="about.html">About Apex</a>
        <a href="updates.html">The Build</a>
      </div>
      <div class="footer-col">
        <h4>Hours &amp; Access</h4>
        <p>24/7 app-based member access</p>
        <p>Opening late August&ndash;September</p>
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="terms.html">Terms of Service</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="year"></span> Apex Strength Club. All rights reserved.</p>
      <p class="footer-credit">
        <a href="${CIRROFLOW_URL}" target="_blank" rel="noopener noreferrer">Website by CirroFlow Technologies, LLC</a>
      </p>
    </div>
    <div class="footer-disclaimers">
      <p>Membership pricing, discount eligibility, and terms are subject to final membership agreement and may change without notice.</p>
      <p>Interior, exterior, and facility images shown are renderings for preview purposes and may not reflect final layout or finishes.</p>
      <p>Fitness and recovery services are not medical advice. Consult a qualified professional before beginning any new training, wellness, or recovery program.</p>
    </div>
  </div>
</footer>
`;

const MOBILE_STICKY_CTA = `
<div class="mobile-sticky-cta">
  <a href="memberships.html" class="msc-claim">View Memberships</a>
  <a href="contact.html" class="msc-secondary" aria-label="Contact and email signup">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>
  </a>
</div>
`;

// Verified Google Business Profile map embed (see MAPS_EMBED_SRC above).
const MAP_SECTION = `
<div class="map-section">
  <iframe
    src="${MAPS_EMBED_SRC}"
    width="100%" height="440" style="border:0;"
    allowfullscreen loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    title="Apex Strength Club location map">
  </iframe>
</div>
`;
