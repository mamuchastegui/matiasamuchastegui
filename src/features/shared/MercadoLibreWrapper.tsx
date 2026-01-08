import React from 'react';
import { useProfile } from '../../context/ProfileContext';

// Lazy load MercadoLibre page for Matias
const MercadoLibrePage = React.lazy(() => import('../matias/mercadolibre/MercadoLibrePage'));
const MaintenancePage = React.lazy(() => import('../../pages/MaintenancePage'));

const MercadoLibreWrapper: React.FC = () => {
  const { profile } = useProfile();

  // Only Matias has a MercadoLibre page, others show maintenance
  if (profile.id === 'matias') {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <MercadoLibrePage />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MaintenancePage />
    </React.Suspense>
  );
};

export default MercadoLibreWrapper;
