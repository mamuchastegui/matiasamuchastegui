import { Profile } from '../../types/profile';

// Import tech icons
import figmaIcon from '../../assets/images/Logos/figma-icon-one-color.svg';
import mongoDbIcon from '../../assets/images/Logos/mongodb-svgrepo-com.svg';
import n8nIcon from '../../assets/images/Logos/n8n.io.svg';
import postmanIcon from '../../assets/images/Logos/postman-svgrepo-com.svg';
import reactIcon from '../../assets/images/Logos/react-svgrepo-com.svg';
import photoshopIcon from '../../assets/images/Logos/adobe-photoshop-2 1.svg';
import huggingFaceIcon from '../../assets/images/Logos/huggingface-1 1.svg';
import replicateAiIcon from '../../assets/images/Logos/Replicate Ai.svg';

export const alexisProfile: Profile = {
  id: 'alexis',
  name: 'Alexis Vedia',
  titleKey: 'heroTitle',
  subtitle1Key: 'heroSubtitle1',
  subtitle2Key: 'heroSubtitle2',
  description1Key: 'heroDescription1',
  description2Key: 'heroDescription2',
  description3Key: 'heroDescription3',
  description4Key: 'heroDescription4',
  heroVideo: '/assets/newAssets/Alexis4.mp4',
  socialLinks: {
    github: 'https://github.com/AlexisVedia',
    linkedin: 'https://www.linkedin.com/in/alexis-vedia/',
    x: 'https://x.com/AlexisVedia',
    email: 'alexisleonelvedia@gmail.com',
  },
  technologies: [
    { name: 'Figma', src: figmaIcon },
    { name: 'MongoDB', src: mongoDbIcon },
    { name: 'n8n', src: n8nIcon },
    { name: 'Postman', src: postmanIcon },
    { name: 'React', src: reactIcon },
    { name: 'Adobe Photoshop', src: photoshopIcon },
    { name: 'HuggingFace', src: huggingFaceIcon },
    { name: 'Replicate', src: replicateAiIcon },
  ],
  services: [
    {
      id: 'frontend-development',
      icon: 'Code2',
      titleKey: 'services.frontend.title',
      descriptionKey: 'services.frontend.description',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 'wordpress-development',
      icon: 'FileCode2',
      titleKey: 'services.wordpress.title',
      descriptionKey: 'services.wordpress.description',
      skills: ['WordPress', 'PHP', 'Custom Themes', 'WooCommerce'],
      gradient: 'linear-gradient(135deg, #21759b 0%, #0073aa 100%)',
    },
    {
      id: 'ux-ui-design',
      icon: 'PenTool',
      titleKey: 'services.design.title',
      descriptionKey: 'services.design.description',
      skills: ['Figma', 'Adobe Suite', 'Prototyping', 'User Research'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 'automation',
      icon: 'Workflow',
      titleKey: 'services.automation.title',
      descriptionKey: 'services.automation.description',
      skills: ['n8n', 'Airtable', 'API Integration', 'Web Scraping'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      id: 'ai-integration',
      icon: 'Brain',
      titleKey: 'services.ai.title',
      descriptionKey: 'services.ai.description',
      skills: ['LLMs', 'Prompt Engineering', 'LangChain', 'AI Workflows'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
  ],
  projects: [
    {
      link: '/alexis/xcons',
      text: 'XCONS',
      color: '#15814B',
      descriptionKey: 'companyDescriptions.xcons',
    },
    {
      link: '/alexis/fusionads',
      text: 'FusionAds',
      color: '#F7480B',
      descriptionKey: 'companyDescriptions.fusionads',
    },
    {
      link: '/alexis/bandit',
      text: 'Bandit',
      color: '#F70F43',
      descriptionKey: 'companyDescriptions.bandit',
    },
    {
      link: '/alexis/otros',
      text: 'Otros',
      color: '#6B7280',
      descriptionKey: 'companyDescriptions.otros',
    },
  ],
  experienceRoutes: [
    { path: 'xcons', component: 'XConsExperiencePage' },
    { path: 'bandit', component: 'XCons2ExperiencePage' },
    { path: 'fusionads', component: 'FusionAdsPage' },
    { path: 'otros', component: 'MaintenancePage' },
  ],
};
