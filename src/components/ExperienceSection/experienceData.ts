import condamindLogo from '@/assets/images/companies/condamind_logo.jpeg';
import fusionLogo from '@/assets/images/companies/fusion_logo.jpeg';
import pomeloLogo from '@/assets/images/companies/pomelo_logo.jpeg';
import mercadolibreLogo from '@/assets/images/companies/mercadolibre_logo.jpeg';
import ayiLogo from '@/assets/images/companies/ayi_logo.jpeg';
import darwoftLogo from '@/assets/images/companies/darwoft_logo.jpeg';
import brandigitalLogo from '@/assets/images/companies/brandigital_logo.jpeg';

export interface Experience {
  id: string;
  companyKey: string;
  roleKey: string;
  periodKey: string;
  locationKey: string;
  descriptionKey: string;
  tech: string[];
  logo: string;
  highlight?: boolean;
  link?: string;
  projects?: { name: string; href: string }[];
}

export const experiences: Experience[] = [
  {
    id: 'freelance',
    companyKey: 'experience.freelance.company',
    roleKey: 'experience.freelance.role',
    periodKey: 'experience.freelance.period',
    locationKey: 'experience.freelance.location',
    descriptionKey: 'experience.freelance.description',
    tech: ['Node.js', 'React', 'AI/LLMs', 'GCP', 'Kubernetes'],
    logo: condamindLogo,
    highlight: true,
    link: '/otros',
    projects: [
      { name: 'Condamind', href: '#projects' },
      { name: 'Senda', href: '#projects' },
      { name: 'Micelaria', href: '#projects' },
      { name: 'Córdoba Rollea', href: '#projects' },
    ],
  },
  {
    id: 'fusionads',
    companyKey: 'experience.fusionads.company',
    roleKey: 'experience.fusionads.role',
    periodKey: 'experience.fusionads.period',
    locationKey: 'experience.fusionads.location',
    descriptionKey: 'experience.fusionads.description',
    tech: ['TypeScript', 'Node.js', 'AI/LLMs', 'Grafana', 'GCP'],
    logo: fusionLogo,
    highlight: true,
    link: '/fusionads',
  },
  {
    id: 'pomelo',
    companyKey: 'experience.pomelo.company',
    roleKey: 'experience.pomelo.role',
    periodKey: 'experience.pomelo.period',
    locationKey: 'experience.pomelo.location',
    descriptionKey: 'experience.pomelo.description',
    tech: ['Go', 'AWS Lambda', 'DynamoDB', 'Event Sourcing', 'DDD'],
    logo: pomeloLogo,
    link: '/pomelo',
  },
  {
    id: 'mercadolibre',
    companyKey: 'experience.mercadolibre.company',
    roleKey: 'experience.mercadolibre.role',
    periodKey: 'experience.mercadolibre.period',
    locationKey: 'experience.mercadolibre.location',
    descriptionKey: 'experience.mercadolibre.description',
    tech: ['Java', 'Microservices', 'High-scale', 'LATAM'],
    logo: mercadolibreLogo,
    highlight: true,
    link: '/mercadolibre',
  },
  {
    id: 'ayi',
    companyKey: 'experience.ayi.company',
    roleKey: 'experience.ayi.role',
    periodKey: 'experience.ayi.period',
    locationKey: 'experience.ayi.location',
    descriptionKey: 'experience.ayi.description',
    tech: ['Node.js', 'Angular', 'PostgreSQL'],
    logo: ayiLogo,
  },
  {
    id: 'darwoft',
    companyKey: 'experience.darwoft.company',
    roleKey: 'experience.darwoft.role',
    periodKey: 'experience.darwoft.period',
    locationKey: 'experience.darwoft.location',
    descriptionKey: 'experience.darwoft.description',
    tech: ['C# .NET', 'Angular', 'SQL Server'],
    logo: darwoftLogo,
  },
  {
    id: 'brandigital',
    companyKey: 'experience.brandigital.company',
    roleKey: 'experience.brandigital.role',
    periodKey: 'experience.brandigital.period',
    locationKey: 'experience.brandigital.location',
    descriptionKey: 'experience.brandigital.description',
    tech: ['PHP', 'WordPress', 'JavaScript'],
    logo: brandigitalLogo,
  },
];
