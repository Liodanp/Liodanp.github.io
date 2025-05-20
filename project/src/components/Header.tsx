import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { Menu, Bell, Calendar, Sun, Moon, Settings as SettingsIcon, User, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { authState, logout } = useAuth();
  const { settings } = useSettings();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-4 md:ml-0 flex">
            <span className="text-gray-800 text-xl font-semibold hidden md:block">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <Calendar className="md:hidden" size={20} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Theme indicator */}
          <div className="hidden md:block">
            {settings.theme === 'dark' ? (
              <Moon size={20} className="text-gray-600" />
            ) : (
              <Sun size={20} className="text-gray-600" />
            )}
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700">Notifications</p>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-200 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                    <p className="text-xs text-gray-500">Product "Keyboard" is running low on stock</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">New order received</p>
                    <p className="text-xs text-gray-500">Customer "John Doe" placed a new order</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <Link to="/" className="text-xs text-blue-600 hover:text-blue-500">View all notifications</Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
                {authState.user?.name.charAt(0)}
              </div>
              <div className="hidden md:block text-sm">
                <p className="text-gray-800 font-medium">{authState.user?.name}</p>
                <p className="text-gray-500 text-xs">{authState.user?.role}</p>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link 
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <User size={16} className="mr-2" />
                  Profile
                </Link>
                <Link 
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <SettingsIcon size={16} className="mr-2" />
                  Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;