import { NotificationContext } from '@/contexts/NotificationContext';
import { useContext } from 'react';

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('context must be inside provider');
  return context;
};

export default useNotification;
