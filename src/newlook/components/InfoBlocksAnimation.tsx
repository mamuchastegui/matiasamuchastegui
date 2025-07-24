import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import styled from 'styled-components';
import CTAButton from './CTAButton';

gsap.registerPlugin(ScrollTrigger);

const InfoBlocksAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Seleccionamos cada bloque de texto por separado
    const textBlocks = container.querySelectorAll('.text-block');

    const ctx = gsap.context(() => {
      textBlocks.forEach(block => {
        // Dividimos el título y el párrafo de cada bloque en líneas
        const titleLines = new SplitType(block.querySelector('.block-title') as HTMLElement, { types: 'lines' });
        const paragraphLines = new SplitType(block.querySelector('.block-text') as HTMLElement, { types: 'lines' });
        
        // Combinamos todas las líneas (título + párrafo) para animarlas juntas
        const allLines = [
          ...(titleLines.lines || []),
          ...(paragraphLines.lines || [])
        ];

        // Establecer estado inicial con opacity 0
        gsap.set(allLines, { opacity: 0 });
        
        gsap.to(allLines, {
          opacity: 1,
          duration: 1.2,
          stagger: 0.06, // Stagger aplicado a la secuencia completa de líneas
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container, // El trigger es el contenedor padre de ambos bloques
            start: 'top bottom-=10%',
            once: true,
          },
          delay: 0, // Retraso para que aparezca más temprano durante la animación del texto "Impulso a emprendedores..."
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <InfoBlocksContainer ref={containerRef} className="info-blocks-container">
      <ContentWrapper>
        <TextBlocksWrapper>
          <TextBlock className="text-block">
            <BlockTitle className="block-title">De principio a fin</BlockTitle>
            <BlockText className="block-text">
              Desde investigación UX y prototipos de alta fidelidad en Figma, hasta una impecable implementación completa. ¿No es suficiente? Elevo el nivel de tu producto con AI: búsquedas vectoriales semánticas, diseño de agentes autónomos, flujos en n8n, RAG, etc. Pruebo nuevas herramientas a diario y comparto mis hallazgos en redes. Tu proyecto siempre se beneficia de lo más avanzado.
            </BlockText>
          </TextBlock>
          <TextBlock className="text-block">
            <BlockTitle className="block-title">Solo o en equipo</BlockTitle>
            <BlockText className="block-text">
              Trabajo de forma autónoma o integrado a tu equipo, adaptándome a las necesidades del proyecto para entregar resultados sobresalientes, ya sea como fuerza individual o en colaboración multidisciplinaria.
            </BlockText>
          </TextBlock>
        </TextBlocksWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <CTAButton>Más acerca de mí</CTAButton>
      </ButtonWrapper>
    </InfoBlocksContainer>
  );
};

const InfoBlocksContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 0 3rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #E5E5E5;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const TextBlocksWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem 4rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TextBlock = styled.div`
  margin-bottom: 2rem;
  flex: 1;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const BlockTitle = styled.h3`
  display: block;
  margin-bottom: 0.99rem;
  color: #141414;
  font-family: "Inter", Trebuchet MS, sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6;
  
  .line {
    display: block;
    padding: 0.3em 0;
    margin: 0.1em 0;
    min-height: 1.6em;
  }
`;

const BlockText = styled.p`
  font-family: "Inter", Trebuchet MS, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #9D9D9D;
  
  .line {
    display: block;
    padding: 0.15em 0;
    margin: 0.05em 0;
    min-height: 1.5em;
  }
`;

export default InfoBlocksAnimation;