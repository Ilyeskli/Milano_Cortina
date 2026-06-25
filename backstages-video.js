// Lecteur Backstages — panneau « Stats en direct »
// Ouvre/ferme la sidebar de statistiques à droite de la vidéo.
(function () {
  var player = document.querySelector(".bks-player");
  var btn = document.querySelector(".bks-statbtn");
  if (!player || !btn) return;
  var closeBtn = player.querySelector(".bks-stats-close");

  function open() {
    player.classList.add("is-stats");
    btn.classList.add("is-active");
    btn.setAttribute("aria-expanded", "true");
  }
  function close() {
    player.classList.remove("is-stats");
    btn.classList.remove("is-active");
    btn.setAttribute("aria-expanded", "false");
  }
  function toggle() {
    player.classList.contains("is-stats") ? close() : open();
  }

  btn.addEventListener("click", toggle);
  if (closeBtn) closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
