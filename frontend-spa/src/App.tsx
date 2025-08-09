import { Link, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
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
const SellToUs = lazy(() => import('./pages/SellToUs'));
const Contact = lazy(() => import('./pages/Contact'));
import { useScrollRestoration } from './lib/useScrollRestoration';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ServerError from './pages/ServerError';
import { Button, Dropdown, Drawer, Menu } from 'antd';
import type { MenuProps } from 'antd';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const seriesMenu = (
    <Menu
      items={[
        { key: 'nvidia-40', label: <Link to="/?brand=NVIDIA&vram_min=12">NVIDIA 40 Series</Link> },
        { key: 'nvidia-30', label: <Link to="/?brand=NVIDIA&vram_min=8">NVIDIA 30 Series</Link> },
        { key: 'amd-7000', label: <Link to="/?brand=AMD&vram_min=12">AMD 7000 Series</Link> },
        { key: 'amd-6000', label: <Link to="/?brand=AMD&vram_min=8">AMD 6000 Series</Link> },
      ]}
    />
  );
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            GPU Market
          </Link>
          <div className="ms-auto d-none d-md-flex gap-2">
            <Link to="/">
              <Button type="text" size="small">
                Home
              </Button>
            </Link>
            <Link to="/everything?sort=price_desc">
              <Button type="text" size="small">
                Shop Everything
              </Button>
            </Link>
            <Dropdown overlay={seriesMenu} trigger={['click']}>
              <Button size="small">Shop Graphics Cards</Button>
            </Dropdown>
            <Link to="/sell">
              <Button size="small" type="default">
                Sell
              </Button>
            </Link>
            <Link to="/sell-to-us">
              <Button size="small" type="default">
                Sell to us
              </Button>
            </Link>
            <Link to="/my">
              <Button size="small" type="default">
                My Listings
              </Button>
            </Link>
            <Link to="/profile">
              <Button size="small" type="default">
                My Profile
              </Button>
            </Link>
            {user && (
              <Link to="/profile/edit">
                <Button size="small" type="default">
                  Edit Profile
                </Button>
              </Link>
            )}
            {!user && (
              <Link to="/login">
                <Button size="small" type="primary">
                  Login
                </Button>
              </Link>
            )}
            {!user && (
              <Link to="/register">
                <Button size="small" type="primary">
                  Register
                </Button>
              </Link>
            )}
            {user && (
              <span className="align-self-center small text-muted">
                {user.display_name || user.username}
              </span>
            )}
            {user && (
              <Button
                size="small"
                danger
                onClick={() => {
                  logout();
                  window.dispatchEvent(
                    new CustomEvent('app-toast', { detail: { text: 'Logged out', type: 'info' } }),
                  );
                }}
              >
                Logout
              </Button>
            )}
          </div>
          <div className="ms-auto d-md-none">
            <Button size="small" onClick={() => setMobileOpen(true)}>
              Menu
            </Button>
          </div>
        </div>
      </nav>
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        afterOpenChange={(open) => {
          try {
            document.body.style.overflow = open ? 'hidden' : '';
          } catch {}
        }}
      >
        <div className="d-flex flex-column gap-2">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link to="/everything?sort=price_desc" onClick={() => setMobileOpen(false)}>
            Shop Everything
          </Link>
          <div className="fw-bold">Shop Graphics Cards</div>
          <Link to="/?brand=NVIDIA" onClick={() => setMobileOpen(false)}>
            NVIDIA
          </Link>
          <Link to="/?brand=AMD" onClick={() => setMobileOpen(false)}>
            AMD
          </Link>
          <Link to="/sell" onClick={() => setMobileOpen(false)}>
            Sell
          </Link>
          <Link to="/sell-to-us" onClick={() => setMobileOpen(false)}>
            Sell to us
          </Link>
          <Link to="/my" onClick={() => setMobileOpen(false)}>
            My Listings
          </Link>
          <Link to="/profile" onClick={() => setMobileOpen(false)}>
            My Profile
          </Link>
          {!user && (
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
          )}
          {!user && (
            <Link to="/register" onClick={() => setMobileOpen(false)}>
              Register
            </Link>
          )}
          {user && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                setMobileOpen(false);
                logout();
                window.dispatchEvent(
                  new CustomEvent('app-toast', { detail: { text: 'Logged out', type: 'info' } }),
                );
              }}
            >
              Logout
            </button>
          )}
        </div>
      </Drawer>
      <Suspense fallback={<div className="container py-3">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/everything" element={<Home />} />
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
          <Route path="/sell-to-us" element={<SellToUs />} />
          <Route path="/contact" element={<Contact />} />
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
        <div className="container py-4 text-muted small">
          <div className="row">
            <div className="col-6 col-md-3 mb-3">
              <div className="fw-bold mb-2">Useful Pages</div>
              <div className="d-flex flex-column gap-1">
                <Link to="/sell-to-us">Sell to us</Link>
                <Link to="/everything?sort=price_desc">Shop Everything</Link>
                <Link to="/">Shop Graphics Cards</Link>
                <Link to="/about">About Us</Link>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="fw-bold mb-2">Policies</div>
              <div className="d-flex flex-column gap-1">
                <Link to="/terms">Terms of Service</Link>
                <Link to="/privacy">Privacy Policy</Link>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="fw-bold mb-2">Reviews</div>
              <div className="d-flex flex-column gap-1">
                <a href="#" target="_blank" rel="noreferrer">
                  Trustpilot
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  Google Reviews
                </a>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="fw-bold mb-2">Follow us</div>
              <div className="d-flex flex-column gap-1">
                <a href="#" target="_blank" rel="noreferrer">
                  Twitter
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  TikTok
                </a>
              </div>
              <div className="fw-bold mt-3 mb-1">Payment</div>
              <div className="text-secondary">Visa / MasterCard / PayPal / Apple Pay</div>
            </div>
          </div>
          <div className="d-flex justify-content-between pt-3 border-top mt-3">
            <span>© {new Date().getFullYear()} GPU Market</span>
            <span>All prices in GBP</span>
          </div>
        </div>
      </footer>
    </>
  );
}
