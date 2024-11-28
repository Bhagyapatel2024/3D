import React from 'react';
import { Product } from '../../types';
import { Scene } from './Scene';

interface Viewer3DProps {
  product: Product;
  onClose: () => void;
}

export const Viewer3D: React.FC<Viewer3DProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
      <div className="absolute inset-0">
        <Scene product={product} />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="text-white mb-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm opacity-75">
              Dimensions: {product.dimensions.width}W x {product.dimensions.height}H x{' '}
              {product.dimensions.depth}D inches
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-white text-black py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Close 3D View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};