
import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md dark:shadow-lg hover:shadow-brand-gold/20 hover:scale-105 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-shrink-0">
          <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md">
            {icon}
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
      {change && (
        <div className="mt-4">
          <p className={`text-sm ${changeColor}`}>
            {change} from last month
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;