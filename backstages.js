// Backstages page — reportages video filter (hide/show by category).
(() => {
  const grid = document.querySelector(".bks-vid-grid");
  const pills = Array.from(document.querySelectorAll(".bks-filters .filter-pill"));
  const cards = Array.from(document.querySelectorAll(".bks-vid-grid .nws-vid"));
  const empty = document.getElementById("bks-empty");
  if (!grid) return;

  const norm = (s) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  function apply(filter) {
    let visible = 0;
    cards.forEach((c) => {
      const match = !filter || norm(c.dataset.cat || "") === filter;
      c.style.display = match ? "" : "none";
      if (match) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      const label = norm(pill.textContent.trim());
      apply(label === "tous" ? null : label);
    });
  });
})();
