import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import FlowingMenu from '@components/FlowingMenu';
import { useProfile } from '../../context/ProfileContext';

import fusionadsLogo from '../../assets/images/projects/Fusionads.svg';
import banditLogo from '../../assets/images/projects/Bandit.svg';
import xconsLogo from '../../assets/images/projects/XCONS.svg';

const SectionContainer = styled.section`
  padding: 0 0 ${({ theme }) => theme.space['2xl']};
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  /* Restore original desktop clipping behavior */
  overflow: hidden;

  /* On mobile, allow content to flow so nothing gets cut */
  @media (max-width: 768px) {
    overflow: visible;
  }
`;


const TitleContainer = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  font-family: ${({ theme }) => theme.fonts.body};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MenuContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 600px;
  position: relative;
  /* Restore original overflow for desktop */
  overflow: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    /* Let content define height on mobile to prevent clipping */
    height: auto;
    min-height: 500px;
    overflow: visible;
  }
  
  @media (max-width: 480px) {
    min-height: 420px;
  }
`;

// Map of project names to their logos
const projectLogos: Record<string, string> = {
  'XCONS': xconsLogo,
  'FusionAds': fusionadsLogo,
  'Bandit': banditLogo,
};

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();
  const { profile } = useProfile();

  // Build company items from profile projects
  const companyItems = profile.projects.map(project => ({
    link: project.link,
    text: project.text,
    image: projectLogos[project.text] || project.image,
    color: project.color,
    description: t(project.descriptionKey, project.text),
  }));

  return (
    <SectionContainer id="experience">
      <TitleContainer>
        <SectionTitle>{t('experience')}</SectionTitle>
      </TitleContainer>

      <MenuContainer>
        <FlowingMenu items={companyItems} />
      </MenuContainer>
    </SectionContainer>
  );
};

export default ProjectsSection;
