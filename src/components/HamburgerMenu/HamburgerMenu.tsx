import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface HamburgerMenuProps {
  heroContainerRef?: React.RefObject<HTMLElement>;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ heroContainerRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    const htmlElement = document.documentElement;
    const newState = !isOpen;
    setIsOpen(newState);
    
    if (newState) {
      htmlElement.classList.add('open-navi');
      document.body.style.overflow = 'hidden';
    } else {
      htmlElement.classList.remove('open-navi');
      document.body.style.overflow = '';
    }
  };

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const navItems = Array.from(e.currentTarget.closest('nav')?.querySelectorAll('.nav-item') || []);
    navItems.forEach(item => {
      if (item !== e.currentTarget.closest('.nav-item')) {
        item.classList.add('sibling-hover');
      }
    });
  };

  const handleNavLeave = () => {
    const navItems = Array.from(document.querySelectorAll('#navigation .nav-item'));
    navItems.forEach(item => {
      item.classList.remove('sibling-hover');
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (heroContainerRef?.current) {
        const scrolled = window.scrollY > 50;
        setIsVisible(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.classList.remove('open-navi');
      document.body.style.overflow = '';
    };
  }, [heroContainerRef]);

  return (
    <>
      <QuickBar className="quickbar" $isVisible={isVisible}>
        <QuickBarInner className="quickbar-inner">
          <QuickBarRow className="quickbar-row">
            <BrandingCol className="col branding-col">
              <Branding className="branding" href="/">
                <LogoText>AV</LogoText>
              </Branding>
            </BrandingCol>
            <MenuCol className="col menu-col">
              <MenuButton 
                className="menu"
                data-toggle-nav
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                aria-expanded={isOpen}
              >
                <Hamburger className="hamburger">
                  <Line className="line">
                    <LineInner className="line-inner" />
                  </Line>
                  <Line className="line">
                    <LineInner className="line-inner" />
                  </Line>
                </Hamburger>
                <X className="x">
                  <XLine className="line" />
                  <XLine className="line" />
                  <Circle className="circle" />
                </X>
              </MenuButton>
            </MenuCol>
          </QuickBarRow>
        </QuickBarInner>
      </QuickBar>

      <Navigation id="navigation" data-lenis-prevent>
        <NavigationRow className="row">
          <NavigationCol className="col">
            <NavigationInner className="navigation-inner">
              <NavSection>
                <nav onMouseLeave={handleNavLeave}>
                  <NavList className="nav">
                    <NavItem className="nav-item">
                      <LiInner className="li-inner">
                        <NavLink href="#home" onMouseEnter={handleNavHover}>Home</NavLink>
                      </LiInner>
                    </NavItem>
                    <NavItem className="nav-item">
                      <LiInner className="li-inner">
                        <NavLink href="#about" onMouseEnter={handleNavHover}>About</NavLink>
                      </LiInner>
                    </NavItem>
                    <NavItem className="nav-item">
                      <LiInner className="li-inner">
                        <NavLink href="#work" onMouseEnter={handleNavHover}>Work</NavLink>
                      </LiInner>
                    </NavItem>
                    <NavItem className="nav-item">
                      <LiInner className="li-inner">
                        <NavLink href="#contact" onMouseEnter={handleNavHover}>Contact</NavLink>
                      </LiInner>
                    </NavItem>
                  </NavList>
                </nav>
              </NavSection>
              <SocialsSection className="infos-ct">
                <SocialsCt className="socials-ct">
                  <SocialLink href="#instagram" className="social">Instagram</SocialLink>
                  <SocialLink href="#twitter" className="social">Twitter</SocialLink>
                  <SocialLink href="#linkedin" className="social">LinkedIn</SocialLink>
                  <SocialLink href="#github" className="social">GitHub</SocialLink>
                  <SocialLink href="#dribbble" className="social">Dribbble</SocialLink>
                </SocialsCt>
              </SocialsSection>
            </NavigationInner>
          </NavigationCol>
        </NavigationRow>
      </Navigation>
    </>
  );
};

const QuickBar = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  mix-blend-mode: difference;
  opacity: ${props => props.$isVisible ? '1' : '0'};
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};
  transition: opacity 0.4s ease-in-out;

  html.open-navi & {
    opacity: 1 !important;
    pointer-events: auto !important;
  }
`;

const QuickBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 5rem;
  position: relative;

  @media screen and (min-width: 640px) {
    padding-block: 1.88rem;
  }
`;

const QuickBarRow = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: calc(100vw - 1.88rem);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 640px) {
    align-items: flex-start;
  }
`;

const BrandingCol = styled.div`
  padding-left: 0.94rem;
  padding-right: 0.94rem;
  flex-basis: 50%;
  max-width: 50%;
`;

const MenuCol = styled.div`
  padding-left: 0.94rem;
  padding-right: 0.94rem;
  display: flex;
  justify-content: flex-end;
  flex-basis: 50%;
  max-width: 50%;
`;

const Branding = styled.a`
  display: block;
  pointer-events: initial;
  max-width: 13.16rem;
  overflow: hidden;
  text-decoration: none;

  @media screen and (min-width: 640px) {
    max-width: 4.84rem;
  }
`;

const LogoText = styled.span`
  font-family: 'Inter Tight', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
`;

const MenuButton = styled.button`
  width: 15rem;
  height: 6.67rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  pointer-events: inherit;
  appearance: none;
  background: unset;
  border: unset;
  padding: 0;
  outline: none;

  @media screen and (min-width: 640px) {
    height: 1.67rem;
    width: auto;

    &:hover .hamburger .line .line-inner,
    &:focus .hamburger .line .line-inner {
      background-position: 0% !important;
    }
  }
`;

const Hamburger = styled.span`
  width: 100%;
  height: 1.9rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 640px) {
    height: 0.57rem;
    width: 4.79rem;

    html.open-navi & {
      transform: scaleX(0);
    }
  }
`;

const Line = styled.span`
  width: 100%;
  height: 0.53rem;
  min-height: 1px;
  position: relative;
  overflow: hidden;

  @media (min-width: 640px) {
    min-height: 2px;
    height: 0.1rem;
  }

  &:last-of-type .line-inner {
    transition-delay: 0.2s;
  }
`;

const LineInner = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, white 0%, white 40%, black 40%, black 60%, white 60%, white 100%);
  background-size: 250%;
  background-position: 100%;

  html.open-navi & {
    width: 0% !important;
  }
`;

const X = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 100%;
  pointer-events: none;
  cursor: pointer;

  html.open-navi & {
    pointer-events: auto;
  }

  &:hover,
  &:focus {
    transform: translate(-50%, -50%) scale(1.05) !important;
  }

  @media screen and (min-width: 640px) {
    height: 4.79rem;
    width: 4.79rem;
    left: auto;
    right: 0;
    transform: translate(0, -50%);

    &:hover,
    &:focus {
      transform: translate(0, -50%) scale(1.05) !important;
    }
  }
`;

const XLine = styled.span`
  width: 50%;
  height: 0.1rem;
  min-height: 1px;
  background-color: #FCFCFC;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(45deg) scale3d(0, 1, 1) translateX(-50%);
  transform-origin: left;

  html.is-trans & {
    transition: none !important;
  }

  html.open-navi & {
    transition-delay: 0.1s;
    transform: rotate(45deg) scale3d(1, 1, 1) translateX(-50%);
  }

  &:nth-of-type(2) {
    transform: rotate(-45deg) scale3d(0, 1, 1) translateX(-50%);
  }

  html.open-navi &:nth-of-type(2) {
    transform: rotate(-45deg) scale3d(1, 1, 1) translateX(-50%);
    transition-delay: 0.3s;
  }
`;

const Circle = styled.span`
  width: 0;
  height: 0;
  border-radius: 100%;
  background-color: #141414;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  html.is-trans & {
    transition: none !important;
  }

  html.open-navi & {
    transform: translate(-50%, -50%);
    width: 10.67rem;
    height: 10.67rem;
    transition-delay: 0.2s;
  }

  @media screen and (min-width: 640px) {
    html.open-navi & {
      width: 100%;
      height: 100%;
    }
  }
`;

const Navigation = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 9999;
  overflow: auto;
  transition: all 0.7s cubic-bezier(0.9, 0.1, 0.1, 0.9), visibility 0s linear 0.7s;
  display: block;
  pointer-events: none;
  clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
  background-color: #f0f0f0;
  visibility: hidden;

  @media screen and (min-width: 640px) {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }

  html.is-trans & {
    transition: none !important;
  }

  html.open-navi & {
    display: block;
    transition: all 0.7s cubic-bezier(0.9, 0.1, 0.1, 0.9), visibility 0s linear;
    pointer-events: auto;
    clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);
    visibility: visible;
  }

  @media screen and (min-width: 640px) {
    html.open-navi & {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
`;

const NavigationRow = styled.div`
  height: 100%;
`;

const NavigationCol = styled.div`
  height: 100%;

  @media screen and (min-width: 640px) {
    padding-block: 3.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavigationInner = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: var(--quickbar-height, 5rem);
  padding-bottom: 8.68rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  gap: 15rem;

  @media screen and (min-width: 640px) {
    flex-flow: row;
    flex-direction: row;
    padding-top: 0;
    justify-content: space-between;
    align-items: flex-end;
    height: auto;
    padding-bottom: 0;
    padding-left: 3.75rem;
    padding-right: 3.75rem;
    gap: 17.97rem;
  }
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  
  @media screen and (min-width: 640px) {
    order: 1;
  }
`;

const SocialsSection = styled.div`
  display: flex;
  flex-flow: column;
  gap: 3.75rem;
  position: relative;
  width: 100%;
  padding-top: 10rem;

  @media screen and (min-width: 640px) {
    gap: 0.47rem;
    padding-top: 0.94rem;
    order: 2;
    width: auto;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-flow: column;
  width: fit-content;
  gap: 0.53rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media screen and (min-width: 640px) {
    gap: 0;
  }
`;

const NavItem = styled.li`
  width: fit-content;
  overflow: hidden;
  transition: 0.6s cubic-bezier(0, 0, 0, 1);

  &.sibling-hover {
    opacity: 0.25;
  }

  &:hover,
  &:focus {
    opacity: 1;
  }

  html.open-navi &:nth-child(1) > .li-inner a {
    transition-delay: 0.3s;
  }

  html.open-navi &:nth-child(2) > .li-inner a {
    transition-delay: 0.4s;
  }

  html.open-navi &:nth-child(3) > .li-inner a {
    transition-delay: 0.5s;
  }

  html.open-navi &:nth-child(4) > .li-inner a {
    transition-delay: 0.6s;
  }

  @media screen and (min-width: 640px) {
    html.open-navi &:nth-child(1) > a {
      transition-delay: 0.5s;
    }

    html.open-navi &:nth-child(2) > a {
      transition-delay: 0.5777777778s;
    }

    html.open-navi &:nth-child(3) > a {
      transition-delay: 0.6555555556s;
    }

    html.open-navi &:nth-child(4) > a {
      transition-delay: 0.7333333333s;
    }
  }
`;

const LiInner = styled.div`
  display: flex;
`;

const NavLink = styled.a`
  font-family: "Inter Tight", Trebuchet MS, sans-serif;
  font-size: 4.69rem;
  font-weight: 700;
  line-height: 1.05em;
  color: #141414;
  display: block;
  text-decoration: none;
  transition: transform 0.6s cubic-bezier(0, 0, 0, 1), all 0.3s ease;
  position: relative;

  @media screen and (min-width: 640px) {
    font-size: 7.29rem;
    transition: transform 0.6s cubic-bezier(0, 0, 0, 1), opacity 0.3s ease;
  }

  html:not(.open-navi) & {
    transform: translateY(105%);
  }

  html.open-navi & {
    transform: translateY(0);
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: auto;
    right: 0;
    width: 0;
    height: 2px;
    background-color: #141414;
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

  &:focus {
    opacity: 1;
  }

  @media (min-width: 640px) {
    &.sibling-hover {
      opacity: 0.25;
    }
  }
`;



const SocialsCt = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.5rem;

  @media screen and (min-width: 640px) {
    gap: 0.94rem;
  }

  html.open-navi & .social:nth-child(1) {
    transition-delay: 0.4s;
  }

  html.open-navi & .social:nth-child(2) {
    transition-delay: 0.4666666667s;
  }

  html.open-navi & .social:nth-child(3) {
    transition-delay: 0.5333333333s;
  }

  html.open-navi & .social:nth-child(4) {
    transition-delay: 0.6s;
  }

  html.open-navi & .social:nth-child(5) {
    transition-delay: 0.6666666667s;
  }

  @media screen and (min-width: 640px) {
    html.open-navi & .social:nth-child(1) {
      transition-delay: 0.7s;
    }

    html.open-navi & .social:nth-child(2) {
      transition-delay: 0.7333333333s;
    }

    html.open-navi & .social:nth-child(3) {
      transition-delay: 0.7666666667s;
    }

    html.open-navi & .social:nth-child(4) {
      transition-delay: 0.8s;
    }

    html.open-navi & .social:nth-child(5) {
      transition-delay: 0.8333333333s;
    }
  }

  html:not(.open-navi) & .social {
    transform: scale(0);
  }
`;

const SocialLink = styled.a`
  font-family: 'Inter Tight', sans-serif;
  font-size: 0.94rem;
  font-weight: 500;
  color: #666;
  text-decoration: none;
  transition: transform 0.6s cubic-bezier(0, 0, 0, 1), color 0.3s ease;
  transform: scale(1);

  @media screen and (min-width: 640px) {
    font-size: 0.94rem;
  }

  html:not(.open-navi) & {
    transform: scale(0);
  }

  html.open-navi & {
    transform: scale(1);
  }

  &:hover {
    color: #141414;
  }
`;

export default HamburgerMenu;