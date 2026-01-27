// Import project screenshots
import cratosImg from '../../../../assets/images/projects-matias/cratos.png';
import condamindImg from '../../../../assets/images/projects-matias/condamind.png';
import sendaImg from '../../../../assets/images/projects-matias/senda.png';
import micelariaImg from '../../../../assets/images/projects-matias/micelaria.png';
import cordobarolleaImg from '../../../../assets/images/projects-matias/cordobarollea.png';

export interface Project {
  id: string;
  name: string;
  image: string;
  description: {
    es: string;
    en: string;
  };
  technologies: string[];
  url?: string;
  github?: string;
  status: 'active' | 'archived' | 'development';
}

export const projectsData: Project[] = [
  {
    id: 'cratos',
    name: 'Cratos',
    image: cratosImg,
    description: {
      es: 'Después de años usando apps de fitness que no encajaban, decidí crear la mía. Hoy Cratos es una plataforma completa con 2000+ ejercicios, planes inteligentes, y un sistema que gimnasios y trainers usan en producción. Parte del ecosistema CondaMind.',
      en: "After years using fitness apps that didn't fit, I decided to build my own. Today Cratos is a complete platform with 2000+ exercises, smart plans, and a system that gyms and trainers use in production. Part of the CondaMind ecosystem.",
    },
    technologies: ['Astro', 'React', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Drizzle'],
    url: 'https://gym.condamind.com',
    status: 'active',
  },
  {
    id: 'micelaria',
    name: 'Micelaria',
    image: micelariaImg,
    description: {
      es: 'E-commerce especializado en cultivo de hongos gourmet y medicinales, con sistema de suscripciones y contenido educativo.',
      en: 'E-commerce specialized in gourmet and medicinal mushroom cultivation, with subscription system and educational content.',
    },
    technologies: ['Next.js', 'Stripe', 'Sanity CMS', 'Vercel'],
    status: 'active',
  },
  {
    id: 'cordobarollea',
    name: 'Córdoba Rollea',
    image: cordobarolleaImg,
    description: {
      es: 'Plataforma comunitaria para la escena de freeskating en Córdoba, con eventos, rutas, y conectividad entre patinadores.',
      en: 'Community platform for the freeskating scene in Córdoba, with events, routes, and connectivity between skaters.',
    },
    technologies: ['React', 'Firebase', 'Google Maps API', 'PWA'],
    status: 'active',
  },
  {
    id: 'condamind',
    name: 'Condamind',
    image: condamindImg,
    description: {
      es: 'Asistente de WhatsApp con IA en desarrollo para automatizar atención y operaciones. Enfocado en flujos reales y medición desde el día uno.',
      en: 'AI WhatsApp assistant in development to automate support and operations. Focused on real workflows and measurement from day one.',
    },
    technologies: ['Node.js', 'OpenAI', 'WhatsApp API', 'PostgreSQL', 'MercadoPago'],
    url: 'https://condamind.com',
    status: 'development',
  },
  {
    id: 'senda',
    name: 'Senda',
    image: sendaImg,
    description: {
      es: 'El sistema de productividad que construí para mis propias necesidades. Gestión de tareas, hábitos y objetivos conectados con recordatorios inteligentes vía WhatsApp. Si funciona para mi día a día exigente, funciona.',
      en: 'The productivity system I built for my own needs. Task, habit, and goal management connected with smart WhatsApp reminders. If it works for my demanding daily life, it works.',
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    status: 'development',
  },
];
