import React, { useState } from 'react';
import { Plus, FileText, Download, Upload, Trash2, Tag } from 'lucide-react';
import DataTable from '../components/DataTable';
import { Product } from '../types';
import { useSettings } from '../context/SettingsContext';

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    code: 'LPT001',
    name: 'Laptop Pro 2023',
    category: 'Electronics',
    description: 'High performance laptop for professionals',
    purchasePrice: 800,
    sellingPrice: 1200,
    quantity: 15,
    addedDate: '2023-01-15',
  },
  {
    id: '2',
    code: 'MON002',
    name: '27" 4K Monitor',
    category: 'Computer Accessories',
    description: 'Ultra-sharp 4K display',
    purchasePrice: 250,
    sellingPrice: 350,
    quantity: 8,
    addedDate: '2023-02-10',
  },
  {
    id: '3',
    code: 'KB003',
    name: 'Mechanical Keyboard',
    category: 'Computer Accessories',
    description: 'Tactile typing experience',
    purchasePrice: 60,
    sellingPrice: 120,
    quantity: 3,
    addedDate: '2023-02-15',
  },
  {
    id: '4',
    code: 'MOU004',
    name: 'Wireless Mouse',
    category: 'Computer Accessories',
    description: 'Ergonomic design with long battery life',
    purchasePrice: 20,
    sellingPrice: 45,
    quantity: 25,
    addedDate: '2023-03-01',
  },
  {
    id: '5',
    code: 'HDD005',
    name: 'External Hard Drive 1TB',
    category: 'Storage',
    description: 'Portable storage solution',
    purchasePrice: 50,
    sellingPrice: 85,
    quantity: 12,
    addedDate: '2023-03-15',
  },
];

const Products: React.FC = () => {
  const { settings } = useSettings();
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  // Product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    code: '',
    name: '',
    category: '',
    description: '',
    purchasePrice: 0,
    sellingPrice: 0,
    quantity: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setNewProduct({
      ...newProduct,
      [name]: name === 'purchasePrice' || name === 'sellingPrice' || name === 'quantity'
        ? parseFloat(value)
        : value,
    });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const id = `${products.length + 1}`;
    const newProductComplete: Product = {
      id,
      code: newProduct.code || `PROD${id.padStart(3, '0')}`,
      name: newProduct.name || 'Unnamed Product',
      category: newProduct.category || 'Uncategorized',
      description: newProduct.description || '',
      purchasePrice: newProduct.purchasePrice || 0,
      sellingPrice: newProduct.sellingPrice || 0,
      quantity: newProduct.quantity || 0,
      addedDate: new Date().toISOString().split('T')[0],
    };
    
    setProducts([...products, newProductComplete]);
    setNewProduct({
      code: '',
      name: '',
      category: '',
      description: '',
      purchasePrice: 0,
      sellingPrice: 0,
      quantity: 0,
    });
    setShowAddModal(false);
  };

  const productColumns = [
    {
      header: 'Code',
      accessor: 'code' as keyof Product,
    },
    {
      header: 'Name',
      accessor: 'name' as keyof Product,
    },
    {
      header: 'Category',
      accessor: 'category' as keyof Product,
      cell: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Tag size={12} className="mr-1" />
          {value}
        </span>
      ),
    },
    {
      header: 'Stock',
      accessor: 'quantity' as keyof Product,
      cell: (value: number, row: Product) => {
        let colorClass = 'bg-gray-100 text-gray-800';
        
        if (value <= settings.minStockAlert) {
          colorClass = 'bg-red-100 text-red-800';
        } else if (value >= settings.maxStockAlert) {
          colorClass = 'bg-blue-100 text-blue-800';
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {value}
          </span>
        );
      },
    },
    {
      header: 'Purchase Price',
      accessor: 'purchasePrice' as keyof Product,
      cell: (value: number) => `${settings.currency}${value.toFixed(2)}`,
    },
    {
      header: 'Selling Price',
      accessor: 'sellingPrice' as keyof Product,
      cell: (value: number) => `${settings.currency}${value.toFixed(2)}`,
    },
    {
      header: 'Profit',
      accessor: 'sellingPrice' as keyof Product,
      cell: (value: number, row: Product) => {
        const profit = row.sellingPrice - row.purchasePrice;
        const margin = ((profit / row.sellingPrice) * 100).toFixed(1);
        
        return (
          <span>
            {settings.currency}{profit.toFixed(2)} <span className="text-xs text-gray-500">({margin}%)</span>
          </span>
        );
      },
    },
    {
      header: 'Added Date',
      accessor: 'addedDate' as keyof Product,
    },
  ];

  const handleViewProduct = (product: Product) => {
    console.log('View product:', product);
    // In a real app, this would open a modal with product details
  };

  const tableActions = (
    <div className="flex space-x-2">
      <button
        onClick={() => setShowAddModal(true)}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus size={16} className="mr-1" />
        Add Product
      </button>
      <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <FileText size={16} className="mr-1" />
        Export
      </button>
      <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <Upload size={16} className="mr-1" />
        Import
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your product inventory</p>
      </div>
      
      <DataTable
        columns={productColumns}
        data={products}
        onRowClick={handleViewProduct}
        actions={tableActions}
      />
      
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddProduct}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Add New Product
                      </h3>
                      <div className="mt-2 space-y-4">
                        <div>
                          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            Product Code
                          </label>
                          <input
                            type="text"
                            name="code"
                            id="code"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newProduct.code}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Product Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                          </label>
                          <select
                            id="category"
                            name="category"
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newProduct.category}
                            onChange={handleInputChange}
                          >
                            <option value="">Select a category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Computer Accessories">Computer Accessories</option>
                            <option value="Storage">Storage</option>
                            <option value="Peripherals">Peripherals</option>
                            <option value="Networking">Networking</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newProduct.description}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
                              Purchase Price
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">{settings.currency}</span>
                              </div>
                              <input
                                type="number"
                                name="purchasePrice"
                                id="purchasePrice"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                value={newProduct.purchasePrice}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">
                              Selling Price
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">{settings.currency}</span>
                              </div>
                              <input
                                type="number"
                                name="sellingPrice"
                                id="sellingPrice"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                value={newProduct.sellingPrice}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Initial Stock Quantity
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            min="0"
                            step="1"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;