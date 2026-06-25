// Page Replays — filtrage de la grille par discipline (pattern hide/show).
(function () {
  const grid = document.querySelector(".bks-replays-grid");
  const chips = Array.prototype.slice.call(document.querySelectorAll(".bks-filters .bks-chip"));
  const empty = document.querySelector(".bks-grid-empty");
  if (!grid || !chips.length) return;
  const cards = Array.prototype.slice.call(grid.querySelectorAll(".bks-card"));

  // Normalise accents/casse pour comparer les disciplines de façon robuste.
  function norm(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  function apply(filter) {
    const f = norm(filter);
    let visible = 0;
    cards.forEach(function (card) {
      const match = f === "tout" || norm(card.dataset.disc) === f;
      card.hidden = !match;
      if (match) visible++;
    });
    if (empty) empty.hidden = visible > 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.remove("is-active");
        c.setAttribute("aria-selected", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-selected", "true");
      apply(chip.dataset.filter);
    });
  });
})();
