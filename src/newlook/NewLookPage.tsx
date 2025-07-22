import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface NewLookPageProps {}

const NewLookPage: React.FC<NewLookPageProps> = () => {
  return (
    <PageWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <HeroContainer>
        <LogoContainer>
          <LogoText>AV</LogoText>
        </LogoContainer>
        
        <Navigation>
          <NavItem>Home</NavItem>
          <NavItem>About</NavItem>
          <NavItem>Work</NavItem>
          <NavItem>Contact</NavItem>
        </Navigation>

        <SubheadingSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SubheadingTitle>UX/UI Developer &amp; AI Integration Specialist</SubheadingTitle>
          <SubheadingText>
            Acompaño a agencias, emprendedores y startups en el diseño de soluciones innovadoras, materializarlas en productos reales e impulsarlas con inteligencia artificial.
          </SubheadingText>
        </SubheadingSection>

        <HeroFigure src="/assets/newAssets/hero-alexis.png" alt="Alexis Vedia" />
        
        <HeroTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >ALEXIS VEDIA</HeroTitle>
      </HeroContainer>

      <ContentSection>
        <ContentImage src="/assets/newAssets/imagen-anteojos.png" alt="Alexis Vedia con anteojos" />
        <SectionTitle>
          <TitlePart>Impulso a emprendedores, agencias</TitlePart>
          <TitlePart>y startups ideando soluciones innovadoras y llevándolas a la realidad con diseño UX/UI de alto nivel, desarrollo en código y herramientas de IA que optimizan procesos y maximizan resultados</TitlePart>
        </SectionTitle>

        <InfoGrid>
          <InfoColumn>
            <ColumnTitle>De principio a fin</ColumnTitle>
            <ColumnText>
              Desde investigación UX y prototipos de alta fidelidad en Figma, hasta una impecable implementación completa.
              <br/><br/>
              ¿No es suficiente? Elevo el nivel de tu producto con AI: búsquedas vectoriales semánticas, diseño de agentes autónomos, flujos en n8n, RAG, etc
              <br/><br/>
              Pruebo nuevas herramientas a diario y comparto mis hallazgos en redes. Tu proyecto siempre se beneficia de lo más avanzado.
            </ColumnText>
          </InfoColumn>
          
          <InfoColumn>
            <ColumnTitle>Solo o en equipo</ColumnTitle>
            <ColumnText>
              Trabajo de forma autónoma o integrado a tu equipo, adaptándome a las necesidades del proyecto para entregar resultados sobresalientes, ya sea como fuerza individual o en colaboración multidisciplinaria.
            </ColumnText>
          </InfoColumn>
        </InfoGrid>

        <CTAButton>Más acerca de mí</CTAButton>
      </ContentSection>

      <ProjectsSection>
        <ProjectCard>
          <ProjectImage src="/assets/newAssets/FusionAds.png" alt="FusionAds.ai" />
          <ProjectOverlay />
          <ProjectTitle>FusionAds.ai</ProjectTitle>
          <ProjectSubtitle>Marketing potenciado por AI</ProjectSubtitle>
        </ProjectCard>

        <ProjectCard>
          <ProjectImage src="/assets/newAssets/Bandit.png" alt="Bandit" />
          <ProjectOverlay />
          <ProjectTitle>Bandit</ProjectTitle>
          <ProjectSubtitle>Aplicación de eventos musicales</ProjectSubtitle>
        </ProjectCard>

        <ProjectCard>
          <ProjectImage src="/assets/newAssets/XCONS.png" alt="XCONS" />
          <ProjectOverlay />
          <ProjectTitle>XCONS</ProjectTitle>
          <ProjectSubtitle>E-commerce de materiales de construcción</ProjectSubtitle>
        </ProjectCard>
      </ProjectsSection>

      <CTASection>
        <CTAButton>Todos los trabajos</CTAButton>
      </CTASection>

      <FooterSection>
        <ContactInfo>alexisleonelvedia@gmail.com</ContactInfo>
      </FooterSection>
    </PageWrapper>
  );
};

const PageWrapper = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1a1a1a;
  overflow-x: hidden;
  position: relative;
`;

const HeroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #F2F3F5;
`;

const LogoContainer = styled.div`
  position: fixed;
  top: 4vh;
  left: 4vw;
  width: 80px;
  height: 80px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%) brightness(120%);
  -webkit-backdrop-filter: blur(20px) saturate(180%) brightness(120%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(30px) saturate(200%) brightness(130%);
    -webkit-backdrop-filter: blur(30px) saturate(200%) brightness(130%);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }
`;

const LogoText = styled.span`
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #222222;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
`;

const Navigation = styled.nav`
  position: absolute;
  top: 6vh;
  left: 50vw;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.2vh;
  z-index: 3;
`;

const NavItem = styled.a`
  font-family: "Inter Tight", Trebuchet MS, sans-serif;
  font-size: 2.03rem;
  font-weight: 700;
  line-height: 115%;
  color: #222222;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    color: #000;
  }
`;

const SubheadingSection = styled(motion.div)`
  position: absolute;
  left: 4vw;
  bottom: 33vh;
  max-width: 28vw;
  display: flex;
  flex-direction: column;
  gap: 1vh;
  z-index: 3;
`;

const SubheadingTitle = styled.h2`
  font-family: "Inter", Trebuchet MS, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  color: #222222;
  margin: 0;
`;

const SubheadingText = styled.p`
  font-family: "Inter", Trebuchet MS, sans-serif;
  font-size: 17.9066px;
  font-weight: 400;
  line-height: 23.81px;
  color: #9D9D9D;
  margin: 0;
`;

const HeroFigure = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: auto;
  height: 100%;
  object-fit: contain;
  object-position: right bottom;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: "Inter", Trebuchet MS, sans-serif;
  font-weight: 700;
  font-size: clamp(100px, 15vw, 500px);
  line-height: 0.7;
  color: white;
  text-align: center;
  white-space: nowrap;
  letter-spacing: -0.05em;
  z-index: 999;
  margin: 0;
  padding: 0;
  mix-blend-mode: difference;
  pointer-events: none;
`;

const ContentSection = styled.section`
  padding: 80px 0;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
`;

const ContentImage = styled.img`
  position: absolute;
  top: 20px;
  right: 100px;
  width: 200px;
  height: auto;
  z-index: 1;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const TitlePart = styled.div`
  color: black;
  font-size: 43.22px;
  font-weight: 700;
  line-height: 54.03px;
  margin-bottom: 20px;
  
  &:first-child {
    margin-left: 408px;
  }
  
  &:last-child {
    margin-left: 185px;
    width: 1143px;
  }
`;

const InfoGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 56px;
  margin: 80px 0;
  padding: 34px 0;
  border-top: 1px solid #CFCFCF;
`;

const InfoColumn = styled.div`
  width: 343px;
  
  &:last-child {
    width: 300px;
  }
`;

const ColumnTitle = styled.h3`
  color: #1F1F1F;
  font-size: 16px;
  font-weight: 700;
  line-height: 17.12px;
  margin-bottom: 16px;
`;

const ColumnText = styled.p`
  color: #BFBFBF;
  font-size: 16px;
  font-weight: 600;
  line-height: 17.12px;
  margin: 0;
`;



const ProjectsSection = styled.section`
  width: 100%;
`;

const ProjectCard = styled.div`
  width: 100%;
  height: 786px;
  position: relative;
  background: #C5C5C5;
  overflow: hidden;
  margin-bottom: 0;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.37);
  z-index: 2;
`;

const ProjectTitle = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 63.45px;
  font-weight: 600;
  line-height: 67.89px;
  margin: 0;
  z-index: 3;
  text-align: center;
`;

const ProjectSubtitle = styled.p`
  position: absolute;
  bottom: 84px;
  right: 100px;
  color: white;
  font-size: 28.95px;
  font-weight: 600;
  line-height: 30.98px;
  margin: 0;
  z-index: 3;
`;

const CTASection = styled.section`
  padding: 80px 0;
  text-align: center;
  background: #D2D2D2;
  height: 789px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CTAButton = styled.button`
  background: #000000;
  color: white;
  border: none;
  padding: 16px 32px;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333333;
    transform: translateY(-2px);
  }
`;

const FooterSection = styled.footer`
  padding: 40px 0;
  text-align: center;
`;

const ContactInfo = styled.div`
  color: #1F1F1F;
  font-size: 18.04px;
  font-weight: 500;
  text-decoration: underline;
  line-height: 19.30px;
`;

export default NewLookPage;