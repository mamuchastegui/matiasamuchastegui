import React, { createContext, useContext, ReactNode, useMemo, useEffect } from 'react';
import { Profile, ProfileId } from '../types/profile';
import { profiles, defaultProfileId } from '../data/profiles';

interface ProfileContextType {
  profile: Profile;
  profileId: ProfileId;
  switchProfile: (id: ProfileId) => void;
  availableProfiles: Profile[];
  isValidProfile: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const profileId = useMemo(() => defaultProfileId, []);
  const isValidProfile = true;

  const profile = useMemo(() => {
    return profiles[profileId];
  }, [profileId]);

  const availableProfiles = useMemo(() => {
    return [profiles[defaultProfileId]];
  }, []);

  // Update document title when profile changes
  useEffect(() => {
    document.title = 'Matias Amuchástegui - Staff Engineer | Portfolio Profesional';
  }, [profileId]);

  const switchProfile = (_newProfileId: ProfileId) => {};

  const value = useMemo(() => ({
    profile,
    profileId,
    switchProfile,
    availableProfiles,
    isValidProfile,
  }), [profile, profileId, availableProfiles, isValidProfile]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

// Optional hook that doesn't throw if used outside provider
export const useProfileOptional = (): ProfileContextType | null => {
  const context = useContext(ProfileContext);
  return context ?? null;
};
