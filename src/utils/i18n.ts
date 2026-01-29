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
        ctaAria: "Open Matias' profile on X in a new tab",
        avatarAlt: "Matias' X profile photo",
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
        "Need to scale your backend? Integrate AI into your product? Someone who understands and executes fast? Tell me what you need. If I can help, I'll tell you how. If not, I'll recommend someone who can. Email me at matias@condamind.com or use the form.",
      name: 'Name',
      email: 'Email',
      message: 'Message',
      subject: 'Subject',
      send: "Let's talk",
      sending: 'Sending...',
      messageSent: 'Message sent successfully! I will get back to you soon.',
      messageError: 'There was an error sending your message. Please try again.',

      namePlaceholder: 'Your name',
      emailPlaceholder: 'example@example.com',
      messagePlaceholder: 'What technical challenge do you have?',
      subjectPlaceholder: 'What do you need to build?',

      yourName: 'Your Name',
      allRightsReserved: 'All Rights Reserved',
      contactNeedsLabel: 'What do you need help with?',
      contactNeeds: {
        backend: 'Backend/APIs',
        infra: 'Infrastructure/DevOps',
        ai: 'AI integration',
        fullstack: 'Full-stack',
        product: 'Product',
        website: 'Website',
        custom: 'Custom system',
      },

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
      trustedBy: 'Worked with teams at:',

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
            'After 10 years building systems for companies like MercadoLibre, Pomelo, and US startups, I channeled that experience into my own products. Condamind (AI for WhatsApp, in development), Cratos (fitness for gyms), Senda (personal productivity). Each solves real problems because I built them for real users - starting with myself.',
        },
        fusionads: {
          company: 'FusionAds',
          role: 'Staff Engineer',
          period: '2024 – 2025',
          location: 'Remote, United States',
          description:
            'Led architecture for multi-channel ads platform. Designed orchestration engine that reduced campaign deploy time from 2 days to <1 hour. Workflow engine processing 100k+ events/day. Mentored distributed team of 4 devs. Result: 10x product velocity.',
        },
        pomelo: {
          company: 'Pomelo',
          role: 'Backend Developer',
          period: '2022 – 2023',
          location: 'Buenos Aires, Argentina',
          description:
            'Fintech processing millions in transactions. Built clearing and settlement services with Hexagonal Architecture + Event Sourcing. Microservices in Go processing 500k+ daily events. Result: 0 production downtime, 100% compliance.',
        },
        mercadolibre: {
          company: 'MercadoLibre',
          role: 'Backend Developer',
          period: '2018 – 2021',
          location: 'Córdoba, Argentina',
          description:
            'Post-purchase notification system for +100M users across LATAM. Java microservices with P99 < 100ms. 50+ releases/week. Result: 2M+ notifications/day, 99.9% uptime.',
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
        viewDetails: 'View details',
        visitSite: 'Visit site',
      },

      cordobarolleaPage: {
        title: 'Córdoba Rollea',
        subtitle:
          'Platform to organize urban rides and strengthen the roller community in Córdoba.',
        intro:
          'WhatsApp groups did not scale: spam, lost info, and mixed levels. I built a site to organize rides by level, add routes and guides, and enable donations to fund events.',
        logoAlt: 'Córdoba Rollea logo',
        cta: 'Visit site',
        ctaAria: 'Open Córdoba Rollea website in a new tab',
        igCta: 'Instagram',
        igCtaAria: 'Open Córdoba Rollea Instagram profile in a new tab',
        highlightsTitle: 'What I built',
        highlights: [
          'Organized rides and events with clear levels and details',
          'Urban routes with maps and key points',
          'Guides and level system for new skaters',
          'Admin panel to manage content and schedules',
          'Donations to fund community events',
        ],
        stackTitle: 'Stack',
        galleryTitle: 'Product highlights',
        gallery: {
          salidas: {
            title: 'Rides overview',
            description:
              'Calendar view with upcoming rides, levels, and quick access to details.',
          },
          detalleSalida1: {
            title: 'Ride details',
            description:
              'Clear meeting point, schedule, and expectations so new skaters know if a ride fits.',
          },
          detalleSalida2: {
            title: 'Community context',
            description:
              'Extra info, recommendations, and visual cues that help people prepare for the ride.',
          },
          recorridos: {
            title: 'Urban routes',
            description:
              'Route maps with key points and difficulty so riders can choose confidently.',
          },
          niveles: {
            title: 'Skill levels',
            description:
              'Friendly level system that keeps rides inclusive while setting expectations.',
          },
          guias: {
            title: 'Guides & tips',
            description:
              'Safety and prep guides to help beginners join without fear.',
          },
          donaciones: {
            title: 'Community support',
            description:
              'Donations section to fund events and keep the community sustainable.',
          },
          admin: {
            title: 'Admin workflow',
            description:
              'Backoffice panel to manage content, schedules, and ride logistics.',
          },
        },
      },
      micelariaPage: {
        title: 'Micelaria',
        subtitle: 'E-commerce experience focused on functional mushrooms and brand storytelling.',
        intro:
          'A personal project to build a full store from zero: product definition, brand, content and a smooth shopping flow for real customers.',
        logoAlt: 'Micelaria logo',
        cta: 'Visit site',
        ctaAria: 'Open Micelaria website in a new tab',
        igCta: 'Instagram',
        igCtaAria: 'Open Micelaria Instagram profile in a new tab',
        highlightsTitle: 'What I built',
        highlights: [
          'Product storytelling from landing to catalog',
          'Storefront and cart optimized for conversion',
          'Checkout flow with local payment methods',
          'Backoffice to manage products and orders',
          'Performance-focused UI with Astro + Tailwind',
        ],
        stackTitle: 'Stack',
        galleryTitle: 'Product highlights',
        gallery: {
          home: {
            title: 'Brand first landing',
            description: 'A home that explains the product and positions the brand clearly.',
          },
          tienda: {
            title: 'Product catalog',
            description: 'Clean grid with product highlights and fast browsing.',
          },
          carrito1: {
            title: 'Cart summary',
            description: 'Simple cart overview with quantities and totals.',
          },
          carrito2: {
            title: 'Checkout flow',
            description: 'Focused checkout with delivery and payment steps.',
          },
          admin: {
            title: 'Admin panel',
            description: 'Manage products, stock, and order status in one place.',
          },
        },
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
        heroDescription1:
          'Staff Engineer with 10 years at MercadoLibre, Pomelo, and US startups. I build backends that scale without a 30-person team.',
        heroDescription2: '',
        heroDescription3: '',
        heroDescription4: '',

        services: {
          backend: {
            title: 'Backend that holds up',
            description:
              'APIs, microservices, complex integrations. With Node.js, Go, or Python. If your app crashes when it grows, or you want to prevent that, I can help.',
          },
          infrastructure: {
            title: "Infrastructure that won't break you",
            description:
              "AWS, GCP, Docker, Kubernetes. Automated deployments, monitoring, and costs under control. I've worked on systems with thousands of deploys per day.",
          },
          ai: {
            title: 'AI that adds real value',
            description:
              'LLMs, OpenAI, intelligent automation. No hype, just concrete use cases. Condamind processes thousands of WhatsApp conversations with AI.',
          },
          fullstack: {
            title: 'The full stack when you need it',
            description:
              'React, TypeScript, Next.js. Backend + frontend when you need someone to close the complete loop. One person responsible, less coordination.',
          },
        },

        companyDescriptions: {
          fusionads:
            'Staff Engineer leading orchestration engine design for multi-channel ad campaigns with AI integration.',
          pomelo:
            'Backend Developer building clearing processes and microservices with Go and AWS.',
          mercadolibre:
            'Backend Developer serving 100M+ users across LATAM with high-performance services.',
          otros: 'Personal projects including Condamind, Senda, Micelaria, and Córdoba Rollea.',
        },

        experience: {
          freelance: {
            company: 'Freelance',
            role: 'Full-Stack Developer & Founder',
            period: '2026 – Present',
            location: 'Córdoba, Argentina',
            description:
              'After 10 years building systems for companies like MercadoLibre, Pomelo, and US startups, I channeled that experience into my own products. Condamind (AI for WhatsApp, in development), Cratos (fitness for gyms), Senda (personal productivity). Each solves real problems because I built them for real users - starting with myself.',
          },
          fusionads: {
            company: 'FusionAds',
            role: 'Staff Engineer',
            period: '2024 – 2025',
            location: 'Remote, United States',
            description:
              'Led architecture for multi-channel ads platform. Designed orchestration engine that reduced campaign deploy time from 2 days to <1 hour. Workflow engine processing 100k+ events/day. Mentored distributed team of 4 devs. Result: 10x product velocity.',
          },
          pomelo: {
            company: 'Pomelo',
            role: 'Backend Developer',
            period: '2022 – 2023',
            location: 'Buenos Aires, Argentina',
            description:
              'Fintech processing millions in transactions. Built clearing and settlement services with Hexagonal Architecture + Event Sourcing. Microservices in Go processing 500k+ daily events. Result: 0 production downtime, 100% compliance.',
          },
          mercadolibre: {
            company: 'MercadoLibre',
            role: 'Backend Developer',
            period: '2018 – 2021',
            location: 'Córdoba, Argentina',
            description:
              'Post-purchase notification system for +100M users across LATAM. Java microservices with P99 < 100ms. 50+ releases/week. Result: 2M+ notifications/day, 99.9% uptime.',
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
              "The ecosystem's brain: AI WhatsApp assistant, admin panel, and the connection between all products. Enterprise architecture, immediate results.",
          },
          senda: {
            title: 'Senda',
            description:
              'My personal productivity system turned product. Tasks, habits, goals - all synced with smart reminders.',
          },
          cratos: {
            title: 'Cratos',
            description:
              'Fitness platform born from personal need. 2000+ exercises, smart plans, and the trust of real gyms.',
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
        ctaAria: 'Abrir el perfil de Matias en X en una nueva pestaña',
        avatarAlt: 'Foto de perfil de Matias en X',
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
        '¿Necesitás escalar tu backend? ¿Integrar IA en tu producto? ¿Alguien que entienda y ejecute rápido? Contame qué necesitás. Si puedo ayudar, te digo cómo. Si no, te recomiendo a alguien que sí pueda. Escribime a matias@condamind.com o usá el form.',
      name: 'Nombre',
      email: 'Correo electrónico',
      message: 'Mensaje',
      subject: 'Asunto',
      send: 'Hablemos',
      sending: 'Enviando...',
      messageSent: '¡Mensaje enviado con éxito! Te responderé pronto.',
      messageError: 'Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.',

      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'ejemplo@ejemplo.com',
      messagePlaceholder: '¿Qué desafío técnico tenés?',
      subjectPlaceholder: '¿Qué necesitás construir?',

      yourName: 'Tu Nombre',
      allRightsReserved: 'Todos los Derechos Reservados',
      contactNeedsLabel: '¿En qué necesitás ayuda?',
      contactNeeds: {
        backend: 'Backend/APIs',
        infra: 'Infraestructura/DevOps',
        ai: 'Integración con IA',
        fullstack: 'Full-stack',
        product: 'Producto',
        website: 'Página web',
        custom: 'Sistema personalizado',
      },

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
      trustedBy: 'Trabajé con equipos en:',

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
            'Después de 10 años construyendo sistemas para empresas como MercadoLibre, Pomelo y startups de EE.UU., canalicé esa experiencia en productos propios. Condamind (IA para WhatsApp, en desarrollo), Cratos (fitness para gimnasios), Senda (productividad personal). Cada uno resuelve problemas reales porque los construí para usuarios reales - empezando por mí.',
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
          location: 'Córdoba, Argentina',
          description:
            'Desarrollé servicios backend escalables para features post-compra sirviendo +100M usuarios en LATAM con P95 < 150ms. Lideré análisis técnico y colaboración cross-funcional.',
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
        viewDetails: 'Ver detalle',
        visitSite: 'Visitar sitio',
      },

      cordobarolleaPage: {
        title: 'Córdoba Rollea',
        subtitle:
          'Plataforma para organizar salidas urbanas y fortalecer la comunidad roller de Córdoba.',
        intro:
          'Los grupos de WhatsApp no escalaban: spam, info perdida y niveles mezclados. Construí un sitio para organizar salidas por nivel, sumar recorridos y guías, y habilitar donaciones para financiar eventos.',
        logoAlt: 'Logo de Córdoba Rollea',
        cta: 'Visitar sitio',
        ctaAria: 'Abrir el sitio de Córdoba Rollea en una nueva pestaña',
        igCta: 'Instagram',
        igCtaAria: 'Abrir el Instagram de Córdoba Rollea en una nueva pestaña',
        highlightsTitle: 'Lo que construí',
        highlights: [
          'Salidas y eventos organizados con niveles y detalles claros',
          'Recorridos urbanos con mapas y puntos de interés',
          'Guías y niveles para orientar a nuevos patinadores',
          'Panel de administración para gestionar contenido y agenda',
          'Donaciones para financiar eventos comunitarios',
        ],
        stackTitle: 'Stack',
        galleryTitle: 'Capturas del producto',
        gallery: {
          salidas: {
            title: 'Calendario de salidas',
            description:
              'Vista general con próximas salidas, nivel y acceso rápido a detalles.',
          },
          detalleSalida1: {
            title: 'Detalle de la salida',
            description:
              'Punto de encuentro, horario y expectativas claras para nuevos patinadores.',
          },
          detalleSalida2: {
            title: 'Contexto y recomendaciones',
            description:
              'Información extra, consejos y visuales para llegar preparado.',
          },
          recorridos: {
            title: 'Recorridos urbanos',
            description:
              'Mapas con puntos clave y dificultad para elegir con confianza.',
          },
          niveles: {
            title: 'Niveles de habilidad',
            description:
              'Sistema de niveles para incluir a todos y alinear expectativas.',
          },
          guias: {
            title: 'Guías y tips',
            description:
              'Consejos de seguridad y preparación para quienes se suman por primera vez.',
          },
          donaciones: {
            title: 'Apoyo comunitario',
            description:
              'Sección de donaciones para financiar eventos y sostener la comunidad.',
          },
          admin: {
            title: 'Panel de administración',
            description:
              'Backoffice para gestionar contenido, agenda y logística.',
          },
        },
      },
      micelariaPage: {
        title: 'Micelaria',
        subtitle: 'E-commerce enfocado en hongos funcionales y storytelling de marca.',
        intro:
          'Proyecto personal para construir una tienda completa desde cero: producto, marca, contenidos y un flujo de compra pensado para clientes reales.',
        logoAlt: 'Logo de Micelaria',
        cta: 'Visitar sitio',
        ctaAria: 'Abrir el sitio de Micelaria en una nueva pestaña',
        igCta: 'Instagram',
        igCtaAria: 'Abrir el Instagram de Micelaria en una nueva pestaña',
        highlightsTitle: 'Lo que construí',
        highlights: [
          'Narrativa del producto desde la home hasta el catálogo',
          'Tienda y carrito optimizados para conversión',
          'Checkout con métodos de pago locales',
          'Backoffice para gestionar productos y pedidos',
          'UI rápida con Astro + Tailwind',
        ],
        stackTitle: 'Stack',
        galleryTitle: 'Capturas del producto',
        gallery: {
          home: {
            title: 'Home con foco de marca',
            description: 'Una portada que explica el producto y posiciona la marca.',
          },
          tienda: {
            title: 'Catálogo de productos',
            description: 'Grid limpio con productos destacados y navegación rápida.',
          },
          carrito1: {
            title: 'Resumen de carrito',
            description: 'Vista simple con cantidades y totales claros.',
          },
          carrito2: {
            title: 'Flujo de checkout',
            description: 'Checkout enfocado con entrega y pasos de pago.',
          },
          admin: {
            title: 'Panel de administración',
            description: 'Gestión de productos, stock y estado de pedidos.',
          },
        },
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
        heroDescription1:
          'Staff Engineer con 10 años en MercadoLibre, Pomelo y startups de USA. Construyo backends que escalan sin necesitar un equipo de 30 personas.',
        heroDescription2: '',
        heroDescription3: '',
        heroDescription4: '',

        services: {
          backend: {
            title: 'Backend que aguanta',
            description:
              'APIs, microservicios, integraciones complejas. Con Node.js, Go o Python. Si tu app se cae cuando crece, o querés evitar que pase, puedo ayudar.',
          },
          infrastructure: {
            title: 'Infraestructura que no te arruina',
            description:
              'AWS, GCP, Docker, Kubernetes. Deployments automatizados, monitoreo, y costos bajo control. Trabajé en sistemas con miles de deploys por día.',
          },
          ai: {
            title: 'IA que suma valor real',
            description:
              'LLMs, OpenAI, automatización inteligente. Sin hype, con casos de uso concretos. Condamind procesa miles de conversaciones en WhatsApp con IA.',
          },
          fullstack: {
            title: 'El stack completo si lo necesitás',
            description:
              'React, TypeScript, Next.js. Backend + frontend cuando necesitás que alguien cierre el círculo completo. Un solo responsable, menos coordinación.',
          },
        },

        companyDescriptions: {
          fusionads:
            'Staff Engineer liderando diseño de motor de orquestación para campañas publicitarias multicanal con integración de IA.',
          pomelo:
            'Backend Developer construyendo procesos de clearing y microservicios con Go y AWS.',
          mercadolibre:
            'Backend Developer sirviendo a +100M usuarios en LATAM con servicios de alto rendimiento.',
          otros: 'Proyectos personales incluyendo Condamind, Senda, Micelaria y Córdoba Rollea.',
        },

        experience: {
          freelance: {
            company: 'Freelance',
            role: 'Full-Stack Developer & Founder',
            period: '2026 – Presente',
            location: 'Córdoba, Argentina',
            description:
              'Después de 10 años construyendo sistemas para empresas como MercadoLibre, Pomelo y startups de EE.UU., canalicé esa experiencia en productos propios. Condamind (IA para WhatsApp, en desarrollo), Cratos (fitness para gimnasios), Senda (productividad personal). Cada uno resuelve problemas reales porque los construí para usuarios reales - empezando por mí.',
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
            location: 'Córdoba, Argentina',
            description:
              'Desarrollé servicios backend escalables para features post-compra sirviendo +100M usuarios en LATAM con P95 < 150ms. Lideré análisis técnico y colaboración cross-funcional.',
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
              'El cerebro del ecosistema: asistente IA en WhatsApp, panel de administración, y la conexión entre todos los productos. Arquitectura enterprise, resultados inmediatos.',
          },
          senda: {
            title: 'Senda',
            description:
              'Mi sistema de productividad personal convertido en producto. Tareas, hábitos, objetivos - todo sincronizado con recordatorios inteligentes.',
          },
          cratos: {
            title: 'Cratos',
            description:
              'Plataforma de fitness nacida de necesidad propia. 2000+ ejercicios, planes inteligentes, y la confianza de gimnasios reales.',
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
