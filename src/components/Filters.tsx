import React from 'react';
import { useStore } from '../store/useStore';

const categories = ['Living Room', 'Bedroom', 'Dining', 'Office'];

export const Filters: React.FC = () => {
  const { filters, updateFilters } = useStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              placeholder="Max"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => updateFilters({ category: e.target.value || null })}
            className="w-full p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="arOnly"
            checked={filters.arOnly}
            onChange={(e) => updateFilters({ arOnly: e.target.checked })}
            className="mr-2"
          />
          <label htmlFor="arOnly" className="text-sm font-medium">
            Show AR-enabled products only
          </label>
        </div>
      </div>
    </div>
  );
};