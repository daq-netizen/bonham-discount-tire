#!/usr/bin/env node
/**
 * sync.js — propagates client.json into the static HTML/CSS.
 *
 * Runs locally, not on Vercel. Output is committed plain HTML, so the
 * deployed site stays zero-build. No npm packages, no lockfile.
 *
 *   node sync.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC = path.join(ROOT, "src");
const FILES = ["index.html", "services.html", "contact.html", "style.css"];

const DAYS = [
  ["monday", "Mon", "Monday"],
  ["tuesday", "Tue", "Tuesday"],
  ["wednesday", "Wed", "Wednesday"],
  ["thursday", "Thu", "Thursday"],
  ["friday", "Fri", "Friday"],
  ["saturday", "Sat", "Saturday"],
  ["sunday", "Sun", "Sunday"],
];

const PLACEHOLDERS = [
  "Example Auto & Tire",
  "example-auto-tire",
  "(972) 555-0142",
  "service@example.com",
  "example-auto.com",
  "1400 W Kirby St",
];

function die(msg) {
  console.error("\n  BLOCKED  " + msg + "\n");
  process.exit(1);
}
function warn(msg) {
  console.warn("  warn     " + msg);
}

// ---------- load ----------

let c;
try {
  c = JSON.parse(fs.readFileSync(path.join(ROOT, "client.json"), "utf8"));
} catch (e) {
  die("client.json is missing or not valid JSON — " + e.message);
}

const addr = (c.contact && c.contact.address) || {};

// A service-area business travels to the customer and must not publish a
// street address. Google's guidelines call for hiding it, and it is usually
// somebody's home. Setting this true drops the street from the page and from
// the structured data, and shows the service area instead.
const SAB = c.business && c.business.serviceAreaBusiness === true;

const required = [
  ["slug", c.slug],
  ["business.name", c.business && c.business.name],
  ["business.trade", c.business && c.business.trade],
  ["contact.phone", c.contact && c.contact.phone],
  ["contact.address.city", addr.city],
  ["contact.address.state", addr.state],
];
if (!SAB) required.push(["contact.address.street", addr.street]);

const missing = required.filter(([, v]) => !v || String(v).trim() === "");
if (missing.length) {
  die("client.json is incomplete:\n           " + missing.map(([k]) => k).join("\n           "));
}
if (!Array.isArray(c.services) || c.services.length === 0) {
  die("client.json needs at least one entry in services[].");
}
if (SAB && (!Array.isArray(c.areasServed) || c.areasServed.length === 0)) {
  die("serviceAreaBusiness is true, so areasServed[] must list the cities served.");
}
if (SAB && addr.street) {
  die("serviceAreaBusiness is true but contact.address.street is set. Clear it — the street must not be published.");
}

// ---------- helpers ----------

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const hasFile = (rel) => !!rel && fs.existsSync(path.join(ROOT, rel));

function to12h(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${period}`;
}

function parseDay(value) {
  if (!value) return null;
  const v = String(value).toLowerCase();
  if (v === "closed") return null;
  if (v === "24h") return { open: "00:00", close: "23:59", always: true };
  const m = v.match(/^(\d{2}:\d{2})-(\d{2}:\d{2})$/);
  if (!m) die(`hours must be "HH:MM-HH:MM", "24h", or "closed" — got "${value}"`);
  return { open: m[1], close: m[2], always: false };
}

const hours = {};
for (const [key] of DAYS) hours[key] = parseDay(c.hours && c.hours[key]);
const allDay = DAYS.every(([k]) => hours[k] && hours[k].always);

// ---------- generated fragments ----------

const hoursRows = DAYS.map(([key, short]) => {
  const h = hours[key];
  const text = !h ? "Closed" : h.always ? "24 hours" : `${to12h(h.open)} &ndash; ${to12h(h.close)}`;
  return `        <tr data-day="${key}"><th scope="row">${short}</th><td${h ? "" : ' class="is-closed"'}>${text}</td></tr>`;
}).join("\n");


// Inline stroke icons, 24x24, currentColor. Keyword-matched to service names so
// every card gets a mark — mixed photo/no-photo cards read as broken.
const ICON = {
  tire: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21"/>',
  brake: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/><path d="M12 4v3M18.5 8.5l-2.6 1.5M18.5 15.5l-2.6-1.5M12 20v-3M5.5 15.5l2.6-1.5M5.5 8.5l2.6 1.5"/>',
  engine: '<path d="M5 10h3l2-2h5l2 2h2v6h-2l-2 2h-5l-2-2H5z"/><path d="M9 6h5M11.5 6v2M19 12h2"/>',
  oil: '<path d="M12 3.5s5.5 6 5.5 9.5a5.5 5.5 0 0 1-11 0C6.5 9.5 12 3.5 12 3.5z"/>',
  ac: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/><path d="M12 6.5l-2-2M12 6.5l2-2M12 17.5l-2 2M12 17.5l2 2"/>',
  cooling: '<path d="M10 4.5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v5"/>',
  transmission: '<circle cx="12" cy="12" r="8.5"/><path d="M8 8v8M16 8v8M8 12h8M12 8v8"/>',
  suspension: '<path d="M12 3v2M12 19v2"/><path d="M8 6h8l-8 3h8l-8 3h8l-8 3h8"/>',
  exhaust: '<path d="M3 14h10a3 3 0 0 0 3-3V9h5v6h-5"/><path d="M6 17c1-1 2-1 3 0M11 18c1-1 2-1 3 0"/>',
  electrical: '<rect x="3" y="8" width="14" height="9" rx="1.5"/><path d="M17 11h3v3h-3M6 5.5h3M10 10.5l-2 3h3l-2 3"/>',
  diagnostic: '<circle cx="12" cy="12" r="8.5"/><path d="M12 12l4.5-3.5M12 12v.01"/><path d="M12 3.5v2M20.5 12h-2M12 20.5v-2M3.5 12h2"/>',
  truck: '<path d="M2 6h11v10H2zM13 9h4l3 3v4h-7z"/><circle cx="6.5" cy="18" r="1.8"/><circle cx="16.5" cy="18" r="1.8"/>',
  body: '<path d="M3 14l2-5a2 2 0 0 1 2-1.4h10A2 2 0 0 1 19 9l2 5v3h-3"/><path d="M6 17H3v-3M9 17h6"/><circle cx="7" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/>',
  clipboard: '<rect x="5" y="4.5" width="14" height="16" rx="1.5"/><path d="M9 4.5V3h6v1.5"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',
  wrench: '<path d="M15.5 3.5a5.5 5.5 0 0 0-5 8.2L3.5 18.7l1.8 1.8 7-7A5.5 5.5 0 1 0 15.5 3.5z"/><path d="M15.5 3.5l-2.5 2.5 2.5 2.5L18 6z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.5l3.5 2"/>',
  battery: '<rect x="2.5" y="7.5" width="15" height="10" rx="1.5"/><path d="M17.5 11h3.5v3h-3.5"/><path d="M6.5 5.5h3M13 5.5h3M6.5 12.5h4M8.5 10.5v4"/>',
  belt: '<circle cx="7" cy="9" r="3.5"/><circle cx="16.5" cy="15" r="4.5"/><path d="M8.6 6l7-1.5M4.2 11.4l1.5 6.6"/>'
};
const ICON_MAP = [
  [/tire|wheel/i, "tire"], [/brake/i, "brake"], [/engine|performance/i, "engine"],
  [/oil|fluid|maintenance/i, "oil"], [/a\/c|air|heating/i, "ac"], [/cool|radiator/i, "cooling"],
  [/transmission/i, "transmission"], [/belt|hose|pulley/i, "belt"],
  [/suspension|steering/i, "suspension"],
  [/exhaust|emission/i, "exhaust"], [/batter|starter|alternator/i, "battery"],
  [/electric|sensor|wiring/i, "electrical"],
  [/pre-purchase|purchase/i, "search"], [/diagnos/i, "diagnostic"],
  [/truck|off-road/i, "truck"], [/body|collision/i, "body"],
  [/inspection/i, "clipboard"], [/24|hour/i, "clock"]
];
const iconFor = (name) => {
  for (const [re, key] of ICON_MAP) if (re.test(name)) return ICON[key];
  return ICON.wrench;
};

const H = c.headings || {};

const servicesCards = c.services
  .map((s) => {
    const price = s.price ? `\n            <p class="service-price">${esc(s.price)}</p>` : "";
    const tag = s.tag ? `<span class="service-tag">${esc(s.tag)}</span>` : "";
    return `        <li class="service">
          <span class="service-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${iconFor(
            s.name
          )}</svg></span>
          <div class="service-body">
            ${tag}<h3>${esc(s.name)}</h3>
            <p>${esc(s.detail || "")}</p>${price}
          </div>
        </li>`;
  })
  .join("\n");

const servicesInline = c.services.map((s) => esc(s.name)).join(" &middot; ");
const areas = (c.areasServed || []).map(esc);

const addressLocality = `${addr.city}, ${addr.state}${addr.zip ? " " + addr.zip : ""}`;
const addressOneLine = SAB ? addressLocality : `${addr.street}, ${addressLocality}`;
const telHref = "tel:+1" + String(c.contact.phone).replace(/\D/g, "");

const mapUrl = SAB
  ? ""
  : c.contact.mapUrl ||
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addressOneLine);

const cov = c.coverage || {};
const locationBlock = SAB
  ? `<p class="coverage-lede">${esc(cov.summary || "")}</p>
      <p class="coverage-sub">Common stops</p>
      <ul class="areas">
${areas.map((a) => `        <li>${a}</li>`).join("\n")}
        <li class="is-more">and beyond</li>
      </ul>
      <p class="areas-note">${esc(cov.note || "This list is a sample, not a boundary. Call with your address and we'll tell you straight.")}</p>`
  : `<address class="addr">
        <a href="${esc(mapUrl)}" target="_blank" rel="noopener">${esc(addr.street)}<br>${esc(addressLocality)}</a>
      </address>`;

const directionsBtn = SAB
  ? ""
  : `<a class="btn btn-quiet" href="${esc(mapUrl)}" target="_blank" rel="noopener">Get directions</a>`;

// Shown as plain text and linked to the profile. Deliberately NOT emitted as
// aggregateRating structured data — self-declared review markup on your own
// site is a known penalty risk. Google renders the real rating from the profile.
const r = c.reviews || {};
const reviewsLine =
  r.rating && r.count
    ? `<p class="reviews-line"><span class="stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span> <strong>${esc(
        r.rating
      )}</strong> from ${esc(r.count)} Google reviews${
        r.url ? ` &middot; <a href="${esc(r.url)}" target="_blank" rel="noopener">Read them</a>` : ""
      }</p>`
    : "";

const reviewBlock =
  c.google && c.google.reviewUrl
    ? `<a class="btn btn-quiet" href="${esc(c.google.reviewUrl)}" target="_blank" rel="noopener">Leave a review</a>`
    : "";

// Optional imagery. Photos are the single biggest lever on whether a local
// service site reads as credible, so the template supports them but never
// invents them.
const media = c.media || {};
const heroImage = hasFile(media.hero)
  ? `<div class="hero-media"><img src="${esc(media.hero)}" alt="${esc(c.business.name)}" loading="eager"></div>`
  : `<div class="hero-media is-empty" role="img" aria-label="Photo pending"><span>Photo goes here</span></div>`;
const heroClass = " has-media";

const processSteps = Array.isArray(c.process) && c.process.length
  ? `  <section class="band band-process" aria-labelledby="process-title">
    <h2 id="process-title">${esc(H.process || "Three steps, no waiting room")}</h2>
    <ol class="process">
${c.process
  .map(
    (p, i) => `        <li>
          <span class="process-num">${String(i + 1).padStart(2, "0")}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.detail || "")}</p>
        </li>`
  )
  .join("\n")}
    </ol>
  </section>`
  : "";

const trustPoints = Array.isArray(c.trustPoints) && c.trustPoints.length
  ? `  <section class="band band-quiet" aria-labelledby="trust-title">
    <h2 id="trust-title">${esc(H.trust || "Why people call back")}</h2>
    <ul class="trust">
${c.trustPoints.map((t) => `        <li><h3>${esc(t.title)}</h3><p>${esc(t.detail || "")}</p></li>`).join("\n")}
    </ul>
  </section>`
  : "";

// Real quotes only. Never generate these — they are customer statements.
const testimonials = Array.isArray(c.testimonials) && c.testimonials.length
  ? `  <section class="band band-reviews" aria-labelledby="reviews-title">
    <p class="kicker">Google reviews</p>
    <h2 id="reviews-title">${r.rating ? `Rated ${esc(r.rating)} by local drivers` : "What customers say"}</h2>
    <ul class="quotes">
${c.testimonials
  .map((t) => {
    const nm = t.name || "Google review";
    const initials = nm.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    return `        <li>
          <div class="quote-head">
            <span class="avatar" aria-hidden="true">${esc(initials)}</span>
            <span class="quote-who"><cite>${esc(nm)}</cite>${t.when ? `<span class="quote-when">${esc(t.when)}</span>` : ""}</span>
          </div>
          <blockquote>${esc(t.quote)}</blockquote>
        </li>`;
  })
  .join("\n")}
    </ul>
  </section>`
  : "";

const isUrl = (v) => /^https?:\/\//.test(v || "");
const usable = (v) => isUrl(v) || hasFile(v);

const logoBlock = usable(media.logo)
  ? `<img class="wordmark-logo" src="${esc(media.logo)}" alt="">`
  : "";

const chips = Array.isArray(c.chips) && c.chips.length
  ? `<ul class="chips">${c.chips.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
  : "";

const galleryItems = (media.gallery || []).filter((g) => hasFile(g.src));
const gallery = galleryItems.length
  ? `  <section class="band band-gallery" aria-labelledby="gallery-title">
    <p class="kicker">${esc((media.galleryKicker) || "From the road")}</p>
    <h2 id="gallery-title">${esc((media.galleryTitle) || "Real jobs, real driveways")}</h2>
    <ul class="gallery">
${galleryItems
  .map(
    (g) => `        <li>
          <img src="${esc(g.src)}" alt="${esc(g.caption || "")}" loading="lazy">
          <span>${esc(g.caption || "")}</span>
        </li>`
  )
  .join("\n")}
    </ul>
  </section>`
  : "";

const bb = (c.site && c.site.builtBy) || {};
// Mark resolution, in order of preference:
//   1. bb.svg   — raw inline SVG. Zero requests, travels with the template,
//                 inherits currentColor so it tints with the footer.
//   2. bb.logo  — a URL, or a file that actually exists in this repo.
//   3. nothing  — wordmark renders on its own.
const builtByMark = bb.svg
  ? `<span class="built-by-mark">${bb.svg}</span>`
  : usable(bb.logo)
  ? `<img class="built-by-mark" src="${esc(bb.logo)}" alt="" width="18" height="18">`
  : "";

// Brand lockup: bars mark, then DAQ in the footer's own colour with WORKS
// letterspaced in amber — mirrors the "powered-by" variant of the component.
const builtBy = bb.name
  ? `<p class="built-by"><a href="${esc(bb.url || "#")}" target="_blank" rel="noopener">
    ${builtByMark}<span class="built-by-label">${esc(bb.label || "Powered by")}</span><span class="built-by-name"><strong>${esc(
      bb.name
    )}</strong>${bb.nameAccent ? `<em>${esc(bb.nameAccent)}</em>` : ""}</span>
  </a></p>`
  : "";

// Generic callout band — financing, warranty, seasonal offer, whatever the
// client has. Renders only when present.
const co = c.callout || {};
const calloutBlock = co.title
  ? `  <section class="band band-callout">
    <div class="callout">
      <div>
        <p class="kicker">${esc(co.kicker || "")}</p>
        <h2>${esc(co.title)}</h2>
        <p class="lede">${esc(co.body || "")}</p>
        ${co.partners ? `<p class="callout-partners">${co.partners.map(esc).join(" &middot; ")}</p>` : ""}
      </div>
      <a class="btn btn-call" href="${telHref}">${esc(co.action || "Call to ask")}</a>
    </div>
  </section>`
  : "";

const emailBlock = c.contact.email
  ? `<p class="contact-line contact-mail"><a href="mailto:${esc(c.contact.email)}">${esc(c.contact.email)}</a></p>`
  : "";

// ---------- structured data ----------

const schema = {
  "@context": "https://schema.org",
  "@type": c.business.schemaType || "LocalBusiness",
  name: c.business.name,
  description: c.business.description || c.business.tagline || "",
  telephone: c.contact.phone,
};

schema.address = SAB
  ? { "@type": "PostalAddress", addressLocality: addr.city, addressRegion: addr.state, addressCountry: "US" }
  : {
      "@type": "PostalAddress",
      streetAddress: addr.street,
      addressLocality: addr.city,
      addressRegion: addr.state,
      postalCode: addr.zip,
      addressCountry: "US",
    };

schema.openingHoursSpecification = DAYS.filter(([k]) => hours[k]).map(([k, , full]) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: full,
  opens: hours[k].open,
  closes: hours[k].close,
}));

if (c.contact.email) schema.email = c.contact.email;
if (c.site && c.site.domain) schema.url = "https://" + c.site.domain;
if (c.google && c.google.profileUrl) schema.sameAs = [c.google.profileUrl];
if (Array.isArray(c.areasServed) && c.areasServed.length) {
  schema.areaServed = c.areasServed.map((a) => ({ "@type": "City", name: a }));
  if (cov.region) schema.areaServed.unshift({ "@type": "AdministrativeArea", name: cov.region });
}
if (!SAB && c.contact.geo && c.contact.geo.lat != null && c.contact.geo.lng != null) {
  schema.geo = { "@type": "GeoCoordinates", latitude: c.contact.geo.lat, longitude: c.contact.geo.lng };
}

// ---------- tokens ----------

const tokens = {
  BUSINESS_NAME: esc(c.business.name),
  TRADE: esc(c.business.trade),
  TAGLINE: esc(c.business.tagline || ""),
  DESCRIPTION: esc(c.business.description || ""),
  PHONE: esc(c.contact.phone),
  PHONE_HREF: telHref,
  EMAIL: esc(c.contact.email || ""),
  EMAIL_BLOCK: emailBlock,
  ADDRESS_LOCALITY: esc(addressLocality),
  ADDRESS_ONELINE: esc(addressOneLine),
  LOCATION_BLOCK: locationBlock,
  SERVICES_HEAD: esc(H.services || "Everything a shop does, minus the shop"),
  PROCESS_KICKER: esc(H.processKicker || "How it works"),
  LOCATION_HEAD: (c.coverage && c.coverage.heading) || (SAB ? "We go where shops won't" : "Where we work"),
  DIRECTIONS_BTN: directionsBtn,
  HERO_SECONDARY: SAB
    ? `<a class="btn btn-ghost" href="services.html">What we handle</a>`
    : `<a class="btn btn-ghost" href="${esc(mapUrl)}" target="_blank" rel="noopener">Get directions</a>`,
  HERO_BADGE_NOTE: SAB
    ? "No shop visit. No tow. We drive to the vehicle."
    : esc(`${addr.street}, ${addr.city}` ),
  CITY: esc(addr.city),
  AREAS_SERVED: esc(areas.join(", ")),
  REGION: esc(cov.region || areas.join(", ")),
  COVERAGE_SUMMARY: esc(cov.summary || ""),
  HOURS_ROWS: hoursRows,
  HOURS_JSON: JSON.stringify(hours),
  HOURS_SUMMARY: allDay ? "Open 24 hours" : "Hours",
  SERVICES_CARDS: servicesCards,
  SERVICES_INLINE: servicesInline,
  REVIEWS_LINE: reviewsLine,
  HERO_IMAGE: heroImage,
  HERO_CLASS: heroClass,
  PROCESS_SECTION: processSteps,
  TRUST_SECTION: trustPoints,
  TESTIMONIALS_SECTION: testimonials,
  LOGO_BLOCK: logoBlock,
  BUILT_BY: builtBy,
  CALLOUT_SECTION: calloutBlock,
  CHIPS: chips,
  GALLERY_SECTION: gallery,
  STATS_STRIP: "",
  HERO_CARDS: `      <div class="hcard">
        <span class="hcard-l">Google rating</span>
        <span class="hcard-v"><span class="hcard-star">&#9733;</span>${esc(r.rating || "")}<em>${r.count ? "/ " + esc(r.count) + " reviews" : ""}</em></span>
      </div>
      <div class="hcard">
        <span class="hcard-l">Call us</span>
        <a class="hcard-v hcard-link" href="${telHref}">${esc(c.contact.phone)}</a>
      </div>
      <div class="hcard">
        <span class="hcard-l">We come to you</span>
        <span class="hcard-v hcard-sm">${esc(cov.region || "")}<em>${allDay ? "Open 24 hours" : ""}</em></span>
      </div>`,
  SERVICES_LINE: c.services.filter((x) => x.featured).map((x) => esc(x.name)).join(" &middot; ") ||
    c.services.slice(0, 5).map((x) => esc(x.name)).join(" &middot; "),
  HERO_BG: hasFile(media.hero) ? ` style="background-image:url('${esc(media.hero)}')"` : "",
  CTA_SECTION: `  <section class="band band-cta">
    <div class="hazard" aria-hidden="true"></div>
    <h2>${esc((c.cta && c.cta.title) || "Need us now?")}</h2>
    <p class="lede">${esc((c.cta && c.cta.body) || "")}</p>
    <div class="btn-row">
      <a class="btn btn-call" href="${telHref}">Call ${esc(c.contact.phone)}</a>
    </div>
  </section>`,
  REVIEW_BLOCK: reviewBlock,
  SCHEMA_JSON: JSON.stringify(schema, null, 2),
  ACCENT: (c.site && c.site.accent) || "#E8A317",
  INK: (c.site && c.site.ink) || "#121417",
  INK_2: (c.site && c.site.ink2) || "#1b1f24",
  INK_3: (c.site && c.site.ink3) || "#262c33",
  PAPER: (c.site && c.site.paper) || "#f5f5f2",
  PAPER_2: (c.site && c.site.paper2) || "#e9e9e4",
  STEEL: (c.site && c.site.steel) || "#6b7683",
  RULE: (c.site && c.site.rule) || "#d4d4ce",
  ACCENT_INK: (c.site && c.site.accentInk) || "#17191D",
  DOMAIN: esc((c.site && c.site.domain) || ""),
  YEAR: String(new Date().getFullYear()),
};

// ---------- write ----------

for (const file of FILES) {
  const from = path.join(SRC, file);
  if (!fs.existsSync(from)) die(`src/${file} is missing.`);

  let out = fs.readFileSync(from, "utf8");
  for (const [k, v] of Object.entries(tokens)) out = out.split(`{{${k}}}`).join(v);

  const left = out.match(/\{\{[A-Z_]+\}\}/g);
  if (left) die(`src/${file} has tokens with no value: ${[...new Set(left)].join(", ")}`);

  fs.writeFileSync(path.join(ROOT, file), out);
  console.log("  wrote    " + file);
}

// ---------- launch gates ----------

const raw = fs.readFileSync(path.join(ROOT, "client.json"), "utf8");
const stillExample = PLACEHOLDERS.filter((p) => raw.includes(p));
if (stillExample.length) warn("client.json still contains template sample data: " + stillExample.join(", "));
if (!c.google || !c.google.profileUrl)
  warn("google.profileUrl is empty — the Google Business Profile is the main driver of local search. See CHECKLIST.md.");
if (c.contact.email && c.site && c.site.domain && !String(c.contact.email).endsWith("@" + c.site.domain))
  warn(`contact.email (${c.contact.email}) is not on ${c.site.domain} — confirm the branded address exists and forwards before launch.`);
if (bb.name && !bb.svg && !usable(bb.logo))
  warn("site.builtBy has no mark — add builtBy.svg (inline SVG, preferred) or builtBy.logo.");
if (!usable(media.logo)) warn("media.logo is empty — the header shows the business name as text only.");
if (!Array.isArray(media.gallery) || !media.gallery.length)
  warn("media.gallery is empty — job photos are the strongest credibility signal on a local trade site.");
if (!media.hero) warn("media.hero is empty — a real photo is the biggest single lift on a local service site.");
if (!Array.isArray(c.testimonials) || !c.testimonials.length)
  warn("testimonials[] is empty — paste real quotes from the Google profile. Never invent these.");
if (SAB) console.log("  note     service-area mode — street address omitted from page and schema.");

console.log("\n  Done. Commit and push; Vercel serves these files as-is.\n");
