import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation, ScrollRestoration, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, setLoaded } from '@store/index';
import { GlobalStyles } from '@styles/GlobalStyles';
import styled from 'styled-components';
import ContactButton from '@components/ContactButton';
import { ThemeProvider } from './context/ThemeContext';
import FontLoader from '@components/FontLoader/FontLoader';
import GrainOverlay from '@components/GrainOverlay';
import Sidebar from '@components/Sidebar/Sidebar';
import LoadingSpinner from '@components/LoadingSpinner';
import { LazyLoadErrorBoundary } from '@components/ErrorBoundary';


const ChatbotAssistant = React.lazy(
  () =>
    new Promise<{ default: React.ComponentType<{ initialDelay?: number; n8nServerReady?: boolean }> }>(resolve =>
      setTimeout(() => resolve(import('@components/ChatbotAssistant')), 2000)
    )
);

const LazyComponentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyLoadErrorBoundary>
      <React.Suspense fallback={<LoadingSpinner />}>
        {children}
      </React.Suspense>
    </LazyLoadErrorBoundary>
  );
};
import { initScrollDetection } from '@utils/scrollDetection';
import { initializeN8NServer } from '@services/n8nService';

import Home from './pages/Home';

const createLazyComponent = (importFn: () => Promise<any>, retries = 3) => {
  return React.lazy(() => {
    return new Promise((resolve, reject) => {
      const attemptImport = (retriesLeft: number) => {
        importFn()
          .then(resolve)
          .catch((error) => {
            if (retriesLeft > 0) {
              setTimeout(() => attemptImport(retriesLeft - 1), 1000);
            } else {
              reject(error);
            }
          });
      };
      attemptImport(retries);
    });
  });
};

const ProjectPage = createLazyComponent(() => import('./pages/ProjectPage'));
const XConsExperiencePage = createLazyComponent(() => import('./xcons/XConsExperiencePage'));
const FusionAdsPage = createLazyComponent(() => import('./fusionads/FusionAdsPage'));
const BanditPage = createLazyComponent(() => import('./bandit/BanditPage'));
const MaintenancePage = createLazyComponent(() => import('./pages/MaintenancePage'));
const NewLookPage = createLazyComponent(() => import('./newlook/NewLookPage'));


import '@utils/i18n';

const SIDEBAR_WIDTH = '280px';

const AppWrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
`;

const MainContentWrapper = styled.div<{ $isSidebarPresent: boolean }>`
  flex-grow: 1;
  position: relative;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow: visible;
  background-color: ${({ theme }) => theme.colors.background};
  margin-left: ${({ $isSidebarPresent }) => ($isSidebarPresent ? SIDEBAR_WIDTH : '0')};
  transition: margin-left 0.3s ease-in-out;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100vw;
  }
`;


const Container = styled.div`
  position: relative;
`;


const ContactButtonStyled = styled(ContactButton)<{ $hideOnScroll: boolean }>`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 100;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: translateY(${props => (props.$hideOnScroll ? '-100px' : '0')});
  
  
  
  }
`;

// Componente wrapper para Home que usa el contexto del Outlet
const HomeWrapper = () => {
  const { handleAnimationComplete, fontsLoaded, setIsContactSectionInView } = useOutletContext<{
    handleAnimationComplete: () => void;
    fontsLoaded: boolean;
    setIsContactSectionInView: (inView: boolean) => void;
  }>();
  
  return (
    <Home 
      onAnimationComplete={handleAnimationComplete} 
      fontsLoaded={fontsLoaded} 
      onContactSectionViewChange={setIsContactSectionInView}
    />
  );
};

const AppContent = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isContactSectionInView, setIsContactSectionInView] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [n8nServerReady, setN8nServerReady] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setShouldShowLoader(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    } else {
      setFontsLoaded(true);
    }
    document.fonts.ready.then(() => {
      if (hasVisitedBefore) {
        setFontsLoaded(true);
      }
    });
  }, []);

  useEffect(() => {

    const timer = setTimeout(async () => {
      try {
  
        const success = await initializeN8NServer();
        setN8nServerReady(success);
        

        if (!success) {
          let retryCount = 0;
          const maxRetries = 3;
          
          const retryInterval = setInterval(async () => {
            retryCount++;

            
            const retrySuccess = await initializeN8NServer();
            if (retrySuccess) {
              setN8nServerReady(true);
              clearInterval(retryInterval);
            } else if (retryCount >= maxRetries) {
    

              clearInterval(retryInterval);
            }
          }, 3000);
          
    
          return () => clearInterval(retryInterval);
        }
      } catch (error) {
        console.error("Error al inicializar el servidor n8n:", error);
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // El chatbot siempre debe aparecer después de un retraso, independientemente del estado de n8n
    const timer = window.setTimeout(() => {
      setChatbotVisible(true);
    }, isMobile ? 1000 : 500);
    return () => clearTimeout(timer);
  }, [isMobile]);


  useEffect(() => {
    if (location.state?.scrollToSection && location.pathname === '/') {
      const sectionId = location.state.scrollToSection;
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        setTimeout(() => {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }

      window.history.replaceState({}, location.pathname, location.pathname);
    }
  }, [location.state, location.pathname]);



  const handleAnimationComplete = () => {
    store.dispatch(setLoaded(true));
  };

  useEffect(() => {
    const cleanup = initScrollDetection();
    return cleanup;
  }, []);

  const handleFontsLoaded = () => {
    setFontsLoaded(true);
  };

  const toggleSidebar = () => {
    if (isMobile) {
        setIsSidebarOpen(!isSidebarOpen);
    }
  };


  const shouldHideContactButton = isMobile && isContactSectionInView;

  return (
    <AppWrapper>
      {shouldShowLoader && !fontsLoaded && <FontLoader onLoaded={handleFontsLoaded} />}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      
      <MainContentWrapper $isSidebarPresent={isSidebarOpen && !isMobile}>
        <GrainOverlay />
        <ContactButtonStyled initialDelay={500} $hideOnScroll={shouldHideContactButton} />
        {chatbotVisible && (
          <React.Suspense fallback={null}>
            <ChatbotAssistant initialDelay={500} n8nServerReady={n8nServerReady} />
          </React.Suspense>
        )}

        <Container>
          <ScrollRestoration 
            getKey={(location) => {
              return location.pathname;
            }}
          />
          <LazyComponentWrapper>
            <Outlet context={{ handleAnimationComplete, fontsLoaded, setIsContactSectionInView }} />
          </LazyComponentWrapper>
        </Container>
      </MainContentWrapper>
    </AppWrapper>
  );
};

function App() {
  const router = createBrowserRouter([
    {
       path: "/newlook",
      element: (
        <LazyComponentWrapper>
          <NewLookPage />
        </LazyComponentWrapper>
      )
    },
    {
      path: "/",
      element: <AppContent />,
      children: [
        {
          index: true,
          element: <HomeWrapper />
        },
        {
          path: "xcons",
          element: <XConsExperiencePage />
        },
        {
          path: "fusionads",
          element: <FusionAdsPage />
        },
        {
          path: "bandit",
          element: <BanditPage />
        },
        {
          path: "otros",
          element: <MaintenancePage />
        },
        {
          path: ":projectId",
          element: <ProjectPage />
        }
      ]
    }
  ]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
