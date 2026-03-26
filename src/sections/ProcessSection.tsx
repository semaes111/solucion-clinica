import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Sube tu informe',
    description: 'Arrastra tu PDF médico. Informes de alta, analíticas, anatomía patológica.',
  },
  {
    number: '02',
    title: 'La IA analiza',
    description: 'En menos de 60 segundos: diagnósticos, tratamientos, scores clínicos y barreras.',
  },
  {
    number: '03',
    title: 'Elige tu informe',
    description: 'Ensayos clínicos, segundas opiniones, centros de excelencia. Cada informe cruzado contra tu perfil.',
  },
  {
    number: '04',
    title: 'Descarga o contrata gestoría',
    description: 'Descarga el informe PDF o añade la gestoría: nuestros médicos preparan tu caso y gestionan la cita.',
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const triggers: ScrollTrigger[] = [];

    if (header) {
      gsap.set(header.children, { opacity: 0, y: 30 });
      triggers.push(
        ScrollTrigger.create({
          trigger: header,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(header.children, {
              opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            });
          },
        })
      );
    }

    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 40 });
      triggers.push(
        ScrollTrigger.create({
          trigger: cards[0],
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            });
          },
        })
      );
    }

    return () => { triggers.forEach(t => t.kill()); };
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-kaleo-cream/50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            Proceso
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            De tu informe a la cita, en cuatro pasos
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative bg-kaleo-cream rounded-2xl p-6 md:p-8 border border-kaleo-terracotta/10 hover:border-kaleo-terracotta/20 transition-all duration-300"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Number */}
              <span className="font-display text-6xl md:text-7xl text-kaleo-terracotta/15 leading-none select-none">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="font-body text-sm md:text-base font-semibold text-kaleo-earth mt-4 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-body text-xs md:text-sm text-kaleo-earth/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
