import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';

// Sections
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import NarrativeText from './sections/NarrativeText';
import StatsSection from './sections/StatsSection';
import TrustSection from './sections/TrustSection';
import CardStack from './sections/CardStack';
import BreathSection from './sections/BreathSection';
import ZigZagGrid from './sections/ZigZagGrid';
import Footer from './sections/Footer';
import LegalNotice from './sections/LegalNotice';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  const [legalSection, setLegalSection] = useState<'aviso-legal' | 'privacidad' | 'cookies' | null>(null);

  useEffect(() => {
    // Set document language if configured
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    // Refresh ScrollTrigger after all content is loaded
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Also refresh after a short delay to ensure images are loaded
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(refreshTimeout);
    };
  }, []);

  const handleLegalClick = (section: 'aviso-legal' | 'privacidad' | 'cookies') => {
    setLegalSection(section);
  };

  return (
    <div className="relative bg-kaleo-sand">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero />

        {/* Narrative Text Section */}
        <NarrativeText />

        {/* Stats Section */}
        <StatsSection />

        {/* Trust Badges */}
        <TrustSection />

        {/* Card Stack Parallax Gallery */}
        <CardStack />

        {/* BREATH Video Mask Section */}
        <BreathSection />

        {/* Zig-Zag Grid Section */}
        <ZigZagGrid />
      </main>

      {/* Footer */}
      <Footer onLegalClick={handleLegalClick} />

      {/* Legal Modals */}
      <LegalNotice
        isOpen={legalSection !== null}
        onClose={() => setLegalSection(null)}
        section={legalSection}
      />
    </div>
  );
}

export default App;
