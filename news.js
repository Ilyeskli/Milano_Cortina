(() => {
  const filterPills = Array.from(document.querySelectorAll(".filter-pill"));
  const newsCards = Array.from(document.querySelectorAll(".news-card"));

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const filter = pill.dataset.filter;
      filterPills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      newsCards.forEach((card) => {
        const category = card.dataset.category;
        card.style.display = (filter === "all" || category === filter) ? "" : "none";
      });
    });
  });
})();
