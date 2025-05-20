import React from 'react';
import { DollarSign, Package, Users, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { useSettings } from '../context/SettingsContext';

const Dashboard: React.FC = () => {
  const { settings } = useSettings();
  
  // Sample data - in a real app, this would come from an API
  const stats = [
    {
      title: 'Total Revenue',
      value: `${settings.currency}24,345`,
      icon: <DollarSign size={20} className="text-blue-600" />,
      change: 12.5,
      changeType: 'increase' as const,
    },
    {
      title: 'Product Count',
      value: '534',
      icon: <Package size={20} className="text-teal-600" />,
      change: 3.2,
      changeType: 'increase' as const,
    },
    {
      title: 'Active Customers',
      value: '284',
      icon: <Users size={20} className="text-orange-600" />,
      change: 5.8,
      changeType: 'increase' as const,
    },
    {
      title: 'Recent Orders',
      value: '42',
      icon: <ShoppingCart size={20} className="text-purple-600" />,
      change: 2.1,
      changeType: 'decrease' as const,
    },
  ];

  const recentSales = [
    { id: 1, customer: 'John Doe', product: 'Laptop', amount: 1200, date: '2023-05-12' },
    { id: 2, customer: 'Jane Smith', product: 'Monitor', amount: 350, date: '2023-05-11' },
    { id: 3, customer: 'Mike Johnson', product: 'Keyboard', amount: 120, date: '2023-05-10' },
    { id: 4, customer: 'Sarah Williams', product: 'Mouse', amount: 50, date: '2023-05-09' },
    { id: 5, customer: 'David Brown', product: 'Headphones', amount: 80, date: '2023-05-08' },
  ];

  const lowStockProducts = [
    { id: 1, name: 'Keyboard', category: 'Accessories', stock: 3, minStock: 5 },
    { id: 2, name: 'Mouse', category: 'Accessories', stock: 2, minStock: 5 },
    { id: 3, name: 'HDMI Cable', category: 'Cables', stock: 4, minStock: 10 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your business performance</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h2>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Revenue chart will display here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h2>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Category chart will display here</p>
          </div>
        </div>
      </div>
      
      {/* Recent Sales */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Sales</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {settings.currency}{sale.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Low Stock Alert */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-orange-50">
          <h2 className="text-lg font-medium text-orange-800 flex items-center">
            <TrendingDown size={20} className="mr-2" />
            Low Stock Alert
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lowStockProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.minStock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;