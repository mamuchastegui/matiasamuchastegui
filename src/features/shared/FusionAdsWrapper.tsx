import React from 'react';
import { useProfile } from '../../context/ProfileContext';

// Lazy load both FusionAds pages
const AlexisFusionAdsPage = React.lazy(() => import('../fusionads/FusionAdsPage'));
const MatisFusionAdsPage = React.lazy(() => import('../matias/fusionads/MatisFusionAdsPage'));

const FusionAdsWrapper: React.FC = () => {
  const { profile } = useProfile();

  if (profile.id === 'matias') {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <MatisFusionAdsPage />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AlexisFusionAdsPage />
    </React.Suspense>
  );
};

export default FusionAdsWrapper;
