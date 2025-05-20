import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { CheckCircle, XCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [showSavedMessage, setShowSavedMessage] = React.useState(false);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ currency: e.target.value });
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ theme: e.target.value as 'light' | 'dark' | 'system' });
  };

  const handleMinStockAlertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ minStockAlert: parseInt(e.target.value, 10) });
  };

  const handleMaxStockAlertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ maxStockAlert: parseInt(e.target.value, 10) });
  };

  const handlePhonePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ phonePrefix: e.target.value });
  };

  const saveSettings = () => {
    // In a real app, you might call an API here
    setShowSavedMessage(true);
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your application preferences</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="max-w-3xl">
            {/* App Appearance */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Appearance</h3>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                    Theme
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={settings.theme}
                    onChange={handleThemeChange}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Regional Settings */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Regional Settings</h3>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    name="currency"
                    id="currency"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={settings.currency}
                    onChange={handleCurrencyChange}
                  />
                  <p className="mt-2 text-sm text-gray-500">Currency symbol to use throughout the application.</p>
                </div>
                <div>
                  <label htmlFor="phonePrefix" className="block text-sm font-medium text-gray-700">
                    Phone Number Prefix
                  </label>
                  <input
                    type="text"
                    name="phonePrefix"
                    id="phonePrefix"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={settings.phonePrefix}
                    onChange={handlePhonePrefixChange}
                  />
                  <p className="mt-2 text-sm text-gray-500">International dialing code (e.g., +1 for US/Canada).</p>
                </div>
              </div>
            </div>

            {/* Inventory Alerts */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Inventory Alerts</h3>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="minStockAlert" className="block text-sm font-medium text-gray-700">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    name="minStockAlert"
                    id="minStockAlert"
                    min="0"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={settings.minStockAlert}
                    onChange={handleMinStockAlertChange}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Get alerted when product stock falls below this level.
                  </p>
                </div>
                <div>
                  <label htmlFor="maxStockAlert" className="block text-sm font-medium text-gray-700">
                    High Stock Threshold
                  </label>
                  <input
                    type="number"
                    name="maxStockAlert"
                    id="maxStockAlert"
                    min="0"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={settings.maxStockAlert}
                    onChange={handleMaxStockAlertChange}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Get alerted when product stock exceeds this level.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={saveSettings}
              >
                Save Settings
              </button>
            </div>

            {/* Saved Message */}
            {showSavedMessage && (
              <div className="mt-4 p-4 rounded-md bg-green-50 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-green-800">Settings saved successfully!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;