import React from 'react';

// Lazy load FusionAds page
const MatisFusionAdsPage = React.lazy(() => import('../matias/fusionads/MatisFusionAdsPage'));

const FusionAdsWrapper: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MatisFusionAdsPage />
    </React.Suspense>
  );
};

export default FusionAdsWrapper;
