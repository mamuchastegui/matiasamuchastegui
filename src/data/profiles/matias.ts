import { Profile } from '../../types/profile';

// Reuse existing icons where available
import reactIcon from '../../assets/images/Logos/react-svgrepo-com.svg';
import mongoDbIcon from '../../assets/images/Logos/mongodb-svgrepo-com.svg';

// For missing icons, we'll use placeholders or add them later
// TODO: Add icons for Node.js, Go, Python, PostgreSQL, AWS, Docker, Kubernetes

export const matiasProfile: Profile = {
  id: 'matias',
  name: 'Matias Amuchastegui',
  titleKey: 'matias.heroTitle',
  subtitle1Key: 'matias.heroSubtitle1',
  subtitle2Key: 'matias.heroSubtitle2',
  description1Key: 'matias.heroDescription1',
  description2Key: 'matias.heroDescription2',
  description3Key: 'matias.heroDescription3',
  description4Key: 'matias.heroDescription4',
  // heroVideo: '/assets/newAssets/Matias.mp4', // TODO: Add video
  heroImage: '/assets/newAssets/matias-profile.jpg', // Fallback to image
  socialLinks: {
    github: 'https://github.com/matiasamuchastegui',
    linkedin: 'https://linkedin.com/in/matias-amuchastegui',
    x: 'https://x.com/matiasamu',
    email: 'hello@matiasamuchastegui.com',
  },
  technologies: [
    { name: 'React', src: reactIcon },
    { name: 'Node.js', src: reactIcon }, // TODO: Replace with actual icon
    { name: 'Go', src: reactIcon }, // TODO: Replace with actual icon
    { name: 'Python', src: reactIcon }, // TODO: Replace with actual icon
    { name: 'PostgreSQL', src: mongoDbIcon }, // TODO: Replace with actual icon
    { name: 'AWS', src: reactIcon }, // TODO: Replace with actual icon
    { name: 'Docker', src: reactIcon }, // TODO: Replace with actual icon
    { name: 'Kubernetes', src: reactIcon }, // TODO: Replace with actual icon
  ],
  services: [
    {
      id: 'backend-development',
      icon: 'Server',
      titleKey: 'matias.services.backend.title',
      descriptionKey: 'matias.services.backend.description',
      skills: ['Node.js', 'Go', 'Python', 'Microservices'],
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
    {
      id: 'infrastructure',
      icon: 'Cloud',
      titleKey: 'matias.services.infrastructure.title',
      descriptionKey: 'matias.services.infrastructure.description',
      skills: ['AWS', 'GCP', 'Docker', 'Kubernetes'],
      gradient: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
    },
    {
      id: 'ai-integration',
      icon: 'Brain',
      titleKey: 'matias.services.ai.title',
      descriptionKey: 'matias.services.ai.description',
      skills: ['LLMs', 'OpenAI', 'LangChain', 'RAG'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
    {
      id: 'fullstack-development',
      icon: 'Code2',
      titleKey: 'matias.services.fullstack.title',
      descriptionKey: 'matias.services.fullstack.description',
      skills: ['React', 'TypeScript', 'Next.js', 'REST APIs'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  ],
  projects: [
    {
      link: '/matias/fusionads',
      text: 'FusionAds',
      color: '#F7480B',
      descriptionKey: 'matias.companyDescriptions.fusionads',
    },
    {
      link: '/matias/pomelo',
      text: 'Pomelo',
      color: '#7C3AED',
      descriptionKey: 'matias.companyDescriptions.pomelo',
    },
    {
      link: '/matias/mercadolibre',
      text: 'MercadoLibre',
      color: '#FFE600',
      descriptionKey: 'matias.companyDescriptions.mercadolibre',
    },
    {
      link: '/matias/otros',
      text: 'Otros',
      color: '#6B7280',
      descriptionKey: 'matias.companyDescriptions.otros',
    },
  ],
  experienceRoutes: [
    { path: 'fusionads', component: 'MatiasMaintenancePage' },
    { path: 'pomelo', component: 'MatiasMaintenancePage' },
    { path: 'mercadolibre', component: 'MatiasMaintenancePage' },
    { path: 'otros', component: 'MatiasMaintenancePage' },
  ],
};
