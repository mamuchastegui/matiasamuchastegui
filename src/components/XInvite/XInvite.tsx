import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import profileImage from '../../assets/images/x-profile.jpg';

interface XInviteProps {
  className?: string;
}

const Card = styled.section<{ $isDark: boolean }>`
  margin: 1rem auto 1rem;
  width: 100%;
  max-width: 1080px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
  border-radius: 24px;
  padding: 1.25rem 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* BlockCard look & feel */
  background: ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
  backdrop-filter: blur(20px);
  border: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  &:hover {
    border-color: ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)')};
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 0 0 1px ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
  }
  &:hover::before { opacity: 0.1; }
  &:hover::after { opacity: 1; }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    justify-items: center;
    text-align: center;
  }
`;

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  object-fit: cover;
  display: block;
  border: 2px solid rgba(255,255,255,0.8);
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);

  @media (max-width: 720px) {
    grid-row: 1;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 720px) {
    grid-column: 1;
    text-align: center;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(29, 31, 35, 0.8)'};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
`;

const Cta = styled.a<{ $isDark: boolean }>`
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  background: ${({ $isDark }) => ($isDark ? '#ffffff' : '#000000')};
  color: ${({ $isDark }) => ($isDark ? '#000000' : '#ffffff')};
  border: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, ${({ $isDark }) => ($isDark ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)')});
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background: ${({ $isDark }) => ($isDark ? '#f8f8f8' : '#333333')};
    text-decoration: none;
  }

  &:hover::before { left: 100%; }
  &:hover::after { width: 280px; height: 280px; }

  &:active { transform: translateY(0); transition: all 0.1s ease; }

  &:focus-visible {
    outline: 2px solid ${({ $isDark }) => ($isDark ? '#000000' : '#ffffff')};
    outline-offset: 2px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    text-decoration: none;
  }

  @media (max-width: 720px) {
    grid-column: 1;
    width: 100%;
    justify-content: center;
  }
`;

const XBadge = styled.span<{ $isDark: boolean }>`
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: ${({ $isDark }) => ($isDark ? '#000' : '#111')};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

const XInvite: React.FC<XInviteProps> = ({ className }) => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <Card className={className} $isDark={isDark} aria-labelledby="x-invite-title">
      <Avatar src={profileImage} alt={t('xInvite.avatarAlt', 'Foto de perfil de Alexis en X')} />
      <Content>
        <Title id="x-invite-title">{t('xInvite.title')}</Title>
        <Description>{t('xInvite.description')}</Description>
      </Content>
      <Cta
        $isDark={isDark}
        href="https://x.com/AlexisVedia"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('xInvite.ctaAria', 'Abrir el perfil de Alexis en X en una nueva pestaña')}
      >
        <XBadge $isDark={isDark}>X</XBadge>
        {t('xInvite.cta')}
      </Cta>
    </Card>
  );
};

export default XInvite;