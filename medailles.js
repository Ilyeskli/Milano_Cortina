// Médailles page — filter tab toggle (single-select)
(() => {
  const tabs = Array.from(document.querySelectorAll(".med-tabs .filter-pill"));
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
    });
  });
})();
