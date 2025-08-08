import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function keyOf(pathname: string, search: string) {
  return `scroll:${pathname}${search}`;
}

export function useScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    const key = keyOf(location.pathname, location.search);
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const y = parseInt(saved, 10);
      if (!Number.isNaN(y)) setTimeout(() => window.scrollTo(0, y), 0);
    } else {
      window.scrollTo(0, 0);
    }

    function save() {
      sessionStorage.setItem(key, String(window.scrollY));
    }
    window.addEventListener('beforeunload', save);
    const onPop = () => {
      const v = sessionStorage.getItem(key);
      const yy = v ? parseInt(v, 10) : 0;
      setTimeout(() => window.scrollTo(0, Number.isNaN(yy) ? 0 : yy), 0);
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('beforeunload', save);
      window.removeEventListener('popstate', onPop);
      save();
    };
  }, [location.pathname, location.search]);
}


