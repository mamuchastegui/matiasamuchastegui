// Import project screenshots
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
    id: 'condamind',
    name: 'Condamind',
    image: condamindImg,
    description: {
      es: 'Asistente de IA para WhatsApp que permite a administradores de edificios gestionar comunicaciones con residentes de forma automatizada e inteligente.',
      en: 'AI assistant for WhatsApp that allows building administrators to manage communications with residents in an automated and intelligent way.',
    },
    technologies: ['Node.js', 'OpenAI', 'WhatsApp API', 'PostgreSQL', 'Redis'],
    status: 'active',
  },
  {
    id: 'senda',
    name: 'Senda',
    image: sendaImg,
    description: {
      es: 'Sistema de productividad personal que combina gestión de tareas, hábitos y objetivos con seguimiento inteligente y recordatorios.',
      en: 'Personal productivity system that combines task, habit, and goal management with intelligent tracking and reminders.',
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    status: 'development',
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
];
