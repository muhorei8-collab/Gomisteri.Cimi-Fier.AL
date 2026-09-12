/**
 * GOMISTERI CIMI — app.js
 * -----------------------------------------------------------
 * Të gjitha të dhënat e biznesit (telefon, adresë, orare) janë
 * grumbulluar te objekti BUSINESS më poshtë. Për t'i ndryshuar,
 * modifiko VETËM këtë objekt — pjesa tjetër e kodit përditësohet
 * vetë.
 */

const BUSINESS = {
  name: "Gomisteri Cimi",
  phone: "069 350 551",
  phoneHref: "tel:069350551",
  email: "ladih3310@gmail.com",
  address: "PG3R+RQ, Zhupan, Albania",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("PG3R+RQ, Zhupan, Albania"),
  // I ndërtuar nga numri i telefonit (0 hiqet, shtohet kodi i vendit +355)
  whatsappUrl: "https://wa.me/355" + "069350551".replace(/^0/, ""),
  // e diela = 0, e hëna = 1, ... e shtunën = 6 (format i JavaScript-it)
  hours: {
    1: { open: "08:00", close: "18:30" }, // e hënë
    2: { open: "08:00", close: "18:30" }, // e martë
    3: { open: "08:00", close: "18:30" }, // e mërkurë
    4: { open: "08:00", close: "18:30" }, // e enjte
    5: { open: "08:00", close: "18:30" }, // e premte
    6: { open: "08:00", close: "18:30" }, // e shtunë
    0: null, // e diel — mbyllur
  },
};

const DAY_NAMES = ["E Diel", "E Hënë", "E Martë", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"];

/* -----------------------------------------------------------
   Orari: HAPUR / MBYLLUR
   ----------------------------------------------------------- */
function getOpenStatus(now = new Date()) {
  const day = now.getDay();
  const today = BUSINESS.hours[day];
  if (!today) return { open: false };

  const [openH, openM] = today.open.split(":").map(Number);
  const [closeH, closeM] = today.close.split(":").map(Number);
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const minutesOpen = openH * 60 + openM;
  const minutesClose = closeH * 60 + closeM;

  return { open: minutesNow >= minutesOpen && minutesNow < minutesClose };
}

function renderStatusBadges() {
  const { open } = getOpenStatus();
  document.querySelectorAll("[data-status-badge]").forEach((el) => {
    el.classList.remove("status-badge--open", "status-badge--closed");
    el.classList.add(open ? "status-badge--open" : "status-badge--closed");
    const label = el.querySelector("[data-status-label]");
    if (label) label.textContent = open ? "HAPUR TANI" : "MBYLLUR TANI";
  });
}

function renderHoursTable() {
  const body = document.querySelector("[data-hours-body]");
  if (!body) return;
  const today = new Date().getDay();
  const order = [1, 2, 3, 4, 5, 6, 0];
  body.innerHTML = order
    .map((day) => {
      const entry = BUSINESS.hours[day];
      const rowClass = day === today ? "is-today" : "";
      const timeLabel = entry ? `${entry.open}–${entry.close}` : "Mbyllur";
      return `<tr class="${rowClass}"><td>${DAY_NAMES[day]}</td><td>${timeLabel}</td></tr>`;
    })
    .join("");
}

/* -----------------------------------------------------------
   Navigacioni mobil
   ----------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* -----------------------------------------------------------
   Formatues çmimi
   ----------------------------------------------------------- */
function formatPrice(value) {
  return new Intl.NumberFormat("sq-AL").format(value);
}

/* -----------------------------------------------------------
   Gjetësi i gomave
   ----------------------------------------------------------- */
const finderState = { width: "", profile: "", rim: "", brand: "" };

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

function populateFilterOptions() {
  const widthSelect = document.querySelector("[data-filter='width']");
  const profileSelect = document.querySelector("[data-filter='profile']");
  const rimSelect = document.querySelector("[data-filter='rim']");
  const brandSelect = document.querySelector("[data-filter='brand']");

  const widths = uniqueSorted(tires.map((t) => t.width));
  const profiles = uniqueSorted(tires.map((t) => t.profile));
  const rims = uniqueSorted(tires.map((t) => t.rim));
  const brands = [...new Set(tires.map((t) => t.brand))].sort((a, b) => a.localeCompare(b, "sq"));

  const fillSelect = (select, values, allLabel) => {
    if (!select) return;
    select.innerHTML =
      `<option value="">${allLabel}</option>` +
      values.map((v) => `<option value="${v}">${v}</option>`).join("");
  };

  fillSelect(widthSelect, widths, "Të gjitha gjerësitë");
  fillSelect(profileSelect, profiles, "Të gjithë profilet");
  fillSelect(rimSelect, rims, "Të gjitha buzët");
  fillSelect(brandSelect, brands, "Të gjitha markat");
}

function getFilteredTires() {
  return tires.filter((t) => {
    if (finderState.width && String(t.width) !== finderState.width) return false;
    if (finderState.profile && String(t.profile) !== finderState.profile) return false;
    if (finderState.rim && String(t.rim) !== finderState.rim) return false;
    if (finderState.brand && t.brand !== finderState.brand) return false;
    return true;
  });
}

function tireCardTemplate(tire) {
  const subject = encodeURIComponent(`Pyetje për gomën ${tire.size} ${tire.brand}`);
  const body = encodeURIComponent(
    `Përshëndetje,\n\nJam i interesuar për gomën ${tire.brand} ${tire.size}. A e keni në stok?\n\nFaleminderit.`
  );
  const inquiryHref = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
  return `
    <article class="tire-card">
      <div class="tire-card__size">${tire.size}</div>
      <div class="tire-card__brand">${tire.brand}</div>
      <div class="tire-card__season">Stina: ${tire.season}</div>
      <div class="tire-card__price">${formatPrice(tire.price)} lekë <span>/ copë</span></div>
      <div class="tire-card__note">Çmimet janë në lekë të vjetra.</div>
      <div class="tire-card__actions">
        <a class="btn btn--outline-dark btn--sm" href="${BUSINESS.phoneHref}">Telefono</a>
        <a class="btn btn--primary btn--sm" href="${inquiryHref}">Pyet për gomën</a>
      </div>
    </article>
  `;
}

function renderTireResults() {
  const grid = document.querySelector("[data-tire-grid]");
  const emptyState = document.querySelector("[data-tire-empty]");
  const countEl = document.querySelector("[data-tire-count]");
  if (!grid) return;

  const results = getFilteredTires();
  countEl.textContent = `${results.length} rezultat${results.length === 1 ? "" : "e"}`;

  if (results.length === 0) {
    grid.innerHTML = "";
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    grid.innerHTML = results.map(tireCardTemplate).join("");
  }

  renderComparison();
}

function initFinderFilters() {
  populateFilterOptions();
  document.querySelectorAll("[data-filter]").forEach((select) => {
    select.addEventListener("change", (e) => {
      finderState[e.target.dataset.filter] = e.target.value;
      renderTireResults();
    });
  });

  const resetBtn = document.querySelector("[data-filter-reset]");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      finderState.width = "";
      finderState.profile = "";
      finderState.rim = "";
      finderState.brand = "";
      document.querySelectorAll("[data-filter]").forEach((select) => (select.value = ""));
      renderTireResults();
    });
  }

  renderTireResults();
}

/* -----------------------------------------------------------
   Krahasimi i markave për të njëjtën madhësi
   ----------------------------------------------------------- */
function renderComparison() {
  const wrap = document.querySelector("[data-compare-wrap]");
  const select = document.querySelector("[data-compare-size]");
  if (!wrap || !select) return;

  // Popullo listën e madhësive (vetëm një herë)
  if (!select.dataset.populated) {
    const sizes = [...new Set(tires.map((t) => t.size))];
    select.innerHTML = sizes.map((s) => `<option value="${s}">${s}</option>`).join("");
    select.dataset.populated = "true";
    select.addEventListener("change", drawComparisonTable);
  }

  drawComparisonTable();
}

function drawComparisonTable() {
  const select = document.querySelector("[data-compare-size]");
  const wrap = document.querySelector("[data-compare-wrap]");
  if (!select || !wrap) return;

  const size = select.value || select.options[0]?.value;
  const rows = tires
    .filter((t) => t.size === size)
    .sort((a, b) => a.price - b.price);

  if (rows.length === 0) {
    wrap.innerHTML = `<p>Nuk ka të dhëna për këtë madhësi.</p>`;
    return;
  }

  wrap.innerHTML = `
    <table class="compare__table">
      <thead>
        <tr><th>Markë</th><th>Stina</th><th>Çmimi</th></tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (t) => `
          <tr>
            <td>${t.brand}</td>
            <td>${t.season}</td>
            <td class="price-cell">${formatPrice(t.price)} lekë</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

/* -----------------------------------------------------------
   Formulari i kërkesës (kontakt)
   ----------------------------------------------------------- */
const SERVICE_TOPICS = [
  "Balancim Gomash",
  "Vënie Pulle",
  "Fitil",
  "Drejtim Disku",
  "Shërbim Urgjence",
  "Diçka Tjetër",
];

function populateInquiryTopics() {
  const select = document.querySelector("[data-inquiry-topics]");
  if (!select) return;
  const tireSizes = [...new Set(tires.map((t) => `Gomë ${t.size}`))];
  const options = [...tireSizes, ...SERVICE_TOPICS];
  select.innerHTML = options.map((o) => `<option value="${o}">${o}</option>`).join("");
}

function initInquiryForm() {
  const form = document.querySelector("[data-inquiry-form]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#inq-name").value.trim();
    const phone = form.querySelector("#inq-phone").value.trim();
    const topic = form.querySelector("#inq-topic").value;
    const message = form.querySelector("#inq-message").value.trim();

    const subject = encodeURIComponent(`Kërkesë nga faqja — ${topic}`);
    const body = encodeURIComponent(
      `Emri: ${name}\nTelefoni: ${phone}\nInteresohet për: ${topic}\n\nMesazhi:\n${message || "—"}`
    );
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
  });
}

/* -----------------------------------------------------------
   Nisja
   ----------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  document.querySelectorAll("[data-phone-display]").forEach((el) => (el.textContent = BUSINESS.phone));
  document.querySelectorAll("[data-phone-href]").forEach((el) => el.setAttribute("href", BUSINESS.phoneHref));
  document.querySelectorAll("[data-email-display]").forEach((el) => (el.textContent = BUSINESS.email));
  document.querySelectorAll("[data-email-href]").forEach((el) => el.setAttribute("href", `mailto:${BUSINESS.email}`));
  document.querySelectorAll("[data-address-display]").forEach((el) => (el.textContent = BUSINESS.address));
  document.querySelectorAll("[data-maps-href]").forEach((el) => el.setAttribute("href", BUSINESS.mapsUrl));
  document.querySelectorAll("[data-whatsapp-href]").forEach((el) => el.setAttribute("href", BUSINESS.whatsappUrl));

  renderStatusBadges();
  renderHoursTable();
  initMobileNav();
  initFinderFilters();
  populateInquiryTopics();
  initInquiryForm();

  // Rifresko statusin hapur/mbyllur çdo minutë
  setInterval(renderStatusBadges, 60 * 1000);
});
