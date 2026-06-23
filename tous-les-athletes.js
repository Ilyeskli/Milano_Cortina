// Tous les athlètes — discipline filter + text search + "load more".
(() => {
  const pills = Array.from(document.querySelectorAll(".ath-filters .filter-pill"));
  const cards = Array.from(document.querySelectorAll("#annu-grid .ath-card"));
  const search = document.getElementById("annu-search");
  const empty = document.getElementById("annu-empty");
  const moreWrap = document.querySelector(".ath-more");
  const moreBtn = moreWrap?.querySelector("button");

  const LIMIT = 12; // how many athletes to show before "Charger plus"
  let activeDisc = "tous";
  let expanded = false;

  // Fold case, accents and ligatures so "klaebo" matches "Klæbo", "laegreid"
  // matches "Lægreid", "norvege" matches "Norvège", etc.
  const norm = (s) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/æ/g, "ae")
      .replace(/œ/g, "oe")
      .replace(/ø/g, "o")
      .replace(/ß/g, "ss")
      .trim();

  const discOf = (c) => norm(c.querySelector(".ath-card-body p")?.textContent);
  const nameOf = (c) => norm(c.querySelector("h3")?.textContent);
  const countryOf = (c) => norm(c.querySelector(".ath-badge")?.textContent);

  function apply() {
    const q = norm(search?.value);
    const filtering = activeDisc !== "tous" || q !== "";

    const matches = cards.filter(
      (c) =>
        (activeDisc === "tous" || discOf(c) === activeDisc) &&
        (!q || nameOf(c).includes(q) || countryOf(c).includes(q)),
    );

    // When searching/filtering, show every match. Otherwise cap to LIMIT until expanded.
    const showAll = filtering || expanded;
    let shown = 0;
    cards.forEach((card) => {
      const isMatch = matches.includes(card);
      const visible = isMatch && (showAll || shown < LIMIT);
      if (visible) shown += 1;
      card.style.display = visible ? "" : "none";
    });

    if (empty) empty.hidden = matches.length !== 0;

    // "Charger plus" only makes sense in the default, non-expanded view.
    if (moreWrap) {
      moreWrap.hidden = !(!filtering && !expanded && matches.length > LIMIT);
    }
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      const label = pill.textContent.trim().toLowerCase();
      activeDisc = label === "tous" ? "tous" : norm(pill.textContent);
      apply();
    });
  });

  search?.addEventListener("input", apply);

  moreBtn?.addEventListener("click", () => {
    expanded = true;
    apply();
  });

  apply();
})();
