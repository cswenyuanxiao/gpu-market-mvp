import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function AuthGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true, state: { from: location.pathname } });
    }
  }, [navigate, location]);
  return <>{children}</>;
}


