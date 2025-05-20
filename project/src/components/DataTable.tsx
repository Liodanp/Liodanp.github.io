import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MoreHorizontal } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  actions?: React.ReactNode;
}

function DataTable<T extends { id: string }>({ 
  columns, 
  data,
  onRowClick,
  actions
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleRowSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelectedRows = new Set(selectedRows);
    
    if (selectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    
    setSelectedRows(newSelectedRows);
  };

  const toggleAllRowsSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map(row => row.id)));
    }
  };

  // Filter data based on search term
  const filteredData = data.filter(row => 
    Object.values(row).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data based on sort column and direction
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue === bValue) return 0;
    
    const comparison = aValue > bValue ? 1 : -1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-gray-200">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {actions && (
          <div className="flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedRows.size > 0 && selectedRows.size === filteredData.length}
                    onChange={toggleAllRowsSelection}
                  />
                </div>
              </th>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.sortable !== false ? (
                    <button 
                      className="group flex items-center space-x-1 focus:outline-none"
                      onClick={() => handleSort(column.accessor)}
                    >
                      <span>{column.header}</span>
                      <span className="flex flex-col">
                        <ChevronUp 
                          size={10} 
                          className={`${
                            sortColumn === column.accessor && sortDirection === 'asc'
                              ? 'text-gray-900'
                              : 'text-gray-400 group-hover:text-gray-500'
                          }`} 
                        />
                        <ChevronDown 
                          size={10} 
                          className={`-mt-[2px] ${
                            sortColumn === column.accessor && sortDirection === 'desc'
                              ? 'text-gray-900'
                              : 'text-gray-400 group-hover:text-gray-500'
                          }`} 
                        />
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <tr 
                  key={row.id} 
                  className={`
                    ${selectedRows.has(row.id) ? 'bg-blue-50' : ''} 
                    ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                  `}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center" onClick={(e) => toggleRowSelection(row.id, e)}>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedRows.has(row.id)}
                        readOnly
                      />
                    </div>
                  </td>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.cell 
                        ? column.cell(row[column.accessor], row)
                        : String(row[column.accessor] || '')
                      }
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500 focus:outline-none" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-4 text-center text-sm text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{sortedData.length}</span> of <span className="font-medium">{data.length}</span> results
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-3">
              {selectedRows.size} selected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;