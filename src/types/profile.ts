export type ProfileId = 'matias';

export interface TechItem {
  name: string;
  src: string;
}

export interface Service {
  id: string;
  icon: string; // Icon component name from lucide-react
  titleKey: string;
  descriptionKey: string;
  skills: string[];
  gradient: string;
}

export interface ProjectItem {
  link: string;
  text: string;
  image?: string;
  color: string;
  descriptionKey: string;
}

export interface ExperienceRoute {
  path: string;
  component: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  x: string;
  email: string;
}

export interface ProfileBio {
  intro: string;
  block1Title: string;
  block1Text: string;
  block2Title: string;
  block2Text: string;
}

export interface Profile {
  id: ProfileId;
  name: string;
  titleKey: string;
  subtitle1Key: string;
  subtitle2Key: string;
  description1Key: string;
  description2Key: string;
  description3Key: string;
  description4Key: string;
  heroVideo?: string;
  heroImage?: string;
  logo?: string;
  socialLinks: SocialLinks;
  technologies: TechItem[];
  services: Service[];
  projects: ProjectItem[];
  experienceRoutes: ExperienceRoute[];
}
