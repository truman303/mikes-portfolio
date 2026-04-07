import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initWorkScroll() {
  const section = document.querySelector('.work-section') as HTMLElement;
  if (!section) return;

  const domains = gsap.utils.toArray<HTMLElement>('.work-domain');
  const numDomains = domains.length;
  if (numDomains === 0) return;

  const dots = gsap.utils.toArray<HTMLElement>('.work-progress-dot');

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
      isMobile: '(max-width: 768px)',
      isReduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isDesktop } = context.conditions!;

      if (!isDesktop) {
        domains.forEach((domain) => {
          const title = domain.querySelector('.domain-title-wrap') as HTMLElement;
          const scene = domain.querySelector('.domain-scene') as HTMLElement;
          if (title) gsap.set(title, { y: 0, autoAlpha: 1 });
          if (scene) gsap.set(scene, { autoAlpha: 1 });
        });
        if (dots[0]) dots[0].classList.add('is-active');
        return;
      }

      domains.forEach((domain, i) => {
        const title = domain.querySelector('.domain-title-wrap') as HTMLElement;
        const scene = domain.querySelector('.domain-scene') as HTMLElement;

        if (i === 0) {
          gsap.set(title, { y: 0, autoAlpha: 1 });
          gsap.set(scene, { autoAlpha: 1 });
        } else {
          gsap.set(title, { y: 80, autoAlpha: 0 });
          gsap.set(scene, { autoAlpha: 0 });
        }
      });

      if (dots[0]) dots[0].classList.add('is-active');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + numDomains * window.innerHeight,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const active = Math.min(
              numDomains - 1,
              Math.floor(self.progress * numDomains),
            );
            dots.forEach((dot, idx) => {
              dot.classList.toggle('is-active', idx === active);
            });
          },
        },
      });

      const transition = 0.25;

      domains.forEach((domain, i) => {
        const title = domain.querySelector('.domain-title-wrap') as HTMLElement;
        const scene = domain.querySelector('.domain-scene') as HTMLElement;

        if (i < numDomains - 1) {
          tl.to(
            title,
            { y: -80, autoAlpha: 0, duration: transition, ease: 'power2.in' },
            i + 1 - transition,
          );
          tl.to(
            scene,
            { autoAlpha: 0, duration: transition, ease: 'power2.in' },
            i + 1 - transition,
          );
        }

        if (i > 0) {
          tl.to(
            title,
            { y: 0, autoAlpha: 1, duration: transition, ease: 'power2.out' },
            i - transition,
          );
          tl.to(
            scene,
            { autoAlpha: 1, duration: transition, ease: 'power2.out' },
            i - transition,
          );
        }
      });

      tl.set({}, {}, numDomains);

      return () => {
        dots.forEach((dot) => dot.classList.remove('is-active'));
      };
    },
  );
}

initWorkScroll();
