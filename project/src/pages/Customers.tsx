import React, { useState } from 'react';
import { Plus, FileText, Phone, Mail, MapPin, Tag } from 'lucide-react';
import DataTable from '../components/DataTable';
import { Customer } from '../types';
import { useSettings } from '../context/SettingsContext';

// Sample data
const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    address: '123 Main St, Anytown, USA',
    phone: '123-456-7890',
    email: 'john@example.com',
    state: 'active',
    balance: 0,
    addedDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    address: '456 Elm St, Othertown, USA',
    phone: '234-567-8901',
    email: 'jane@example.com',
    state: 'active',
    balance: 250.50,
    addedDate: '2023-02-10',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    address: '789 Oak St, Somewhere, USA',
    phone: '345-678-9012',
    email: 'michael@example.com',
    state: 'inactive',
    balance: -125.75,
    addedDate: '2023-03-15',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    address: '321 Pine St, Nowhere, USA',
    phone: '456-789-0123',
    email: 'sarah@example.com',
    state: 'active',
    balance: 0,
    addedDate: '2023-04-20',
  },
  {
    id: '5',
    name: 'Robert Brown',
    address: '654 Cedar St, Everywhere, USA',
    phone: '567-890-1234',
    email: 'robert@example.com',
    state: 'active',
    balance: 75.25,
    addedDate: '2023-05-25',
  },
];

const Customers: React.FC = () => {
  const { settings } = useSettings();
  const [showAddModal, setShowAddModal] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);

  // Customer form state
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: '',
    address: '',
    phone: '',
    email: '',
    state: 'active',
    balance: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setNewCustomer({
      ...newCustomer,
      [name]: name === 'balance' ? parseFloat(value) : value,
    });
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    
    const id = `${customers.length + 1}`;
    const newCustomerComplete: Customer = {
      id,
      name: newCustomer.name || 'Unnamed Customer',
      address: newCustomer.address || '',
      phone: newCustomer.phone || '',
      email: newCustomer.email || '',
      state: newCustomer.state || 'active',
      balance: newCustomer.balance || 0,
      addedDate: new Date().toISOString().split('T')[0],
    };
    
    setCustomers([...customers, newCustomerComplete]);
    setNewCustomer({
      name: '',
      address: '',
      phone: '',
      email: '',
      state: 'active',
      balance: 0,
    });
    setShowAddModal(false);
  };

  const customerColumns = [
    {
      header: 'Name',
      accessor: 'name' as keyof Customer,
    },
    {
      header: 'Contact Info',
      accessor: 'phone' as keyof Customer,
      cell: (value: string, row: Customer) => (
        <div>
          <div className="flex items-center">
            <Phone size={14} className="mr-1 text-gray-500" />
            <a 
              href={`tel:${value}`} 
              className="text-blue-600 hover:text-blue-800"
            >
              {value}
            </a>
          </div>
          <div className="flex items-center mt-1">
            <Mail size={14} className="mr-1 text-gray-500" />
            <a 
              href={`mailto:${row.email}`} 
              className="text-blue-600 hover:text-blue-800"
            >
              {row.email}
            </a>
          </div>
        </div>
      ),
    },
    {
      header: 'Address',
      accessor: 'address' as keyof Customer,
      cell: (value: string) => (
        <div className="flex items-center">
          <MapPin size={14} className="mr-1 flex-shrink-0 text-gray-500" />
          <span className="truncate max-w-xs">{value}</span>
        </div>
      ),
    },
    {
      header: 'Balance',
      accessor: 'balance' as keyof Customer,
      cell: (value: number) => {
        const colorClass = value < 0 
          ? 'text-red-600' 
          : value > 0 
            ? 'text-blue-600' 
            : 'text-gray-600';
            
        return (
          <span className={colorClass}>
            {value < 0 ? '-' : ''}{settings.currency}{Math.abs(value).toFixed(2)}
          </span>
        );
      },
    },
    {
      header: 'Status',
      accessor: 'state' as keyof Customer,
      cell: (value: string) => {
        const colorClass = value === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-800';
          
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            <Tag size={12} className="mr-1" />
            {value}
          </span>
        );
      },
    },
    {
      header: 'Added Date',
      accessor: 'addedDate' as keyof Customer,
    },
  ];

  const handleViewCustomer = (customer: Customer) => {
    console.log('View customer:', customer);
    // In a real app, this would open a modal with customer details
  };

  const tableActions = (
    <div className="flex space-x-2">
      <button
        onClick={() => setShowAddModal(true)}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus size={16} className="mr-1" />
        Add Customer
      </button>
      <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <FileText size={16} className="mr-1" />
        Export
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your customer relationships</p>
      </div>
      
      <DataTable
        columns={customerColumns}
        data={customers}
        onRowClick={handleViewCustomer}
        actions={tableActions}
      />
      
      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddCustomer}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Add New Customer
                      </h3>
                      <div className="mt-2 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newCustomer.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newCustomer.address}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                              Phone Number
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">{settings.phonePrefix}</span>
                              </div>
                              <input
                                type="text"
                                name="phone"
                                id="phone"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-12 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={newCustomer.phone}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              value={newCustomer.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                              Status
                            </label>
                            <select
                              id="state"
                              name="state"
                              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              value={newCustomer.state}
                              onChange={handleInputChange}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                              Initial Balance
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">{settings.currency}</span>
                              </div>
                              <input
                                type="number"
                                name="balance"
                                id="balance"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="0.00"
                                step="0.01"
                                value={newCustomer.balance}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
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
                    Add Customer
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

export default Customers;