import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const APP_URL = 'https://app.solucionclinica.com';

interface PricingCard {
  name: string;
  price: string;
  unit: string;
  subtitle: string;
  features: string[];
  recommended?: boolean;
}

interface ComboCard {
  name: string;
  price: string;
  originalPrice?: string;
  subtitle: string;
  highlighted?: boolean;
}

const pricingCards: PricingCard[] = [
  {
    name: 'Segundas Opiniones',
    price: '49€',
    unit: '/informe',
    subtitle: 'Expertos en tu patología',
    features: [
      'Análisis IA de tu informe médico',
      'Identificación de especialistas',
      'Publicaciones y experiencia',
      'Centro donde trabajan',
      'Informe PDF profesional descargable',
    ],
  },
  {
    name: 'Ensayos Clínicos',
    price: '99€',
    unit: '/informe',
    subtitle: 'Matching completo de ensayos',
    recommended: true,
    features: [
      'Análisis IA de tu informe médico',
      'Cruce contra ClinicalTrials.gov, REEC, CTIS',
      'Score de compatibilidad por ensayo',
      'Barreras de elegibilidad identificadas',
      'Centros participantes en España',
      'Informe PDF profesional descargable',
    ],
  },
  {
    name: 'Centros de Excelencia',
    price: '49€',
    unit: '/informe',
    subtitle: 'Los mejores hospitales para tu caso',
    features: [
      'Análisis IA de tu informe médico',
      'Ranking de centros de máximo nivel',
      'Unidades especializadas por patología',
      'Volumen de casos e investigadores',
      'Informe PDF profesional descargable',
    ],
  },
];

const comboCards: ComboCard[] = [
  {
    name: 'Gestoría personalizada',
    price: '199€',
    subtitle: 'Informe médico revisado + gestión completa de cita, derivación o inscripción en ensayo',
  },
  {
    name: 'Ensayos + Gestoría',
    price: '238€',
    originalPrice: '298€',
    subtitle: 'Informe de ensayos clínicos + gestoría personalizada',
    highlighted: true,
  },
  {
    name: 'Segundas op. + Gestoría',
    price: '198€',
    originalPrice: '248€',
    subtitle: 'Informe de segundas opiniones + gestoría personalizada',
    highlighted: true,
  },
  {
    name: 'Centros exc. + Gestoría',
    price: '198€',
    originalPrice: '248€',
    subtitle: 'Informe de centros de excelencia + gestoría personalizada',
    highlighted: true,
  },
];

const packCompleto = {
  name: 'Pack completo — 3 informes + Gestoría',
  price: '317€',
  originalPrice: '396€',
  subtitle: 'Ensayos + Segundas opiniones + Centros de excelencia + Gestoría personalizada',
  savings: 'Ahorro de 79€',
};

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const gestoriaRef = useRef<HTMLDivElement>(null);
  const combosRef = useRef<(HTMLDivElement | null)[]>([]);
  const packRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const gestoria = gestoriaRef.current;
    const combos = combosRef.current.filter(Boolean) as HTMLDivElement[];
    const pack = packRef.current;

    const triggers: ScrollTrigger[] = [];

    // Header animation
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

    // Pricing cards stagger
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

    // Gestoría header
    if (gestoria) {
      gsap.set(gestoria.children, { opacity: 0, y: 30 });
      triggers.push(
        ScrollTrigger.create({
          trigger: gestoria,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(gestoria.children, {
              opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            });
          },
        })
      );
    }

    // Combo cards
    if (combos.length > 0) {
      gsap.set(combos, { opacity: 0, y: 30 });
      triggers.push(
        ScrollTrigger.create({
          trigger: combos[0],
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(combos, {
              opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            });
          },
        })
      );
    }

    // Pack completo
    if (pack) {
      gsap.set(pack, { opacity: 0, y: 30 });
      triggers.push(
        ScrollTrigger.create({
          trigger: pack,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(pack, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
          },
        })
      );
    }

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="precios"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-kaleo-sand"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

        {/* ── Informes individuales ── */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            Precios
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            Paga solo por lo que necesitas
          </h2>
          <p className="font-body text-sm md:text-base text-kaleo-earth/60 mt-4 max-w-lg mx-auto">
            Sin suscripciones. Compra el informe que necesites, cuando lo necesites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingCards.map((card, index) => (
            <div
              key={card.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`relative bg-kaleo-cream rounded-2xl p-6 md:p-8 border transition-all duration-300 hover:shadow-lg ${
                card.recommended
                  ? 'border-kaleo-terracotta shadow-md'
                  : 'border-kaleo-terracotta/10 hover:border-kaleo-terracotta/30'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Recommended badge */}
              {card.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-kaleo-terracotta text-kaleo-cream font-body text-xs uppercase tracking-wider px-4 py-1.5 rounded-full">
                    Recomendado
                  </span>
                </div>
              )}

              {/* Header */}
              <h3 className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/70 mb-4">
                {card.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl md:text-5xl text-kaleo-earth">
                  {card.price}
                </span>
                <span className="font-body text-sm text-kaleo-earth/50">
                  {card.unit}
                </span>
              </div>

              <p className="font-body text-xs text-kaleo-earth/50 mb-6">
                {card.subtitle}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-kaleo-terracotta/10 mb-6" />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-kaleo-terracotta flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-kaleo-earth/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={APP_URL}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-body text-sm uppercase tracking-wider transition-all duration-300 ${
                  card.recommended
                    ? 'bg-kaleo-terracotta text-kaleo-cream hover:bg-kaleo-earth'
                    : 'bg-kaleo-earth text-kaleo-cream hover:bg-kaleo-terracotta'
                }`}
              >
                Solicitar informe
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* CTA redundante */}
        <div className="text-center mt-12">
          <a
            href={APP_URL}
            className="inline-flex items-center gap-3 px-10 py-4 bg-kaleo-cream text-kaleo-charcoal rounded-full font-body text-sm uppercase tracking-wider border border-kaleo-terracotta/20 hover:bg-kaleo-terracotta hover:text-kaleo-cream hover:border-kaleo-terracotta transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            Analizar mi caso ahora
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* ── Gestoría Clínica ── */}
        <div ref={gestoriaRef} className="text-center mt-28 md:mt-36 mb-16 md:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            Gestoría Clínica Personalizada
          </span>
          <p className="font-body text-sm md:text-base text-kaleo-earth/60 mt-6 max-w-2xl mx-auto leading-relaxed">
            Enviamos personalmente informes elaborados y revisados por nuestros médicos para optimizar la presentación de tu caso a los centros de referencia, y realizamos las gestiones oportunas para conseguir la cita que necesitas.
          </p>
        </div>

        {/* Combo cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {comboCards.map((card, index) => (
            <div
              key={card.name}
              ref={(el) => { combosRef.current[index] = el; }}
              className={`relative bg-kaleo-cream rounded-2xl p-6 text-center border transition-all duration-300 hover:shadow-lg ${
                card.highlighted
                  ? 'border-kaleo-terracotta/30'
                  : 'border-kaleo-terracotta/10'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              <h4 className="font-body text-xs md:text-sm font-medium text-kaleo-earth mb-4">
                {card.name}
              </h4>

              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="font-display text-3xl md:text-4xl text-kaleo-earth">
                  {card.price}
                </span>
                {card.originalPrice && (
                  <span className="font-body text-sm text-kaleo-earth/40 line-through">
                    {card.originalPrice}
                  </span>
                )}
              </div>

              <p className="font-body text-xs text-kaleo-earth/50 leading-relaxed mt-2">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Pack completo */}
        <div
          ref={packRef}
          className="mt-8 max-w-lg mx-auto bg-kaleo-cream rounded-2xl p-6 md:p-8 text-center border border-kaleo-terracotta/30 shadow-md"
          style={{ willChange: 'transform, opacity' }}
        >
          <h4 className="font-body text-sm font-medium text-kaleo-earth mb-4">
            {packCompleto.name}
          </h4>

          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="font-display text-4xl md:text-5xl text-kaleo-earth">
              {packCompleto.price}
            </span>
            <span className="font-body text-sm text-kaleo-earth/40 line-through">
              {packCompleto.originalPrice}
            </span>
          </div>

          <p className="font-body text-xs text-kaleo-earth/50 leading-relaxed mt-2 max-w-sm mx-auto">
            {packCompleto.subtitle} · <strong className="text-kaleo-terracotta">{packCompleto.savings}</strong>
          </p>
        </div>

        {/* CTA redundante */}
        <div className="text-center mt-12">
          <a
            href={APP_URL}
            className="inline-flex items-center gap-3 px-10 py-4 bg-kaleo-terracotta text-kaleo-cream rounded-full font-body text-sm uppercase tracking-wider hover:bg-kaleo-earth transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Acceder a la plataforma
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
