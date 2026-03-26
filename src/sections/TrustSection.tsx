import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, UserCheck, FileCheck, HeartPulse } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  {
    icon: UserCheck,
    title: 'Equipo médico especializado',
    description: 'Informes elaborados y revisados por equipo interdisciplinar',
  },
  {
    icon: ShieldCheck,
    title: 'Datos protegidos — RGPD',
    description: 'Cumplimos la normativa europea de protección de datos',
  },
  {
    icon: FileCheck,
    title: 'Informes verificados',
    description: 'Cada análisis pasa por un proceso de validación clínica',
  },
  {
    icon: HeartPulse,
    title: 'Complemento médico',
    description: 'Este servicio no sustituye la consulta médica profesional',
  },
];

const TrustSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || items.length === 0) return;

    gsap.set(items, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 bg-kaleo-sand border-t border-kaleo-terracotta/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="flex flex-col items-center text-center px-3 py-4"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="w-10 h-10 rounded-full bg-kaleo-terracotta/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-kaleo-terracotta" />
                </div>
                <h4 className="font-body text-xs md:text-sm font-medium text-kaleo-earth mb-1">
                  {item.title}
                </h4>
                <p className="font-body text-[11px] md:text-xs text-kaleo-earth/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
