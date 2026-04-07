import gsap from 'gsap';

type AnimationFactory = (card: Element) => gsap.core.Timeline;

const figureAnimations: Record<string, AnimationFactory> = {
  waving: (card) => {
    const tl = gsap.timeline({ paused: true });
    const arm = card.querySelector('.waving-arm');
    if (arm) {
      tl.to(arm, {
        rotation: 20,
        transformOrigin: '0% 100%',
        duration: 0.3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 5,
      });
    }
    return tl;
  },

  dad: (card) => {
    const tl = gsap.timeline({ paused: true });
    const child = card.querySelector('.child-figure');
    if (child) {
      tl.to(child, {
        y: -6,
        duration: 0.35,
        ease: 'power2.out',
        yoyo: true,
        repeat: 3,
      });
    }
    return tl;
  },

  thinker: (card) => {
    const tl = gsap.timeline({ paused: true });
    const bubble = card.querySelector('.thought-bubble');
    if (bubble) {
      tl.fromTo(
        bubble,
        { autoAlpha: 0, scale: 0.5, transformOrigin: '0% 100%' },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      );
    }
    return tl;
  },

  builder: (card) => {
    const tl = gsap.timeline({ paused: true });
    const tool = card.querySelector('.builder-tool');
    if (tool) {
      tl.to(tool, {
        rotation: -25,
        transformOrigin: '0% 100%',
        duration: 0.25,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 3,
      });
    }
    return tl;
  },

  coffee: (card) => {
    const tl = gsap.timeline({ paused: true });
    const steams = card.querySelectorAll('.steam');
    if (steams.length) {
      tl.to(steams, {
        y: -10,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power1.out',
        stagger: 0.12,
      });
    }
    return tl;
  },

  coder: (card) => {
    const tl = gsap.timeline({ paused: true });
    const lines = card.querySelectorAll('.code-lines path');
    if (lines.length) {
      tl.fromTo(
        lines,
        { scaleX: 0, transformOrigin: '0% 50%' },
        { scaleX: 1, duration: 0.25, stagger: 0.1, ease: 'power2.out' },
      );
    }
    return tl;
  },

  runner: (card) => {
    const tl = gsap.timeline({ paused: true });
    const lines = card.querySelectorAll('.motion-lines path');
    if (lines.length) {
      tl.to(lines, {
        x: 12,
        autoAlpha: 0.9,
        duration: 0.35,
        stagger: 0.08,
        ease: 'power2.out',
        yoyo: true,
        repeat: 2,
      });
    }
    return tl;
  },

  guitar: (card) => {
    const tl = gsap.timeline({ paused: true });
    const hand = card.querySelector('.strum-hand');
    const notes = card.querySelector('.music-notes');
    if (hand) {
      tl.to(
        hand,
        {
          rotation: -10,
          transformOrigin: '0% 0%',
          duration: 0.15,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 7,
        },
        0,
      );
    }
    if (notes) {
      tl.to(
        notes,
        { autoAlpha: 1, y: -12, duration: 0.6, ease: 'power1.out' },
        0,
      );
    }
    return tl;
  },
};

const animationCache = new Map<Element, gsap.core.Timeline>();

function getOrCreateAnimation(card: Element): gsap.core.Timeline | null {
  if (animationCache.has(card)) return animationCache.get(card)!;
  const type = card.getAttribute('data-figure');
  if (!type || !figureAnimations[type]) return null;
  const tl = figureAnimations[type](card);
  animationCache.set(card, tl);
  return tl;
}

function heroEntrance() {
  const greeting = document.querySelector('.hero-greeting');
  const name = document.querySelector('.hero-name');
  const tagline = document.querySelector('.hero-tagline');
  const wrapper = document.querySelector('.carousel-wrapper');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (greeting) {
    tl.fromTo(greeting, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 });
  }
  if (name) {
    tl.fromTo(
      name,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7 },
      '-=0.35',
    );
  }
  if (tagline) {
    tl.fromTo(
      tagline,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5 },
      '-=0.3',
    );
  }
  if (wrapper) {
    tl.fromTo(
      wrapper,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.6 },
      '-=0.2',
    );
  }

  return tl;
}

function initHeroCarousel() {
  const track = document.getElementById('hero-carousel-track');
  if (!track) return;

  const originalCards = Array.from(track.children) as HTMLElement[];
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  let carouselTween: gsap.core.Tween | null = null;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isNormal: '(prefers-reduced-motion: no-preference)',
      isReduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isReduced } = context.conditions!;

      if (isReduced) {
        gsap.set(
          ['.hero-greeting', '.hero-name', '.hero-tagline', '.carousel-wrapper'],
          { autoAlpha: 1 },
        );
        return;
      }

      heroEntrance();

      const totalWidth = track.scrollWidth / 2;

      carouselTween = gsap.to(track, {
        x: -totalWidth,
        duration: 32,
        ease: 'none',
        repeat: -1,
      });

      return () => {
        carouselTween = null;
      };
    },
  );

  const allCards = track.querySelectorAll('.figure-card');
  allCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (carouselTween) gsap.to(carouselTween, { timeScale: 0.15, duration: 0.4 });
      const anim = getOrCreateAnimation(card);
      if (anim) anim.restart();
    });

    card.addEventListener('mouseleave', () => {
      if (carouselTween) gsap.to(carouselTween, { timeScale: 1, duration: 0.6 });
      const anim = getOrCreateAnimation(card);
      if (anim) anim.reverse();
    });
  });
}

initHeroCarousel();
