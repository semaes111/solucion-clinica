import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
};

const legalSections = ['aviso-legal', 'privacidad', 'cookies'] as const;
type LegalSection = typeof legalSections[number];

interface FooterProps {
  onLegalClick?: (section: LegalSection) => void;
}

const Footer = ({ onLegalClick }: FooterProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;

    if (!section || !image || !content || !logo) return;

    // Set initial states
    gsap.set(content.children, { opacity: 0, y: 30 });
    gsap.set(logo, { opacity: 0, y: 50 });

    const triggers: ScrollTrigger[] = [];

    // Content reveal
    const contentTrigger = ScrollTrigger.create({
      trigger: content,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(content.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });
    triggers.push(contentTrigger);

    // Logo reveal
    const logoTrigger = ScrollTrigger.create({
      trigger: logo,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(logo, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        });
      },
    });
    triggers.push(logoTrigger);

    // Background parallax
    const imageTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(image, { y: -self.progress * 50 });
      },
    });
    triggers.push(imageTrigger);

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  if (!footerConfig.heading && !footerConfig.logoText) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.replace('#', '') as LegalSection;
    if (legalSections.includes(hash) && onLegalClick) {
      e.preventDefault();
      onLegalClick(hash);
    }
  };

  return (
    <footer
      ref={sectionRef}
      className="relative w-full bg-kaleo-charcoal text-kaleo-cream overflow-hidden"
    >
      {/* Background Gradient */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-kaleo-charcoal via-kaleo-earth to-kaleo-charcoal opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Upper Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-24 md:pt-32 pb-16">
          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
          >
            {/* Left Column - CTA */}
            <div className="lg:col-span-5">
              <h2 className="font-display text-headline text-kaleo-cream">
                {footerConfig.heading}
              </h2>
              <p className="font-body text-sm text-kaleo-cream/60 mt-6 max-w-md leading-relaxed">
                {footerConfig.description}
              </p>
              {footerConfig.ctaText && (
                <a
                  href="https://app.solucionclinica.com"
                  className="inline-flex items-center gap-3 mt-10 px-10 py-5 bg-kaleo-terracotta hover:bg-kaleo-cream text-kaleo-cream hover:text-kaleo-charcoal rounded-full font-body text-base uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {footerConfig.ctaText}
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Right Column - Contact Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact */}
                {footerConfig.contact.length > 0 && (
                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta mb-4">
                      Contacto
                    </h4>
                    <ul className="space-y-3">
                      {footerConfig.contact.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.href}
                            className="font-body text-sm text-kaleo-cream/70 hover:text-kaleo-cream transition-colors flex items-center gap-2"
                          >
                            {item.type === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Address */}
                {footerConfig.address.length > 0 && (
                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta mb-4">
                      {footerConfig.locationLabel}
                    </h4>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-kaleo-cream/70 mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-kaleo-cream/70 leading-relaxed">
                        {footerConfig.address.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < footerConfig.address.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}

                {/* Social */}
                {footerConfig.socials.length > 0 && (
                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta mb-4">
                      {footerConfig.socialLabel}
                    </h4>
                    <div className="flex gap-4">
                      {footerConfig.socials.map((social, index) => {
                        const Icon = iconMap[social.platform.toLowerCase()] || Instagram;
                        return (
                          <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-kaleo-cream/20 flex items-center justify-center hover:border-kaleo-terracotta hover:bg-kaleo-terracotta/10 transition-all"
                            aria-label={`Visitar ${social.platform}`}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Large Logo */}
        {footerConfig.logoText && (
          <div
            ref={logoRef}
            className="border-t border-kaleo-cream/10 py-12 md:py-16"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
              <svg
                viewBox="0 0 800 80"
                className="w-full max-w-4xl mx-auto h-auto opacity-20"
                fill="currentColor"
                role="img"
                aria-label={footerConfig.logoText}
              >
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="font-display"
                  style={{
                    fontSize: '56px',
                    fontFamily: 'Cormorant Garamond, serif',
                    letterSpacing: '0.05em'
                  }}
                >
                  {footerConfig.logoText}
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-kaleo-cream/10 py-6">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-kaleo-cream/40">
              {footerConfig.copyright}
            </p>
            {footerConfig.links.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {footerConfig.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-body text-xs text-kaleo-cream/40 hover:text-kaleo-cream transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
