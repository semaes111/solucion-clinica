import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    without: { title: 'Informes incomprensibles.', desc: 'Estadificación, scores y valores que el paciente no puede interpretar solo.' },
    with: { title: 'Análisis claro en 60 segundos.', desc: 'Diagnóstico, tratamientos, scores y barreras de elegibilidad, explicados.' },
  },
  {
    without: { title: 'Ensayos imposibles de encontrar.', desc: 'Miles de estudios en registros distintos con criterios técnicos.' },
    with: { title: 'Matching automático.', desc: 'Tu perfil cruzado contra ClinicalTrials.gov, REEC y CTIS con % de compatibilidad.' },
  },
  {
    without: { title: 'No saber a dónde ir.', desc: 'Qué hospital tiene experiencia en tu caso. Qué experto lidera la investigación.' },
    with: { title: 'Centros de excelencia identificados.', desc: 'Ranking de hospitales de máximo nivel para tu enfermedad en España y Europa.' },
  },
  {
    without: { title: 'Burocracia agotadora.', desc: 'Citas, derivaciones, contacto con centros — cuando deberías estar descansando.' },
    with: { title: 'Gestoría clínica con informes médicos.', desc: 'Nuestros médicos revisan y optimizan la presentación de tu caso. Gestionamos todo por ti.' },
  },
];

const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const header = headerRef.current;
    const rows = rowsRef.current.filter(Boolean) as HTMLDivElement[];
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

    if (rows.length > 0) {
      gsap.set(rows, { opacity: 0, y: 25 });
      triggers.push(
        ScrollTrigger.create({
          trigger: rows[0],
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(rows, {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            });
          },
        })
      );
    }

    return () => { triggers.forEach(t => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-kaleo-cream/50"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            El problema
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4 max-w-3xl">
            Un diagnóstico oncológico abre un laberinto de decisiones en el peor momento posible
          </h2>
        </div>

        {/* Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Column Headers */}
          <div className="px-4 pb-4">
            <h4 className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/50 font-semibold">
              Sin Solución Clínica
            </h4>
          </div>
          <div className="px-4 pb-4">
            <h4 className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta font-semibold">
              Con Solución Clínica
            </h4>
          </div>

          {/* Rows */}
          {problems.map((row, index) => (
            <div
              key={index}
              ref={(el) => { rowsRef.current[index] = el; }}
              className="contents"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Without */}
              <div className={`flex items-start gap-3 p-4 md:p-5 rounded-l-xl ${
                index % 2 === 0 ? 'bg-kaleo-sand/60' : ''
              }`}>
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </div>
                <p className="font-body text-sm text-kaleo-earth/70">
                  <strong className="text-kaleo-earth">{row.without.title}</strong>{' '}
                  {row.without.desc}
                </p>
              </div>

              {/* With */}
              <div className={`flex items-start gap-3 p-4 md:p-5 rounded-r-xl ${
                index % 2 === 0 ? 'bg-kaleo-sand/60' : ''
              }`}>
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="font-body text-sm text-kaleo-earth/70">
                  <strong className="text-kaleo-earth">{row.with.title}</strong>{' '}
                  {row.with.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
