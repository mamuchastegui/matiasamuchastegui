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
      es: 'Necesitaba motivación para el gym, así que convertí mi entrenamiento en un juego. Luego vi que mi trainer también tenía problemas gestionando clientes, así que le construí un panel. Lo que empezó como solución personal ahora es una plataforma con 2000+ ejercicios que gimnasios usan en producción. Problema personal → Solución profesional.',
      en: 'I needed gym motivation, so I turned my training into a game. Then I saw my trainer also struggled managing clients, so I built him a dashboard. What started as a personal solution is now a platform with 2000+ exercises that gyms use in production. Personal problem → Professional solution.',
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
      es: 'Micelaria nace como un proyecto personal para construir un e-commerce end-to-end desde cero. Definí el producto (extractos de hongos adaptógenos), desarrollé la identidad de marca, el packaging, los contenidos y la web. El foco estuvo en validar una idea, diseñar un producto coherente y ejecutar todo el ciclo, desde concepto hasta go-to-market.',
      en: 'Micelaria was born as a personal project to build an e-commerce end-to-end from scratch. I defined the product (adaptogenic mushroom extracts), developed the brand identity, packaging, content and website. The focus was on validating an idea, designing a coherent product and executing the full cycle, from concept to go-to-market.',
    },
    technologies: ['Next.js', 'Stripe', 'Sanity CMS', 'Vercel'],
    status: 'active',
  },
  {
    id: 'cordobarollea',
    name: 'Córdoba Rollea',
    image: cordobarolleaImg,
    description: {
      es: 'La comunidad rollera organizaba salidas en grupos de WhatsApp. El spam mataba todo, la info se perdía, y nuevos patinadores no sabían si una salida era para su nivel. Construí esta plataforma para organizar salidas con niveles, y agregué donaciones para financiar eventos. Ahora somos 500+ freeskaters con todo en un solo lugar.',
      en: 'The skating community organized rides in WhatsApp groups. Spam killed everything, info got lost, and new skaters didn\'t know if a ride matched their level. I built this platform to organize rides with levels, and added donations to fund events. Now we\'re 500+ freeskaters with everything in one place.',
    },
    technologies: ['React', 'Firebase', 'Google Maps API', 'PWA'],
    status: 'active',
  },
  {
    id: 'condamind',
    name: 'Condamind',
    image: condamindImg,
    description: {
      es: 'Asistente de WhatsApp con IA que responde clientes 24/7, agenda turnos y procesa pagos. Construido con la misma arquitectura enterprise que usé en MercadoLibre y Pomelo, pero diseñado para que negocios pequeños accedan a tecnología de primer nivel. Calidad enterprise sin necesitar equipos de 30 personas.',
      en: 'AI WhatsApp assistant that answers clients 24/7, schedules appointments, and processes payments. Built with the same enterprise architecture I used at MercadoLibre and Pomelo, but designed so small businesses can access top-tier technology. Enterprise quality without needing 30-person teams.',
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
      es: 'El sistema de productividad que construí para mis propias necesidades. Gestión de tareas, hábitos y objetivos conectados con recordatorios inteligentes vía WhatsApp. Si sobrevive a mi día a día exigente entre desarrollo, gym, skating y proyectos, funciona.',
      en: 'The productivity system I built for my own needs. Task, habit, and goal management connected with smart WhatsApp reminders. If it survives my demanding daily life between development, gym, skating and projects, it works.',
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    status: 'development',
  },
];
