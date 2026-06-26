/* Shared site footer — single source of truth, injected into every page.
   Usage: <div id="site-footer"></div><script src="site-footer.js"></script> */
(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  const ep = "epreuves.html";
  const bs = "backstages.html";

  const markup = `
    <footer class="home-footer" id="login">
      <div class="home-footer-inner">
        <div class="home-footer-top">
          <div>
            <img class="home-footer-logo" src="assets/home-final/logo-milano-cortina.svg?v=2" alt="Milano Cortina 2026" />
            <p>Le rendez-vous des Jeux Olympiques et Paralympiques d’hiver.</p>
          </div>
          <form class="newsletter home-footer-newsletter">
            <label for="footer-email">Recevez les actualités</label>
            <div>
              <input id="footer-email" name="email" type="email" autocomplete="email" required placeholder="votre.email@exemple.com" />
              <button type="submit">Je m'abonne →</button>
            </div>
            <p class="newsletter-status" role="status" aria-live="polite"></p>
          </form>
        </div>
        <div class="home-footer-links">
          <nav aria-label="Les Jeux">
            <h2>Les Jeux</h2>
            <a href="athletes.html">Athlètes</a>
            <a href="${ep}">Épreuves</a>
            <a href="${ep}">Calendrier</a>
            <a href="medailles.html">Médailles</a>
            <a href="classement.html">Résultats</a>
          </nav>
          <nav aria-label="Billetterie">
            <h2>Billetterie</h2>
            <a href="billetterie.html">Acheter</a>
            <a href="compte.html">Mon compte</a>
            <a href="billetterie.html">Catégories de billets</a>
            <a href="billetterie.html">FAQ billetterie</a>
            <a href="billetterie.html">CGV</a>
          </nav>
          <nav aria-label="Préparer sa venue">
            <h2>Préparer sa venue</h2>
            <a href="sites.html">Sites de compétition</a>
            <a href="sites.html">Hébergement</a>
            <a href="sites.html">Transport</a>
            <a href="sites.html">Accessibilité</a>
            <a href="sites.html">Météo</a>
          </nav>
          <nav aria-label="Découvrir">
            <h2>Découvrir</h2>
            <a href="${bs}">Olympic Backstages</a>
            <a href="news.html">Reportages</a>
            <a href="news.html">Histoire des Jeux</a>
            <a href="news.html">Cérémonies</a>
            <a href="billetterie.html">Boutique officielle</a>
          </nav>
        </div>
        <div class="home-footer-partners">
          <h2>Partenaires officiels</h2>
          <div>
            <img src="assets/partners/cocacola.svg?v=3" alt="Coca-Cola" />
            <img src="assets/partners/visa.svg?v=3" alt="Visa" />
            <img src="assets/partners/samsung.svg?v=3" alt="Samsung" />
            <img src="assets/partners/airbnb.svg?v=1" alt="Airbnb" />
            <img src="assets/partners/alibaba.svg?v=1" alt="Alibaba" />
            <img src="assets/partners/allianz.png?v=1" alt="Allianz" />
            <img src="assets/partners/omega.png?v=2" alt="OMEGA" />
            <img src="assets/partners/deloitte.svg?v=1" alt="Deloitte" />
            <img src="assets/partners/pg.svg?v=1" alt="Procter &amp; Gamble" />
          </div>
        </div>
        <div class="home-footer-bottom">
          <p>© 2026 Milano Cortina 2026 — Tous droits réservés</p>
          <nav aria-label="Liens légaux">
            <a href="mentions.html">Mentions légales</a>
            <a href="confidentialite.html">Politique de confidentialité</a>
            <a href="cookies.html">Cookies</a>
            <a href="accessibilite.html">Accessibilité</a>
          </nav>
          <div class="home-footer-socials" aria-label="Réseaux sociaux et langue">
            <a href="https://www.youtube.com/@Olympics" target="_blank" rel="noopener" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" /></svg>
            </a>
            <a href="https://www.facebook.com/olympics" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.4 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z" /></svg>
            </a>
            <a href="https://www.instagram.com/olympics" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.9c-3.1 0-3.5 0-4.8.1-1.1 0-1.7.3-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.1.4-.3 1-.4 2.1 0 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c0 1.1.3 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.1 1 .3 2.1.4 1.3 0 1.7.1 4.8.1s3.5 0 4.8-.1c1.1 0 1.7-.3 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.1-.4.3-1 .4-2.1 0-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c0-1.1-.3-1.7-.4-2.1a3.5 3.5 0 0 0-.8-1.3 3.5 3.5 0 0 0-1.3-.8c-.4-.1-1-.3-2.1-.4-1.3 0-1.7-.1-4.8-.1Zm0 3.3a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 7.6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5.8-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" /></svg>
            </a>
            <button type="button" aria-label="Langue française">
              <img src="assets/home-final/france.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </footer>`;

  const mount = document.getElementById("site-footer");
  if (mount) mount.outerHTML = markup;

  // Newsletter behaviour (self-contained with the footer).
  document.querySelectorAll(".newsletter").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button");
      const input = form.querySelector("input[type='email']");
      const status = form.querySelector(".newsletter-status");
      if (input && !input.checkValidity()) {
        input.reportValidity();
        return;
      }
      if (status) status.textContent = "Merci ! Votre inscription est confirmée.";
      if (!button) return;
      const initial = button.textContent;
      button.textContent = "Inscription reçue";
      window.setTimeout(() => {
        button.textContent = initial;
        if (status) status.textContent = "";
      }, 2400);
    });
  });
})();
