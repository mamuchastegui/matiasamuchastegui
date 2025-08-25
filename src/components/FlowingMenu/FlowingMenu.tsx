import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalMenuStyles = createGlobalStyle`
  .menu-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    max-width: 100%;
    box-sizing: border-box;
  }

  .menu-wrap .menu {
    display: flex;
    flex-direction: row; /* Horizontal por defecto */
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .menu-wrap .menu {
      flex-direction: column;
    }
  }

  .menu-wrap .menu__item {
    flex: 1;
    position: relative;
    overflow: hidden;
    text-align: center;
    transition: flex 0.5s ease, background-color 0.3s ease;
  }

  .menu-wrap .menu__item.expanded {
    flex: 2;
  }

  .menu-wrap[data-theme="dark"] .menu__item {
    --separator-color: rgba(255, 255, 255, 0.1);
    --hover-bg-color: #ffffff;
    --text-color: #ffffff;
    box-shadow: -1px 0 rgba(255, 255, 255, 0.1) !important;
  }

  .menu-wrap[data-theme="light"] .menu__item {
    --separator-color: rgba(0, 0, 0, 0.1);
    --hover-bg-color: #1D1F23;
    --text-color: #1D1F23;
    box-shadow: -1px 0 rgba(0, 0, 0, 0.1) !important;
  }

  .menu-wrap[data-theme="dark"] .menu__item-link:hover {
    background-color: #ffffff;
  }

  .menu-wrap[data-theme="dark"] .menu__item-link:hover .company-logo {
    filter: brightness(0) !important;
  }

  .menu-wrap[data-theme="light"] .menu__item-link:hover {
    background-color: #1D1F23;
  }

  .menu-wrap[data-theme="light"] .menu__item-link:hover .company-logo {
    filter: brightness(0) invert(1) !important;
  }

  .menu-wrap .menu__item-link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none !important;
    white-space: nowrap;
    font-weight: 600;
    color: #fff;
    font-size: 4vh;
    transition: background-color 0.3s ease;
  }

  .menu-wrap .company-logo {
    max-height: 200px;
    max-width: 250px;
    width: 70%;
    height: auto;
    object-fit: contain;
    transition: transform 0.3s ease, filter 0.3s ease;
    padding: 20px;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .menu-wrap .company-logo {
      max-height: 120px;
      max-width: 150px;
      width: 60%;
      padding: 10px;
    }
    
    .menu-wrap .menu__item-link {
      font-size: 3vh;
    }
  }

  @media (max-width: 480px) {
    .menu-wrap .company-logo {
      max-height: 80px;
      max-width: 120px;
      width: 50%;
      padding: 8px;
    }
    
    .menu-wrap .menu__item-link {
      font-size: 2.5vh;
    }
  }

  .menu-wrap .menu__item-link:hover .company-logo {
    transform: scale(1.1);
  }

  .menu-wrap .company-details {
    padding: 20px;
    text-align: left;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: opacity 0.4s ease, max-height 0.4s ease;
  }

  .menu-wrap .menu__item.expanded .company-details {
    opacity: 1;
    max-height: 200px;
  }

  .menu-wrap[data-theme="dark"] .company-details h3 {
    margin-top: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
  }

  .menu-wrap[data-theme="light"] .company-details h3 {
    margin-top: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1F23;
  }

  .menu-wrap[data-theme="dark"] .company-details p {
    line-height: 1.6;
    margin-bottom: 15px;
    color: #ffffff;
  }

  .menu-wrap[data-theme="light"] .company-details p {
    line-height: 1.6;
    margin-bottom: 15px;
    color: #1D1F23;
  }

  .menu-wrap .company-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .menu-wrap .company-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .menu-wrap .company-button:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }

  .menu-wrap .company-button:active {
    transform: translateY(0);
  }

  .menu-wrap .company-text {
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .menu-wrap .menu__item-link:hover .company-text {
    transform: scale(1.1);
  }

  .menu-wrap[data-theme="dark"] .menu__item-link:hover .company-text {
    color: #000000 !important;
  }

  .menu-wrap[data-theme="light"] .menu__item-link:hover .company-text {
    color: #ffffff !important;
  }

  @media (max-width: 768px) {
    .menu-wrap[data-theme="dark"] .menu__item {
      box-shadow: 0 -1px rgba(255, 255, 255, 0.1) !important;
    }
    .menu-wrap[data-theme="light"] .menu__item {
      box-shadow: 0 -1px rgba(0, 0, 0, 0.1) !important;
    }
  }
`;

interface MenuItemProps {
  link: string;
  text: string;
  image?: string;
  color?: string;
  description?: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  const { themeMode } = useTheme();

  return (
    <>
      <GlobalMenuStyles />
      <div className="menu-wrap" data-theme={themeMode}>
        <nav className="menu">
          {items.map((item, idx) => (
            <MenuItem key={idx} {...item} />
          ))}
        </nav>
      </div>
    </>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image, color }) => {
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(link);
  };

  return (
    <div className="menu__item">
      <a className="menu__item-link" onClick={handleClick} href={link}>
        {image ? (
          <img
            src={image}
            alt={text}
            className="company-logo"
            style={{
              filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)',
            }}
          />
        ) : (
          <div
            className="company-text"
            style={{
              color: isDarkMode ? '#ffffff' : color || '#000000',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {text}
          </div>
        )}
      </a>
    </div>
  );
};

export default FlowingMenu;
