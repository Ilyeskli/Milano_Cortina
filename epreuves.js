// Épreuves page — univers filter (Glace / Neige).
// Same behaviour as the athletes grid: matching disciplines are lifted to the
// top and highlighted, the others stay below — dimmed and separated by a label.
(() => {
  const grid = document.querySelector(".epr-grid");
  const pills = Array.from(document.querySelectorAll(".epr-filters .filter-pill"));
  const original = Array.from(document.querySelectorAll(".epr-grid .epr-card"));
  if (!grid) return;

  const envOf = (c) => (c.dataset.env || "").trim().toLowerCase();

  // Full-width separator between the promoted group and the rest.
  const sep = document.createElement("div");
  sep.className = "epr-sep";
  sep.textContent = "Autres disciplines";
  sep.hidden = true;
  grid.appendChild(sep);

  let filter = null;

  function apply() {
    original.forEach((c) => c.classList.remove("is-match", "is-dim"));

    // No filter → original order, no highlight.
    if (!filter) {
      original.forEach((c) => grid.appendChild(c));
      grid.appendChild(sep);
      sep.hidden = true;
      return;
    }

    const matched = original.filter((c) => envOf(c) === filter);
    const rest = original.filter((c) => envOf(c) !== filter);

    matched.forEach((c) => {
      c.classList.add("is-match");
      grid.appendChild(c);
    });
    grid.appendChild(sep);
    sep.hidden = rest.length === 0;
    rest.forEach((c) => {
      c.classList.add("is-dim");
      grid.appendChild(c);
    });
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      const label = pill.textContent.trim().toLowerCase();
      filter = label === "toutes" ? null : label;
      apply();
    });
  });
})();
