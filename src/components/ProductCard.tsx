import React from 'react';
import { View, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
  onViewAR: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewAR }) => {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <div className="flex gap-2">
            {product.arEnabled && (
              <button
                onClick={onViewAR}
                className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
              >
                <View size={20} />
              </button>
            )}
            <button
              onClick={() => addToCart(product)}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};