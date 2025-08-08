import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { ToastContainer, useToast } from './components/Toast';
import { useEffect } from 'react';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import MyListings from './pages/MyListings';
import { AuthGuard } from './components/AuthGuard';
import { useAuth } from './store/auth';
import Detail from './pages/Detail';

export default function App() {
  const { api, messages } = useToast();
  const { user, init, logout } = useAuth();
  useEffect(() => {
    init();
    function onToast(e: Event) {
      const detail = (e as CustomEvent).detail || {};
      api.push(detail.text || '', detail.type || 'info');
    }
    window.addEventListener('app-toast', onToast as any);
    return () => window.removeEventListener('app-toast', onToast as any);
  }, [api, init]);
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
            {!user && <Link to="/login" className="btn btn-primary btn-sm">Login</Link>}
            {!user && <Link to="/register" className="btn btn-success btn-sm">Register</Link>}
            {user && <span className="align-self-center small text-muted">{user.display_name || user.username}</span>}
            {user && (
              <button className="btn btn-outline-danger btn-sm" onClick={() => { logout(); window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Logged out', type: 'info' } })); }}>Logout</button>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/g/:id" element={<Detail />} />
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
