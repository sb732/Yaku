import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('context must be inside provider');
  return context;
};

export default useAuth;
