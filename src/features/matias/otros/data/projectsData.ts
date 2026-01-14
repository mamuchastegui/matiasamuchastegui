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
      es: 'Plataforma de fitness con planes de entrenamiento generados por IA, biblioteca de 2000+ ejercicios y sistema de gestión para trainers y gimnasios.',
      en: 'Fitness platform with AI-generated workout plans, 2000+ exercise library, and management system for trainers and gyms.',
    },
    technologies: ['Astro', 'React', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Drizzle'],
    url: 'https://gym.condamind.com',
    status: 'active',
  },
  {
    id: 'condamind',
    name: 'Condamind',
    image: condamindImg,
    description: {
      es: 'Ecosistema de automatización para gimnasios: WhatsApp assistant 24/7, panel de administración con pagos integrados, y app de entrenamiento para clientes.',
      en: 'Automation ecosystem for gyms: 24/7 WhatsApp assistant, admin dashboard with integrated payments, and training app for clients.',
    },
    technologies: ['Node.js', 'OpenAI', 'WhatsApp API', 'PostgreSQL', 'MercadoPago'],
    url: 'https://condamind.com/gym',
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
