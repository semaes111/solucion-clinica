import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface LegalNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  section: 'aviso-legal' | 'privacidad' | 'cookies' | null;
}

const legalContent: Record<string, { title: string; body: string }> = {
  'aviso-legal': {
    title: 'Aviso Legal',
    body: `DATOS IDENTIFICATIVOS

En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:

Titular: [NOMBRE O RAZÓN SOCIAL]
NIF/CIF: [NÚMERO]
Domicilio: [DIRECCIÓN COMPLETA]
Email: info@solucionclinica.com
Inscrita en: [REGISTRO MERCANTIL / DATOS DE INSCRIPCIÓN]

OBJETO

Este sitio web tiene como finalidad facilitar el acceso a un servicio tecnológico de análisis de informes médicos oncológicos mediante inteligencia artificial. Los informes generados son orientativos y no constituyen diagnóstico médico ni sustituyen la consulta con profesionales sanitarios cualificados.

PROPIEDAD INTELECTUAL E INDUSTRIAL

Todos los contenidos del sitio web, incluyendo textos, imágenes, logotipos, diseño gráfico y código fuente, están protegidos por la legislación vigente en materia de propiedad intelectual e industrial, quedando prohibida su reproducción, distribución o transformación sin autorización expresa.

LIMITACIÓN DE RESPONSABILIDAD

El titular no garantiza que los contenidos sean exactos o estén libres de errores. Los análisis generados por inteligencia artificial son herramientas de apoyo y en ningún caso sustituyen el criterio médico profesional. El usuario asume la responsabilidad del uso de la información proporcionada.

LEGISLACIÓN APLICABLE

Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web, será de aplicación la legislación española.`,
  },
  privacidad: {
    title: 'Política de Privacidad',
    body: `RESPONSABLE DEL TRATAMIENTO

Identidad: [NOMBRE O RAZÓN SOCIAL]
NIF/CIF: [NÚMERO]
Dirección: [DIRECCIÓN]
Email: info@solucionclinica.com

FINALIDAD DEL TRATAMIENTO

Los datos personales proporcionados se tratarán con las siguientes finalidades:
- Gestión y prestación de los servicios contratados.
- Análisis de informes médicos mediante inteligencia artificial.
- Comunicación con el usuario respecto al servicio.

LEGITIMACIÓN

La base legal para el tratamiento de sus datos es el consentimiento del usuario y la ejecución del contrato de servicio (art. 6.1.a y 6.1.b RGPD).

CONSERVACIÓN DE DATOS

Los datos personales se conservarán mientras se mantenga la relación de servicio y durante los plazos legalmente establecidos. Los informes médicos subidos se procesan y pueden ser eliminados según la política de retención vigente.

DESTINATARIOS

No se cederán datos a terceros salvo obligación legal. Los proveedores tecnológicos que intervienen en el procesamiento (servicios de IA) actúan como encargados del tratamiento bajo acuerdo de confidencialidad.

DERECHOS DEL USUARIO

Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad dirigiéndose a info@solucionclinica.com. Asimismo, tiene derecho a presentar reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).

DATOS DE SALUD

Los informes médicos que el usuario facilita son datos de categoría especial (art. 9 RGPD). Su tratamiento se basa en el consentimiento explícito del usuario, que se recaba antes de cada análisis.`,
  },
  cookies: {
    title: 'Política de Cookies',
    body: `¿QUÉ SON LAS COOKIES?

Las cookies son pequeños archivos de texto que se almacenan en su dispositivo al visitar un sitio web. Se utilizan para facilitar la navegación, recordar preferencias y analizar el uso del sitio.

COOKIES UTILIZADAS

Cookies técnicas (necesarias):
- Cookies de sesión para el funcionamiento del sitio.
- Cookies de preferencias de usuario.

Cookies analíticas:
- Utilizadas para entender cómo los usuarios interactúan con el sitio web, de forma anónima y agregada.

GESTIÓN DE COOKIES

Puede configurar su navegador para rechazar cookies o para ser avisado cuando se envíe una cookie. La desactivación de cookies técnicas puede afectar al funcionamiento del sitio.

CONSENTIMIENTO

Al continuar navegando por este sitio web, acepta el uso de las cookies descritas. Puede modificar su consentimiento en cualquier momento a través de la configuración de su navegador.

ACTUALIZACIÓN

Esta política de cookies puede ser actualizada en función de exigencias legislativas o para adaptarla a instrucciones de la Agencia Española de Protección de Datos.`,
  },
};

const LegalNotice = ({ isOpen, onClose, section }: LegalNoticeProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !section || !legalContent[section]) return null;

  const content = legalContent[section];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-kaleo-charcoal/80 backdrop-blur-sm" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative bg-kaleo-cream rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-kaleo-cream border-b border-kaleo-terracotta/10 px-6 md:px-8 py-5 flex items-center justify-between z-10">
          <h2
            id="legal-title"
            className="font-display text-2xl md:text-3xl text-kaleo-earth"
          >
            {content.title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-kaleo-terracotta/10 flex items-center justify-center hover:bg-kaleo-terracotta/20 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-kaleo-earth" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 md:px-8 py-6 overflow-y-auto max-h-[calc(80vh-76px)]">
          <div className="font-body text-sm text-kaleo-earth/70 leading-relaxed whitespace-pre-line">
            {content.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
