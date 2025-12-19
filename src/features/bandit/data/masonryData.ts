import { MasonryItem } from '../../xcons/components/Masonry';
import calendarRedesign from '../../../assets/Proyectos Bandit/Calendar redesign.png';
import modalesInformativos from '../../../assets/Proyectos Bandit/Modales informativos.png';
import nuevaHome from '../../../assets/Proyectos Bandit/Nueva Home.png';
import nuevoOnboarding from '../../../assets/Proyectos Bandit/Nuevo onboarding.png';
import nuevosComponentes from '../../../assets/Proyectos Bandit/Nuevos componentes.png';

export const masonryItemText = {
  calendarRedesign: {
    title: { es: 'Rediseño del calendario', en: 'Calendar Redesign' },
    description: {
      es: 'Rediseñé completamente el calendario de Bandit, que es el corazón de la plataforma. Simplifiqué la interfaz, mejoré la legibilidad de los eventos y optimicé la experiencia de creación y edición. El nuevo diseño reduce significativamente la carga cognitiva y hace que la gestión de giras sea más intuitiva.',
      en: "I completely redesigned Bandit's calendar, which is the heart of the platform. I simplified the interface, improved event readability, and optimized the creation and editing experience. The new design significantly reduces cognitive load and makes tour management more intuitive.",
    },
  },
  modalesInformativos: {
    title: { es: 'Modales informativos', en: 'Informative Modals' },
    description: {
      es: 'Desarrollé un sistema de modales informativos que guían a los usuarios a través de las funcionalidades más complejas de la plataforma. Estos modales proporcionan contexto y ayuda en tiempo real, reduciendo la curva de aprendizaje y mejorando la adopción de nuevas características.',
      en: "I developed a system of informative modals that guide users through the platform's most complex functionalities. These modals provide real-time context and help, reducing the learning curve and improving adoption of new features.",
    },
  },
  nuevaHome: {
    title: { es: 'Nueva Home', en: 'New Home' },
    description: {
      es: 'Rediseñé completamente la página de inicio para proporcionar una visión general más clara y accionable del estado de las giras. La nueva home prioriza la información más relevante y facilita el acceso rápido a las tareas más frecuentes.',
      en: 'I completely redesigned the home page to provide a clearer and more actionable overview of tour status. The new home prioritizes the most relevant information and facilitates quick access to the most frequent tasks.',
    },
  },
  nuevoOnboarding: {
    title: { es: 'Nuevo onboarding', en: 'New Onboarding' },
    description: {
      es: 'Creé un proceso de onboarding completamente nuevo que introduce gradualmente a los usuarios a las capacidades de Bandit. El flujo está diseñado para ser progresivo y contextual, asegurando que los usuarios comprendan el valor de la plataforma desde el primer uso.',
      en: "I created a completely new onboarding process that gradually introduces users to Bandit's capabilities. The flow is designed to be progressive and contextual, ensuring users understand the platform's value from first use.",
    },
  },
  nuevosComponentes: {
    title: { es: 'Nuevos componentes', en: 'New Components' },
    description: {
      es: 'En base a investigaciones, entendimos que no hay una competencia fuerte en el mercado, y muchas soluciones que provee Bandit son innovadoras, lo cual requirió crear componentes personalizados y ajustados a las necesidades de su tipo de público, como un data picker donde aparte de seleccionar rangos se puedan seleccionar fechas por separado, modales donde se puedan crear eventos de manera más rápida tanto en desktop como mobile. Se elegieron cuidadosamente el tipo de inputs para cada formulario. Con esto notamos una gran mejora en el comportamiento de los usuarios, creando eventos de manera mucho más intuitiva.',
      en: 'Based on research, we understood that there is no strong competition in the market, and many solutions that Bandit provides are innovative, which required creating custom components tailored to the needs of their type of audience, such as a date picker where apart from selecting ranges, dates can be selected separately, modals where events can be created more quickly on both desktop and mobile. The type of inputs for each form were carefully chosen. With this we noticed a great improvement in user behavior, creating events in a much more intuitive way.',
    },
  },
} as const;

type MasonryItemKey = keyof typeof masonryItemText;

export const masonryItemDetails: Array<
  Omit<MasonryItem, 'title' | 'description' | 'id'> & { id: string | number; key: MasonryItemKey }
> = [
  {
    id: 'calendar-redesign',
    key: 'calendarRedesign',
    image: calendarRedesign,
    height: 320,
    type: 'image' as const,
  },
  {
    id: 'modales-informativos',
    key: 'modalesInformativos',
    image: modalesInformativos,
    height: 380,
    type: 'image' as const,
  },
  {
    id: 'nueva-home',
    key: 'nuevaHome',
    image: nuevaHome,
    height: 350,
    type: 'image' as const,
  },
  {
    id: 'nuevo-onboarding',
    key: 'nuevoOnboarding',
    image: nuevoOnboarding,
    height: 400,
    type: 'image' as const,
  },
  {
    id: 'nuevos-componentes',
    key: 'nuevosComponentes',
    image: nuevosComponentes,
    height: 330,
    type: 'image' as const,
  },
];

export const createMasonryData = (language: 'es' | 'en'): MasonryItem[] => {
  return masonryItemDetails.map(item => {
    const texts = masonryItemText[item.key];
    return {
      ...item,
      title: texts.title[language],
      description: texts.description[language],
    } as MasonryItem;
  });
};
