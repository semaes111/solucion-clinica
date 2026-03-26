import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;

    if (!section || !title || !subtitle || !image || !overlay) return;

    // Initial animation on load
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      image,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2 }
    )
    .fromTo(
      title,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5 },
      '-=1.5'
    )
    .fromTo(
      subtitle,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.8'
    );

    // Scroll-driven parallax
    const parallaxTriggers: ScrollTrigger[] = [];

    const imageTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(image, { y: self.progress * 150 });
      },
    });
    parallaxTriggers.push(imageTrigger);

    const titleTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '50% top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(title, {
          opacity: 1 - self.progress * 1.5,
          y: self.progress * -50
        });
        gsap.set(subtitle, {
          opacity: 1 - self.progress * 2,
          y: self.progress * -30
        });
      },
    });
    parallaxTriggers.push(titleTrigger);

    const overlayTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(overlay, { opacity: self.progress * 0.3 });
      },
    });
    parallaxTriggers.push(overlayTrigger);

    return () => {
      parallaxTriggers.forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  if (!heroConfig.title && !heroConfig.backgroundImage) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Background Image with Ken Burns */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src={heroConfig.backgroundImage}
          alt={heroConfig.backgroundAlt}
          className="w-full h-full object-cover ken-burns"
        />
      </div>

      {/* Gradient overlay for depth */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-kaleo-charcoal opacity-0"
        style={{ willChange: 'opacity' }}
      />

      {/* Subtle fog effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-kaleo-sand/20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display text-kaleo-cream text-display tracking-tight select-none"
          style={{
            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
            willChange: 'transform, opacity'
          }}
        >
          {heroConfig.title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-kaleo-cream/90 text-sm md:text-base uppercase tracking-[0.3em] mt-6"
          style={{ willChange: 'transform, opacity' }}
        >
          {heroConfig.subtitle}
        </p>

        {/* CTA Button */}
        <a
          href="https://app.solucionclinica.com"
          className="mt-10 md:mt-12 inline-flex items-center gap-3 px-8 py-4 bg-kaleo-cream text-kaleo-charcoal rounded-full font-body text-sm uppercase tracking-wider hover:bg-kaleo-terracotta hover:text-kaleo-cream transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Analizar mi caso
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </a>
      </div>

      {/* Bottom gradient for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kaleo-sand to-transparent" />
    </section>
  );
};

export default Hero;
