import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const BudgetPlanner: React.FC = () => {
  const [budget, setBudget] = useState<number>(0);
  const updateFilters = useStore((state) => state.updateFilters);
  const cart = useStore((state) => state.cart);

  const totalSpent = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remaining = budget - totalSpent;
  const percentageUsed = budget > 0 ? (totalSpent / budget) * 100 : 0;

  const handleBudgetChange = (value: number) => {
    setBudget(value);
    updateFilters({ maxPrice: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-4">Budget Planner</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Set Your Budget</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => handleBudgetChange(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Enter your budget"
            min="0"
          />
        </div>

        {budget > 0 && (
          <>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Budget Usage
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {percentageUsed.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    percentageUsed > 100 ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-600">Total Spent:</span>
                <span className="block font-semibold">${totalSpent}</span>
              </div>
              <div className={`p-2 rounded ${remaining < 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                <span className={`${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  Remaining:
                </span>
                <span className={`block font-semibold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${remaining}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};