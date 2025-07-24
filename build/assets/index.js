// loader animation

window.addEventListener("load", () => {
  setTimeout(() => {
    // Step 1: Start loader animation only
    loadingAnimation();

    // Step 2: Delay heavy effects until loader almost ends
    setTimeout(() => {
      try { locomotiveAnimation(); } catch (e) { console.warn("locomotiveAnimation error:", e); }
    }, 1800); // after loader done

    setTimeout(() => {
      try { crsrAnimation(); } catch (e) { console.warn("crsrAnimation error:", e); }
    }, 2200);

    setTimeout(() => {
      try { flagAnimation(); } catch (e) { console.warn("flagAnimation error:", e); }
    }, 2400);

    setTimeout(() => {
      try { page4Animation(); } catch (e) { console.warn("page4Animation error:", e); }
    }, 2700);

    setTimeout(() => {
      try { sheryAnimation(); } catch (e) { console.warn("sheryAnimation error:", e); }
    }, 3000);

    setTimeout(() => {
      try { footerAnimation(); } catch (e) { console.warn("footerAnimation error:", e); }
    }, 3300);

    // Final: ScrollTrigger refresh
    setTimeout(() => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 3500);

  }, 50); // allow paint
});

// loader animation
tl.to("#loader", {
  opacity: 0,
  duration: 0.2,
  delay: 1.0, // small delay, not 3s
});


// GSAP me ScrollTrigger 

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
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
    pinType:
      getComputedStyle(document.querySelector("#main")).transform !== "none"
        ? "transform"
        : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}


// loadingAnimation

function loadingAnimation() {
  const tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.4,
    delay: 0.1 // reduced delay
  });

  tl.from("#line1-part1", {
    opacity: 0,
    onStart: function () {
      const h5timer = document.querySelector("#line1-part1 h5");
      let grow = 0;
      const interval = setInterval(function () {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
          clearInterval(interval);
        }
      }, 10); // faster count
    }
  });

  tl.to(".line h2", {
    animationName: "anime",
    opacity: 1
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.1,
    delay: 1.2 // faster loader exit
  });

  tl.from("#page1", {
    delay: 0.1,
    y: 800,
    opacity: 0,
    duration: 0.4,
    ease: Power4
  });

  tl.to("#loader", {
    display: "none"
  });

  tl.from("#nav", {
    opacity: 0
  });

  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 100,
    stagger: 0.2
  });
}
  
// improved Smoothness

function crsrAnimation() {
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23,1,0.320,1)",
    duration: 1
  });
  Shery.makeMagnet("#nav-part2 h4");

  const videoContainer = document.querySelector("#video-container");
  const videoPlay = document.querySelector("#video-container video");

  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mousefollower", { opacity: 0 });
      gsap.to("#video-cursor", {
        left: dets.x - 500,
        y: dets.y - 210
      });
    });
  });

  let flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag === 0) {
      videoPlay.play();
      videoPlay.style.opacity = 1;
      document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`;
      gsap.to("#video-cursor", { scale: 0.5 });
      flag = 1;
    } else {
      videoPlay.pause();
      videoPlay.style.opacity = 0;
      document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-cursor", { scale: 1 });
      flag = 0;
    }
  });

  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", { opacity: 1 });
    gsap.to("#video-cursor", {
      top: "-15%",
      left: "70%"
    });
  });
}

// 3D animated appearance

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

// Text Color Change on Scroll

function page4Animation() {
  const tl2 = gsap.timeline();

  function aboutObys() {
    let texts = "";
    document.querySelector("#about-obys").textContent.split("").forEach(function (elem) {
      texts += `<span>${elem}</span>`;
    });
    document.querySelector("#about-obys").innerHTML = texts;

    tl2.from("#about-obys span", {
      bottom: 200,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#about-obys span",
        scroller: "#main",
        markers: false,
        start: "top 80%",
        end: "top 45%",
        scrub: 2
      }
    });
  }

  function aboutObysText() {
    document.querySelectorAll("#intro h2").forEach(function (elem) {
      let garbage = "";
      elem.textContent.split("").forEach(function (e) {
        garbage += `<span>${e}</span>`;
      });
      elem.innerHTML = garbage;
    });

    tl2.to("#page4-content #intro h2 span", {
      color: "#Ffdb58",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#intro",
        scroller: "#main",
        markers: false,
        start: "top 50%",
        end: "top 10%",
        scrub: 1.25
      }
    });
  }

  aboutObys();
  aboutObysText();
}

//  element mouse ke sath follow karta hai

function flagAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#flag", {
      x: dets.clientX,
      y: dets.clientY
    });
  });

  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to("#flag", { opacity: 1 });
  });

  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to("#flag", { opacity: 0 });
  });
}


/**
 * footerAnimation()
 * ------------------
 * This function animates the footer heading text (h1 and h2) by wrapping each character
 * in a <span> for individual animation control using GSAP. On mouse enter, it fades out h1 text
 * and fades in h2 text. On mouse leave, it reverses the effect.
 */

function footerAnimation() {
  let h1Spans = "";
  let h2Spans = "";
  document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
    h1Spans += `<span>${elem}</span>`;
  });
  document.querySelector("#footer h1").innerHTML = h1Spans;

  document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
    h2Spans += `<span>${elem}</span>`;
  });
  document.querySelector("#footer h2").innerHTML = h2Spans;

  document.querySelector("#footer-text").addEventListener("mouseenter", function () {
    gsap.to("#footer h1 span", {
      opacity: 0,
      duration: 0.3,
      stagger: 0.05
    });
    gsap.to("#footer h2 span", {
      delay: 0.15,
      opacity: 1,
      duration: 0.3,
      stagger: 0.05
    });
  });

  document.querySelector("#footer-text").addEventListener("mouseleave", function () {
    gsap.to("#footer h1 span", {
      opacity: 1,
      duration: 0.3,
      stagger: 0.05,
      delay: 0.15
    });
    gsap.to("#footer h2 span", {
      opacity: 0,
      duration: 0.3,
      stagger: 0.05
    });
  });
}










