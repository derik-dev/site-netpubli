document.addEventListener("DOMContentLoaded", () => {
  initLenis();
  initGSAP();
  initStickyHeader();
  initMagnetic();
  initHeroAnimation();
  initScrollAnimations();
  initCounters();
  initFloatLoop();
  initPortfolioScroll();
});

/* ============================
   LENIS SMOOTH SCROLL
   ============================ */
function initLenis() {
  if (typeof Lenis === "undefined") return;

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
  });

  lenis.on("scroll", () => {
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.update();
  });

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    });
  });
}

/* ============================
   GSAP REGISTER
   ============================ */
function initGSAP() {
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
}

/* ============================
   STICKY HEADER
   ============================ */
function initStickyHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  function update() {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
}


/* ============================
   MAGNETIC BUTTONS
   ============================ */
function initMagnetic() {
  if (typeof gsap === "undefined") return;

  document.querySelectorAll(".magnetic").forEach((el) => {
    const strength = el.classList.contains("whatsapp-float") ? 0.22 : 0.28;

    el.addEventListener("mousemove", function (e) {
      const r = this.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      gsap.to(this, { x: dx * strength, y: dy * strength, duration: 0.35, ease: "power2.out" });
    });

    el.addEventListener("mouseleave", function () {
      gsap.to(this, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.55)" });
    });
  });
}

/* ============================
   HERO ENTRANCE ANIMATION
   ============================ */
function initHeroAnimation() {
  if (typeof gsap === "undefined") return;

  const heroContent = document.querySelector(".hero-center");
  if (!heroContent) return;

  // Set initial states
  gsap.set(Array.from(heroContent.children), { opacity: 0, y: 32 });
  gsap.set(".browser-frame", { opacity: 0, scale: 0.9, y: 60 });
  gsap.set(".bf-badge", { opacity: 0, scale: 0.7, y: 20 });

  const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.3 });

  tl.to(Array.from(heroContent.children), {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.15,
  })
    .to(".browser-frame", { opacity: 1, scale: 1, y: 0, duration: 1.6 }, "-=0.8")
    .to(".bf-badge",  { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }, "-=1");
}

/* ============================
   FLOATING LOOP ANIMATIONS
   ============================ */
function initFloatLoop() {
  if (typeof gsap === "undefined") return;

  gsap.to(".visual-glow-a", { y: -22, duration: 4.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".visual-glow-b", { y:  18, duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.6 });
  gsap.to(".float-top",     { y:  -7, duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".float-bottom",  { y:   7, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.0 });

  // Subtle rotation on mockup glow
  gsap.to(".hero-glow-1", { x: 18, y: -14, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".hero-glow-2", { x: -12, y: 10,  duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
}

/* ============================
   SCROLL-TRIGGERED ANIMATIONS
   ============================ */
function initScrollAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    // Fallback: just show everything
    document.querySelectorAll(".section-header, .pain-card, .solution-card, .testimonial-card, .process-step, .final-cta-wrap").forEach((el) => {
      el.style.opacity = "1";
    });
    return;
  }

  // Section headers
  gsap.utils.toArray(".sec-header").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 38 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      }
    );
  });

  // Cards — stagger within each grid
  gsap.utils.toArray(".grid-3, .grid-2, .portfolio-grid, .faq-grid").forEach((grid) => {
    const cards = grid.querySelectorAll(".pain-card, .sol-card, .testi-card, .port-card, .faq-item");
    gsap.fromTo(cards,
      { opacity: 0, y: 44, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: grid, start: "top 82%", once: true },
      }
    );
  });

  // Process steps
  gsap.utils.toArray(".proc-step").forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, x: -36 },
      {
        opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
        delay: i * 0.12,
      }
    );
  });

  // Timeline line draw
  gsap.fromTo(".timeline-line",
    { scaleY: 0, transformOrigin: "top center" },
    {
      scaleY: 1, duration: 1.4, ease: "power2.inOut",
      scrollTrigger: { trigger: ".process-timeline", start: "top 70%", once: true },
    }
  );

  // Final CTA
  gsap.fromTo(".final-cta-wrap",
    { opacity: 0, y: 44 },
    {
      opacity: 1, y: 0, duration: 1.0, ease: "power3.out",
      scrollTrigger: { trigger: ".final-cta-wrap", start: "top 80%", once: true },
    }
  );

  // Marquee section fade-in
  gsap.fromTo(".marquee-strip",
    { opacity: 0 },
    {
      opacity: 1, duration: 1.0,
      scrollTrigger: { trigger: ".marquee-strip", start: "top 90%", once: true },
    }
  );

  // FAQ Animation
  gsap.fromTo(".faq-item",
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: ".faq-list", start: "top 85%", once: true },
    }
  );

  gsap.fromTo(".faq-cta-col",
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".faq-cta-col", start: "top 85%", once: true },
    }
  );
}

/* ============================
   ANIMATED COUNTERS
   ============================ */
function initCounters() {
  const els = document.querySelectorAll(".count[data-count]");
  if (!els.length) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    // No GSAP — just set final values
    els.forEach((el) => { el.textContent = el.dataset.count; });
    return;
  }

  els.forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const proxy  = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter() {
        gsap.to(proxy, {
          val: target,
          duration: 1.9,
          ease: "power2.out",
          onUpdate() {
            el.textContent = Math.round(proxy.val);
          },
          onComplete() {
            el.textContent = target; // ensure exact final value
          },
        });
      },
    });
  });
}
/* ============================
   PORTFOLIO HORIZONTAL SCROLL
   ============================ */
function initPortfolioScroll() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const section  = document.getElementById("portfolio");
  const pinWrap  = document.getElementById("portPin");
  const track    = document.getElementById("portTrack");
  if (!pinWrap || !track || !section) return;

  // No mobile (< 768px): desativa o efeito
  if (window.innerWidth < 768) {
    track.style.flexWrap = "wrap";
    track.style.width = "100%";
    track.style.padding = "20px 20px 60px";
    return;
  }

  // Quantidade a deslizar = largura do track - largura da tela
  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

  gsap.to(track, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: section,    /* pina desde o topo da seção */
      pin: section,        /* fixa a seção inteira */
      start: "top top",
      end: () => `+=${track.scrollWidth - window.innerWidth + 200}`,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}
