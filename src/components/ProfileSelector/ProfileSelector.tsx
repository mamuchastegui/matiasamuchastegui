import React from 'react';
import styled from 'styled-components';
import { useProfile } from '../../context/ProfileContext';
import { ProfileId } from '../../types/profile';

interface ProfileSelectorProps {
  isCollapsed?: boolean;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ isCollapsed = false }) => {
  const { profileId, availableProfiles, switchProfile } = useProfile();

  const handleProfileChange = (newProfileId: ProfileId) => {
    if (newProfileId !== profileId) {
      switchProfile(newProfileId);
    }
  };

  if (isCollapsed) {
    // Show only initials in collapsed mode
    return (
      <CollapsedContainer>
        {availableProfiles.map((profile) => (
          <CollapsedButton
            key={profile.id}
            $isActive={profile.id === profileId}
            onClick={() => handleProfileChange(profile.id)}
            title={profile.name}
          >
            {profile.name.charAt(0)}
          </CollapsedButton>
        ))}
      </CollapsedContainer>
    );
  }

  return (
    <SelectorContainer>
      {availableProfiles.map((profile) => (
        <ProfileButton
          key={profile.id}
          $isActive={profile.id === profileId}
          onClick={() => handleProfileChange(profile.id)}
        >
          <ProfileInitial $isActive={profile.id === profileId}>
            {profile.name.charAt(0)}
          </ProfileInitial>
          <ProfileInfo>
            <ProfileName $isActive={profile.id === profileId}>
              {profile.name.split(' ')[0]}
            </ProfileName>
            <ProfileRole $isActive={profile.id === profileId}>
              Backend
            </ProfileRole>
          </ProfileInfo>
        </ProfileButton>
      ))}
    </SelectorContainer>
  );
};

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: ${({ theme }) =>
    theme.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  border-radius: 12px;
  border: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)')};
`;

const CollapsedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 8px 0;
`;

const CollapsedButton = styled.button<{ $isActive: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid
    ${({ $isActive, theme }) =>
      $isActive
        ? theme.isDark
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(0, 0, 0, 0.2)'
        : 'transparent'};
  background: ${({ $isActive, theme }) =>
    $isActive
      ? theme.isDark
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.08)'
      : theme.isDark
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.03)'};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'};
    transform: scale(1.05);
  }
`;

const ProfileButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isActive, theme }) =>
    $isActive
      ? theme.isDark
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.08)'
      : 'transparent'};
  border: 1px solid
    ${({ $isActive, theme }) =>
      $isActive
        ? theme.isDark
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(0, 0, 0, 0.1)'
        : 'transparent'};

  &:hover {
    background: ${({ theme }) =>
      theme.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const ProfileInitial = styled.div<{ $isActive: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  background: ${({ $isActive, theme }) =>
    $isActive
      ? theme.isDark
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(0, 0, 0, 0.1)'
      : theme.isDark
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.03)'};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileName = styled.span<{ $isActive: boolean }>`
  font-size: 14px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`;

const ProfileRole = styled.span<{ $isActive: boolean }>`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  opacity: ${({ $isActive }) => ($isActive ? 0.7 : 0.5)};
  line-height: 1.2;
`;

export default ProfileSelector;
