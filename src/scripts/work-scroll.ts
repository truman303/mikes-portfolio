import './smooth-scroll';
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
  const shutterImages = gsap.utils.toArray<HTMLElement>('.shutter-image');
  const shutterStrips = gsap.utils.toArray<HTMLElement>('.shutter-strip');
  const hasShutter = shutterImages.length > 0 && shutterStrips.length > 0;

  const DOMAIN_UNITS = [3, 1, 1, 1];
  const domainStarts: number[] = [];
  const domainEnds: number[] = [];
  let totalUnits = 0;
  DOMAIN_UNITS.forEach((units) => {
    domainStarts.push(totalUnits);
    totalUnits += units;
    domainEnds.push(totalUnits);
  });

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

      if (hasShutter) {
        shutterImages.forEach((img, i) => {
          gsap.set(img, { autoAlpha: i === 0 ? 1 : 0 });
        });
        shutterStrips.forEach((strip) => {
          gsap.set(strip, { scaleY: 0 });
        });
      }

      if (dots[0]) dots[0].classList.add('is-active');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + totalUnits * window.innerHeight,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress * totalUnits;
            let active = 0;
            for (let d = domainStarts.length - 1; d >= 0; d--) {
              if (p >= domainStarts[d]) {
                active = d;
                break;
              }
            }
            dots.forEach((dot, idx) => {
              dot.classList.toggle('is-active', idx === active);
            });
          },
        },
      });

      // --- Shutter image transitions at every integer unit boundary ---
      if (hasShutter) {
        const STRIP_DUR = 0.1;
        const STAGGER_CFG = { each: 0.008, from: 'edges' as const };

        for (let t = 1; t < totalUnits; t++) {
          const fromIdx = t - 1;
          const toIdx = t;
          if (toIdx >= shutterImages.length) break;

          tl.to(shutterStrips, {
            scaleY: 1,
            duration: STRIP_DUR,
            stagger: STAGGER_CFG,
            ease: 'power3.inOut',
          }, t - 0.18);

          tl.set(shutterImages[fromIdx], { autoAlpha: 0 }, t);
          tl.set(shutterImages[toIdx], { autoAlpha: 1 }, t);

          tl.to(shutterStrips, {
            scaleY: 0,
            duration: STRIP_DUR,
            stagger: STAGGER_CFG,
            ease: 'power3.inOut',
          }, t + 0.02);
        }
      }

      // --- Domain content transitions ---
      const dt = 0.25;

      domains.forEach((domain, i) => {
        const title = domain.querySelector('.domain-title-wrap') as HTMLElement;
        const scene = domain.querySelector('.domain-scene') as HTMLElement;

        if (i < numDomains - 1) {
          const fadeOutAt = domainEnds[i];
          tl.to(title, {
            y: -60, autoAlpha: 0, duration: dt, ease: 'power2.in',
          }, fadeOutAt - dt);
          tl.to(scene, {
            autoAlpha: 0, duration: dt, ease: 'power2.in',
          }, fadeOutAt - dt);
        }

        if (i > 0) {
          const fadeInAt = domainStarts[i];
          tl.to(title, {
            y: 0, autoAlpha: 1, duration: dt, ease: 'power2.out',
          }, fadeInAt);
          tl.to(scene, {
            autoAlpha: 1, duration: dt, ease: 'power2.out',
          }, fadeInAt);
        }
      });

      tl.set({}, {}, totalUnits);

      return () => {
        dots.forEach((dot) => dot.classList.remove('is-active'));
      };
    },
  );
}

initWorkScroll();
