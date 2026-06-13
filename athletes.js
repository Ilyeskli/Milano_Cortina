// Athletes page interactions
(() => {
  // --- Filter pills (single-select) ---
  const pills = Array.from(document.querySelectorAll(".filter-pill"));
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
    });
  });

  // --- Dropdowns (overlay, single-select, close on outside click) ---
  const dropdowns = Array.from(document.querySelectorAll("[data-dropdown]"));
  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector(".dropdown-toggle");
    const label = dd.querySelector(".dropdown-label");
    const inputs = Array.from(dd.querySelectorAll('input[type="radio"]'));

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !dd.classList.contains("is-open");
      dropdowns.forEach((d) => d.classList.remove("is-open"));
      dd.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
    });

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        const text = input.closest("label").textContent.trim();
        label.textContent = text;
        dd.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", String(false));
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-dropdown]")) {
      dropdowns.forEach((d) => {
        d.classList.remove("is-open");
        d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
      });
    }
  });

  // --- Search functionality (simulated) ---
  const searchInput = document.querySelector('.search-input-wrapper input');
  const searchBtn = document.querySelector('.search-input-wrapper .btn-cta');
  
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        console.log('Searching for:', query);
      }
    });
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }
})();
