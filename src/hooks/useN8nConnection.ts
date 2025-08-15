import { useState, useEffect, useCallback } from 'react';
import { initializeN8NServer } from '@services/n8nService';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export const useN8nConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const retryDelay = 3000;

  const checkConnection = useCallback(async () => {
    try {
      setConnectionStatus('connecting');
      const success = await initializeN8NServer();
      
      if (success) {
        setConnectionStatus('connected');
        setRetryCount(0);
        return true;
      } else {
        setConnectionStatus('disconnected');
        return false;
      }
    } catch (error) {
      console.error('Error checking n8n connection:', error);
      setConnectionStatus('disconnected');
      return false;
    }
  }, []);

  const retryConnection = useCallback(async () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      
      setTimeout(async () => {
        const success = await checkConnection();
        if (!success && retryCount + 1 < maxRetries) {
          retryConnection();
        }
      }, retryDelay);
    }
  }, [retryCount, checkConnection]);

  useEffect(() => {
    // Inicializar conexión con delay
    const timer = setTimeout(() => {
      checkConnection().then(success => {
        if (!success) {
          retryConnection();
        }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [checkConnection, retryConnection]);

  // Reconexión automática cada 30 segundos si está desconectado
  useEffect(() => {
    if (connectionStatus === 'disconnected' && retryCount >= maxRetries) {
      const interval = setInterval(() => {
        setRetryCount(0);
        checkConnection();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [connectionStatus, retryCount, checkConnection]);

  return {
    connectionStatus,
    isConnected: connectionStatus === 'connected',
    isConnecting: connectionStatus === 'connecting',
    isDisconnected: connectionStatus === 'disconnected',
    retryConnection: checkConnection,
    retryCount
  };
};