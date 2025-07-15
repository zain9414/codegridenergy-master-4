// ✅ Fully Optimized Animation Code
window.addEventListener("load", () => {
  // Step 1: Start loader animation immediately
  loadingAnimation();

  // Step 2: Schedule heavy animations after loader fades
  const animations = [
    { delay: 1800, fn: locomotiveAnimation },
    { delay: 2200, fn: crsrAnimation },
    { delay: 2400, fn: flagAnimation },
    { delay: 2700, fn: page4Animation },
    { delay: 3000, fn: sheryAnimation },
    { delay: 3300, fn: footerAnimation },
    { delay: 3500, fn: () => ScrollTrigger?.refresh?.() },
  ];

  animations.forEach(({ delay, fn }) => {
    setTimeout(() => {
      try { fn(); } catch (e) { console.warn(`${fn.name} error:`, e); }
    }, delay);
  });
});

function loadingAnimation() {
  const tl = gsap.timeline();

  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.4,
    delay: 0.1
  });

  tl.from("#line1-part1", {
    opacity: 0,
    onStart: () => {
      const h5 = document.querySelector("#line1-part1 h5");
      let count = 0;
      const interval = setInterval(() => {
        if (count <= 100) h5.textContent = count++;
        else clearInterval(interval);
      }, 10);
    }
  });

  tl.to(".line h2", {
    animationName: "anime",
    opacity: 1
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.1,
    delay: 1.2
  });

  tl.from("#page1", {
    delay: 0.1,
    y: 800,
    opacity: 0,
    duration: 0.4,
    ease: Power4
  });

  tl.set("#loader", { display: "none" });
  tl.from("#nav", { opacity: 0 });
  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 100,
    stagger: 0.2
  });
}

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return value !== undefined
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: getComputedStyle(document.querySelector("#main")).transform !== "none" ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function crsrAnimation() {
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23,1,0.320,1)",
    duration: 1
  });

  Shery.makeMagnet("#nav-part2 h4");

  const container = document.querySelector("#video-container");
  const video = container.querySelector("video");
  let flag = 0;

  container.addEventListener("mouseenter", () => {
    container.addEventListener("mousemove", (e) => {
      gsap.to(".mousefollower", { opacity: 0 });
      gsap.to("#video-cursor", {
        left: e.x - 500,
        y: e.y - 210
      });
    });
  });

  container.addEventListener("click", () => {
    if (flag === 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`;
      gsap.to("#video-cursor", { scale: 0.5 });
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-cursor", { scale: 1 });
    }
    flag = 1 - flag;
  });

  container.addEventListener("mouseleave", () => {
    gsap.to(".mousefollower", { opacity: 1 });
    gsap.to("#video-cursor", {
      top: "-15%",
      left: "70%"
    });
  });
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    debug: false,
    config: {
      a: { value: 2.52 },
      b: { value: -0.59 },
      zindex: { value: -9996999 },
      aspect: { value: 0.7586 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0 },
      shapeRadius: { value: 0 },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 4 },
      durationOut: { value: 1 },
      durationIn: { value: 1.5 },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1 },
      scrollType: { value: 0 },
      geoVertex: { value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2 },
      metaball: { value: 0.46 },
      discard_threshold: { value: 0.5 },
      antialias_threshold: { value: 0 },
      noise_height: { value: 0.5 },
      noise_scale: { value: 4.58 }
    }
  });
}

function page4Animation() {
  const tl = gsap.timeline();

  const textWrap = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = [...el.textContent].map(char => `<span>${char}</span>`).join("");
  };

  textWrap("#about-obys");
  document.querySelectorAll("#intro h2").forEach(el => textWrap(el));

  tl.from("#about-obys span", {
    bottom: 200,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#about-obys span",
      scroller: "#main",
      start: "top 80%",
      end: "top 45%",
      scrub: 2
    }
  });

  tl.to("#page4-content #intro h2 span", {
    color: "#Ffdb58",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#intro",
      scroller: "#main",
      start: "top 50%",
      end: "top 10%",
      scrub: 1.25
    }
  });
}

function flagAnimation() {
  const flag = document.querySelector("#flag");
  if (!flag) return;

  document.addEventListener("mousemove", (e) => {
    gsap.to(flag, { x: e.clientX, y: e.clientY });
  });

  const hero3 = document.querySelector("#hero3");
  if (!hero3) return;

  hero3.addEventListener("mouseenter", () => {
    gsap.to(flag, { opacity: 1 });
  });

  hero3.addEventListener("mouseleave", () => {
    gsap.to(flag, { opacity: 0 });
  });
}

function footerAnimation() {
  const h1 = document.querySelector("#footer h1");
  const h2 = document.querySelector("#footer h2");
  const text = document.querySelector("#footer-text");

  const wrapText = (el) => {
    if (el) {
      el.innerHTML = [...el.textContent].map(ch => `<span>${ch}</span>`).join("");
    }
  };

  wrapText(h1);
  wrapText(h2);

  if (text) {
    text.addEventListener("mouseenter", () => {
      gsap.to("#footer h1 span", { opacity: 0, duration: 0.3, stagger: 0.05 });
      gsap.to("#footer h2 span", { opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.15 });
    });

    text.addEventListener("mouseleave", () => {
      gsap.to("#footer h1 span", { opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.15 });
      gsap.to("#footer h2 span", { opacity: 0, duration: 0.3, stagger: 0.05 });
    });
  }
}
