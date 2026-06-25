// Page Compte — modal « Paramètres du compte » (ouvert par « Modifier le profil »).
(function () {
  var openBtn = document.getElementById("open-settings");
  var modal = document.getElementById("settings-modal");
  if (!openBtn || !modal) return;

  function open() {
    modal.hidden = false;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var first = modal.querySelector("input, select");
    if (first) first.focus();
  }
  function close() {
    modal.classList.remove("is-open");
    modal.hidden = true;
    document.body.style.overflow = "";
    openBtn.focus();
  }

  openBtn.addEventListener("click", open);
  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) close();
  });

  // « Enregistrer » : applique le nom saisi au profil affiché puis ferme (démo).
  var save = document.getElementById("save-settings");
  if (save) {
    save.addEventListener("click", function () {
      var nameInput = modal.querySelector('input[type="text"]');
      var h1 = document.querySelector(".bks-profile-info h1");
      if (nameInput && h1 && nameInput.value.trim()) {
        h1.textContent = nameInput.value.trim();
        var initials = nameInput.value.trim().split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
        var avatar = document.querySelector(".bks-profile-avatar");
        if (avatar && initials) avatar.textContent = initials;
      }
      close();
    });
  }
})();
