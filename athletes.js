// Athlètes page — discipline filter.
// Same behaviour as the billetterie filters: matching athletes are lifted to the
// top and highlighted, the others stay below — dimmed and separated by a label.
(() => {
  const grid = document.querySelector(".ath-grid");
  const pills = Array.from(document.querySelectorAll(".ath-filters .filter-pill"));
  const original = Array.from(document.querySelectorAll(".ath-grid .ath-card"));
  if (!grid) return;

  const discOf = (c) =>
    (c.querySelector(".ath-card-body p")?.textContent || "").trim().toLowerCase();

  // Full-width separator between the promoted group and the rest.
  const sep = document.createElement("div");
  sep.className = "ath-sep";
  sep.textContent = "Autres athlètes";
  sep.hidden = true;
  grid.appendChild(sep);

  // Full-width empty notice when a discipline has no athlete here.
  const empty = document.createElement("p");
  empty.className = "ath-empty";
  empty.textContent = "Aucun athlète dans cette discipline pour le moment.";
  empty.hidden = true;
  grid.appendChild(empty);

  let filter = null;

  function apply() {
    original.forEach((c) => c.classList.remove("is-match", "is-dim"));

    // No filter → original order, no highlight.
    if (!filter) {
      original.forEach((c) => grid.appendChild(c));
      grid.appendChild(sep);
      grid.appendChild(empty);
      sep.hidden = true;
      empty.hidden = true;
      return;
    }

    const matched = original.filter((c) => discOf(c) === filter);
    const rest = original.filter((c) => discOf(c) !== filter);

    // No match → keep everyone in place, show the notice.
    if (matched.length === 0) {
      original.forEach((c) => grid.appendChild(c));
      grid.appendChild(sep);
      grid.appendChild(empty);
      sep.hidden = true;
      empty.hidden = false;
      return;
    }

    // Promote matching athletes, dim & separate the rest.
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
    grid.appendChild(empty);
    empty.hidden = true;
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      const label = pill.textContent.trim().toLowerCase();
      filter = label === "tous" ? null : label;
      apply();
    });
  });
})();
