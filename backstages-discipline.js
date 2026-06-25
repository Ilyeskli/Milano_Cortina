// Page discipline dynamique : backstages-discipline.html?disc=<slug>.
// Remplit le hero, les stats et les 4 rails depuis un jeu de données.
// Slug absent/inconnu → ski-alpin (le HTML statique sert aussi de fallback).
(function () {
  // --- Données par discipline -------------------------------------------
  var POOL = {
    "ski-alpin": {
      name: "Ski alpin", of: "du ski alpin", img: "assets/figma-raw/sport-06.png",
      desc: "Descente, slalom, géant, super-G, combiné par équipes : la discipline reine des Jeux, en direct de Bormio et Cortina d'Ampezzo.",
      stats: [["5", "épreuves olympiques"], ["2", "sites (Bormio · Cortina)"], ["16", "séances en direct"], ["120+", "heures de replay"]],
      epreuves: [
        { t: "Descente messieurs", img: "assets/sites/valtellina.jpg", badge: "En direct", meta: ["Bormio", "En cours"] },
        { t: "Slalom géant dames", img: "assets/sites/cortina.jpg", badge: "À venir", meta: ["Cortina", "14:00"] },
        { t: "Slalom messieurs", img: "assets/figma-raw/sport-06.png", badge: "À venir", meta: ["Bormio", "Demain · 10:30"] },
        { t: "Super-G dames", img: "assets/news-img/trecime.jpg", meta: ["Cortina", "Replay dispo"] }
      ],
      stars: [
        { n: "Mikaela Shiffrin", sub: "Ski alpin · 🇺🇸", img: "shiffrin", key: "shiffrin" },
        { n: "Marco Odermatt", sub: "Ski alpin · 🇨🇭", img: "odermatt", key: "odermatt" },
        { n: "Federica Brignone", sub: "Ski alpin · 🇮🇹", img: "brignone" },
        { n: "Lara James", sub: "Ski alpin · 🇬🇧", img: "james" }
      ],
      replays: [
        { t: "Descente messieurs", img: "assets/sites/valtellina.jpg", meta: ["Bormio", "1:42:00"] },
        { t: "Slalom géant dames", img: "assets/sites/cortina.jpg", meta: ["Cortina", "1:06:40"] },
        { t: "Super-G messieurs", img: "assets/figma-raw/sport-06.png", meta: ["Bormio", "1:08:25"] },
        { t: "Combiné par équipes", img: "assets/news-img/trecime.jpg", meta: ["Cortina", "1:21:10"] }
      ],
      moments: [
        { t: "L'or de Brignone à domicile", img: "assets/sites/cortina.jpg", badge: "Or", meta: ["02:48"] },
        { t: "La descente de tous les records", img: "assets/sites/valtellina.jpg", meta: ["03:05"] },
        { t: "Le doublé suisse en géant", img: "assets/figma-raw/sport-06.png", meta: ["02:22"] }
      ]
    },
    "patinage-artistique": {
      name: "Patinage artistique", of: "du patinage artistique", img: "assets/sports/patinage-artistique.jpg",
      desc: "Grâce, technique et émotion sur la glace du Forum de Milan : individuel, couples, danse et épreuve par équipes.",
      stats: [["5", "épreuves olympiques"], ["1", "site (Milano)"], ["10", "séances en direct"], ["70+", "heures de replay"]],
      epreuves: [
        { t: "Programme libre messieurs", img: "assets/sports/patinage-artistique.jpg", badge: "En direct", meta: ["Milano", "En cours"] },
        { t: "Programme court dames", img: "assets/sites/milano.jpg", badge: "À venir", meta: ["Milano", "Demain · 19:00"] },
        { t: "Danse sur glace · libre", img: "assets/sports/patinage-artistique.jpg", badge: "À venir", meta: ["Milano", "Jeudi · 18:30"] },
        { t: "Épreuve par équipes", img: "assets/sites/milano.jpg", meta: ["Milano", "Replay dispo"] }
      ],
      stars: [
        { n: "Ilia Malinin", sub: "Patinage · 🇺🇸", img: "malinin" },
        { n: "Kaori Sakamoto", sub: "Patinage · 🇯🇵", img: "sakamoto" }
      ],
      replays: [
        { t: "Programme libre dames", img: "assets/sports/patinage-artistique.jpg", meta: ["Milano", "1:58:20"] },
        { t: "Couples · programme libre", img: "assets/sites/milano.jpg", meta: ["Milano", "1:32:00"] },
        { t: "Danse sur glace", img: "assets/sports/patinage-artistique.jpg", meta: ["Milano", "1:44:10"] },
        { t: "Épreuve par équipes", img: "assets/sites/milano.jpg", meta: ["Milano", "2:05:30"] }
      ],
      moments: [
        { t: "Le quadruple axe historique", img: "assets/sports/patinage-artistique.jpg", badge: "Or", meta: ["01:48"] },
        { t: "La standing ovation du Forum", img: "assets/sites/milano.jpg", meta: ["02:30"] },
        { t: "Le sacre en couples", img: "assets/sports/patinage-artistique.jpg", meta: ["02:12"] }
      ]
    },
    "biathlon": {
      name: "Biathlon", of: "du biathlon", img: "assets/news-img/biathlon.jpg",
      desc: "Ski de fond et tir de précision se mêlent à Anterselva : chaque faute au pas de tir peut tout changer.",
      stats: [["11", "épreuves olympiques"], ["1", "site (Anterselva)"], ["14", "séances en direct"], ["95+", "heures de replay"]],
      epreuves: [
        { t: "Relais mixte 4×6 km", img: "assets/news-img/biathlon.jpg", badge: "En direct", meta: ["Anterselva", "En cours"] },
        { t: "Mass start messieurs", img: "assets/figma-raw/sport-05.png", badge: "À venir", meta: ["Anterselva", "15:15"] },
        { t: "Sprint dames", img: "assets/news-img/biathlon.jpg", badge: "À venir", meta: ["Anterselva", "Demain · 12:00"] },
        { t: "Individuel 20 km", img: "assets/figma-raw/sport-05.png", meta: ["Anterselva", "Replay dispo"] }
      ],
      stars: [
        { n: "Lou Jeanmonnot", sub: "Biathlon · 🇫🇷", img: "jeanmonnot", key: "jeanmonnot" },
        { n: "Sturla Holm Lægreid", sub: "Biathlon · 🇳🇴", img: "laegreid" }
      ],
      replays: [
        { t: "Poursuite messieurs", img: "assets/news-img/biathlon.jpg", meta: ["Anterselva", "1:08:30"] },
        { t: "Mass start dames", img: "assets/figma-raw/sport-05.png", meta: ["Anterselva", "55:40"] },
        { t: "Individuel 20 km", img: "assets/news-img/biathlon.jpg", meta: ["Anterselva", "1:31:10"] },
        { t: "Relais messieurs", img: "assets/figma-raw/sport-05.png", meta: ["Anterselva", "1:12:25"] }
      ],
      moments: [
        { t: "Le 20/20 au tir décisif", img: "assets/news-img/biathlon.jpg", badge: "Or", meta: ["02:05"] },
        { t: "Le relais norvégien intouchable", img: "assets/figma-raw/sport-05.png", meta: ["04:05"] },
        { t: "Le dernier tour de folie", img: "assets/news-img/biathlon.jpg", meta: ["02:40"] }
      ]
    },
    "bobsleigh": {
      name: "Bobsleigh", of: "du bobsleigh", img: "assets/figma-raw/sport-03.png",
      desc: "Vitesse pure et précision millimétrée sur la piste de glace de Cortina, jusqu'à 140 km/h dans les virages.",
      stats: [["4", "épreuves olympiques"], ["1", "site (Cortina)"], ["8", "séances en direct"], ["45+", "heures de replay"]],
      epreuves: [
        { t: "Bob à 4 messieurs · manche 3", img: "assets/figma-raw/sport-03.png", badge: "En direct", meta: ["Cortina", "En cours"] },
        { t: "Monobob dames", img: "assets/sites/cortina.jpg", badge: "À venir", meta: ["Cortina", "16:00"] },
        { t: "Bob à 2 messieurs", img: "assets/figma-raw/sport-03.png", badge: "À venir", meta: ["Cortina", "Demain · 11:00"] },
        { t: "Bob à 2 dames", img: "assets/sites/cortina.jpg", meta: ["Cortina", "Replay dispo"] }
      ],
      stars: [],
      replays: [
        { t: "Monobob dames · finale", img: "assets/figma-raw/sport-03.png", meta: ["Cortina", "1:04:00"] },
        { t: "Bob à 4 messieurs", img: "assets/sites/cortina.jpg", meta: ["Cortina", "1:18:20"] },
        { t: "Bob à 2 dames", img: "assets/figma-raw/sport-03.png", meta: ["Cortina", "58:45"] },
        { t: "Entraînement chronométré", img: "assets/sites/cortina.jpg", meta: ["Cortina", "42:10"] }
      ],
      moments: [
        { t: "Le record de la piste de Cortina", img: "assets/figma-raw/sport-03.png", badge: "Or", meta: ["01:35"] },
        { t: "Le virage à 140 km/h", img: "assets/sites/cortina.jpg", meta: ["00:58"] },
        { t: "La poussée parfaite au départ", img: "assets/figma-raw/sport-03.png", meta: ["01:12"] }
      ]
    },
    "curling": {
      name: "Curling", of: "du curling", img: "assets/sports/curling.jpg",
      desc: "Stratégie et sang-froid sur la glace de Cortina : le sport d'échecs sur glace, où chaque pierre compte.",
      stats: [["3", "épreuves olympiques"], ["1", "site (Cortina)"], ["12", "séances en direct"], ["80+", "heures de replay"]],
      epreuves: [
        { t: "Suède – Écosse", img: "assets/sports/curling.jpg", badge: "En direct", meta: ["Cortina", "6e end"] },
        { t: "Double mixte · demi-finale", img: "assets/sites/cortina.jpg", badge: "À venir", meta: ["Cortina", "17:00"] },
        { t: "Tournoi dames · Canada – Suisse", img: "assets/sports/curling.jpg", badge: "À venir", meta: ["Cortina", "Demain · 14:00"] },
        { t: "Tournoi messieurs · Italie – Norvège", img: "assets/sites/cortina.jpg", meta: ["Cortina", "Replay dispo"] }
      ],
      stars: [],
      replays: [
        { t: "Finale double mixte", img: "assets/sports/curling.jpg", meta: ["Cortina", "2:12:30"] },
        { t: "Demi-finale dames", img: "assets/sites/cortina.jpg", meta: ["Cortina", "2:31:00"] },
        { t: "Tour préliminaire messieurs", img: "assets/sports/curling.jpg", meta: ["Cortina", "2:48:15"] },
        { t: "La petite finale", img: "assets/sites/cortina.jpg", meta: ["Cortina", "2:20:40"] }
      ],
      moments: [
        { t: "La dernière pierre pour l'or", img: "assets/sports/curling.jpg", badge: "Or", meta: ["01:50"] },
        { t: "Le double take-out parfait", img: "assets/sites/cortina.jpg", meta: ["01:08"] },
        { t: "Le end à cinq points", img: "assets/sports/curling.jpg", meta: ["02:02"] }
      ]
    },
    "snowboard": {
      name: "Snowboard", of: "du snowboard", img: "assets/sports/snowboard.jpg",
      desc: "Big air, half-pipe, slopestyle et cross : la créativité et l'audace s'envolent sur les modules de Livigno.",
      stats: [["11", "épreuves olympiques"], ["1", "site (Livigno)"], ["13", "séances en direct"], ["90+", "heures de replay"]],
      epreuves: [
        { t: "Big air messieurs · finale", img: "assets/sports/snowboard.jpg", badge: "En direct", meta: ["Livigno", "En cours"] },
        { t: "Half-pipe dames", img: "assets/sports/snowboard.jpg", badge: "À venir", meta: ["Livigno", "13:30"] },
        { t: "Slopestyle messieurs", img: "assets/sports/snowboard.jpg", badge: "À venir", meta: ["Livigno", "Demain · 10:00"] },
        { t: "Snowboard cross dames", img: "assets/sports/snowboard.jpg", meta: ["Livigno", "Replay dispo"] }
      ],
      stars: [
        { n: "Chloe Kim", sub: "Snowboard · 🇺🇸", img: "kim" },
        { n: "Eileen Gu", sub: "Freestyle · 🇨🇳", img: "gu" }
      ],
      replays: [
        { t: "Half-pipe messieurs · finale", img: "assets/sports/snowboard.jpg", meta: ["Livigno", "1:15:40"] },
        { t: "Slopestyle dames", img: "assets/sports/snowboard.jpg", meta: ["Livigno", "1:02:10"] },
        { t: "Snowboard cross messieurs", img: "assets/sports/snowboard.jpg", meta: ["Livigno", "58:25"] },
        { t: "Big air dames", img: "assets/sports/snowboard.jpg", meta: ["Livigno", "1:08:00"] }
      ],
      moments: [
        { t: "Le run parfait en half-pipe", img: "assets/sports/snowboard.jpg", badge: "Or", meta: ["02:05"] },
        { t: "Le 1980 jamais vu en big air", img: "assets/sports/snowboard.jpg", meta: ["01:22"] },
        { t: "Le photo-finish du cross", img: "assets/sports/snowboard.jpg", meta: ["01:40"] }
      ]
    },
    "ski-de-fond": {
      name: "Ski de fond", of: "du ski de fond", img: "assets/sports/ski-fond.jpg",
      desc: "L'endurance à l'état pur sur les pistes de Val di Fiemme : sprints explosifs et longues distances héroïques.",
      stats: [["12", "épreuves olympiques"], ["1", "site (Val di Fiemme)"], ["15", "séances en direct"], ["100+", "heures de replay"]],
      epreuves: [
        { t: "Sprint classique · finale", img: "assets/sports/ski-fond.jpg", badge: "En direct", meta: ["Val di Fiemme", "Demi-finales"] },
        { t: "Skiathlon dames", img: "assets/sites/valdifiemme.jpg", badge: "À venir", meta: ["Val di Fiemme", "12:30"] },
        { t: "50 km messieurs", img: "assets/sports/ski-fond.jpg", badge: "À venir", meta: ["Val di Fiemme", "Demain · 09:30"] },
        { t: "Relais 4×7,5 km", img: "assets/sites/valdifiemme.jpg", meta: ["Val di Fiemme", "Replay dispo"] }
      ],
      stars: [
        { n: "Johannes Klæbo", sub: "Ski de fond · 🇳🇴", img: "klaebo" },
        { n: "Jessie Diggins", sub: "Ski de fond · 🇺🇸", img: "diggins" }
      ],
      replays: [
        { t: "10 km individuel dames", img: "assets/sports/ski-fond.jpg", meta: ["Val di Fiemme", "54:12"] },
        { t: "Skiathlon messieurs", img: "assets/sites/valdifiemme.jpg", meta: ["Val di Fiemme", "1:18:40"] },
        { t: "Sprint par équipes", img: "assets/sports/ski-fond.jpg", meta: ["Val di Fiemme", "48:30"] },
        { t: "30 km dames", img: "assets/sites/valdifiemme.jpg", meta: ["Val di Fiemme", "1:22:05"] }
      ],
      moments: [
        { t: "Le sprint au photo-finish", img: "assets/sports/ski-fond.jpg", badge: "Or", meta: ["02:48"] },
        { t: "La remontée folle sur le relais", img: "assets/sites/valdifiemme.jpg", meta: ["03:30"] },
        { t: "Le dernier kilomètre héroïque", img: "assets/sports/ski-fond.jpg", meta: ["02:15"] }
      ]
    },
    "luge": {
      name: "Luge", of: "de la luge", img: "assets/figma-raw/sport-08.png",
      desc: "Allongé à plus de 130 km/h, la tête en arrière : la luge sur la piste glacée de Cortina, sport de millimètres.",
      stats: [["4", "épreuves olympiques"], ["1", "site (Cortina)"], ["9", "séances en direct"], ["50+", "heures de replay"]],
      epreuves: [
        { t: "Simple messieurs · manche 2", img: "assets/figma-raw/sport-08.png", badge: "En direct", meta: ["Cortina", "En cours"] },
        { t: "Simple dames", img: "assets/sites/cortina.jpg", badge: "À venir", meta: ["Cortina", "16:30"] },
        { t: "Double", img: "assets/figma-raw/sport-08.png", badge: "À venir", meta: ["Cortina", "Demain · 11:30"] },
        { t: "Relais par équipes", img: "assets/sites/cortina.jpg", meta: ["Cortina", "Replay dispo"] }
      ],
      stars: [],
      replays: [
        { t: "Simple dames · finale", img: "assets/figma-raw/sport-08.png", meta: ["Cortina", "1:02:00"] },
        { t: "Simple messieurs", img: "assets/sites/cortina.jpg", meta: ["Cortina", "1:14:30"] },
        { t: "Double · finale", img: "assets/figma-raw/sport-08.png", meta: ["Cortina", "48:20"] },
        { t: "Relais par équipes", img: "assets/sites/cortina.jpg", meta: ["Cortina", "52:10"] }
      ],
      moments: [
        { t: "Le record de piste pulvérisé", img: "assets/figma-raw/sport-08.png", badge: "Or", meta: ["01:18"] },
        { t: "Les quatre manches au sommet", img: "assets/sites/cortina.jpg", meta: ["02:05"] },
        { t: "Le relais décisif", img: "assets/figma-raw/sport-08.png", meta: ["01:40"] }
      ]
    },
    "hockey": {
      name: "Hockey sur glace", of: "du hockey", img: "assets/figma-raw/sport-hockey.png",
      desc: "L'intensité et la stratégie du sport collectif sur glace, des poules jusqu'aux finales à guichets fermés à Milan.",
      stats: [["2", "tournois (H/F)"], ["2", "sites (Milano)"], ["20", "matchs diffusés"], ["110+", "heures de replay"]],
      epreuves: [
        { t: "Canada – Suède", img: "assets/figma-raw/sport-hockey.png", badge: "En direct", meta: ["Milano", "2e période"] },
        { t: "USA – Finlande", img: "assets/sites/milano.jpg", badge: "À venir", meta: ["Milano", "20:30"] },
        { t: "Tournoi dames · Canada – USA", img: "assets/figma-raw/sport-hockey.png", badge: "À venir", meta: ["Milano", "Demain · 16:00"] },
        { t: "Quart de finale messieurs", img: "assets/sites/milano.jpg", meta: ["Milano", "Replay dispo"] }
      ],
      stars: [],
      replays: [
        { t: "Finale messieurs · Canada – Suède", img: "assets/figma-raw/sport-hockey.png", meta: ["Milano", "2:31:00"] },
        { t: "Demi-finale dames", img: "assets/sites/milano.jpg", meta: ["Milano", "2:18:40"] },
        { t: "Tour préliminaire · USA – Tchéquie", img: "assets/figma-raw/sport-hockey.png", meta: ["Milano", "2:24:10"] },
        { t: "Quart de finale", img: "assets/sites/milano.jpg", meta: ["Milano", "2:29:50"] }
      ],
      moments: [
        { t: "Le but en or en prolongation", img: "assets/figma-raw/sport-hockey.png", badge: "Or", meta: ["01:30"] },
        { t: "L'arrêt incroyable du gardien", img: "assets/sites/milano.jpg", meta: ["00:48"] },
        { t: "Tous les buts de la finale", img: "assets/figma-raw/sport-hockey.png", meta: ["05:20"] }
      ]
    },
    "saut-a-ski": {
      name: "Saut à ski", of: "du saut à ski", img: "assets/figma-raw/sport-jump.png",
      desc: "S'envoler à plus de 130 mètres depuis le tremplin de Predazzo : élégance, courage et précision aérienne.",
      stats: [["5", "épreuves olympiques"], ["1", "site (Predazzo)"], ["10", "séances en direct"], ["60+", "heures de replay"]],
      epreuves: [
        { t: "Grand tremplin HS140 · manche 2", img: "assets/figma-raw/sport-jump.png", badge: "En direct", meta: ["Predazzo", "En cours"] },
        { t: "Tremplin normal dames", img: "assets/sites/valdifiemme.jpg", badge: "À venir", meta: ["Predazzo", "17:45"] },
        { t: "Épreuve par équipes mixte", img: "assets/figma-raw/sport-jump.png", badge: "À venir", meta: ["Predazzo", "Demain · 18:00"] },
        { t: "Grand tremplin dames", img: "assets/sites/valdifiemme.jpg", meta: ["Predazzo", "Replay dispo"] }
      ],
      stars: [
        { n: "Ryōyū Kobayashi", sub: "Saut à ski · 🇯🇵", img: "kobayashi" },
        { n: "Jarl Magnus Riiber", sub: "Combiné nordique · 🇳🇴", img: "riiber" }
      ],
      replays: [
        { t: "Tremplin normal messieurs", img: "assets/figma-raw/sport-jump.png", meta: ["Predazzo", "1:12:00"] },
        { t: "Épreuve par équipes", img: "assets/sites/valdifiemme.jpg", meta: ["Predazzo", "1:28:30"] },
        { t: "Grand tremplin dames", img: "assets/figma-raw/sport-jump.png", meta: ["Predazzo", "58:15"] },
        { t: "Qualifications HS140", img: "assets/sites/valdifiemme.jpg", meta: ["Predazzo", "44:50"] }
      ],
      moments: [
        { t: "Le saut à 138 mètres", img: "assets/figma-raw/sport-jump.png", badge: "Or", meta: ["01:25"] },
        { t: "Le télémark parfait", img: "assets/sites/valdifiemme.jpg", meta: ["00:52"] },
        { t: "L'or par équipes au dernier saut", img: "assets/figma-raw/sport-jump.png", meta: ["02:10"] }
      ]
    },
    "patinage-vitesse": {
      name: "Patinage de vitesse", of: "du patinage de vitesse", img: "assets/figma-raw/sport-01.png",
      desc: "La glace longue piste de Milan, où les meilleurs patineurs dépassent les 60 km/h dans un souffle.",
      stats: [["14", "épreuves olympiques"], ["1", "site (Milano)"], ["16", "séances en direct"], ["85+", "heures de replay"]],
      epreuves: [
        { t: "1500 m dames", img: "assets/figma-raw/sport-01.png", badge: "En direct", meta: ["Milano", "Série 6/12"] },
        { t: "5000 m messieurs", img: "assets/sites/milano.jpg", badge: "À venir", meta: ["Milano", "15:00"] },
        { t: "Poursuite par équipes", img: "assets/figma-raw/sport-01.png", badge: "À venir", meta: ["Milano", "Demain · 14:30"] },
        { t: "Mass start dames", img: "assets/sites/milano.jpg", meta: ["Milano", "Replay dispo"] }
      ],
      stars: [
        { n: "Jordan Stolz", sub: "Patinage de vitesse · 🇺🇸", img: "stolz" },
        { n: "Suzanne Schulting", sub: "Short-track · 🇳🇱", img: "schulting" }
      ],
      replays: [
        { t: "1000 m messieurs", img: "assets/figma-raw/sport-01.png", meta: ["Milano", "1:04:55"] },
        { t: "3000 m dames", img: "assets/sites/milano.jpg", meta: ["Milano", "58:20"] },
        { t: "Mass start messieurs", img: "assets/figma-raw/sport-01.png", meta: ["Milano", "1:12:10"] },
        { t: "Poursuite par équipes", img: "assets/sites/milano.jpg", meta: ["Milano", "49:40"] }
      ],
      moments: [
        { t: "Le record olympique sur 1500 m", img: "assets/figma-raw/sport-01.png", badge: "Or", meta: ["01:55"] },
        { t: "Le sprint final du mass start", img: "assets/sites/milano.jpg", meta: ["02:20"] },
        { t: "La poursuite parfaite", img: "assets/figma-raw/sport-01.png", meta: ["01:38"] }
      ]
    },
    "ski-alpinisme": {
      name: "Ski-alpinisme", of: "du ski-alpinisme", img: "assets/sports/ski-alpinisme.jpg",
      desc: "Nouveauté des Jeux : monter à la peau de phoque et descendre à toute allure dans les pentes de la Valteline.",
      stats: [["3", "épreuves olympiques"], ["1", "site (Bormio)"], ["6", "séances en direct"], ["35+", "heures de replay"]],
      epreuves: [
        { t: "Sprint messieurs · finale", img: "assets/sports/ski-alpinisme.jpg", badge: "En direct", meta: ["Bormio", "En cours"] },
        { t: "Sprint dames", img: "assets/sites/valtellina.jpg", badge: "À venir", meta: ["Bormio", "14:45"] },
        { t: "Relais mixte", img: "assets/sports/ski-alpinisme.jpg", badge: "À venir", meta: ["Bormio", "Demain · 10:15"] },
        { t: "Individuel messieurs", img: "assets/sites/valtellina.jpg", meta: ["Bormio", "Replay dispo"] }
      ],
      stars: [],
      replays: [
        { t: "Sprint dames · finale", img: "assets/sports/ski-alpinisme.jpg", meta: ["Bormio", "48:30"] },
        { t: "Relais mixte", img: "assets/sites/valtellina.jpg", meta: ["Bormio", "1:02:00"] },
        { t: "Individuel dames", img: "assets/sports/ski-alpinisme.jpg", meta: ["Bormio", "1:10:25"] },
        { t: "Qualifications sprint", img: "assets/sites/valtellina.jpg", meta: ["Bormio", "38:50"] }
      ],
      moments: [
        { t: "La première médaille d'or de l'histoire", img: "assets/sports/ski-alpinisme.jpg", badge: "Or", meta: ["02:12"] },
        { t: "La montée à la peau de phoque", img: "assets/sites/valtellina.jpg", meta: ["01:30"] },
        { t: "La descente engagée", img: "assets/sports/ski-alpinisme.jpg", meta: ["01:48"] }
      ]
    }
  };

  // --- Rendu -------------------------------------------------------------
  function cardHTML(c) {
    var badge = c.badge ? '<span class="bks-card-badge">' + c.badge + "</span>" : "";
    var meta = (c.meta || []).map(function (m) { return "<span>" + m + "</span>"; }).join("");
    return (
      '<a class="bks-card" href="backstages-video.html" style="background-image: url(\'' + c.img + "')\">" +
      badge +
      '<span class="bks-card-play" aria-hidden="true"></span>' +
      '<div class="bks-card-body"><p class="bks-card-title">' + c.t + "</p>" +
      '<p class="bks-card-meta">' + meta + "</p></div></a>"
    );
  }
  function posterHTML(p) {
    var href = p.key ? "profil.html?athlete=" + p.key : "profil.html";
    return (
      '<a class="bks-poster" href="' + href + '">' +
      '<span class="bks-poster-img" style="background-image: url(\'assets/athletes/' + p.img + ".jpg')\">" +
      '<span class="bks-poster-like" aria-hidden="true">♥</span></span>' +
      '<p class="bks-poster-name">' + p.n + "</p>" +
      '<p class="bks-poster-sub">' + p.sub + "</p></a>"
    );
  }
  function fill(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  var slug = (new URLSearchParams(location.search).get("disc") || "").toLowerCase();
  var d = POOL[slug];
  if (!d) return; // slug absent/inconnu → on garde le HTML statique (ski alpin)

  document.title = "Olympic Backstages — " + d.name + " — Milano Cortina 2026";
  var hero = document.getElementById("d-hero");
  if (hero) hero.style.backgroundImage = "url('" + d.img + "')";
  fill("d-title", d.name);
  fill("d-desc", d.desc);

  fill("d-stats", d.stats.map(function (s) {
    return '<div><p class="bks-dstat-num">' + s[0] + '</p><p class="bks-dstat-label">' + s[1] + "</p></div>";
  }).join(""));

  fill("ep-title", "Épreuves · en direct & à venir");
  fill("d-epreuves", d.epreuves.map(cardHTML).join(""));

  fill("rr-title", "Replays récents");
  fill("d-replays", d.replays.map(cardHTML).join(""));

  fill("gm-title", "Les grands moments " + d.of);
  fill("d-moments", d.moments.map(cardHTML).join(""));

  // Rail « stars » : affiché seulement si la discipline a des athlètes connus.
  var starsEl = document.getElementById("d-stars");
  var starsSec = starsEl ? starsEl.closest(".bks-rail-sec") : null;
  if (d.stars && d.stars.length) {
    fill("stars-title", "Les stars " + d.of);
    fill("d-stars", d.stars.map(posterHTML).join(""));
    if (starsSec) starsSec.style.display = "";
  } else if (starsSec) {
    starsSec.style.display = "none";
  }
})();
