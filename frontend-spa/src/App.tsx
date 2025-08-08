import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { ToastContainer, useToast } from './components/Toast';
import { useEffect } from 'react';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import MyListings from './pages/MyListings';
import { AuthGuard } from './components/AuthGuard';

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
          <div className="ms-auto d-flex gap-2">
            <Link to="/" className="btn btn-link btn-sm">Home</Link>
            <Link to="/my" className="btn btn-outline-primary btn-sm">My Listings</Link>
            <Link to="/profile" className="btn btn-outline-secondary btn-sm">My Profile</Link>
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            <Link to="/register" className="btn btn-success btn-sm">Register</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my"
          element={
            <AuthGuard>
              <MyListings />
            </AuthGuard>
          }
        />
      </Routes>
      <ToastContainer messages={messages} />
    </>
  );
}
