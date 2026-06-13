// Billetterie page interactions
(() => {
  // --- Sport filter pills (single-select) ---
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
      dropdowns.forEach((d) => d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false"));
      dd.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
    });

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        const text = input.closest("label").textContent.trim();
        label.textContent = text;
        dd.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
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

  // --- Category select + quantity stepper + live total ---
  const catOptions = Array.from(document.querySelectorAll(".cat-option"));
  const totalEl = document.querySelector("[data-total]");
  const qtyEl = document.querySelector("[data-qty]");
  let quantity = parseInt(qtyEl?.textContent || "2", 10);

  function selectedPrice() {
    const checked = document.querySelector('input[name="categorie"]:checked');
    return checked ? parseInt(checked.value, 10) : 0;
  }
  function renderTotal() {
    if (!totalEl) return;
    totalEl.textContent = `${selectedPrice() * quantity} €`;
  }

  catOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      const input = opt.querySelector("input");
      input.checked = true;
      catOptions.forEach((o) => o.classList.remove("is-selected"));
      opt.classList.add("is-selected");
      renderTotal();
    });
  });

  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const step = parseInt(btn.dataset.step, 10);
      quantity = Math.max(1, Math.min(10, quantity + step));
      if (qtyEl) qtyEl.textContent = String(quantity);
      renderTotal();
    });
  });

  renderTotal();

  // --- Session selection updates the panel ---
  const nameEl = document.querySelector("[data-selection-name]");
  const metaEl = document.querySelector("[data-selection-meta]");
  document.querySelectorAll(".session-card").forEach((card) => {
    const btn = card.querySelector(".btn-select");
    if (!btn || btn.disabled) return;
    btn.addEventListener("click", () => {
      if (nameEl) nameEl.textContent = card.dataset.session;
      if (metaEl) metaEl.textContent = card.dataset.meta;
      document.querySelectorAll(".session-card").forEach((c) => c.classList.remove("is-active"));
      card.classList.add("is-active");
    });
  });

  // --- FAQ accordion ---
  document.querySelectorAll(".faq-q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      const isOpen = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", String(isOpen));
    });
  });
})();
