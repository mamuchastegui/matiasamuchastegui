import React from 'react';
import { useProfile } from '../../context/ProfileContext';

// Lazy load Pomelo page for Matias
const PomeloPage = React.lazy(() => import('../matias/pomelo/PomeloPage'));
const MaintenancePage = React.lazy(() => import('../../pages/MaintenancePage'));

const PomeloWrapper: React.FC = () => {
  const { profile } = useProfile();

  // Only Matias has a Pomelo page, others show maintenance
  if (profile.id === 'matias') {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <PomeloPage />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MaintenancePage />
    </React.Suspense>
  );
};

export default PomeloWrapper;
