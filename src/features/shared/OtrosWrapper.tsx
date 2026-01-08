import React from 'react';
import { useProfile } from '../../context/ProfileContext';

// Lazy load Otros page for Matias
const OtrosPage = React.lazy(() => import('../matias/otros/OtrosPage'));
const MaintenancePage = React.lazy(() => import('../../pages/MaintenancePage'));

const OtrosWrapper: React.FC = () => {
  const { profile } = useProfile();

  // Only Matias has an Otros page, others show maintenance
  if (profile.id === 'matias') {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <OtrosPage />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MaintenancePage />
    </React.Suspense>
  );
};

export default OtrosWrapper;
