import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Building2, ReceiptText, Truck as TruckIn, BarChart3, Settings, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/products', name: 'Products', icon: <ShoppingBag size={20} /> },
    { path: '/customers', name: 'Customers', icon: <Users size={20} /> },
    { path: '/suppliers', name: 'Suppliers', icon: <Building2 size={20} /> },
    { path: '/sales', name: 'Sales', icon: <ReceiptText size={20} /> },
    { path: '/purchases', name: 'Purchases', icon: <TruckIn size={20} /> },
    { path: '/reports', name: 'Reports', icon: <BarChart3 size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
    { path: '/profile', name: 'Profile', icon: <UserCircle size={20} /> },
  ];
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-auto md:flex md:flex-col ${
          isOpen ? 'w-64' : 'w-0 md:w-64'
        } flex-shrink-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">AHIBRI</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
          >
            {isOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div
                    className={`mr-3 ${
                      isActive ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex-shrink-0 px-2 py-4 border-t border-gray-200">
          <div className="flex items-center px-2">
            <div className="flex-shrink-0">
              <span className="inline-block h-8 w-8 rounded-full bg-blue-500 text-white text-center leading-8">
                V
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">AHIBRI 2025</p>
              <p className="text-xs font-medium text-gray-500">Version 2.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;