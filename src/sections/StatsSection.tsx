import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FlaskConical, Building2, Clock, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: FlaskConical,
    value: '40.000+',
    label: 'Ensayos clínicos indexados',
  },
  {
    icon: Building2,
    value: '350+',
    label: 'Centros hospitalarios',
  },
  {
    icon: Clock,
    value: '< 60s',
    label: 'Análisis completo',
  },
  {
    icon: Users,
    value: '24/7',
    label: 'Asistente disponible',
  },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || cards.length === 0) return;

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 40 });

    // Create scroll trigger for staggered reveal
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      className="relative w-full py-16 md:py-24 bg-kaleo-sand"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative bg-kaleo-cream rounded-2xl p-6 md:p-8 border border-kaleo-terracotta/10 hover:border-kaleo-terracotta/30 hover:shadow-lg transition-all duration-300"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-kaleo-terracotta/10 flex items-center justify-center mb-4 group-hover:bg-kaleo-terracotta/20 transition-colors">
                  <Icon className="w-6 h-6 text-kaleo-terracotta" />
                </div>

                {/* Value */}
                <div className="font-display text-3xl md:text-4xl text-kaleo-earth mb-2">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="font-body text-sm text-kaleo-earth/60 leading-relaxed">
                  {stat.label}
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-kaleo-terracotta/5 transform rotate-45 translate-x-4 -translate-y-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
