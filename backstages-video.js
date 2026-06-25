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

// Lecteur vidéo : contrôles custom (play/pause, progression, temps, seek, plein
// écran) + stats animées en direct. Deux backends selon le contexte :
//  - YouTube (API IFrame) quand le site est servi en http(s) ;
//  - <video> mp4 local en secours quand la page est ouverte en file://
//    (YouTube interdit la lecture depuis file://).
(function () {
  var player = document.getElementById("bks-player");
  var play = document.getElementById("bks-play");
  var fill = document.getElementById("bks-fill");
  var bar = document.getElementById("bks-bar");
  var timeEl = document.getElementById("bks-time");
  if (!player || !play) return;

  var video = document.getElementById("bks-video");
  var ytWrap = document.getElementById("bks-yt-wrap");
  var poster = document.getElementById("bks-poster");
  var surface = document.getElementById("bks-surface");

  function fmt(s) {
    s = Math.max(0, Math.floor(s || 0));
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }

  // Stats live pilotées par le temps de lecture.
  var elapsed = document.getElementById("stat-elapsed");
  var speed = document.getElementById("stat-speed");
  var int1 = document.getElementById("stat-int1");
  var int2 = document.getElementById("stat-int2");
  var ecart = document.getElementById("stat-ecart");
  var DASH = "—";
  function updateStats(c) {
    if (elapsed) elapsed.textContent = c.toFixed(2) + " s";
    if (speed) {
      var v = 96 + 34 * Math.abs(Math.sin(c / 4)) + Math.sin(c * 3) * 3;
      speed.textContent = Math.round(v) + " km/h";
    }
    if (int1) int1.innerHTML = c >= 8 ? "18.42 <em>+0.00</em>" : DASH;
    if (int2) int2.innerHTML = c >= 20 ? "41.07 <em>+0.12</em>" : DASH;
    if (ecart) ecart.textContent = c >= 8 ? "+" + (0.12 + 0.02 * Math.abs(Math.sin(c))).toFixed(2) + " s" : DASH;
  }

  // Interface de backend : { play, pause, isPaused, time, duration, seek }
  var B = null, poll = null;
  function refresh() {
    if (!B) return;
    var c = B.time() || 0, d = B.duration() || 0;
    timeEl.textContent = fmt(c) + "  /  " + (d ? fmt(d) : "--:--");
    fill.style.width = d ? (c / d) * 100 + "%" : "0%";
    updateStats(c);
  }
  function startPoll() { stopPoll(); poll = setInterval(refresh, 200); }
  function stopPoll() { if (poll) { clearInterval(poll); poll = null; } }
  // Auto-masquage de l'interface après inactivité (comme un vrai lecteur).
  var idleTimer = null;
  function showChrome() {
    player.classList.remove("is-idle");
    clearTimeout(idleTimer);
    if (B && !B.isPaused()) {
      idleTimer = setTimeout(function () { player.classList.add("is-idle"); }, 2800);
    }
  }
  player.addEventListener("mousemove", showChrome);
  player.addEventListener("mouseleave", function () {
    if (B && !B.isPaused()) player.classList.add("is-idle");
  });

  function onPlaying() {
    player.classList.add("is-playing");
    play.setAttribute("aria-label", "Mettre en pause");
    startPoll();
    showChrome();
  }
  function onPaused() {
    player.classList.remove("is-playing");
    play.setAttribute("aria-label", "Lire la vidéo");
    stopPoll();
    clearTimeout(idleTimer);
    player.classList.remove("is-idle");
    refresh();
  }
  function togglePlay() { if (!B) return; if (B.isPaused()) { B.play(); } else { B.pause(); } }

  play.addEventListener("click", togglePlay);
  bar.addEventListener("click", function (e) {
    if (!B) return;
    var r = bar.getBoundingClientRect(), d = B.duration() || 0;
    if (d) B.seek(((e.clientX - r.left) / r.width) * d);
  });
  var fs = document.getElementById("bks-fs");
  if (fs) fs.addEventListener("click", function () {
    if (document.fullscreenElement) { document.exitFullscreen(); }
    else if (player.requestFullscreen) { player.requestFullscreen(); }
  });
  var watch = document.getElementById("bks-watch");
  if (watch) watch.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (B) B.play();
  });

  if (location.protocol === "file:") {
    // Backend <video> mp4 — fiable en local (file://).
    if (ytWrap) ytWrap.remove();
    if (poster) poster.remove();
    if (surface) surface.remove();
    if (!video) return;
    B = {
      play: function () { video.play(); },
      pause: function () { video.pause(); },
      isPaused: function () { return video.paused; },
      time: function () { return video.currentTime; },
      duration: function () { return video.duration; },
      seek: function (t) { video.currentTime = t; },
    };
    video.addEventListener("click", togglePlay);
    video.addEventListener("play", onPlaying);
    video.addEventListener("pause", onPaused);
    video.addEventListener("timeupdate", refresh);
    video.addEventListener("loadedmetadata", refresh);
  } else {
    // Backend YouTube (API IFrame) — quand le site est servi en http(s).
    if (video) video.remove();
    var yt = null, ready = false;
    B = {
      play: function () { if (ready) yt.playVideo(); },
      pause: function () { if (ready) yt.pauseVideo(); },
      isPaused: function () { return !ready || yt.getPlayerState() !== 1; },
      time: function () { return ready ? yt.getCurrentTime() : 0; },
      duration: function () { return ready ? yt.getDuration() : 0; },
      seek: function (t) { if (ready) yt.seekTo(t, true); },
    };
    if (surface) surface.addEventListener("click", togglePlay);
    window.onYouTubeIframeAPIReady = function () {
      yt = new YT.Player("bks-yt", {
        videoId: "6kD7Ew3cuWQ",
        playerVars: { controls: 0, modestbranding: 1, rel: 0, playsinline: 1, iv_load_policy: 3, disablekb: 1, fs: 0 },
        events: {
          onReady: function () { ready = true; refresh(); },
          onStateChange: function (e) { if (e.data === 1) { onPlaying(); } else { onPaused(); } },
        },
      });
    };
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    } else {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }
})();
