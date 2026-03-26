import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { narrativeTextConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const NarrativeText = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const label = labelRef.current;
    const line1 = line1Ref.current;
    const line3 = line3Ref.current;
    const cta = ctaRef.current;

    const elements = [label, line1, line3, cta].filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    gsap.set(elements, { opacity: 0, y: 30 });

    const triggers: ScrollTrigger[] = [];

    elements.forEach((el, i) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1, y: 0, duration: 1, delay: i * 0.15, ease: 'power3.out',
            });
          },
        })
      );
    });

    return () => { triggers.forEach(t => t.kill()); };
  }, []);

  if (!narrativeTextConfig.line1 && !narrativeTextConfig.line3) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-kaleo-sand"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Label */}
        <div
          ref={labelRef}
          className="flex items-center gap-3 mb-8"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="w-8 h-px bg-kaleo-terracotta" />
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            Plataforma de análisis oncológico
          </span>
        </div>

        {/* Main Title with italic+bold part */}
        <h2
          ref={line1Ref}
          className="font-display text-headline text-kaleo-earth"
          style={{ willChange: 'transform, opacity' }}
        >
          Cada informe médico esconde{' '}
          <em className="font-semibold italic text-kaleo-terracotta">
            opciones que merecen ser encontradas
          </em>
        </h2>

        {/* Description */}
        <p
          ref={line3Ref}
          className="font-body text-sm md:text-base text-kaleo-earth/60 max-w-xl leading-relaxed mt-8"
          style={{ willChange: 'transform, opacity' }}
        >
          {narrativeTextConfig.line3}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center gap-4 mt-10"
          style={{ willChange: 'transform, opacity' }}
        >
          <a
            href="https://app.solucionclinica.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-kaleo-terracotta text-kaleo-cream rounded-full font-body text-sm uppercase tracking-wider hover:bg-kaleo-earth transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Analizar mi caso
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#proceso"
            className="font-body text-sm text-kaleo-earth/60 underline underline-offset-4 hover:text-kaleo-earth transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#proceso')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver cómo funciona
          </a>
        </div>
      </div>
    </section>
  );
};

export default NarrativeText;
