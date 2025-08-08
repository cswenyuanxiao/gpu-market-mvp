import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { ToastContainer, useToast } from './components/Toast';
import { useEffect } from 'react';
import Profile from './pages/Profile';

export default function App() {
  const { api, messages } = useToast();
  useEffect(() => {
    function onToast(e: Event) {
      const detail = (e as CustomEvent).detail || {};
      api.push(detail.text || '', detail.type || 'info');
    }
    window.addEventListener('app-toast', onToast as any);
    return () => window.removeEventListener('app-toast', onToast as any);
  }, [api]);
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            GPU Market
          </Link>
          <div className="ms-auto">
            <Link to="/profile" className="btn btn-outline-secondary btn-sm">
              My Profile
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer messages={messages} />
    </>
  );
}
