// Site-wide configuration
export interface SiteConfig {
  language: string;
  siteName: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "es",
  siteName: "Solución Clínica",
  siteDescription: "Plataforma de IA que analiza informes médicos oncológicos, busca ensayos clínicos compatibles, identifica centros de referencia en España y gestiona citas médicas.",
};

// Hero Section
export interface HeroConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  backgroundAlt: "Tecnología médica avanzada para análisis oncológico",
  title: "Solución Clínica",
  subtitle: "Análisis oncológico con inteligencia artificial",
};

// Narrative Text Section
export interface NarrativeTextConfig {
  line1: string;
  line2: string;
  line3: string;
}

export const narrativeTextConfig: NarrativeTextConfig = {
  line1: "Cada informe médico esconde opciones que merecen ser encontradas",
  line2: "Nuestra inteligencia artificial analiza tus informes oncológicos en segundos",
  line3: "Buscamos ensayos clínicos compatibles, identificamos centros de excelencia y expertos en España. Y si lo necesitas, nuestro equipo médico gestiona todo por ti.",
};

// ZigZag Grid Section
export interface ZigZagGridItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
}

export interface ZigZagGridConfig {
  sectionLabel: string;
  sectionTitle: string;
  items: ZigZagGridItem[];
}

export const zigZagGridConfig: ZigZagGridConfig = {
  sectionLabel: "Nuestros Servicios",
  sectionTitle: "Todo lo que necesitas, informe a informe",
  items: [
    {
      id: "analisis-ia",
      title: "Análisis con Inteligencia Artificial",
      subtitle: "Tecnología de vanguardia",
      description: "Sube tu informe en PDF. Nuestra IA extrae diagnósticos, líneas de tratamiento, valores analíticos, estadificación (Child-Pugh, ECOG, BCLC) y barreras de elegibilidad. Multi-modelo con redundancia: Claude + Gemini. Resultado en menos de 5 minutos.",
      image: "/grid-1.jpg",
      imageAlt: "Análisis de informes médicos con IA",
      reverse: false,
    },
    {
      id: "ensayos",
      title: "Ensayos Clínicos",
      subtitle: "Acceso a la investigación",
      description: "Cruce automático contra ensayos activos en España. Score de compatibilidad, barreras y centros participantes. Indexamos más de 40.000 ensayos de ClinicalTrials.gov, REEC y CTIS.",
      image: "/card-2.jpg",
      imageAlt: "Centros de investigación clínica",
      reverse: true,
    },
    {
      id: "centros",
      title: "Centros de Excelencia",
      subtitle: "Los mejores hospitales",
      description: "Ranking de hospitales de máximo nivel para tu enfermedad concreta. Unidades especializadas, volumen de casos e investigadores principales. Más de 350 centros hospitalarios en nuestra red.",
      image: "/grid-2.jpg",
      imageAlt: "Centros médicos de excelencia",
      reverse: false,
    },
    {
      id: "gestoria",
      title: "Gestoría Clínica",
      subtitle: "Concepto único en España",
      description: "Enviamos personalmente informes elaborados y revisados por nuestros médicos para optimizar la presentación de tu caso a los centros de referencia. Gestionamos citas, derivaciones e inscripciones en ensayos. No existe otro servicio igual.",
      image: "/grid-4.jpg",
      imageAlt: "Gestión clínica personalizada",
      reverse: true,
    },
  ],
};

// Breath Section
export interface BreathSectionConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
  description: string;
}

export const breathSectionConfig: BreathSectionConfig = {
  backgroundImage: "/breath-bg.jpg",
  backgroundAlt: "Laboratorio de investigación médica",
  title: "Tu caso merece toda la información disponible",
  subtitle: "Empieza hoy",
  description: "Sube tu informe médico y elige el análisis que necesitas. Sin suscripciones, sin compromisos. Análisis completo en menos de 5 minutos, disponible 24/7.",
};

// Card Stack Section
export interface CardStackItem {
  id: number;
  image: string;
  title: string;
  description: string;
  rotation: number;
}

export interface CardStackConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: CardStackItem[];
}

export const cardStackConfig: CardStackConfig = {
  sectionTitle: "Elige tu informe",
  sectionSubtitle: "Precios transparentes",
  cards: [
    {
      id: 1,
      image: "/card-1.jpg",
      title: "Ensayos Clínicos — 99€",
      description: "Matching completo contra ClinicalTrials.gov, REEC y CTIS. Score de compatibilidad, barreras de elegibilidad identificadas y centros participantes en España.",
      rotation: -2,
    },
    {
      id: 2,
      image: "/card-3.jpg",
      title: "Segundas Opiniones — 49€",
      description: "Identificación de especialistas en tu patología con publicaciones, experiencia y centro donde trabajan. Informe PDF profesional descargable.",
      rotation: 1,
    },
    {
      id: 3,
      image: "/grid-3.jpg",
      title: "Centros de Excelencia — 49€",
      description: "Ranking de centros de máximo nivel para tu caso. Unidades especializadas por patología, volumen de casos e investigadores principales.",
      rotation: -1,
    },
  ],
};

// Footer Section
export interface FooterContactItem {
  type: "email" | "phone";
  label: string;
  value: string;
  href: string;
}

export interface FooterSocialItem {
  platform: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  description: string;
  ctaText: string;
  contact: FooterContactItem[];
  locationLabel: string;
  address: string[];
  socialLabel: string;
  socials: FooterSocialItem[];
  logoText: string;
  copyright: string;
  links: { label: string; href: string }[];
}

export const footerConfig: FooterConfig = {
  heading: "Analiza tu caso hoy",
  description: "Sube tu informe médico y descubre todas las opciones disponibles para tu tratamiento. Nuestro equipo está listo para ayudarte.",
  ctaText: "Acceder a la plataforma",
  contact: [
    {
      type: "email",
      label: "info@solucionclinica.com",
      value: "info@solucionclinica.com",
      href: "mailto:info@solucionclinica.com",
    },
  ],
  locationLabel: "Ubicación",
  address: ["España", "Servicio disponible nacionalmente"],
  socialLabel: "Síguenos",
  socials: [
    {
      platform: "instagram",
      href: "https://instagram.com/solucionclinica",
    },
  ],
  logoText: "Solución Clínica",
  copyright: "© 2026 Solución Clínica. Este servicio no sustituye la consulta médica profesional.",
  links: [
    { label: "Aviso Legal", href: "#aviso-legal" },
    { label: "Privacidad", href: "#privacidad" },
    { label: "Cookies", href: "#cookies" },
  ],
};
