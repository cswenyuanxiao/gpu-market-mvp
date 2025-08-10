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
const ShopEverything = lazy(() => import('./pages/ShopEverything'));
import { useScrollRestoration } from './lib/useScrollRestoration';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
const Returns = lazy(() => import('./pages/Returns'));
const B2B = lazy(() => import('./pages/B2B'));

const Cart = lazy(() => import('./pages/Cart'));
import ServerError from './pages/ServerError';
import { Badge, Button, Dropdown, Drawer, Menu } from 'antd';
import type { MenuProps } from 'antd';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import { apiFetch } from './lib/api';
import { useRef } from 'react';
import Footer from './components/ui/Footer';
import CollapsibleNav from './components/ui/CollapsibleNav';
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
    function onProfileUpdated() {
      // 重新从 localStorage 解码最新 token
      try {
        init();
      } catch {}
    }
    window.addEventListener('profile-updated', onProfileUpdated);
    function onToast(e: Event) {
      const detail = (e as CustomEvent).detail || {};
      api.push(detail.text || '', detail.type || 'info');
    }
    window.addEventListener('app-toast', onToast as any);
    return () => {
      window.removeEventListener('app-toast', onToast as any);
      window.removeEventListener('profile-updated', onProfileUpdated);
    };
    // Run once on mount to avoid re-registering and re-calling init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const cartBtnRef = useRef<HTMLButtonElement | null>(null);
  const badgeRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    async function loadCart(bump = false) {
      try {
        const res = await apiFetch('/api/cart');
        const json = await res.json().catch(() => ({} as any));
        const items = Array.isArray(json?.items) ? json.items : [];
        const totalQty = items.reduce((s: number, it: any) => s + (Number(it.quantity) || 0), 0);
        setCartCount(totalQty);
        if (bump && cartBtnRef.current) {
          try {
            cartBtnRef.current.animate(
              [
                { transform: 'scale(1)' },
                { transform: 'scale(1.15)' },
                { transform: 'scale(1)' },
              ],
              { duration: 220, easing: 'ease-out' },
            );
          } catch {}
        }
      } catch {}
    }
    loadCart();
    function onChanged(e: any) {
      const delta = Number(e?.detail?.delta || 0);
      if (delta) {
        setCartCount((c) => Math.max(0, c + delta));
        // 数字泡泡放大动画
        if (badgeRef.current) {
          try {
            badgeRef.current.animate(
              [
                { transform: 'scale(1)', offset: 0 },
                { transform: 'scale(1.2)', offset: 0.4 },
                { transform: 'scale(1)', offset: 1 },
              ],
              { duration: 260, easing: 'ease-out' },
            );
          } catch {}
        }
      }
      loadCart(true);
    }
    window.addEventListener('cart-changed', onChanged);
    return () => window.removeEventListener('cart-changed', onChanged);
  }, []);
  const seriesItems: MenuProps['items'] = [
    { key: 'nvidia-40', label: 'NVIDIA 40 Series' },
    { key: 'nvidia-30', label: 'NVIDIA 30 Series' },
    { key: 'amd-7000', label: 'AMD 7000 Series' },
    { key: 'amd-6000', label: 'AMD 6000 Series' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="w-100 py-1 text-center text-white" style={{ background: '#5B7DB1', padding: '18px 0' }}>
        <a 
          href="https://www.google.com/search?q=GPU+Market+Reviews" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white text-decoration-none"
        >
          See Our Excellent Reviews
        </a>
      </div>
      {/* Mobile header: menu / logo / search */}
      <div className="container d-flex d-md-none align-items-center justify-content-between py-2 px-3">
        <CollapsibleNav isMobile={true} />
        <Link to="/" className="d-flex align-items-center text-decoration-none" onClick={(e) => {
          try {
            const img = (e.currentTarget.querySelector('img') as HTMLElement | null);
            if (img) {
              img.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(0.95)' },
                { transform: 'scale(1)' }
              ], { duration: 180, easing: 'ease-out' });
            }
          } catch {}
        }}>
          <img src="/logo.png" alt="GPU-MARK" width={120} height={120} />
        </Link>
        <Button 
          className="nav-icon-btn" 
          type="text" 
          icon={<SearchOutlined style={{ fontSize: 20, color: '#111' }} />}
          onClick={() => setSearchOpen(true)}
        />
      </div>
      {/* Center logo row with search and cart */}
      <div className="container py-3 d-none d-md-flex justify-content-between align-items-center px-3 px-md-4">
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
        <div 
          className="d-flex align-items-center gap-2 text-decoration-none" 
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            try {
              const img = (e.currentTarget.querySelector('img') as HTMLElement | null);
              if (img) {
                img.animate([
                  { transform: 'scale(1)' },
                  { transform: 'scale(0.97)' },
                  { transform: 'scale(1)' }
                ], { duration: 180, easing: 'ease-out' });
              }
            } catch {}
            // 延迟导航，让动画先执行
            setTimeout(() => navigate('/'), 100);
          }}
        >
          <img src="/logo.png" alt="GPU-MARK" width={180} height={180} />
        </div>
        <div className="d-flex align-items-center gap-2">
          <Badge count={cartCount} offset={[-2, 2]} ref={badgeRef as any}>
            <Button
              className="nav-icon-btn"
              type="text"
              aria-label="Cart"
              icon={<ShoppingOutlined style={{ fontSize: 22, color: '#111' }} />}
              ref={cartBtnRef as any}
              onClick={() => navigate('/cart')}
            />
          </Badge>
          {user ? (
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 'profile',
                    label: user.display_name || user.username,
                    disabled: true,
                  },
                  { type: 'divider' },
                  {
                    key: 'my-listings',
                    label: 'My Listings',
                  },
                  {
                    key: 'my-profile',
                    label: 'My Profile',
                  },
                  {
                    key: 'edit-profile',
                    label: 'Edit Profile',
                  },
                  { type: 'divider' },
                  {
                    key: 'logout',
                    label: 'Logout',
                    danger: true,
                  },
                ],
                onClick: (info) => {
                  switch (info.key) {
                    case 'my-listings':
                      navigate('/my');
                      break;
                    case 'my-profile':
                      navigate('/profile');
                      break;
                    case 'edit-profile':
                      navigate('/profile/edit');
                      break;
                    case 'logout':
                      logout();
                      window.dispatchEvent(
                        new CustomEvent('app-toast', { detail: { text: 'Logged out', type: 'info' } }),
                      );
                      break;
                  }
                },
              }}
            >
              <Button
                className="nav-icon-btn"
                type="text"
                aria-label="Profile"
                style={{
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: '#2f7f82',
                  color: 'white',
                  border: 'none',
                }}
              >
                {(((user?.display_name || user?.username) ?? 'U')[0] || 'U').toUpperCase()}
              </Button>
            </Dropdown>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login">
                <Button size="small" type="primary">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="small" type="primary">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <nav className="navbar navbar-expand" style={{ background: 'white', boxShadow: 'none' }}>
        <div className="container-fluid d-flex justify-content-center align-items-center px-3 px-md-4">
          <div className="d-none d-md-flex gap-4 align-items-center">
            <Link to="/" className="text-decoration-none">
              <span 
                className="text-dark" 
                style={{ 
                  fontSize: '16px',
                  borderBottom: location.pathname === '/' ? '2px solid #222' : 'none',
                  paddingBottom: '2px'
                }}
              >
                Home
              </span>
            </Link>
            <CollapsibleNav isMobile={false} />

            <Link to="/sell" className="text-decoration-none">
              <span 
                className="text-dark" 
                style={{ 
                  fontSize: '16px',
                  borderBottom: location.pathname === '/sell' ? '2px solid #222' : 'none',
                  paddingBottom: '2px'
                }}
              >
                Sell
              </span>
            </Link>
            <Link to="/sell-to-us" className="text-decoration-none">
              <span className="text-dark" style={{ fontSize: '16px' }}>
                Sell to us
              </span>
            </Link>
            <Link to="/b2b" className="text-decoration-none">
              <span className="text-dark" style={{ fontSize: '16px' }}>
                Enterprise Hardware (B2B)
              </span>
            </Link>
          </div>


        </div>
      </nav>
      <div style={{ borderBottom: '1px solid #e3e3e3' }}></div>

      <div style={{ flex: 1 }}>
        <Suspense fallback={<div className="container py-3">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/everything" element={<ShopEverything />} />
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
      </div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
