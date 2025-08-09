import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
const Returns = lazy(() => import('./pages/Returns'));
const B2B = lazy(() => import('./pages/B2B'));
const Raffles = lazy(() => import('./pages/Raffles'));
const RaffleInfo = lazy(() => import('./pages/RaffleInfo'));
const RaffleWinners = lazy(() => import('./pages/RaffleWinners'));
const Cart = lazy(() => import('./pages/Cart'));
import ServerError from './pages/ServerError';
import { Button, Dropdown, Drawer, Menu } from 'antd';
import type { MenuProps } from 'antd';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import Footer from './components/ui/Footer';
import { SearchOutlined, ShoppingOutlined } from '@ant-design/icons';
import SearchOverlay from './components/SearchOverlay';

export default function App() {
  const { api, messages } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
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
  const [searchOpen, setSearchOpen] = useState(false);
  const seriesItems: MenuProps['items'] = [
    { key: 'nvidia-40', label: 'NVIDIA 40 Series' },
    { key: 'nvidia-30', label: 'NVIDIA 30 Series' },
    { key: 'amd-7000', label: 'AMD 7000 Series' },
    { key: 'amd-6000', label: 'AMD 6000 Series' },
  ];
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="w-100 py-1 text-center text-white" style={{ background: '#2f7f82' }}>
        <a href="#reviews" className="text-white text-decoration-none">
          See Our Excellent Reviews →
        </a>
      </div>
      {/* Center logo row with search and cart */}
      <div className="container py-3 d-none d-md-flex justify-content-between align-items-center">
        <Button
          className="nav-icon-btn"
          type="text"
          aria-label="Search"
          icon={<SearchOutlined style={{ fontSize: 22, color: '#111' }} />}
          onClick={() => {
            if (location.pathname !== '/' && location.pathname !== '/everything') {
              navigate('/everything');
            } else {
              // no-op
            }
            setSearchOpen(true);
          }}
        />
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <img src="/logo.svg" alt="GPU-MARKET" width={120} height={120} />
        </Link>
        <Button
          className="nav-icon-btn"
          type="text"
          aria-label="Cart"
          icon={<ShoppingOutlined style={{ fontSize: 22, color: '#111' }} />}
          onClick={() => navigate('/cart')}
        />
      </div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <div className="mx-auto d-none d-md-flex gap-3">
            <Link to="/">
              <Button
                type="text"
                size="small"
                style={{ borderBottom: location.pathname === '/' ? '2px solid #222' : 'none' }}
              >
                Home
              </Button>
            </Link>
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  { key: 'everything', label: 'Shop Everything' },
                  {
                    type: 'group',
                    label: 'Computer Components',
                    children: [
                      { key: 'q:Graphics Cards (GPUs)', label: 'Graphics Cards (GPUs)' },
                      { key: 'q:RAM', label: 'RAM' },
                      { key: 'q:Processors (CPUs)', label: 'Processors (CPUs)' },
                      { key: 'q:Storage', label: 'Storage' },
                      { key: 'q:Motherboards', label: 'Motherboards' },
                      { key: 'q:PSUs', label: 'PSUs' },
                    ],
                  },
                  {
                    type: 'group',
                    label: 'Other Electronics',
                    children: [
                      { key: 'q:Smart Watches', label: 'Smart Watches' },
                      { key: 'q:Phones', label: 'Phones' },
                      { key: 'q:Laptops', label: 'Laptops' },
                      { key: 'q:Cameras', label: 'Cameras' },
                      { key: 'q:Home Tech', label: 'Home Tech' },
                      { key: 'q:Monitors', label: 'Monitors' },
                      { key: 'q:Tablets', label: 'Tablets' },
                      { key: 'q:Faulty Stock', label: 'Faulty Stock' },
                    ],
                  },
                ],
                onClick: (info) => {
                  if (info.key === 'everything') {
                    navigate('/everything?sort=price_desc');
                    return;
                  }
                  if (info.key.startsWith('q:')) {
                    const q = encodeURIComponent(info.key.slice(2));
                    navigate(`/everything?sort=price_desc&q=${q}`);
                  }
                },
              }}
            >
              <Button
                type="text"
                size="small"
                style={{
                  borderBottom: location.pathname === '/everything' ? '2px solid #222' : 'none',
                }}
              >
                Shop Everything
              </Button>
            </Dropdown>
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  { key: 'all-gpus', label: 'All Graphics Cards' },
                  {
                    type: 'group',
                    label: 'Nvidia Graphics Cards',
                    children: [
                      { key: 'nv-all', label: 'All Nvidia Graphics Cards' },
                      { key: 'nv-40', label: 'Nvidia 40 Series' },
                      { key: 'nv-30', label: 'Nvidia 30 Series' },
                      { key: 'nv-20', label: 'Nvidia 20 Series' },
                      { key: 'nv-16', label: 'Nvidia 16 Series' },
                      { key: 'nv-10', label: 'Nvidia 10 Series' },
                      { key: 'nv-other', label: 'Other Nvidia Graphics Cards' },
                      { key: 'nv-faulty', label: 'Faulty Stock' },
                    ],
                  },
                  {
                    type: 'group',
                    label: 'AMD Graphics Cards',
                    children: [
                      { key: 'amd-all', label: 'All AMD Graphics Cards' },
                      { key: 'amd-7000', label: 'AMD Radeon 7000 Series' },
                      { key: 'amd-6000', label: 'AMD Radeon 6000 Series' },
                      { key: 'amd-5000', label: 'AMD Radeon 5000 Series' },
                      { key: 'amd-500', label: 'AMD Radeon 500 Series' },
                      { key: 'amd-400', label: 'AMD Radeon 400 Series' },
                      { key: 'amd-vega', label: 'AMD Radeon Vega Series' },
                      { key: 'amd-other', label: 'Other AMD Graphics Cards' },
                      { key: 'amd-faulty', label: 'Faulty Stock' },
                    ],
                  },
                ],
                onClick: (info) => {
                  const go = (qs: string) => navigate(qs);
                  if (info.key === 'all-gpus') return go('/');
                  if (info.key === 'nv-all') return go('/?brand=NVIDIA');
                  if (info.key === 'nv-40') return go('/?brand=NVIDIA&vram_min=12');
                  if (info.key === 'nv-30') return go('/?brand=NVIDIA&vram_min=8');
                  if (info.key === 'nv-20') return go('/?brand=NVIDIA&q=20 Series');
                  if (info.key === 'nv-16') return go('/?brand=NVIDIA&q=16 Series');
                  if (info.key === 'nv-10') return go('/?brand=NVIDIA&q=10 Series');
                  if (info.key === 'nv-other') return go('/?brand=NVIDIA&q=Other');
                  if (info.key === 'nv-faulty') return go('/?brand=NVIDIA&q=Faulty');
                  if (info.key === 'amd-all') return go('/?brand=AMD');
                  if (info.key === 'amd-7000') return go('/?brand=AMD&vram_min=12');
                  if (info.key === 'amd-6000') return go('/?brand=AMD&vram_min=8');
                  if (info.key === 'amd-5000') return go('/?brand=AMD&q=5000 Series');
                  if (info.key === 'amd-500') return go('/?brand=AMD&q=500 Series');
                  if (info.key === 'amd-400') return go('/?brand=AMD&q=400 Series');
                  if (info.key === 'amd-vega') return go('/?brand=AMD&q=Vega');
                  if (info.key === 'amd-other') return go('/?brand=AMD&q=Other');
                  if (info.key === 'amd-faulty') return go('/?brand=AMD&q=Faulty');
                },
              }}
            >
              <Button type="text" size="small">
                Shop Graphics Cards
              </Button>
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
            <Link to="/b2b">
              <Button size="small" type="text">
                Enterprise Hardware (B2B)
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
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  { key: 'raffles', label: 'Current Raffle' },
                  { key: 'raffle-info', label: 'Raffle Information' },
                  { key: 'raffle-winners', label: 'Raffle Winners' },
                ],
                onClick: (info) => {
                  if (info.key === 'raffles') navigate('/raffles');
                  if (info.key === 'raffle-info') navigate('/raffles/info');
                  if (info.key === 'raffle-winners') navigate('/raffles/winners');
                },
              }}
            >
              <Button type="text" size="small">
                Raffles
              </Button>
            </Dropdown>
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
          <Route path="/b2b" element={<B2B />} />
          <Route path="/raffles" element={<Raffles />} />
          <Route path="/raffles/info" element={<RaffleInfo />} />
          <Route path="/raffles/winners" element={<RaffleWinners />} />
          <Route path="/cart" element={<Cart />} />
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
          <Route path="/returns" element={<Returns />} />
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
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ToastContainer messages={messages} />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
