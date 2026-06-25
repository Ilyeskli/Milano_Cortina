// Page À venir — calendrier « Le programme des Jeux ».
// Sélecteur de jours + grille horaire ; clic sur un jour → planning de ce jour.
(function () {
  var days = Array.prototype.slice.call(document.querySelectorAll(".bks-days .bks-day"));
  var sched = document.getElementById("bks-sched");
  if (!days.length || !sched) return;

  // Programme par jour (clé = numéro du jour de février). live:true = épreuve en direct.
  var DATA = {
    "6": [
      { t: "12:00", title: "Ski de fond — Skiathlon dames", venue: "Val di Fiemme" },
      { t: "14:00", title: "Biathlon — Sprint messieurs", venue: "Anterselva" },
      { t: "18:00", title: "Cérémonie d'ouverture", venue: "San Siro, Milano", live: true },
      { t: "20:30", title: "Luge — Simple messieurs, manche 1", venue: "Cortina" }
    ],
    "7": [
      { t: "10:00", title: "Ski alpin — Descente messieurs", venue: "Bormio · Stelvio", live: true },
      { t: "11:30", title: "Biathlon — Poursuite dames", venue: "Anterselva" },
      { t: "13:00", title: "Saut à ski — Tremplin normal", venue: "Predazzo" },
      { t: "15:00", title: "Patinage de vitesse — 5000 m messieurs", venue: "Milano" },
      { t: "19:00", title: "Hockey — Tour préliminaire", venue: "Milano Santagiulia" }
    ],
    "8": [
      { t: "09:00", title: "Ski-alpinisme — Sprint messieurs", venue: "Bormio · Stelvio", live: true },
      { t: "10:00", title: "Slalom géant messieurs", venue: "Cortina · Tofane" },
      { t: "11:30", title: "Biathlon — Relais mixte", venue: "Anterselva" },
      { t: "13:00", title: "Patinage artistique — Programme libre", venue: "Milano Ice Skating Arena" },
      { t: "14:30", title: "Hockey sur glace — Quart de finale", venue: "Milano Santagiulia" },
      { t: "16:00", title: "Saut à ski — Grand tremplin HS140", venue: "Predazzo" },
      { t: "18:00", title: "Short-track — Finales 1000 m", venue: "Milano Ice Skating Arena" },
      { t: "20:00", title: "Curling — Demi-finale", venue: "Cortina Curling Stadium" }
    ],
    "9": [
      { t: "10:00", title: "Ski alpin — Super-G dames", venue: "Cortina · Tofane", live: true },
      { t: "12:00", title: "Ski de fond — Sprint classique", venue: "Val di Fiemme" },
      { t: "14:00", title: "Snowboard — Slopestyle messieurs", venue: "Livigno" },
      { t: "18:30", title: "Patinage artistique — Danse rythmique", venue: "Milano" },
      { t: "20:00", title: "Hockey — Tour préliminaire dames", venue: "Milano" }
    ],
    "10": [
      { t: "09:30", title: "Biathlon — Individuel messieurs", venue: "Anterselva", live: true },
      { t: "11:00", title: "Luge — Double", venue: "Cortina" },
      { t: "13:30", title: "Ski alpin — Combiné dames", venue: "Bormio" },
      { t: "16:00", title: "Bobsleigh — Monobob dames", venue: "Cortina" },
      { t: "19:00", title: "Short-track — Relais mixte", venue: "Milano" }
    ],
    "11": [
      { t: "10:00", title: "Snowboard — Half-pipe dames", venue: "Livigno", live: true },
      { t: "12:30", title: "Ski de fond — 10 km dames", venue: "Val di Fiemme" },
      { t: "14:00", title: "Saut à ski — Par équipes mixte", venue: "Predazzo" },
      { t: "17:00", title: "Patinage de vitesse — 1500 m messieurs", venue: "Milano" },
      { t: "20:00", title: "Curling — Tour préliminaire", venue: "Cortina" }
    ],
    "12": [
      { t: "10:00", title: "Ski alpin — Slalom dames", venue: "Cortina · Tofane", live: true },
      { t: "11:30", title: "Biathlon — Mass start messieurs", venue: "Anterselva" },
      { t: "14:00", title: "Bobsleigh — Bob à 2 messieurs", venue: "Cortina" },
      { t: "18:00", title: "Patinage artistique — Libre dames", venue: "Milano" },
      { t: "20:30", title: "Hockey — Quart de finale messieurs", venue: "Milano" }
    ],
    "13": [
      { t: "09:30", title: "Ski-alpinisme — Relais mixte", venue: "Bormio", live: true },
      { t: "12:00", title: "Ski de fond — Relais messieurs", venue: "Val di Fiemme" },
      { t: "15:00", title: "Snowboard — Big air dames", venue: "Livigno" },
      { t: "18:30", title: "Short-track — Finales 500 m", venue: "Milano" },
      { t: "20:00", title: "Curling — Demi-finale messieurs", venue: "Cortina" }
    ],
    "14": [
      { t: "10:00", title: "Ski alpin — Slalom messieurs", venue: "Cortina · Tofane", live: true },
      { t: "12:30", title: "Saut à ski — Grand tremplin dames", venue: "Predazzo" },
      { t: "14:00", title: "Bobsleigh — Bob à 4", venue: "Cortina" },
      { t: "17:00", title: "Patinage de vitesse — Mass start", venue: "Milano" },
      { t: "20:00", title: "Hockey — Demi-finale dames", venue: "Milano" }
    ]
  };

  function rowHTML(it) {
    var status = it.live
      ? '<span class="bks-sched-live"><span></span>En direct</span>'
      : '<span class="bks-sched-soon">À venir</span>';
    var btn = it.live
      ? '<a class="bks-sched-btn is-live" href="backstages-video.html">Regarder</a>'
      : '<button class="bks-sched-btn" type="button">Me rappeler</button>';
    return (
      '<div class="bks-sched-row">' +
      '<div class="bks-sched-time">' + it.t + "</div>" +
      '<div class="bks-sched-event"><p class="bks-sched-title">' + it.title + "</p>" +
      '<p class="bks-sched-venue">' + it.venue + "</p></div>" +
      status + btn + "</div>"
    );
  }

  function render(day) {
    var items = DATA[day] || [];
    sched.innerHTML = items.length
      ? items.map(rowHTML).join("")
      : '<p class="bks-sched-empty">Programme à venir pour cette journée.</p>';
  }

  days.forEach(function (d) {
    d.addEventListener("click", function () {
      days.forEach(function (x) {
        x.classList.remove("is-active");
        x.setAttribute("aria-selected", "false");
      });
      d.classList.add("is-active");
      d.setAttribute("aria-selected", "true");
      render(d.dataset.day);
    });
  });

  // « Me rappeler » → bascule un état activé (démonstration, pas de persistance).
  sched.addEventListener("click", function (e) {
    var b = e.target.closest(".bks-sched-btn:not(.is-live)");
    if (!b) return;
    var on = b.classList.toggle("is-on");
    b.textContent = on ? "✓ Rappel activé" : "Me rappeler";
  });

  var active = document.querySelector(".bks-days .bks-day.is-active") || days[0];
  render(active.dataset.day);
})();
