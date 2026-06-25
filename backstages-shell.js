/* Shared Backstages chrome (streaming top bar + mobile bottom tab bar).
   Injected on every Backstages page so the platform feels like one app.
   Usage: <div id="bks-shell"></div><script src="backstages-shell.js"></script> */
(function () {
  const path = location.pathname.split("/").pop() || "backstages.html";

  // Top navigation — every entry is a Backstages page (not the classic site).
  // « Accueil » (la home Backstages) est en premier, à gauche.
  const NAV = [
    { href: "backstages.html", key: "live", label: "Accueil" },
    { href: "backstages-disciplines.html", key: "disc", label: "Disciplines" },
    { href: "backstages-replays.html", key: "replays", label: "Replays" },
    { href: "backstages-coulisses.html", key: "coulisses", label: "En coulisses" },
    { href: "backstages-temps-forts.html", key: "tf", label: "Temps forts" },
    { href: "backstages-a-venir.html", key: "avenir", label: "À venir" },
  ];

  const KEY_BY_PAGE = {
    "backstages-disciplines.html": "disc",
    "backstages-replays.html": "replays",
    "backstages-coulisses.html": "coulisses",
    "backstages-temps-forts.html": "tf",
    "backstages-a-venir.html": "avenir",
    "backstages-compte.html": "compte",
  };
  const active = KEY_BY_PAGE[path] || "live";

  const navLinks = NAV.map(
    (n) => `<a href="${n.href}"${active === n.key ? ' class="is-active"' : ""}>${n.label}</a>`
  ).join("\n        ");

  const icoSearch = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>`;
  const icoUsers = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"/><circle cx="9" cy="7" r="3.5"/><path d="M22 19v-1a4 4 0 0 0-3-3.85"/><path d="M16 3.6a4 4 0 0 1 0 6.8"/></svg>`;
  const icoBell = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.5 21a1.5 1.5 0 0 1-3 0"/></svg>`;
  const icoChev = `<svg class="bks-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

  const topbar = `
    <header class="bks-topbar">
      <a class="bks-logo" href="index.html" aria-label="Milano Cortina 2026 — Retour au site">
        <img src="assets/home-final/logo-milano-cortina.svg" alt="Milano Cortina 2026" />
      </a>
      <nav class="bks-topnav" aria-label="Navigation Backstages">
        ${navLinks}
      </nav>
      <div class="bks-topactions">
        <button class="bks-icon" type="button" aria-label="Rechercher">${icoSearch}</button>
        <button class="bks-icon bks-hide-mobile" type="button" aria-label="Communauté">${icoUsers}</button>
        <button class="bks-icon bks-hide-mobile" type="button" aria-label="Notifications">${icoBell}</button>
        <a class="bks-account" href="backstages-compte.html" aria-label="Mon compte"><span class="bks-avatar" aria-hidden="true"></span>${icoChev}</a>
      </div>
    </header>`;

  // Bottom tab bar (mobile) — 5 destinations, Netflix-style, Accueil à gauche.
  const tabIco = {
    live: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>`,
    disc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
    replays: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none"/></svg>`,
    coulisses: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20.5l1.4-5A8 8 0 1 1 21 11.5z"/></svg>`,
    compte: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21v-1a7 7 0 0 1 14 0v1"/></svg>`,
  };
  const TABS = [
    { href: "backstages.html", key: "live", label: "Accueil" },
    { href: "backstages-disciplines.html", key: "disc", label: "Disciplines" },
    { href: "backstages-replays.html", key: "replays", label: "Replays" },
    { href: "backstages-coulisses.html", key: "coulisses", label: "En coulisses" },
    { href: "backstages-compte.html", key: "compte", label: "Compte" },
  ];
  const tabLinks = TABS.map(
    (t) => `<a href="${t.href}"${active === t.key ? ' class="is-active"' : ""} aria-label="${t.label}">${tabIco[t.key]}<span>${t.label}</span></a>`
  ).join("\n      ");
  const tabbar = `<nav class="bks-tabbar" aria-label="Navigation Backstages">\n      ${tabLinks}\n    </nav>`;

  const mount = document.getElementById("bks-shell");
  if (mount) mount.outerHTML = topbar;
  document.body.insertAdjacentHTML("beforeend", tabbar);
})();
