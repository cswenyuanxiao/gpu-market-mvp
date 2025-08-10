import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import { 
  MenuOutlined, 
  CloseOutlined, 
  DownOutlined, 
  RightOutlined,
  ShoppingOutlined,
  DesktopOutlined,
  MobileOutlined,
  CameraOutlined,
  TabletOutlined,
  MonitorOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../../store/auth';

interface NavItem {
  key: string;
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

interface CollapsibleNavProps {
  isMobile?: boolean;
}

export default function CollapsibleNav({ isMobile = false }: CollapsibleNavProps) {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems: NavItem[] = [
    {
      key: 'home',
      label: 'Home',
      path: '/',
      icon: <HomeOutlined />
    },
    {
      key: 'shop-everything',
      label: 'Shop Everything',
      path: '/everything?sort=price_desc',
      icon: <ShoppingOutlined />
    },
    {
      key: 'shop-graphics-cards',
      label: 'Shop Graphics Cards',
      path: '/graphics-cards?sort=price_desc',
      icon: <DesktopOutlined />
    },
    {
      key: 'computer-components',
      label: 'Computer Components',
      icon: <DesktopOutlined />,
      children: [
        {
          key: 'graphics-cards',
          label: 'Graphics Cards (GPUs)',
          path: '/everything?sort=price_desc&q=Graphics%20Cards%20(GPUs)'
        },
        {
          key: 'ram',
          label: 'RAM',
          path: '/everything?sort=price_desc&q=RAM'
        },
        {
          key: 'processors',
          label: 'Processors (CPUs)',
          path: '/everything?sort=price_desc&q=Processors%20(CPUs)'
        },
        {
          key: 'storage',
          label: 'Storage',
          path: '/everything?sort=price_desc&q=Storage'
        },
        {
          key: 'motherboards',
          label: 'Motherboards',
          path: '/everything?sort=price_desc&q=Motherboards'
        },
        {
          key: 'psus',
          label: 'PSUs',
          path: '/everything?sort=price_desc&q=PSUs'
        }
      ]
    },
    {
      key: 'other-electronics',
      label: 'Other Electronics',
      icon: <MobileOutlined />,
      children: [
        {
          key: 'smart-watches',
          label: 'Smart Watches',
          path: '/everything?sort=price_desc&q=Smart%20Watches'
        },
        {
          key: 'phones',
          label: 'Phones',
          path: '/everything?sort=price_desc&q=Phones'
        },
        {
          key: 'laptops',
          label: 'Laptops',
          path: '/everything?sort=price_desc&q=Laptops'
        },
        {
          key: 'cameras',
          label: 'Cameras',
          path: '/everything?sort=price_desc&q=Cameras'
        },
        {
          key: 'home-tech',
          label: 'Home Tech',
          path: '/everything?sort=price_desc&q=Home%20Tech'
        },
        {
          key: 'monitors',
          label: 'Monitors',
          path: '/everything?sort=price_desc&q=Monitors'
        },
        {
          key: 'tablets',
          label: 'Tablets',
          path: '/everything?sort=price_desc&q=Tablets'
        },
        {
          key: 'faulty-stock',
          label: 'Faulty Stock',
          path: '/everything?sort=price_desc&q=Faulty%20Stock'
        }
      ]
    },
    {
      key: 'sell',
      label: 'Sell',
      path: '/sell',
      icon: <ShoppingOutlined />
    },
    {
      key: 'sell-to-us',
      label: 'Sell to us',
      path: '/sell-to-us',
      icon: <ShoppingOutlined />
    },
    {
      key: 'my-listings',
      label: 'My Listings',
      path: '/my',
      icon: <UserOutlined />
    },
    {
      key: 'profile',
      label: 'My Profile',
      path: '/profile',
      icon: <UserOutlined />
    }
  ];

  const toggleExpanded = (key: string) => {
    setExpandedItems(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const handleItemClick = (item: NavItem) => {
    if (item.children) {
      toggleExpanded(item.key);
    } else if (item.path) {
      navigate(item.path);
      if (isMobile) {
        setOpen(false);
      }
    }
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path.split('?')[0])) return true;
    return false;
  };

  const isShopActive = () => {
    return location.pathname === '/everything' || location.pathname === '/graphics-cards';
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.key);
    const active = isActive(item.path);

    return (
      <div key={item.key}>
        <div
          className={`nav-item ${active ? 'active' : ''} ${hasChildren ? 'has-children' : ''}`}
          style={{ paddingLeft: `${level * 20 + 16}px` }}
          onClick={() => handleItemClick(item)}
        >
          <div className="nav-item-content">
            {item.icon && <span className="nav-item-icon">{item.icon}</span>}
            <span className="nav-item-label">{item.label}</span>
            {hasChildren && (
              <span className="nav-item-arrow">
                {isExpanded ? <DownOutlined /> : <RightOutlined />}
              </span>
            )}
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="nav-children">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const trigger = isMobile ? (
    <Button 
      type="text" 
      icon={<MenuOutlined />} 
      onClick={() => setOpen(true)}
      className="nav-trigger-btn"
    />
  ) : (
    <span 
      className={`nav-trigger-text ${isShopActive() ? 'active' : ''}`}
      onClick={() => setOpen(true)}
    >
      Shop Everything
    </span>
  );

  const navContent = (
    <div className="collapsible-nav">
      <div className="nav-header">
        <h3>Navigation</h3>
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={() => setOpen(false)}
          className="nav-close-btn"
        />
      </div>
      <div className="nav-content">
        {navItems.map(item => renderNavItem(item))}
        {user && (
          <div className="nav-footer">
            <Button 
              type="text" 
              icon={<LogoutOutlined />}
              onClick={() => {
                logout();
                setOpen(false);
                window.dispatchEvent(
                  new CustomEvent('app-toast', { detail: { text: 'Logged out', type: 'info' } })
                );
              }}
              className="logout-btn"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {trigger}
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          placement="left"
          width={280}
          className="mobile-nav-drawer"
          afterOpenChange={(open) => {
            try {
              document.body.style.overflow = open ? 'hidden' : '';
            } catch {}
          }}
        >
          {navContent}
        </Drawer>
      </>
    );
  }

  return (
    <>
      {trigger}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        width={320}
        className="desktop-nav-drawer"
      >
        {navContent}
      </Drawer>
    </>
  );
}
