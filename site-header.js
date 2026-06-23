/* Shared site header — single source of truth, injected into every page.
   Edit this file once and the header updates everywhere.
   Usage in a page: <div id="site-header"></div><script src="site-header.js"></script> */
(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  const isHome = path === "" || path === "index.html";

  // The header styling lives under the `.home-page` hook (it only styles the
  // header + its variables). Apply it to every page so the header is identical
  // site-wide. `isHome` is derived from the URL above, not from this class.
  document.body.classList.add("home-page");

  // Backstages stays a home section anchor; Épreuves now has its own page.
  const bs = isHome ? "#backstages" : "index.html#backstages";
  // The logo is the canonical "home" control — it always leads to the accueil,
  // from any page (standard site convention). Épreuves stays a section, not home.
  const logoHref = "index.html";

  // Which top-nav entry is the current page.
  let active = "";
  if (path === "athletes.html" || path === "tous-les-athletes.html") active = "athletes";
  else if (path === "epreuves.html") active = "epreuves";
  else if (path === "news.html" || path.startsWith("news-article")) active = "news";
  else if (path === "billetterie.html") active = "billetterie";
  else if (path === "medailles.html" || path === "classement.html") active = "medailles";

  const navLink = (href, key, label) =>
    `<a href="${href}"${active === key ? ' class="active" aria-current="page"' : ""}>${label}</a>`;

  const markup = `
    <a class="skip-link" href="#top">Aller au contenu</a>
    <header class="mc-header">
      <a class="mc-logo" href="${logoHref}" aria-label="Milano Cortina 2026">
        <img src="assets/home-final/logo-milano-cortina.svg" alt="" />
      </a>

      <button
        class="menu-toggle"
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded="false"
        aria-controls="primary-nav"
      >
        <svg class="icon icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
        <svg class="icon icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <nav class="mc-nav" id="primary-nav" aria-label="Navigation principale">
        ${navLink("athletes.html", "athletes", "Athlètes")}
        ${navLink("epreuves.html", "epreuves", "Épreuves")}
        ${navLink("news.html", "news", "News")}
        ${navLink("billetterie.html", "billetterie", "Billetterie")}
        ${navLink("medailles.html", "medailles", "Médailles")}
        ${navLink(bs, "backstages", "Backstages")}
      </nav>

      <div class="mc-actions">
        <button class="flag-button" type="button" aria-label="Langue française">
          <img src="assets/home-final/france.svg" alt="" />
        </button>
        <a class="login-link" href="profil.html">Se connecter</a>
        <a class="signup-link" href="profil.html">S'inscrire</a>
      </div>
    </header>`;

  const mount = document.getElementById("site-header");
  if (mount) mount.outerHTML = markup;

  // Mobile menu behaviour (travels with the header so every page works).
  const menuToggle = document.querySelector(".menu-toggle");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
  };
  menuToggle?.addEventListener("click", () => {
    setMenu(!document.body.classList.contains("menu-open"));
  });
  document.querySelectorAll(".mc-nav a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      setMenu(false);
      menuToggle?.focus();
    }
  });
})();
