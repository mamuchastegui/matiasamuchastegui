import { alexisProfile } from './alexis';
import { matiasProfile } from './matias';
import { Profile, ProfileId } from '../../types/profile';

export const profiles: Record<ProfileId, Profile> = {
  alexis: alexisProfile,
  matias: matiasProfile,
};

export const defaultProfileId: ProfileId = 'matias';

export const getProfile = (id: ProfileId): Profile => {
  return profiles[id] || profiles[defaultProfileId];
};

export { alexisProfile, matiasProfile };
