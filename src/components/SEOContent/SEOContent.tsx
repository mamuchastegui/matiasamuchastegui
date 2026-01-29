import React from 'react';
import styled from 'styled-components';
import { useProfile } from '../../context/ProfileContext';

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
  const { profile } = useProfile();
  const isMatias = profile.id === 'matias';

  if (isMatias) {
    return (
      <SEOContainer>
        <SEOHeading>Matias Amuchástegui - Backend Developer & Staff Engineer</SEOHeading>
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
  }

  // Alexis profile
  return (
    <SEOContainer>
      <SEOHeading>Alexis Vedia - Desarrollador Full Stack Profesional</SEOHeading>
      <SEOText>
        Alexis Vedia es un desarrollador full stack profesional especializado en tecnologías modernas como React, TypeScript, Node.js y desarrollo web avanzado.
        Este portfolio profesional muestra la experiencia de Alexis Vedia en empresas como XCONS, FusionAds y Bandit, ofreciendo soluciones innovadoras en desarrollo frontend y backend.
      </SEOText>

      <SEOSubHeading>Servicios de Desarrollo Web</SEOSubHeading>
      <SEOList>
        <SEOListItem>Desarrollo Frontend con React y TypeScript</SEOListItem>
        <SEOListItem>Desarrollo Backend con Node.js y APIs REST</SEOListItem>
        <SEOListItem>Aplicaciones web responsivas y modernas</SEOListItem>
        <SEOListItem>Optimización de rendimiento y SEO</SEOListItem>
        <SEOListItem>Integración de bases de datos y servicios cloud</SEOListItem>
      </SEOList>

      <SEOSubHeading>Experiencia Profesional</SEOSubHeading>
      <SEOText>
        Desarrollador con experiencia en <SEOLink href="#experience">proyectos empresariales</SEOLink> incluyendo:
      </SEOText>
      <SEOList>
        <SEOListItem><SEOLink href="/xcons">XCONS</SEOLink> - Constructora innovadora con soluciones sustentables</SEOListItem>
        <SEOListItem><SEOLink href="/fusionads">FusionAds</SEOLink> - Plataforma de publicidad digital avanzada</SEOListItem>
        <SEOListItem><SEOLink href="/bandit">Bandit</SEOLink> - Soluciones en seguridad informática</SEOListItem>
        <SEOListItem><SEOLink href="/otros">Otros proyectos</SEOLink> - Diversos desarrollos personales y profesionales</SEOListItem>
      </SEOList>

      <SEOSubHeading>Tecnologías y Herramientas</SEOSubHeading>
      <SEOText>
        Especialización en tecnologías frontend y backend modernas para crear aplicaciones web escalables y eficientes.
      </SEOText>

      <SEOSubHeading>Contacto Profesional</SEOSubHeading>
      <SEOText>
        Para proyectos de desarrollo web, consultas técnicas o colaboraciones profesionales,
        puedes <SEOLink href="#contact">contactar directamente</SEOLink> a través del formulario de contacto.
      </SEOText>

      <SEOText>
        Portfolio profesional de Alexis Vedia actualizado con proyectos recientes, experiencia laboral y
        información de contacto para servicios de desarrollo web full stack. Desarrollador profesional
        especializado en crear soluciones web modernas y escalables.
      </SEOText>
    </SEOContainer>
  );
};

export default SEOContent;
