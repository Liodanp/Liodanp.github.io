import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatsCard as StatsCardType } from '../types';

const StatsCard: React.FC<StatsCardType> = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-lg bg-blue-50">{icon}</div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {changeType === 'increase' ? (
                <ArrowUpRight size={16} className="text-green-500 mr-1" />
              ) : (
                <ArrowDownRight size={16} className="text-red-500 mr-1" />
              )}
              <span 
                className={`text-sm font-medium ${
                  changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;