import { Link, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
import { ToastContainer, useToast } from './components/Toast';
import { useEffect } from 'react';
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const MyListings = lazy(() => import('./pages/MyListings'));
import { AuthGuard } from './components/AuthGuard';
import { useAuth } from './store/auth';
const Detail = lazy(() => import('./pages/Detail'));
const Sell = lazy(() => import('./pages/Sell'));
const Edit = lazy(() => import('./pages/Edit'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProfileEdit = lazy(() => import('./pages/ProfileEdit'));
import { useScrollRestoration } from './lib/useScrollRestoration';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ServerError from './pages/ServerError';

export default function App() {
  const { api, messages } = useToast();
  const { user, init, logout } = useAuth();
  useScrollRestoration();
  useEffect(() => {
    init();
    function onToast(e: Event) {
      const detail = (e as CustomEvent).detail || {};
      api.push(detail.text || '', detail.type || 'info');
    }
    window.addEventListener('app-toast', onToast as any);
    return () => window.removeEventListener('app-toast', onToast as any);
    // Run once on mount to avoid re-registering and re-calling init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            GPU Market
          </Link>
          <div className="ms-auto d-flex gap-2">
            <Link to="/" className="btn btn-link btn-sm">Home</Link>
            <Link to="/sell" className="btn btn-outline-success btn-sm">Sell</Link>
            <Link to="/my" className="btn btn-outline-primary btn-sm">My Listings</Link>
            <Link to="/profile" className="btn btn-outline-secondary btn-sm">My Profile</Link>
            {user && <Link to="/profile/edit" className="btn btn-outline-secondary btn-sm">Edit Profile</Link>}
            {!user && <Link to="/login" className="btn btn-primary btn-sm">Login</Link>}
            {!user && <Link to="/register" className="btn btn-success btn-sm">Register</Link>}
            {user && <span className="align-self-center small text-muted">{user.display_name || user.username}</span>}
            {user && (
              <button className="btn btn-outline-danger btn-sm" onClick={() => { logout(); window.dispatchEvent(new CustomEvent('app-toast', { detail: { text: 'Logged out', type: 'info' } })); }}>Logout</button>
            )}
          </div>
        </div>
      </nav>
      <Suspense fallback={<div className="container py-3">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/profile/edit"
          element={
            <AuthGuard>
              <ProfileEdit />
            </AuthGuard>
          }
        />
        <Route path="/g/:id" element={<Detail />} />
        <Route
          path="/sell"
          element={
            <AuthGuard>
              <Sell />
            </AuthGuard>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <AuthGuard>
              <Edit />
            </AuthGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/500" element={<ServerError />} />
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
      </Suspense>
      <ToastContainer messages={messages} />
      <footer className="border-top bg-white mt-4">
        <div className="container py-3 text-muted small d-flex justify-content-between">
          <div className="d-flex gap-3">
            <Link to="/about" className="text-decoration-none">About</Link>
            <Link to="/privacy" className="text-decoration-none">Privacy</Link>
            <Link to="/terms" className="text-decoration-none">Terms</Link>
          </div>
          <span>© {new Date().getFullYear()} GPU Market</span>
        </div>
      </footer>
    </>
  );
}
