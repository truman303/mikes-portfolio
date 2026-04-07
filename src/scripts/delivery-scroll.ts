import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initDeliveryScroll() {
  const section = document.querySelector('.delivery-section') as HTMLElement;
  const track = document.querySelector('.delivery-track') as HTMLElement;
  if (!section || !track) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop:
        '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
      isMobile: '(max-width: 768px)',
      isReduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isDesktop } = context.conditions!;
      if (!isDesktop) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + getScrollDistance(),
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>('.delivery-card');
      cards.forEach((card, i) => {
        if (i < 3) return;
        gsap.from(card, {
          autoAlpha: 0.3,
          y: 24,
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'left 60%',
            scrub: true,
          },
        });
      });
    },
  );
}

initDeliveryScroll();
