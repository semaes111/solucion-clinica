import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Precios', href: '#precios' },
  { label: 'Contacto', href: 'mailto:info@solucionclinica.com' },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Entrance animation
    gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );

    // Scroll listener for background change
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-kaleo-charcoal/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ opacity: 0 }}
    >
      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-kaleo-cream focus:text-kaleo-charcoal focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Ir al contenido principal
      </a>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl md:text-2xl text-kaleo-cream tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Solución Clínica
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-cream/70 hover:text-kaleo-cream transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* CTA */}
            <a
              href="https://app.solucionclinica.com"
              className="font-body text-xs uppercase tracking-[0.15em] px-6 py-2.5 bg-kaleo-cream text-kaleo-charcoal rounded-full hover:bg-kaleo-terracotta hover:text-kaleo-cream transition-all duration-300"
            >
              Analizar mi caso
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-kaleo-cream"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-kaleo-charcoal/95 backdrop-blur-md px-6 pb-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block font-body text-sm uppercase tracking-[0.15em] text-kaleo-cream/70 hover:text-kaleo-cream transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://app.solucionclinica.com"
            className="block text-center font-body text-sm uppercase tracking-[0.15em] px-6 py-3 bg-kaleo-cream text-kaleo-charcoal rounded-full hover:bg-kaleo-terracotta hover:text-kaleo-cream transition-all duration-300 mt-4"
          >
            Analizar mi caso
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
