// Classement complet — search filter + tab toggle
(() => {
  // tab toggle (visual)
  const tabs = Array.from(document.querySelectorAll(".med-tabs .filter-pill"));
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
    });
  });

  // search by nation name
  const input = document.getElementById("clst-input");
  const rows = Array.from(document.querySelectorAll("#clst-table tbody tr"));
  const empty = document.getElementById("clst-empty");

  if (input) {
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      let visible = 0;
      rows.forEach((row) => {
        const pays = (row.querySelector(".col-pays")?.textContent || "").toLowerCase();
        const match = pays.includes(q);
        row.style.display = match ? "" : "none";
        if (match) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  }
})();
