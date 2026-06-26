// Billetterie page interactions
(() => {
  const sessions = Array.from(document.querySelectorAll(".session-card"));
  const original = sessions.slice(); // keep the initial DOM order to restore later
  const norm = (s) => (s || "").trim().toLowerCase();
  const filters = { sport: null, date: null, site: null, type: null };

  // Empty state appended after the sessions.
  const list = document.querySelector(".session-list");
  let empty = null;
  if (list) {
    empty = document.createElement("p");
    empty.className = "session-empty";
    empty.hidden = true;
    empty.textContent = "Aucune session ne correspond à ces filtres.";
    list.appendChild(empty);
  }

  // A session matches when it satisfies every active filter (sport, date, site, type).
  const matchAll = (c) =>
    (!filters.sport || norm(c.dataset.sport) === norm(filters.sport)) &&
    (!filters.date || norm(c.dataset.date) === norm(filters.date)) &&
    (!filters.site || norm(c.dataset.site) === norm(filters.site)) &&
    (!filters.type || norm(c.dataset.type) === norm(filters.type));

  function applyFilters() {
    if (!list) return;

    // Reset: nothing hidden, no ordering classes.
    original.forEach((c) => {
      c.hidden = false;
      c.classList.remove("is-match", "is-dim", "dim-start");
    });

    const anyFilter =
      filters.sport || filters.date || filters.site || filters.type;

    // No filter active → original order, no highlight.
    if (!anyFilter) {
      original.forEach((c) => list.insertBefore(c, empty));
      list.classList.remove("has-promo");
      empty.hidden = true;
      return;
    }

    const matched = original.filter(matchAll);
    const rest = original.filter((c) => !matchAll(c));

    // No match → keep the full list as-is and show the empty notice.
    if (matched.length === 0) {
      original.forEach((c) => list.insertBefore(c, empty));
      list.classList.remove("has-promo");
      empty.hidden = false;
      empty.textContent = "Aucune session ne correspond à ces filtres.";
      return;
    }

    // Every filter behaves the same way: matching sessions are lifted to the top
    // and highlighted, the others stay below — dimmed and separated.
    [...matched, ...rest].forEach((c) => list.insertBefore(c, empty));
    matched.forEach((c) => c.classList.add("is-match"));
    rest.forEach((c) => c.classList.add("is-dim"));
    if (rest.length) rest[0].classList.add("dim-start");
    list.classList.add("has-promo");
    empty.hidden = true;
  }

  // --- Sport filter pills (single-select, filters the list) ---
  const pills = Array.from(document.querySelectorAll(".filter-pill"));
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => {
        p.classList.remove("is-active");
        p.setAttribute("aria-pressed", "false");
      });
      pill.classList.add("is-active");
      pill.setAttribute("aria-pressed", "true");
      const label = pill.textContent.trim();
      filters.sport = /tous les sports/i.test(label) ? null : label;
      applyFilters();
    });
  });

  // --- Dropdowns (overlay, single-select, filters the list) ---
  const dropdowns = Array.from(document.querySelectorAll("[data-dropdown]"));
  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector(".dropdown-toggle");
    const label = dd.querySelector(".dropdown-label");
    const inputs = Array.from(dd.querySelectorAll('input[type="radio"]'));
    const group = inputs[0]?.name; // dates | sites | types
    const key = group === "dates" ? "date" : group === "sites" ? "site" : "type";

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !dd.classList.contains("is-open");
      dropdowns.forEach((d) => {
        d.classList.remove("is-open");
        d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
      });
      dd.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
    });

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        const text = input.closest("label").textContent.trim();
        label.textContent = text;
        filters[key] = /^(toutes|tous)\b/i.test(text) ? null : text;
        dd.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        applyFilters();
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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dropdowns.forEach((d) => d.classList.remove("is-open"));
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

  // --- Session selection: visible button state + panel update ---
  const nameEl = document.querySelector("[data-selection-name]");
  const metaEl = document.querySelector("[data-selection-meta]");

  sessions.forEach((card) => {
    const btn = card.querySelector(".btn-select");
    if (!btn || btn.disabled) return;
    btn.addEventListener("click", () => {
      sessions.forEach((other) => {
        other.classList.remove("is-selected");
        const b = other.querySelector(".btn-select");
        if (b && !b.disabled) {
          b.classList.remove("is-selected");
          b.textContent = "Sélectionner";
          b.setAttribute("aria-pressed", "false");
        }
      });
      card.classList.add("is-selected");
      btn.classList.add("is-selected");
      btn.textContent = "Sélectionné";
      btn.setAttribute("aria-pressed", "true");
      if (nameEl) nameEl.textContent = card.dataset.session;
      if (metaEl) metaEl.textContent = card.dataset.meta;
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

  // ====== Parcours multi-étapes : sélection → infos & paiement → confirmation ======
  const views = Array.from(document.querySelectorAll(".step-view"));
  const steps = Array.from(document.querySelectorAll(".step-indicator li"));
  const bookingSection = document.querySelector(".section-booking");

  // Quelles étapes du stepper sont actives / complétées selon la vue.
  const STEP_MAP = {
    select: { current: [0, 1], done: [] },
    checkout: { current: [2, 3], done: [0, 1] },
    confirm: { current: [4], done: [0, 1, 2, 3] },
  };
  function setStepper(view) {
    const m = STEP_MAP[view] || STEP_MAP.select;
    steps.forEach((li, i) => {
      li.classList.toggle("is-current", m.current.includes(i));
      li.classList.toggle("is-done", m.done.includes(i));
    });
  }
  function showView(view) {
    views.forEach((v) => v.classList.toggle("is-active", v.dataset.view === view));
    setStepper(view);
    if (bookingSection) bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Instantané de la sélection courante (session + catégorie + quantité).
  function getSelection() {
    const name = nameEl ? nameEl.textContent.trim() : "";
    const parts = (metaEl ? metaEl.textContent : "").split("·").map((s) => s.trim());
    const checked = document.querySelector('input[name="categorie"]:checked');
    const unit = checked ? parseInt(checked.value, 10) : 0;
    return {
      name,
      date: parts[0] || "",
      site: parts[1] || "",
      time: parts[2] || "",
      letter: checked ? checked.dataset.cat : "—",
      unit,
      qty: quantity,
      total: unit * quantity,
    };
  }
  const setText = (sel, txt) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = txt;
  };

  // Récap de la vue paiement.
  function fillCheckoutRecap() {
    const s = getSelection();
    setText("[data-recap-name]", s.name);
    setText("[data-recap-meta]", `${s.date} · ${s.site} · ${s.time}`);
    setText("[data-recap-cat]", `Catégorie ${s.letter} × ${s.qty}`);
    setText("[data-recap-sub]", `${s.total} €`);
    setText("[data-recap-total]", `${s.total} €`);
    setText("[data-pay-total]", `${s.total} €`);
  }

  // Récap + e-billet de la confirmation.
  function fillConfirm() {
    const s = getSelection();
    const order = "#MC26-" + Math.floor(10000 + Math.random() * 89999);
    const places = `${s.qty} ${s.qty > 1 ? "places" : "place"}`;
    setText("[data-cf-order]", order);
    setText("[data-cf-name]", s.name);
    setText("[data-cf-date]", `${s.date} 2026 · ${s.time}`);
    setText("[data-cf-site]", s.site);
    setText("[data-cf-cat]", `${s.letter} × ${s.qty}`);
    setText("[data-cf-total]", `${s.total} €`);
    setText("[data-cf-et-name]", s.name);
    setText("[data-cf-et-meta]", `${s.date} 2026 · ${s.time} · ${s.site}`);
    setText("[data-cf-et-foot]", `Catégorie ${s.letter} · ${places} · Tribune couverte`);
  }

  // Sélection → paiement
  document.querySelector("[data-go-checkout]")?.addEventListener("click", () => {
    fillCheckoutRecap();
    showView("checkout");
  });
  // Retour à la sélection
  document.querySelector("[data-back-select]")?.addEventListener("click", () => showView("select"));

  // --- Validation du formulaire de paiement ---
  const validators = {
    "ck-prenom": (v) => v.trim().length > 0,
    "ck-nom": (v) => v.trim().length > 0,
    "ck-email": (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    "ck-card": (v) => /^[0-9\s]+$/.test(v) && v.replace(/\s/g, "").length >= 13,
    "ck-exp": (v) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v.trim()),
    "ck-cvc": (v) => /^[0-9]{3,4}$/.test(v.trim()),
    "ck-name": (v) => v.trim().length > 0,
  };
  function validateField(id) {
    const input = document.getElementById(id);
    if (!input) return true;
    const ok = validators[id](input.value);
    input.closest(".field").classList.toggle("has-error", !ok);
    return ok;
  }
  Object.keys(validators).forEach((id) => {
    const input = document.getElementById(id);
    input?.addEventListener("input", () => {
      if (validators[id](input.value)) input.closest(".field").classList.remove("has-error");
    });
  });

  // Payer → valider → confirmation
  document.querySelector("[data-go-confirm]")?.addEventListener("click", () => {
    let firstBad = null;
    Object.keys(validators).forEach((id) => {
      if (!validateField(id) && !firstBad) firstBad = document.getElementById(id);
    });
    if (firstBad) {
      firstBad.focus();
      firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    fillConfirm();
    showView("confirm");
  });

  // Bouton « Télécharger mes billets » (retour visuel, démo statique)
  const dl = document.querySelector("[data-download]");
  dl?.addEventListener("click", () => {
    const initial = dl.textContent;
    dl.textContent = "Billets téléchargés ✓";
    dl.disabled = true;
    window.setTimeout(() => {
      dl.textContent = initial;
      dl.disabled = false;
    }, 2200);
  });

  // État initial du stepper (vue sélection couvre les étapes 1 & 2).
  setStepper("select");
})();
