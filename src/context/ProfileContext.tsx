import React, { createContext, useContext, ReactNode, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  const { profileId: urlProfileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const profileId = useMemo(() => {
    if (urlProfileId && (urlProfileId === 'alexis' || urlProfileId === 'matias')) {
      return urlProfileId as ProfileId;
    }
    return defaultProfileId;
  }, [urlProfileId]);

  const isValidProfile = urlProfileId === 'alexis' || urlProfileId === 'matias';

  const profile = useMemo(() => {
    return profiles[profileId];
  }, [profileId]);

  const availableProfiles = useMemo(() => {
    return Object.values(profiles);
  }, []);

  // Update document title when profile changes
  useEffect(() => {
    const titles: Record<ProfileId, string> = {
      alexis: 'Alexis Vedia - Desarrollador Full Stack | Portfolio Profesional',
      matias: 'Matias Amuchastegui - Staff Engineer | Portfolio Profesional',
    };
    document.title = titles[profileId] || titles.alexis;
  }, [profileId]);

  const switchProfile = (newProfileId: ProfileId) => {
    // Get current subpath after the profile id
    const pathParts = location.pathname.split('/').filter(Boolean);

    if (pathParts.length > 1) {
      // Has subpath (e.g., /alexis/xcons -> /matias/xcons)
      const subPath = pathParts.slice(1).join('/');
      navigate(`/${newProfileId}/${subPath}`);
    } else {
      // Just profile root
      navigate(`/${newProfileId}`);
    }
  };

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
