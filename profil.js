// Athlete profile — populates the page from ?athlete=<key>.
// Full data is provided for a few athletes; others fall back to Shiffrin.
(() => {
  // Lightweight display info for any athlete that can appear in "À découvrir".
  const POOL = {
    shiffrin: { name: "Mikaela Shiffrin", disc: "Ski alpin", flag: "🇺🇸", country: "États-Unis", photo: "assets/athletes/shiffrin.jpg" },
    odermatt: { name: "Marco Odermatt", disc: "Ski alpin", flag: "🇨🇭", country: "Suisse", photo: "assets/athletes/odermatt.jpg" },
    brignone: { name: "Federica Brignone", disc: "Ski alpin", flag: "🇮🇹", country: "Italie", photo: "assets/athletes/brignone.jpg" },
    jeanmonnot: { name: "Lou Jeanmonnot", disc: "Biathlon", flag: "🇫🇷", country: "France", photo: "assets/athletes/jeanmonnot.jpg" },
    laegreid: { name: "Sturla H. Lægreid", disc: "Biathlon", flag: "🇳🇴", country: "Norvège", photo: "assets/athletes/laegreid.jpg" },
    klaebo: { name: "Johannes H. Klæbo", disc: "Ski de fond", flag: "🇳🇴", country: "Norvège", photo: "assets/athletes/klaebo.jpg" },
    gu: { name: "Eileen Gu", disc: "Ski acrobatique", flag: "🇨🇳", country: "Chine", photo: "assets/athletes/gu.jpg" },
    kobayashi: { name: "Ryōyū Kobayashi", disc: "Saut à ski", flag: "🇯🇵", country: "Japon", photo: "assets/athletes/kobayashi.jpg" },
  };

  // Full profiles (only a handful are detailed, as requested).
  const ATH = {
    shiffrin: {
      tagline: "La skieuse la plus titrée de l'histoire du ski alpin.",
      stats: [
        ["2", "Médailles d'or olympiques"],
        ["5", "Gros globes de cristal"],
        ["100+", "Victoires en Coupe du monde"],
        ["7", "Titres de championne du monde"],
      ],
      bio: "Née en 1995 dans le Colorado, Mikaela Shiffrin a réécrit l'histoire du ski alpin. Sacrée championne olympique du slalom à seulement 18 ans en 2014, puis du géant en 2018, elle est devenue la skieuse la plus victorieuse de tous les temps en Coupe du monde, dépassant le mythique record d'Ingemar Stenmark. Polyvalente et d'une régularité hors norme, elle domine le slalom comme le géant depuis plus d'une décennie.",
      prog: [
        ["16 fév · 10:00", "Slalom géant", "Cortina d'Ampezzo"],
        ["19 fév · 10:00", "Slalom", "Cortina d'Ampezzo"],
        ["22 fév · 11:00", "Combiné par équipes", "Cortina d'Ampezzo"],
      ],
      related: ["odermatt", "brignone", "jeanmonnot"],
    },
    odermatt: {
      tagline: "Le maître du géant et de la vitesse, champion olympique en titre.",
      stats: [
        ["1", "Médaille d'or olympique"],
        ["4", "Gros globes de cristal"],
        ["40+", "Victoires en Coupe du monde"],
        ["3", "Titres de champion du monde"],
      ],
      bio: "Né en 1997 à Stans, Marco Odermatt s'est imposé comme le skieur le plus complet de sa génération. Champion olympique du slalom géant en 2022, multiple lauréat du gros globe de cristal, il brille autant en géant qu'en super-G et en descente. Sa technique limpide et son sang-froid en font l'un des grands favoris des épreuves de vitesse comme de technique.",
      prog: [
        ["13 fév · 11:00", "Descente messieurs", "Bormio"],
        ["16 fév · 10:00", "Slalom géant", "Cortina d'Ampezzo"],
        ["20 fév · 11:30", "Super-G", "Bormio"],
      ],
      related: ["shiffrin", "brignone", "kobayashi"],
    },
    jeanmonnot: {
      tagline: "Tenante du gros globe de cristal et quadruple championne du monde.",
      stats: [
        ["1", "Gros globe de cristal"],
        ["4", "Titres de championne du monde"],
        ["15+", "Podiums en Coupe du monde"],
        ["2", "Petits globes de spécialité"],
      ],
      bio: "Née en 1998 dans le Doubs, Lou Jeanmonnot s'est hissée au sommet du biathlon mondial. Tenante du gros globe de cristal et quadruple championne du monde, elle conjugue une vitesse de ski remarquable à un tir d'une grande régularité. Leader de l'équipe de France, elle figure parmi les principales prétendantes à l'or olympique sur toutes les distances.",
      prog: [
        ["11 fév · 15:00", "Sprint 7,5 km", "Anterselva"],
        ["13 fév · 14:45", "Poursuite 10 km", "Anterselva"],
        ["16 fév · 17:00", "Relais mixte", "Anterselva"],
      ],
      related: ["laegreid", "klaebo", "shiffrin"],
    },
    brignone: {
      tagline: "La skieuse italienne la plus titrée de l'histoire, à domicile.",
      stats: [
        ["2", "Gros globes de cristal"],
        ["3", "Médailles olympiques"],
        ["2", "Titres de championne du monde"],
        ["30+", "Victoires en Coupe du monde"],
      ],
      bio: "Née en 1990 à Milan et originaire du Val d'Aoste, Federica Brignone est la skieuse italienne la plus titrée de l'histoire. Double lauréate du gros globe de cristal, triple médaillée olympique et championne du monde, elle excelle en slalom géant comme en super-G grâce à un style d'une rare audace et à une lecture de la piste hors pair. Devenue une référence de la vitesse sur le tard, elle a repoussé les limites de la longévité au plus haut niveau. Aux Jeux de Milano Cortina, elle portera les espoirs de tout un pays sur les pentes de Cortina d'Ampezzo.",
      prog: [
        ["16 fév · 10:00", "Slalom géant", "Cortina d'Ampezzo"],
        ["18 fév · 11:00", "Super-G", "Cortina d'Ampezzo"],
        ["22 fév · 11:00", "Combiné par équipes", "Cortina d'Ampezzo"],
      ],
      related: ["shiffrin", "odermatt", "jeanmonnot"],
    },
  };

  const params = new URLSearchParams(location.search);
  let key = (params.get("athlete") || "shiffrin").toLowerCase();
  if (!ATH[key]) key = "shiffrin";

  const a = ATH[key];
  const base = POOL[key];
  const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  document.title = `${base.name} - Milano Cortina 2026`;

  set("prof-photo", (el) => {
    el.style.backgroundImage = `url('${base.photo}')`;
    el.setAttribute("aria-label", base.name);
  });
  set("prof-crumb", (el) => (el.textContent = base.name));
  set("prof-kicker", (el) => (el.textContent = base.disc));
  set("prof-name", (el) => (el.textContent = base.name));
  set("prof-tagline", (el) => {
    el.innerHTML = `<span class="flag">${base.flag}</span> ${esc(base.country)} · ${esc(a.tagline)}`;
  });
  set("prof-bio", (el) => (el.textContent = a.bio));
  set("prof-cta-title", (el) => (el.textContent = `Suivez ${base.name} en direct`));

  set("prof-palmares", (el) => {
    el.innerHTML = a.stats
      .map(([num, label]) => `<div class="med-stat"><p class="med-stat-num">${esc(num)}</p><p class="med-stat-label">${esc(label)}</p></div>`)
      .join("");
  });

  set("prof-prog", (el) => {
    el.innerHTML = a.prog
      .map(([date, title, venue]) => `<article class="prof-prog-card"><p class="prof-prog-date">${esc(date)}</p><h3>${esc(title)}</h3><p class="prof-prog-venue">${esc(venue)}</p></article>`)
      .join("");
  });

  set("prof-disc-grid", (el) => {
    el.innerHTML = a.related
      .map((k) => POOL[k])
      .filter(Boolean)
      .map((r) => {
        const href = ATH[keyOf(r)] ? `profil.html?athlete=${keyOf(r)}` : "profil.html";
        return `<a class="prof-disc-card" href="${href}" style="background-image: url('${r.photo}')"><span class="prof-disc-badge"><span class="flag">${r.flag}</span> ${esc(r.country)}</span><div class="prof-disc-body"><h3>${esc(r.name)}</h3><p>${esc(r.disc)}</p></div></a>`;
      })
      .join("");
  });

  function keyOf(poolEntry) {
    return Object.keys(POOL).find((k) => POOL[k] === poolEntry);
  }
})();
