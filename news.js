// News page — category filter (matches pill text to card badge)
(() => {
  const pills = Array.from(document.querySelectorAll(".nws-filters-wrap .filter-pill"));
  const cards = Array.from(document.querySelectorAll(".nws-grid .nws-card"));

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      const filter = pill.textContent.trim().toLowerCase();
      cards.forEach((card) => {
        const badge = card.querySelector(".nws-badge");
        const cat = (badge ? badge.textContent : "").trim().toLowerCase();
        card.style.display = filter === "tous" || cat === filter ? "" : "none";
      });
    });
  });
})();
