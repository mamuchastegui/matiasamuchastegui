import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome!',
      selectLanguage: 'Select language',
      english: 'English',
      spanish: 'Spanish',

      heroTitle: 'UX/UI Designer and Frontend Developer',
      heroSubtitle:
        'Artificial Intelligence • User Experience • E-commerce • WordPress • Chatbots • Interface Design • Mobile App Design • Automations',

      // Hero section translations
      heroSubtitle1: 'UX/UI Developer',
      heroSubtitle2: 'AI Integration Specialist',
      heroDescription1: 'I accompany agencies, entrepreneurs and startups',
      heroDescription2: 'in designing innovative solutions,',
      heroDescription3: 'materializing them into real products',
      heroDescription4: 'and boosting them with AI',
      heroDescription5: '',

      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      underConstruction: 'Under construction',

      xInvite: {
        title: 'Want to stay up to date?',
        description:
          'Daily AI updates: leaks, quick analyses and practical examples. Clear demos, questions to spark debate, and a critical look at impact.',
        cta: 'Visit my profile',
        ctaAria: "Open Alexis' profile on X in a new tab",
        avatarAlt: "Alexis' X profile photo",
      },

      'AI Portfolio Assistant': 'AI Portfolio Assistant',
      '¡Hola! Soy tu AI Portfolio Assistant. ¿En qué puedo ayudarte hoy?':
        "Hello! I'm your AI Portfolio Assistant. How can I help you today?",
      'Escribe un mensaje...': 'Type a message...',
      'Enviar mensaje': 'Send message',
      'Limpiar chat': 'Clean chat',
      'Cerrar chat': 'Close chat',
      Conectado: 'Connected',
      Conectando: 'Connecting',
      Desconectado: 'Disconnected',
      Desconocido: 'Unknown',

      home: 'Home',
      projectsNav: 'Projects',
      experienceNav: 'Projects',
      skills: 'Skills',
      contact: 'Contact',

      contactText:
        'Want to work together? Have a project in mind? Feel free to contact me at alexisleonelvedia@gmail.com or using the form!',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      subject: 'Subject',
      send: 'Send Message',
      sending: 'Sending...',
      messageSent: 'Message sent successfully! I will get back to you soon.',
      messageError: 'There was an error sending your message. Please try again.',

      namePlaceholder: 'E.g: Steve Jobs',
      emailPlaceholder: 'example@example.com',
      messagePlaceholder: 'Write a message...',
      subjectPlaceholder: 'E.g: I need help improving Siri',

      yourName: 'Your Name',
      allRightsReserved: 'All Rights Reserved',

      navbar: {
        home: 'Home',
        about: 'About Me',
        projects: 'Projects',
        experience: 'Experience',
        resume: 'Resume',
        services: 'Services',
        xcons: 'XCONS',
        xcons2: 'XCONS 2',
        fusionads: 'FusionAds',
        bandit: 'Bandit',
        otros: 'Other Projects',
      },

      tooltip: {
        github: 'Visit GitHub Profile',
        linkedin: 'Visit LinkedIn Profile',
        x: 'Visit X Profile',
        toggleTheme: 'Toggle Theme',
        selectLanguage: 'Select Language',
        viewOriginal: 'View original image in new tab',
        copyEmail: 'Copy email to clipboard',
        copied: 'Copied!',
      },

      documentLinksTitle: 'Proposal Defense',

      about: {
        professionalProfile: 'Professional Profile',
        professionalExperience: 'Professional Experience',
        featuredProjects: 'Featured Projects',
        skills: 'Skills',
        languages: 'Languages',
        spanish: 'Spanish: Native',
        english: 'English: Intermediate Level',
        bio: {
          part1:
            'Full Stack Developer with strong specialization in React and TypeScript and extensive background in UX/UI design.',
          part2:
            'I have collaborated with multidisciplinary teams on international projects, quickly adapting to intercultural environments and agile methodologies. I stand out for my teamwork ability, professional humility, and permanent commitment to excellence and delivering high-impact results.',
        },
        jobs: {
          fullStackEngineer: 'Full Stack Engineer',
          fusionOS: 'FusionOS.ai | 2024 - 2025',
          uiUxDesigner: 'UI/UX Designer & Quality Assurance Specialist',
          xcons: 'XCONS | 2022 - 2024',
        },
        jobDescriptions: {
          fusionOS: [
            'Advanced development of frontend functionalities with React and TypeScript.',
            'Integration and consumption of REST APIs to make the application dynamic.',
            'Implementation and maintenance of scalable interfaces with debugging practices and code quality assurance.',
          ],
          xcons: [
            'Design of graphical interfaces and user experiences for web and mobile applications.',
            'Creation and maintenance of UI component libraries.',
            'Development and customization of websites using WordPress and Elementor.',
            'Execution of functional tests, error detection and documentation.',
            'Quality assurance in digital processes and products.',
          ],
        },
        projects: {
          personalPortfolio: 'Personal Portfolio',
          personalPortfolioDesc:
            'Personal website developed with React, TypeScript and Vite, with advanced animations and responsive design.',
          ecommerceApp: 'E-commerce App',
          ecommerceAppDesc:
            'E-commerce application with shopping cart, payment gateway and admin panel.',
        },
        skillCategories: {
          fullStack: 'Full Stack',
          backend: 'Backend',
          tools: 'Tools',
        },
      },

      testimonialsTitle: 'Testimonials',
      testimonials: {
        jorge:
          '"During the 2 years he provided services for XCONS, Alexis was a very proactive person, always doing more than what was asked, with an ambition to learn and improve."',
        mauro:
          '"Alexis started as one person and ended as another in his process at Fusion. Undoubtedly, in a short time he adapted, learned, and surpassed himself. He was of great help to us in very accelerated implementation times, and his knowledge in design saved us hours of understanding with the design team."',
        milena:
          '"Whenever I have to work with a new client, I think of Alexis, and how his help could serve me. He is a person who is at the forefront. Highly recommended!"',
        kodi: '"I met Alexis through Mile. He made an initial redesign proposal for my app without me asking. That\'s when I realized I had to work with him. We worked together for hours, and he never hesitated to tell me if something wasn\'t on the right track. He also introduced me to many tools, a genius!"',
      },
      viewOriginalButton: 'View Original',
      openOriginalTitle: 'Open original image in new tab',
      companyDescriptions: {
        xcons: 'E-commerce platform specialized in omnichannel sales of construction materials.',
        fusionads:
          'AI-powered generative advertising platform that creates professional omni-channel ads.',
        bandit: 'Platform focused on tour and live concert management for artists and managers.',
        otros: 'Various personal and professional projects under development.',
      },
      bandit: {
        experience: {
          tasks: 'Tasks',
          tools: 'Tools',
          results: 'Results',
        },
      },

      experience: {
        title: 'Experience',
        subtitle: 'Building high-traffic systems for fintech and ad-tech companies.',
        projects: 'Projects:',
        freelance: {
          company: 'Freelance',
          role: 'Full-Stack Developer & Founder',
          period: '2026 – Present',
          location: 'Córdoba, Argentina',
          description:
            'Building innovative products and helping businesses scale. From AI-powered assistants to community platforms and e-commerce solutions.',
        },
        fusionads: {
          company: 'FusionAds',
          role: 'Staff Engineer',
          period: '2024 – 2025',
          location: 'Remote, United States',
          description:
            'Designed orchestration engine in TypeScript/Node.js for multi-channel ad campaigns. Implemented fan-out/fan-in workflows with AI integration. Deployed observability stack and mentored distributed team of 4 developers.',
        },
        pomelo: {
          company: 'Pomelo',
          role: 'Backend Developer',
          period: '2022 – 2023',
          location: 'Buenos Aires, Argentina',
          description:
            'Developed clearing processes & microservices using Hexagonal Architecture, DDD & Event Sourcing. Built AWS services in Go processing millions of daily events.',
        },
        mercadolibre: {
          company: 'MercadoLibre',
          role: 'Backend Developer',
          period: '2018 – 2021',
          location: 'Buenos Aires, Argentina',
          description:
            'Developed scalable backend services for post-purchase features serving 200M+ users across LATAM with P95 < 150ms. Led technical analysis and cross-functional collaboration.',
        },
        ayi: {
          company: 'Ayi & Asociados',
          role: 'Full-Stack Developer',
          period: '2017 – 2018',
          location: 'Córdoba, Argentina',
          description:
            'Developed core features for NaranjaX fintech platform. Built REST APIs with Node.js and frontend components with Angular.',
        },
        darwoft: {
          company: 'Darwoft',
          role: 'Software Developer',
          period: '2016 – 2017',
          location: 'Córdoba, Argentina',
          description:
            'Built backend services for Finandino banking platform using C# .NET. Developed financial reporting modules.',
        },
        brandigital: {
          company: 'Brandigital',
          role: 'Web Developer',
          period: '2015 – 2016',
          location: 'Córdoba, Argentina',
          description:
            'Developed websites for major brands including Aguas Cordobesas, Coca Cola, Huggies, and Volkswagen.',
        },
      },

      projects: {
        title: 'Featured Projects',
        subtitle:
          'A selection of projects that showcase my expertise in backend development, infrastructure, and AI integration.',
        view: 'View Project',
      },

      beyondCode: {
        title: 'Beyond Code',
        subtitle: 'Life is more than just code',
        skating: 'Freeskate',
        'skating.description':
          "Co-founder of Córdoba Rollea, building community through urban skating. There's something meditative about flowing through city streets.",
        music: 'Electronic Music',
        'music.description':
          'Producing beats and exploring sound design. Music production shares more with coding than you might think—both are about patterns, structure, and creativity.',
      },

      services: {
        title: 'Services',
        subtitle:
          'Comprehensive solutions from design to development, with a focus on user experience and cutting-edge technology.',
        frontend: {
          title: 'Frontend Development',
          description:
            'Modern and scalable web applications with React, TypeScript and the latest technologies. Focus on performance, accessibility and user experience.',
        },
        design: {
          title: 'UX/UI Design',
          description:
            'User-centered design with advanced prototyping in Figma. User research, usability testing and component library creation.',
        },
        automation: {
          title: 'Automation & Integration',
          description:
            'Workflow automation with n8n, API integrations and web scraping solutions. Optimization of business processes.',
        },
        ai: {
          title: 'AI Integration',
          description:
            'Implementation of AI solutions with LLMs, advanced prompt engineering and intelligent workflow development.',
        },
        wordpress: {
          title: 'WordPress Development',
          description:
            'Custom WordPress solutions with theme development, plugin customization and WooCommerce integration. Performance optimization and SEO.',
        },
      },

      // Matias Profile Translations
      matias: {
        heroTitle: 'Backend Developer & Infrastructure Architect',
        heroSubtitle1: 'Backend Developer',
        heroSubtitle2: 'Infrastructure Architect',
        heroDescription1: 'Building scalable systems for global companies,',
        heroDescription2: 'integrating AI into production workflows,',
        heroDescription3: 'and turning complex problems',
        heroDescription4: 'into elegant solutions',

        services: {
          backend: {
            title: 'Backend Development',
            description:
              'Scalable microservices, RESTful APIs, and high-performance systems. Expert in Node.js, Go, and Python.',
          },
          infrastructure: {
            title: 'Cloud Infrastructure',
            description:
              'AWS, GCP, Docker, Kubernetes. Building resilient, cost-effective cloud architectures.',
          },
          ai: {
            title: 'AI Integration',
            description:
              'LLMs, OpenAI, LangChain, RAG. Building intelligent systems that enhance business operations.',
          },
          fullstack: {
            title: 'Full-Stack Development',
            description:
              'End-to-end application development with React, TypeScript, and modern backend technologies.',
          },
        },

        companyDescriptions: {
          fusionads:
            'Staff Engineer leading orchestration engine design for multi-channel ad campaigns with AI integration.',
          pomelo:
            'Backend Developer building clearing processes and microservices with Go and AWS.',
          mercadolibre:
            'Backend Developer serving 200M+ users across LATAM with high-performance services.',
          otros: 'Personal projects including Condamind, Senda, Micelaria, and Córdoba Rollea.',
        },

        experience: {
          freelance: {
            company: 'Freelance',
            role: 'Full-Stack Developer & Founder',
            period: '2026 – Present',
            location: 'Córdoba, Argentina',
            description:
              'Building innovative products and helping businesses scale. From AI-powered assistants to community platforms and e-commerce solutions.',
          },
          fusionads: {
            company: 'FusionAds',
            role: 'Staff Engineer',
            period: '2024 – 2025',
            location: 'Remote, United States',
            description:
              'Designed orchestration engine in TypeScript/Node.js for multi-channel ad campaigns. Implemented fan-out/fan-in workflows with AI integration. Deployed observability stack and mentored distributed team of 4 developers.',
          },
          pomelo: {
            company: 'Pomelo',
            role: 'Backend Developer',
            period: '2022 – 2023',
            location: 'Buenos Aires, Argentina',
            description:
              'Developed clearing processes & microservices using Hexagonal Architecture, DDD & Event Sourcing. Built AWS services in Go processing millions of daily events.',
          },
          mercadolibre: {
            company: 'MercadoLibre',
            role: 'Backend Developer',
            period: '2018 – 2021',
            location: 'Buenos Aires, Argentina',
            description:
              'Developed scalable backend services for post-purchase features serving 200M+ users across LATAM with P95 < 150ms. Led technical analysis and cross-functional collaboration.',
          },
          ayi: {
            company: 'Ayi & Asociados',
            role: 'Full-Stack Developer',
            period: '2017 – 2018',
            location: 'Córdoba, Argentina',
            description:
              'Developed core features for NaranjaX fintech platform. Built REST APIs with Node.js and frontend components with Angular.',
          },
          darwoft: {
            company: 'Darwoft',
            role: 'Software Developer',
            period: '2016 – 2017',
            location: 'Córdoba, Argentina',
            description:
              'Built backend services for Finandino banking platform using C# .NET. Developed financial reporting modules.',
          },
          brandigital: {
            company: 'Brandigital',
            role: 'Web Developer',
            period: '2015 – 2016',
            location: 'Córdoba, Argentina',
            description:
              'Developed websites for major brands including Aguas Cordobesas, Coca Cola, Huggies, and Volkswagen.',
          },
        },

        projects: {
          condamind: {
            title: 'Condamind',
            description:
              'AI-powered WhatsApp assistant built with advanced language models for business automation.',
          },
          senda: {
            title: 'Senda',
            description:
              'Comprehensive personal productivity system with task management and automation workflows.',
          },
          micelaria: {
            title: 'Micelaria',
            description:
              'Full-stack platform for gourmet mushroom cultivation with e-commerce and inventory management.',
          },
          cordobarollea: {
            title: 'Córdoba Rollea',
            description:
              'Community platform for the freeskating scene connecting skaters and organizing events.',
          },
        },
      },
    },
  },
  es: {
    translation: {
      welcome: '¡Bienvenido!',
      selectLanguage: 'Seleccionar idioma',
      english: 'Inglés',
      spanish: 'Español',

      heroTitle: 'Diseñador UX/UI y Desarrollador Frontend',
      heroSubtitle:
        'Inteligencia Artificial • Experiencia de usuario • E-commerce • Wordpress • Chatbots • Diseño de interfaces • Diseño de aplicaciones móviles • Automatizaciones',

      // Hero section translations
      heroSubtitle1: 'Desarrollador UX/UI',
      heroSubtitle2: 'Especialista en Integración de IA',
      heroDescription1: 'Acompaño a agencias, emprendedores y startups',
      heroDescription2: 'en el diseño de soluciones innovadoras,',
      heroDescription3: 'materializarlas en productos reales',
      heroDescription4: 'e impulsarlas con IA',
      heroDescription5: '',

      viewProjects: 'Ver Proyectos',
      contactMe: 'Contáctame',
      underConstruction: 'En construcción',

      xInvite: {
        title: '¿Querés mantenerte al día?',
        description:
          'Actualizaciones diarias de IA: leaks, microanálisis y ejemplos prácticos. Demos claras, preguntas para debatir y mirada crítica sobre el impacto.',
        cta: 'Visitar perfil',
        ctaAria: 'Abrir el perfil de Alexis en X en una nueva pestaña',
        avatarAlt: 'Foto de perfil de Alexis en X',
      },

      'AI Portfolio Assistant': 'AI Portfolio Assistant',
      '¡Hola! Soy tu AI Portfolio Assistant. ¿En qué puedo ayudarte hoy?':
        '¡Hola! Soy tu AI Portfolio Assistant. ¿En qué puedo ayudarte hoy?',
      'Escribe un mensaje...': 'Escribe un mensaje...',
      'Enviar mensaje': 'Enviar mensaje',
      'Limpiar chat': 'Limpiar chat',
      'Cerrar chat': 'Cerrar chat',
      Conectado: 'Conectado',
      Conectando: 'Conectando',
      Desconectado: 'Desconectado',
      Desconocido: 'Desconocido',

      home: 'Inicio',
      projectsNav: 'Proyectos',
      experienceNav: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto',

      contactText:
        '¿Quieres trabajar juntos? ¿Tienes un proyecto en mente? ¡No dudes en contactarme a alexisleonelvedia@gmail.com o usando el formulario!',
      name: 'Nombre',
      email: 'Correo electrónico',
      message: 'Mensaje',
      subject: 'Asunto',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      messageSent: '¡Mensaje enviado con éxito! Te responderé pronto.',
      messageError: 'Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.',

      namePlaceholder: 'Ej: Steve Jobs',
      emailPlaceholder: 'ejemplo@ejemplo.com',
      messagePlaceholder: 'Escribe un mensaje...',
      subjectPlaceholder: 'Ej: Necesito ayuda para mejorar Siri',

      yourName: 'Tu Nombre',
      allRightsReserved: 'Todos los Derechos Reservados',

      navbar: {
        home: 'Inicio',
        about: 'Sobre Mí',
        projects: 'Proyectos',
        experience: 'Experiencia',
        resume: 'Currículum',
        services: 'Servicios',
        xcons: 'XCONS',
        xcons2: 'XCONS 2',
        fusionads: 'FusionAds',
        bandit: 'Bandit',
        otros: 'Otros Proyectos',
      },

      tooltip: {
        github: 'Visitar Perfil de GitHub',
        linkedin: 'Visitar Perfil de LinkedIn',
        x: 'Visitar Perfil de X',
        toggleTheme: 'Cambiar Tema',
        selectLanguage: 'Seleccionar Idioma',
        viewOriginal: 'Ver imagen original en nueva pestaña',
        copyEmail: 'Copiar correo al portapapeles',
        copied: '¡Copiado!',
      },

      documentLinksTitle: 'Defensa de la propuesta',

      about: {
        professionalProfile: 'Perfil Profesional',
        professionalExperience: 'Experiencia Profesional',
        featuredProjects: 'Proyectos Destacados',
        skills: 'Habilidades',
        languages: 'Idiomas',
        spanish: 'Español: Nativo',
        english: 'Inglés: Nivel Intermedio',
        bio: {
          part1:
            'Desarrollador Full Stack con sólida especialización en React y TypeScript y amplia trayectoria en diseño UX/UI.',
          part2:
            'He colaborado con equipos multidisciplinarios en proyectos internacionales, adaptándome rápidamente a entornos interculturales y metodologías ágiles. Destaco por mi capacidad de trabajo en equipo, humildad profesional y compromiso permanente con la excelencia y la entrega de resultados de alto impacto.',
        },
        jobs: {
          fullStackEngineer: 'Ingeniero Full Stack',
          fusionOS: 'FusionOS.ai | 2024 - 2025',
          uiUxDesigner: 'Diseñador UI/UX & Especialista en Aseguramiento de Calidad',
          xcons: 'XCONS | 2022 - 2024',
        },
        jobDescriptions: {
          fusionOS: [
            'Desarrollo avanzado de funcionalidades frontend con React y TypeScript.',
            'Integración y consumo de APIs REST para dinamizar la aplicación.',
            'Implementación y mantenimiento de interfaces escalables con prácticas de debugging y aseguramiento de la calidad del código.',
          ],
          xcons: [
            'Diseño de interfaces gráficas y experiencias de usuario para aplicaciones web y móviles.',
            'Creación y mantenimiento de bibliotecas de componentes UI.',
            'Desarrollo y personalización de sitios web utilizando WordPress y Elementor.',
            'Ejecución de pruebas funcionales, detección y documentación de errores.',
            'Aseguramiento de la calidad en procesos y productos digitales.',
          ],
        },
        projects: {
          personalPortfolio: 'Portfolio Personal',
          personalPortfolioDesc:
            'Sitio web personal desarrollado con React, TypeScript y Vite, con animaciones avanzadas y diseño responsive.',
          ecommerceApp: 'E-commerce App',
          ecommerceAppDesc:
            'Aplicación de comercio electrónico con carrito de compras, pasarela de pagos y panel de administración.',
        },
        skillCategories: {
          fullStack: 'Full Stack',
          backend: 'Backend',
          tools: 'Herramientas',
        },
      },

      testimonialsTitle: 'Testimonios',
      testimonials: {
        jorge:
          '"Durante los 2 años que prestó servicios para XCONS, Alexis fue una persona muy proactiva, siempre haciendo más de lo que se pedía, con ambición de aprender y superarse."',
        mauro:
          '"Alexis empezó como una persona y terminó como otra en su proceso en Fusion. Sin duda en poco tiempo se adaptó, aprendió y se superó a sí mismo. Nos fue de gran ayuda en tiempos muy acelerados de implementación, y su conocimiento en diseño nos ahorró horas de entendimiento con el equipo de diseñadores."',
        milena:
          '"Siempre que debo trabajar con algún cliente nuevo pienso en Alexis, y en cómo podría servirme su ayuda. Es una persona que está a la vanguardia. ¡Recomendadísimo!"',
        kodi: '"A Alexis lo conocí por contacto con Mile. Realizó una primer propuesta de rediseño de mi app sin habérselo pedido. Ahí me di cuenta que debía trabajar con él. Trabajamos en conjunto durante horas, y no dudaba nunca en decirme que algo no iba por buen camino. Además me hizo conocer muchas herramientas, ¡un genio!"',
      },
      viewOriginalButton: 'Ver Original',
      openOriginalTitle: 'Abrir imagen original en nueva pestaña',
      companyDescriptions: {
        xcons:
          'Plataforma de e-commerce especializada en la venta omnicanal de materiales de construcción.',
        fusionads:
          'Plataforma de publicidad generativa impulsada por IA que crea anuncios profesionales omnicanal.',
        bandit:
          'Plataforma enfocada en la gestión de giras y conciertos en vivo para artistas y managers.',
        otros: 'Diversos proyectos personales y profesionales en desarrollo.',
      },
      bandit: {
        experience: {
          tasks: 'Tareas',
          tools: 'Herramientas',
          results: 'Resultados',
        },
      },

      experience: {
        title: 'Experiencia',
        subtitle: 'Construyendo sistemas de alto tráfico para empresas fintech y ad-tech.',
        projects: 'Proyectos:',
        freelance: {
          company: 'Freelance',
          role: 'Full-Stack Developer & Founder',
          period: '2026 – Presente',
          location: 'Córdoba, Argentina',
          description:
            'Construyendo productos innovadores y ayudando a negocios a escalar. Desde asistentes con IA hasta plataformas comunitarias y soluciones e-commerce.',
        },
        fusionads: {
          company: 'FusionAds',
          role: 'Staff Engineer',
          period: '2024 – 2025',
          location: 'Remoto, Estados Unidos',
          description:
            'Diseñé motor de orquestación en TypeScript/Node.js para campañas publicitarias multicanal. Implementé workflows fan-out/fan-in con integración de IA. Desplegué stack de observabilidad y mentoré equipo distribuido de 4 developers.',
        },
        pomelo: {
          company: 'Pomelo',
          role: 'Backend Developer',
          period: '2022 – 2023',
          location: 'Buenos Aires, Argentina',
          description:
            'Desarrollé procesos de clearing y microservicios usando Arquitectura Hexagonal, DDD y Event Sourcing. Construí servicios AWS en Go procesando millones de eventos diarios.',
        },
        mercadolibre: {
          company: 'MercadoLibre',
          role: 'Backend Developer',
          period: '2018 – 2021',
          location: 'Buenos Aires, Argentina',
          description:
            'Desarrollé servicios backend escalables para features post-compra sirviendo +200M usuarios en LATAM con P95 < 150ms. Lideré análisis técnico y colaboración cross-funcional.',
        },
        ayi: {
          company: 'Ayi & Asociados',
          role: 'Full-Stack Developer',
          period: '2017 – 2018',
          location: 'Córdoba, Argentina',
          description:
            'Desarrollé funcionalidades core para la plataforma fintech NaranjaX. Construí APIs REST con Node.js y componentes frontend con Angular.',
        },
        darwoft: {
          company: 'Darwoft',
          role: 'Software Developer',
          period: '2016 – 2017',
          location: 'Córdoba, Argentina',
          description:
            'Construí servicios backend para la plataforma bancaria Finandino usando C# .NET. Desarrollé módulos de reportes financieros.',
        },
        brandigital: {
          company: 'Brandigital',
          role: 'Web Developer',
          period: '2015 – 2016',
          location: 'Córdoba, Argentina',
          description:
            'Desarrollé sitios web para marcas importantes como Aguas Cordobesas, Coca Cola, Huggies y Volkswagen.',
        },
      },

      projects: {
        title: 'Proyectos Destacados',
        subtitle:
          'Una selección de proyectos que muestran mi experiencia en desarrollo backend, infraestructura e integración con IA.',
        view: 'Ver Proyecto',
      },

      beyondCode: {
        title: 'Más Allá del Código',
        subtitle: 'La vida es más que solo código',
        skating: 'Freeskate',
        'skating.description':
          'Co-fundador de Córdoba Rollea, construyendo comunidad a través del patinaje urbano. Hay algo meditativo en fluir por las calles de la ciudad.',
        music: 'Música Electrónica',
        'music.description':
          'Produciendo beats y explorando diseño sonoro. La producción musical comparte más con la programación de lo que imaginas: ambas tratan sobre patrones, estructura y creatividad.',
      },

      services: {
        title: 'Servicios',
        subtitle:
          'Soluciones integrales desde el diseño hasta el desarrollo, con enfoque en experiencia de usuario y tecnología de vanguardia.',
        frontend: {
          title: 'Desarrollo Frontend',
          description:
            'Aplicaciones web modernas y escalables con React, TypeScript y las últimas tecnologías. Enfoque en rendimiento, accesibilidad y experiencia de usuario.',
        },
        design: {
          title: 'Diseño UX/UI',
          description:
            'Diseño centrado en el usuario con prototipado avanzado en Figma. Research de usuarios, testing de usabilidad y creación de librerías de componentes.',
        },
        automation: {
          title: 'Automatización e Integración',
          description:
            'Automatización de flujos de trabajo con n8n, integraciones de APIs y soluciones de web scraping. Optimización de procesos empresariales.',
        },
        ai: {
          title: 'Integración de IA',
          description:
            'Implementación de soluciones de IA con LLMs, prompt engineering avanzado y desarrollo de flujos de trabajo inteligentes.',
        },
        wordpress: {
          title: 'Desarrollo WordPress',
          description:
            'Soluciones WordPress personalizadas con desarrollo de temas, personalización de plugins e integración WooCommerce. Optimización de rendimiento y SEO.',
        },
      },

      // Traducciones del Perfil de Matias
      matias: {
        heroTitle: 'Desarrollador Backend & Arquitecto de Infraestructura',
        heroSubtitle1: 'Desarrollador Backend',
        heroSubtitle2: 'Arquitecto de Infraestructura',
        heroDescription1: 'Construyendo sistemas escalables para empresas globales,',
        heroDescription2: 'integrando IA en flujos de producción,',
        heroDescription3: 'y convirtiendo problemas complejos',
        heroDescription4: 'en soluciones elegantes',

        services: {
          backend: {
            title: 'Desarrollo Backend',
            description:
              'Microservicios escalables, APIs RESTful y sistemas de alto rendimiento. Experto en Node.js, Go y Python.',
          },
          infrastructure: {
            title: 'Infraestructura Cloud',
            description:
              'AWS, GCP, Docker, Kubernetes. Construyendo arquitecturas cloud resilientes y costo-efectivas.',
          },
          ai: {
            title: 'Integración de IA',
            description:
              'LLMs, OpenAI, LangChain, RAG. Construyendo sistemas inteligentes que mejoran las operaciones empresariales.',
          },
          fullstack: {
            title: 'Desarrollo Full-Stack',
            description:
              'Desarrollo de aplicaciones end-to-end con React, TypeScript y tecnologías backend modernas.',
          },
        },

        companyDescriptions: {
          fusionads:
            'Staff Engineer liderando diseño de motor de orquestación para campañas publicitarias multicanal con integración de IA.',
          pomelo:
            'Backend Developer construyendo procesos de clearing y microservicios con Go y AWS.',
          mercadolibre:
            'Backend Developer sirviendo a +200M usuarios en LATAM con servicios de alto rendimiento.',
          otros: 'Proyectos personales incluyendo Condamind, Senda, Micelaria y Córdoba Rollea.',
        },

        experience: {
          freelance: {
            company: 'Freelance',
            role: 'Full-Stack Developer & Founder',
            period: '2026 – Presente',
            location: 'Córdoba, Argentina',
            description:
              'Construyendo productos innovadores y ayudando a negocios a escalar. Desde asistentes con IA hasta plataformas comunitarias y soluciones e-commerce.',
          },
          fusionads: {
            company: 'FusionAds',
            role: 'Staff Engineer',
            period: '2024 – 2025',
            location: 'Remoto, Estados Unidos',
            description:
              'Diseñé motor de orquestación en TypeScript/Node.js para campañas publicitarias multicanal. Implementé workflows fan-out/fan-in con integración de IA. Desplegué stack de observabilidad y mentoré equipo distribuido de 4 developers.',
          },
          pomelo: {
            company: 'Pomelo',
            role: 'Backend Developer',
            period: '2022 – 2023',
            location: 'Buenos Aires, Argentina',
            description:
              'Desarrollé procesos de clearing y microservicios usando Arquitectura Hexagonal, DDD y Event Sourcing. Construí servicios AWS en Go procesando millones de eventos diarios.',
          },
          mercadolibre: {
            company: 'MercadoLibre',
            role: 'Backend Developer',
            period: '2018 – 2021',
            location: 'Buenos Aires, Argentina',
            description:
              'Desarrollé servicios backend escalables para features post-compra sirviendo +200M usuarios en LATAM con P95 < 150ms. Lideré análisis técnico y colaboración cross-funcional.',
          },
          ayi: {
            company: 'Ayi & Asociados',
            role: 'Full-Stack Developer',
            period: '2017 – 2018',
            location: 'Córdoba, Argentina',
            description:
              'Desarrollé funcionalidades core para la plataforma fintech NaranjaX. Construí APIs REST con Node.js y componentes frontend con Angular.',
          },
          darwoft: {
            company: 'Darwoft',
            role: 'Software Developer',
            period: '2016 – 2017',
            location: 'Córdoba, Argentina',
            description:
              'Construí servicios backend para la plataforma bancaria Finandino usando C# .NET. Desarrollé módulos de reportes financieros.',
          },
          brandigital: {
            company: 'Brandigital',
            role: 'Web Developer',
            period: '2015 – 2016',
            location: 'Córdoba, Argentina',
            description:
              'Desarrollé sitios web para marcas importantes como Aguas Cordobesas, Coca Cola, Huggies y Volkswagen.',
          },
        },

        projects: {
          condamind: {
            title: 'Condamind',
            description:
              'Asistente de WhatsApp potenciado por IA con modelos de lenguaje avanzados para automatización empresarial.',
          },
          senda: {
            title: 'Senda',
            description:
              'Sistema integral de productividad personal con gestión de tareas y flujos de automatización.',
          },
          micelaria: {
            title: 'Micelaria',
            description:
              'Plataforma full-stack para cultivo de hongos gourmet con e-commerce y gestión de inventario.',
          },
          cordobarollea: {
            title: 'Córdoba Rollea',
            description:
              'Plataforma comunitaria para la escena del freeskate conectando patinadores y organizando eventos.',
          },
        },
      },
    },
  },
};

const getDefaultLanguage = () => {
  const savedLanguage = localStorage.getItem('i18nextLng');
  if (savedLanguage && (savedLanguage.startsWith('es') || savedLanguage.startsWith('en'))) {
    return savedLanguage.startsWith('es') ? 'es' : 'en';
  }

  const browserLang = navigator.language;
  return browserLang && browserLang.startsWith('es') ? 'es' : 'en';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: getDefaultLanguage(),
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

i18n.on('languageChanged', lng => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
