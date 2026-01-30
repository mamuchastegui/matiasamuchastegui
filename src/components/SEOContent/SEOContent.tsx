import React from 'react';
import styled from 'styled-components';

const SEOContainer = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;

const SEOHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SEOSubHeading = styled.h4`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SEOText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SEOList = styled.ul`
  margin-bottom: 1rem;
  padding-left: 1.5rem;
`;

const SEOListItem = styled.li`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SEOLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;

const SEOContent: React.FC = () => {
  return (
    <SEOContainer>
      <SEOHeading>Matias Amuchástegui - Backend Developer & Senior Software Engineer</SEOHeading>
      <SEOText>
        Matias Amuchástegui es un Staff Engineer y Backend Developer con más de 10 años de experiencia en empresas de tecnología de alto impacto.
        Especializado en arquitectura de software, sistemas distribuidos, Node.js, Go, TypeScript y desarrollo backend escalable.
      </SEOText>

      <SEOSubHeading>Servicios de Desarrollo y Consultoría</SEOSubHeading>
      <SEOList>
        <SEOListItem>Desarrollo Backend con Node.js, Go y Python</SEOListItem>
        <SEOListItem>Arquitectura de Microservicios y Sistemas Distribuidos</SEOListItem>
        <SEOListItem>Integración de IA y LLMs (OpenAI, LangChain)</SEOListItem>
        <SEOListItem>Consultoría técnica y code reviews</SEOListItem>
        <SEOListItem>Infraestructura cloud (AWS, GCP, Kubernetes)</SEOListItem>
      </SEOList>

      <SEOSubHeading>Experiencia Profesional</SEOSubHeading>
      <SEOText>
        Trayectoria profesional en <SEOLink href="#experience">empresas líderes de tecnología</SEOLink>:
      </SEOText>
      <SEOList>
        <SEOListItem><SEOLink href="/fusionads">FusionAds</SEOLink> - Staff Engineer liderando arquitectura de campañas publicitarias multicanal</SEOListItem>
        <SEOListItem><SEOLink href="/pomelo">Pomelo</SEOLink> - Backend Developer en fintech procesando millones de transacciones</SEOListItem>
        <SEOListItem><SEOLink href="/mercadolibre">MercadoLibre</SEOLink> - Backend Developer sirviendo +100M usuarios en LATAM</SEOListItem>
        <SEOListItem><SEOLink href="/otros">Proyectos personales</SEOLink> - Condamind, Senda, Cratos, Micelaria, Córdoba Rollea</SEOListItem>
      </SEOList>

      <SEOSubHeading>Stack Tecnológico</SEOSubHeading>
      <SEOText>
        Especialización en backend, infraestructura cloud, arquitectura de software escalable y sistemas de alto rendimiento.
        Experto en TypeScript, Go, Node.js, PostgreSQL, Redis, Kafka, AWS, Docker, Kubernetes.
      </SEOText>

      <SEOSubHeading>Contacto Profesional</SEOSubHeading>
      <SEOText>
        Para proyectos freelance, consultoría técnica o colaboraciones profesionales,
        puedes <SEOLink href="#contact">contactar directamente</SEOLink> a través del formulario o por email a matias@condamind.com
      </SEOText>

      <SEOText>
        Portfolio profesional de Matias Amuchástegui actualizado con experiencia en empresas como MercadoLibre, Pomelo y FusionAds,
        proyectos personales y disponibilidad para servicios de desarrollo backend, arquitectura de software e integración de IA.
      </SEOText>
    </SEOContainer>
  );
};

export default SEOContent;
