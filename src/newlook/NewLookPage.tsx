import React, { useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import InfoBlocksAnimation from './components/InfoBlocksAnimation';
import { useLenis } from '../hooks/useLenis';

import HamburgerMenu from '../components/HamburgerMenu';

gsap.registerPlugin(ScrollTrigger);

const HeroTitleComponent = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    // Seleccionamos los elementos que podríamos animar
    const nameContainer = titleRef.current;
    if (!nameContainer) return;
    
    const nameInner = nameContainer.querySelector('.name-inner');

    // El contexto de GSAP nos ayuda a gestionar las animaciones y su limpieza
    const ctx = gsap.context(() => {
      // matchMedia nos permite crear animaciones responsivas
      gsap.matchMedia().add({
        isDesktop: "(min-width: 640px)",
        isMobile: "(max-width: 639px)",
      }, (context) => {
        // Obtenemos las condiciones del contexto (isDesktop, isMobile)
        const conditions = context.conditions as { isDesktop?: boolean; isMobile?: boolean };
        const { isDesktop } = conditions;

        // Aplicamos la animación correspondiente según el ancho de la pantalla
        if (isDesktop) {
          gsap.from(nameContainer, {
            y: '104%',
            ease: 'power3.out',
            duration: 1.2,
            delay: 0.25,
          });
        } else {
          gsap.from(nameInner, {
            y: '105%',
            ease: 'power3.out',
            duration: 1.2,
            delay: 0, // Sin retraso en móvil
          });
        }
      });
    }, titleRef); // El scope del contexto es el contenedor del título

    // Función de limpieza que se ejecuta cuando el componente se desmonta
    return () => ctx.revert();
  }, []);





  return (
    <HeroTitle className="name" ref={titleRef}>
      <div className="name-inner">
        <FirstName>ALEXIS</FirstName>
        <LastName>VEDIA</LastName>
      </div>
    </HeroTitle>
  );
};

interface NewLookPageProps {}

const NewLookPage: React.FC<NewLookPageProps> = () => {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLUListElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const subheadingTextLine1Ref = useRef<HTMLSpanElement>(null);
  const subheadingTextLine2Ref = useRef<HTMLSpanElement>(null);
  const subheadingTextLine3Ref = useRef<HTMLSpanElement>(null);
  const subheadingTextLine4Ref = useRef<HTMLSpanElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const contentImageContainerRef = useRef<HTMLDivElement>(null);
  const contentImageRef = useRef<HTMLImageElement>(null);
  const sectionTitleRef = useRef<HTMLDivElement>(null);

  // Inicializar Lenis para smooth scrolling
  useLenis();

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const navItems = Array.from(navigationRef.current?.children || []);
    navItems.forEach(item => {
      if (item !== e.currentTarget.closest('.nav-item')) {
        item.classList.add('sibling-hover');
      }
    });
  };

  const handleNavLeave = () => {
    const navItems = Array.from(navigationRef.current?.children || []);
    navItems.forEach(item => {
      item.classList.remove('sibling-hover');
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth >= 640 && heroImageRef.current) {
        gsap.from(heroImageRef.current, {
          scale: 1.1,
          ease: 'power3.inOut',
          duration: 2.1,
        });
      }
    }, heroImageRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const navLinksElements = navigationRef.current?.querySelectorAll('.li-inner');
    const navLinks = navLinksElements ? gsap.utils.toArray(navLinksElements) : [];

    const ctx = gsap.context(() => {
      if (window.innerWidth >= 640 && navLinks.length > 0) {
        gsap.from(navLinks, {
          y: '100%',
          ease: 'power3.out',
          duration: 0.6,
          stagger: 0.12,
          delay: 0.75
        });
      }
    }, navigationRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (heroImageRef.current && heroContainerRef.current) {
      gsap.fromTo(heroImageRef.current, 
        {
          scale: 1,
          y: '0%'
        },
        {
          scale: 1.2,
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Animación de carga de navegación se maneja en useLayoutEffect separado

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 640;
      
      if (subheadingRef.current) {
        const titleSplit = new SplitType(subheadingRef.current, { types: 'lines' });
        
        gsap.from(titleSplit.lines, {
          y: '100%',
          ease: 'power3.out',
          duration: 1.2,
          stagger: 0.06,
          delay: isDesktop ? 0.75 : 0.3,
        });
      }
      
      // Animar cada línea del párrafo individualmente
      const textLineRefs = [subheadingTextLine1Ref, subheadingTextLine2Ref, subheadingTextLine3Ref, subheadingTextLine4Ref];
      
      textLineRefs.forEach((lineRef, index) => {
        if (lineRef.current) {
          const lineSplit = new SplitType(lineRef.current, { types: 'lines' });
          
          gsap.from(lineSplit.lines, {
            y: '100%',
            ease: 'power3.out',
            duration: 1.2,
            stagger: 0.06,
            delay: isDesktop ? 0.9 + (index * 0.1) : 0.4 + (index * 0.08),
          });
        }
      });
    });

    return () => ctx.revert();
  }, [subheadingRef, subheadingTextLine1Ref, subheadingTextLine2Ref, subheadingTextLine3Ref, subheadingTextLine4Ref]);

  // Efecto de scroll para el hero section (solo imagen, sin navegación)
  useLayoutEffect(() => {
    const heroElement = heroContainerRef.current;

    const ctx = gsap.context(() => {
      // Solo aplicamos la animación en pantallas de escritorio
      ScrollTrigger.matchMedia({
        "(min-width: 640px)": function() {
          // Crear overlay para el efecto de oscurecimiento
          const overlay = document.createElement('div');
          overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0);
            pointer-events: none;
            z-index: 10;
          `;
          heroElement?.appendChild(overlay);

          gsap.timeline({
            scrollTrigger: {
              trigger: heroElement,
              start: 'bottom bottom',
              end: 'bottom top-=50%',
              scrub: true,
            }
          })
          .to(heroElement, { y: '50vh' }, 0)
          .to(overlay, { backgroundColor: 'rgba(0, 0, 0, 0.65)' }, 0);
        }
      });
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  // Animaciones para la imagen de anteojos
  useLayoutEffect(() => {
    const container = contentImageContainerRef.current;
    const image = contentImageRef.current;

    const ctx = gsap.context(() => {
      // Animación 1: Revelado con clip-path
      gsap.fromTo(container, 
        { 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', 
          opacity: 0, 
        }, 
        { 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power2.inOut',
          scrollTrigger: { 
            trigger: container, 
            start: 'top bottom-=15%',
            once: true,
          }, 
        } 
      );

      // Animación 2: Parallax al hacer scroll
      gsap.fromTo(image, 
        { 
          yPercent: -15,
        }, 
        { 
          yPercent: 15,
          ease: 'none', 
          scrollTrigger: { 
            trigger: container, 
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }, 
        } 
      );
    }, contentImageContainerRef);

    return () => ctx.revert();
  }, []);

  // Animación para el párrafo "Impulso a emprendedores..."
  useLayoutEffect(() => {
    if (sectionTitleRef.current) {
      const lines = sectionTitleRef.current.querySelectorAll('.line-inner');

      // Establecer estado inicial
      gsap.set(lines, { y: '100%' });

      // Animar hacia la posición normal
      gsap.to(lines, {
        y: '0%',
        duration: 1.2,
        stagger: 0.066,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: 'top bottom-=15%',
          once: true
        }
      });
    }
  }, []);

  return (
    <PageWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <HamburgerMenu heroContainerRef={heroContainerRef} />
      <HeroContainer ref={heroContainerRef}>

        
        <SubheadingSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SubheadingTitle ref={subheadingRef}>UX/UI Developer &amp; AI Integration Specialist</SubheadingTitle>
          <SubheadingText>
            <SubheadingTextLine ref={subheadingTextLine1Ref}>Acompaño a agencias, emprendedores</SubheadingTextLine>
            <SubheadingTextLine ref={subheadingTextLine2Ref}>y startups en el diseño de</SubheadingTextLine>
            <SubheadingTextLine ref={subheadingTextLine3Ref}>soluciones innovadoras, materializarlas</SubheadingTextLine>
            <SubheadingTextLine ref={subheadingTextLine4Ref}>en productos reales e impulsarlas con IA.</SubheadingTextLine>
          </SubheadingText>
        </SubheadingSection>

        <ImageContainer>
          <Navigation ref={navigationRef}>
            <NavItem className="nav-item line-link">
              <div className="li-inner">
                <a href="#" onMouseEnter={handleNavHover} onMouseLeave={handleNavLeave}>Home</a>
              </div>
            </NavItem>
            <NavItem className="nav-item line-link">
              <div className="li-inner">
                <a href="#" onMouseEnter={handleNavHover} onMouseLeave={handleNavLeave}>About</a>
              </div>
            </NavItem>
            <NavItem className="nav-item line-link">
              <div className="li-inner">
                <a href="#" onMouseEnter={handleNavHover} onMouseLeave={handleNavLeave}>Work</a>
              </div>
            </NavItem>
            <NavItem className="nav-item line-link">
              <div className="li-inner">
                <a href="#" onMouseEnter={handleNavHover} onMouseLeave={handleNavLeave}>Contact</a>
              </div>
            </NavItem>
          </Navigation>
          <HeroFigure ref={heroImageRef} src="/assets/newAssets/hero-alexis.png" alt="Alexis Vedia" />
        </ImageContainer>
        
        <HeroTitleComponent />
      </HeroContainer>

      <MainContentContainer ref={mainContentRef}>
        <ContentSection>
          <TextImageContainer>
            <ContentImageContainer ref={contentImageContainerRef}>
              <ContentImage ref={contentImageRef} src="/assets/newAssets/imagen-anteojos.png" alt="Alexis Vedia con anteojos" />
            </ContentImageContainer>
            <SectionTitle ref={sectionTitleRef}>
            <div className="line">
              <div className="line-inner">Impulso a emprendedores, agencias y startups</div>
            </div>
            <div className="line">
              <div className="line-inner">ideando soluciones innovadoras y llevándolas</div>
            </div>
            <div className="line">
              <div className="line-inner">a la realidad con diseño UX/UI de alto nivel,</div>
            </div>
            <div className="line">
              <div className="line-inner">desarrollo en código y herramientas de IA que</div>
            </div>
            <div className="line">
              <div className="line-inner">optimizan procesos y maximizan resultados</div>
            </div>
          </SectionTitle>
          </TextImageContainer>
          
          <InfoBlocksAnimation />
        </ContentSection>



      <CTASection>
        <CTAButton>Todos los trabajos</CTAButton>
      </CTASection>

        <FooterSection>
          <ContactInfo>alexisleonelvedia@gmail.com</ContactInfo>
        </FooterSection>
      </MainContentContainer>
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
  
  @media (max-width: 768px) {
    height: 100vh;
    min-height: 100vh;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  @media (max-width: 480px) {
    height: 100vh;
    min-height: 100vh;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const HeroContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #F2F3F5;
  z-index: 1;
  
  @media (max-width: 768px) {
    height: 100vh;
    min-height: 100vh;
  }
  
  @media (max-width: 480px) {
    height: 100vh;
    min-height: 100vh;
  }
`;

const MainContentContainer = styled.div`
  position: relative;
  z-index: 2;
  background-color: white;
`;



const ImageContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    justify-content: center;
    width: 100%;
  }
`;

const Navigation = styled.ul`
  position: absolute;
  top: 15vh;
  left: 4vw;
  display: flex;
  flex-direction: column;
  gap: 0.2vh;
  z-index: 1000;
  text-align: left;
  margin: 0;
  padding: 0;
  list-style: none;
  
  @media (max-width: 1400px) {
    top: 17vh;
    left: 3vw;
  }
  
  @media (max-width: 1200px) {
    top: 19vh;
    left: 3vw;
  }
  
  @media (max-width: 768px) {
    top: 4vh;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    flex-direction: row;
    justify-content: center;
    gap: 2vw;
    width: auto;
  }
  
  @media (max-width: 480px) {
    top: 4vh;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    flex-direction: row;
    justify-content: center;
    gap: 4vw;
    width: auto;
  }
`;

const NavItem = styled.li`
  list-style: none;
  overflow: hidden;
  transition: 0.6s cubic-bezier(0, 0, 0, 1);
  
  &.sibling-hover {
    opacity: 0.25;
  }
  
  .li-inner {
    overflow: hidden;
  }
  
  a {
    font-family: "Inter Tight", Trebuchet MS, sans-serif;
    font-size: 2.03rem;
    font-weight: 800;
    line-height: 115%;
    color: #222222;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    display: block;
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: auto;
      right: 0;
      width: 0;
      height: 2px;
      background-color: #000;
      transition: 0.6s cubic-bezier(0, 0, 0, 1);
    }

    &:hover {
      text-decoration: none;
      &:before {
        right: auto;
        left: 0;
        width: 100%;
      }
    }
  }
`;

const SubheadingSection = styled(motion.div)`
  position: absolute;
  left: 4vw;
  bottom: 30vh;
  max-width: 28vw;
  display: flex;
  flex-direction: column;
  gap: 1vh;
  z-index: 3;
  
  @media (max-width: 768px) {
    left: 4vw;
    right: 4vw;
    max-width: none;
    width: calc(100vw - 8vw);
    top: 14vh;
    bottom: auto;
  }
  
  @media (max-width: 480px) {
    left: 4vw;
    right: 4vw;
    max-width: none;
    width: calc(100vw - 8vw);
    top: 14vh;
    bottom: auto;
  }
`;

const SubheadingTitle = styled.h2`
  font-family: "Inter", Trebuchet MS, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  color: #222222;
  margin: 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SubheadingText = styled.div`
  font-family: "Inter", Trebuchet MS, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: #9D9D9D;
  margin: 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const SubheadingTextLine = styled.span`
  display: block;
  overflow: hidden;
`;

const HeroFigure = styled.img`
  width: auto;
  min-width: 600px;
  height: 100%;
  object-fit: contain;
  object-position: right bottom;
  flex-shrink: 0;
  
  @media (max-width: 1200px) {
    min-width: 500px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    max-width: 100%;
    object-fit: cover;
    object-position: center bottom;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    min-width: unset;
    max-width: 100%;
    object-fit: cover;
    object-position: center bottom;
    content: url('/assets/newAssets/hero-alexis2.png');
  }
`;

const HeroTitle = styled.h1`
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  font-family: "Inter", Trebuchet MS, sans-serif;
  font-weight: 700;
  font-size: clamp(100px, 15vw, 500px);
  line-height: 0.8;
  color: white;
  text-align: center;
  white-space: nowrap;
  letter-spacing: -0.05em;
  z-index: 999;
  margin: 0;
  padding: 0;
  mix-blend-mode: difference;
  pointer-events: none;
  
  .name-inner {
    overflow: hidden;
  }
  
  @media (max-width: 768px) {
    white-space: normal;
    line-height: 0.8;
    font-size: clamp(100px, 18vw, 180px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    white-space: normal;
    line-height: 0.9;
    font-size: clamp(90px, 16vw, 140px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const FirstName = styled.span`
  @media (max-width: 768px) {
    display: block;
    font-size: 0.8em;
  }
  
  @media (max-width: 480px) {
    display: block;
    font-size: 0.8em;
  }
`;

const LastName = styled.span`
  @media (max-width: 768px) {
    display: block;
    font-size: 1.2em;
  }
  
  @media (max-width: 480px) {
    display: block;
    font-size: 1.2em;
  }
`;

const ContentSection = styled.section`
  padding: 80px 0;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
`;

const TextImageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 60px;
  margin-bottom: 40px;
`;

const ContentImageContainer = styled.div`
  width: 200px;
  height: 260px;
  overflow: hidden;
  flex-shrink: 0;
`;

const ContentImage = styled.img`
  width: 100%;
  height: 130%;
  object-fit: cover;
  transform: translateY(-15%);
`;

const SectionTitle = styled.div`
  text-align: left;
  margin-bottom: 80px;
  color: black;
  font-size: 43.22px;
  font-weight: 700;
  line-height: 1.2;
  flex: 1;
  
  /* Estilos para la animación multilínea */
  .line {
    overflow: hidden;
    padding-block: 0.1em;
    margin-block: -0.1em;
  }
  
  .line-inner {
    display: block;
    transform: translateY(0);
  }
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
  line-height: 19.30px;
`;

export default NewLookPage;