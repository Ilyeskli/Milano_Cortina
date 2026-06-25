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

  // --- Contenu des menus déroulants ---
  // Index de recherche (pages, disciplines, athlètes) filtré en direct.
  const SEARCH_INDEX = [
    { label: "Slalom géant messieurs", sub: "En direct · Ski alpin", href: "backstages-video.html" },
    { label: "Ski alpin", sub: "Discipline", href: "backstages-discipline.html?disc=ski-alpin" },
    { label: "Biathlon", sub: "Discipline", href: "backstages-discipline.html?disc=biathlon" },
    { label: "Patinage artistique", sub: "Discipline", href: "backstages-discipline.html?disc=patinage-artistique" },
    { label: "Snowboard", sub: "Discipline", href: "backstages-discipline.html?disc=snowboard" },
    { label: "Ski de fond", sub: "Discipline", href: "backstages-discipline.html?disc=ski-de-fond" },
    { label: "Hockey sur glace", sub: "Discipline", href: "backstages-discipline.html?disc=hockey" },
    { label: "Replays", sub: "Toutes les épreuves à revoir", href: "backstages-replays.html" },
    { label: "En coulisses", sub: "Immersions & reportages", href: "backstages-coulisses.html" },
    { label: "Temps forts", sub: "Les meilleurs moments", href: "backstages-temps-forts.html" },
    { label: "À venir", sub: "Le programme des Jeux", href: "backstages-a-venir.html" },
    { label: "Mikaela Shiffrin", sub: "Athlète · Ski alpin 🇺🇸", href: "profil.html?athlete=shiffrin" },
    { label: "Marco Odermatt", sub: "Athlète · Ski alpin 🇨🇭", href: "profil.html?athlete=odermatt" },
    { label: "Lou Jeanmonnot", sub: "Athlète · Biathlon 🇫🇷", href: "profil.html?athlete=jeanmonnot" },
  ];

  const NOTIFS = [
    { live: true, text: "Le slalom géant débute dans 10 min", time: "Maintenant", href: "backstages-video.html" },
    { text: "Nouveau replay : Half-pipe, la finale", time: "Il y a 12 min", href: "backstages-replays.html" },
    { text: "Mikaela Shiffrin décroche l'or 🥇", time: "Il y a 25 min", href: "backstages-temps-forts.html" },
    { text: "3 nouvelles immersions en coulisses", time: "Il y a 1 h", href: "backstages-coulisses.html" },
  ];
  const FRIENDS = [
    { ini: "MR", name: "Marco Rossi", act: "regarde Descente messieurs" },
    { ini: "SB", name: "Sofia Bianchi", act: "regarde En coulisses" },
    { ini: "LK", name: "Liam Keller", act: "en ligne" },
  ];

  const searchPanel = `
        <div class="bks-search-box">${icoSearch}<input type="search" class="bks-search-input" placeholder="Rechercher une épreuve, un athlète…" aria-label="Rechercher" /></div>
        <div class="bks-search-results"></div>`;
  const notifsPanel =
    `<div class="bks-panel-head"><h3>Notifications</h3><button class="bks-panel-link" type="button">Tout marquer comme lu</button></div>` +
    NOTIFS.map((n) =>
      `<a class="bks-notif" href="${n.href}"><span class="bks-notif-dot${n.live ? " is-live" : ""}" aria-hidden="true"></span><span><p>${n.text}</p><span>${n.time}</span></span></a>`
    ).join("");
  const groupePanel =
    `<div class="bks-panel-head"><h3>Communauté</h3></div>` +
    FRIENDS.map((f) =>
      `<a class="bks-friend" href="#"><span class="bks-friend-ava" aria-hidden="true">${f.ini}</span><span><b>${f.name}</b><span>${f.act}</span></span></a>`
    ).join("") +
    `<button class="bks-panel-cta" type="button">＋ Regarder ensemble</button>`;
  const accountPanel =
    `<div class="bks-menu-id"><span class="bks-avatar" aria-hidden="true"></span><span><b>Lucas Bernard</b><span>Olympic Backstages</span></span></div>` +
    `<a href="backstages-compte.html">Mon compte</a>` +
    `<a href="backstages-compte.html">Ma liste</a>` +
    `<a href="backstages-compte.html">Paramètres</a>` +
    `<a href="index.html">Quitter Backstages</a>` +
    `<a class="bks-menu-danger" href="index.html">Se déconnecter</a>`;

  const topbar = `
    <header class="bks-topbar">
      <a class="bks-logo" href="index.html" aria-label="Milano Cortina 2026 — Retour au site">
        <img src="assets/home-final/logo-milano-cortina.svg" alt="Milano Cortina 2026" />
      </a>
      <nav class="bks-topnav" aria-label="Navigation Backstages">
        ${navLinks}
      </nav>
      <div class="bks-topactions">
        <div class="bks-menu">
          <button class="bks-icon" type="button" aria-label="Rechercher" aria-expanded="false">${icoSearch}</button>
          <div class="bks-panel bks-panel-search">${searchPanel}</div>
        </div>
        <div class="bks-menu bks-hide-mobile">
          <button class="bks-icon" type="button" aria-label="Communauté" aria-expanded="false">${icoUsers}</button>
          <div class="bks-panel">${groupePanel}</div>
        </div>
        <div class="bks-menu bks-hide-mobile">
          <button class="bks-icon bks-icon-badge" type="button" aria-label="Notifications" aria-expanded="false">${icoBell}<span class="bks-badge">${NOTIFS.length}</span></button>
          <div class="bks-panel">${notifsPanel}</div>
        </div>
        <div class="bks-menu">
          <button class="bks-account" type="button" aria-label="Mon compte" aria-expanded="false"><span class="bks-avatar" aria-hidden="true"></span>${icoChev}</button>
          <div class="bks-panel bks-panel-menu">${accountPanel}</div>
        </div>
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

  // --- Menus déroulants de la topbar (recherche, communauté, notifs, profil) ---
  var menus = Array.prototype.slice.call(document.querySelectorAll(".bks-topactions .bks-menu"));
  function closeMenus(except) {
    menus.forEach(function (m) {
      if (m === except) return;
      m.classList.remove("is-open");
      var b = m.querySelector("button");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }
  menus.forEach(function (m) {
    var btn = m.querySelector("button");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = !m.classList.contains("is-open");
      closeMenus(m);
      m.classList.toggle("is-open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (willOpen) {
        var inp = m.querySelector(".bks-search-input");
        if (inp) inp.focus();
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".bks-menu")) closeMenus(null);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenus(null);
  });

  // --- Recherche en direct ---
  var input = document.querySelector(".bks-search-input");
  var results = document.querySelector(".bks-search-results");
  if (input && results) {
    function norm(s) {
      return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    }
    function renderResults(q) {
      var nq = norm(q.trim());
      var items = nq
        ? SEARCH_INDEX.filter(function (it) { return norm(it.label).indexOf(nq) > -1 || norm(it.sub).indexOf(nq) > -1; })
        : SEARCH_INDEX.slice(0, 6);
      if (!items.length) {
        results.innerHTML = '<p class="bks-search-empty">Aucun résultat pour « ' + q.trim() + " ».</p>";
        return;
      }
      results.innerHTML =
        (nq ? "" : '<p class="bks-search-label">Suggestions</p>') +
        items.map(function (it) {
          return '<a class="bks-search-item" href="' + it.href + '"><span>' + it.label + '</span><span class="bks-search-sub">' + it.sub + "</span></a>";
        }).join("");
    }
    input.addEventListener("input", function () { renderResults(input.value); });
    renderResults("");
  }
})();
