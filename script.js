// The header + mobile-menu behaviour now lives in site-header.js (shared).
const navLinks = Array.from(document.querySelectorAll(".mc-nav a"));
const observedSections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    if (!href?.startsWith("#") || href.length === 1) return null;
    return document.querySelector(href);
  })
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
);

observedSections.forEach((section) => observer.observe(section));

// Newsletter behaviour now lives in site-footer.js (shared).

// Sites: switch the territory image when a tab is selected
const siteTabs = Array.from(document.querySelectorAll(".home-site-tab"));
const sitesImage = document.getElementById("sites-image");
siteTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    siteTabs.forEach((other) => {
      other.classList.remove("active");
      other.setAttribute("aria-pressed", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-pressed", "true");
    if (sitesImage) {
      const src = tab.getAttribute("data-site");
      const label = tab.getAttribute("data-label");
      if (src) sitesImage.style.backgroundImage = `url('${src}')`;
      if (label) sitesImage.setAttribute("aria-label", label);
    }
  });
});

// Hero video: hover-to-play on desktop, manual play/pause button on touch.
const hero = document.querySelector(".home-hero");
const heroVideo = document.querySelector(".home-hero-video");
const heroPlay = document.querySelector(".hero-play");
const canHover = window.matchMedia("(hover: hover)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (heroVideo) {
  const playVideo = () => {
    const p = heroVideo.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  // Desktop: play while hovering the hero, pause when leaving.
  if (hero && canHover && !reduceMotion) {
    hero.addEventListener("mouseenter", playVideo);
    hero.addEventListener("mouseleave", () => heroVideo.pause());
  }

  // Touch/mobile: explicit play/pause button.
  heroPlay?.addEventListener("click", () => {
    if (heroVideo.paused) {
      playVideo();
      heroPlay.classList.add("is-playing");
      heroPlay.setAttribute("aria-label", "Mettre la vidéo en pause");
    } else {
      heroVideo.pause();
      heroPlay.classList.remove("is-playing");
      heroPlay.setAttribute("aria-label", "Lire la vidéo");
    }
  });

  // Keep the button icon in sync if playback ends/pauses on its own.
  heroVideo.addEventListener("pause", () => {
    heroPlay?.classList.remove("is-playing");
    heroPlay?.setAttribute("aria-label", "Lire la vidéo");
  });
  heroVideo.addEventListener("play", () => {
    heroPlay?.classList.add("is-playing");
    heroPlay?.setAttribute("aria-label", "Mettre la vidéo en pause");
  });
}

const revealTargets = document.querySelectorAll(
  ".home-hero-copy, .home-section, .home-backstage, .home-footer",
);

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
  revealTargets.forEach((target, index) => {
    target.classList.add("motion-reveal");
    target.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}
