import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { Cart } from './components/Cart';
import { Viewer3D } from './components/3d/Viewer3D';
import { BudgetPlanner } from './components/BudgetPlanner';
import { useStore } from './store/useStore';
import { Product } from './types';
import { products } from './data/products';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const filters = useStore((state) => state.filters);
  const cart = useStore((state) => state.cart);

  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesAR = !filters.arOnly || product.arEnabled;
    return matchesPrice && matchesCategory && matchesAR;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Furniture Store</h1>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <ShoppingBag size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <BudgetPlanner />
            <Filters />
          </div>
          
          <div className="col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewAR={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform">
          <Cart />
        </div>
      )}

      {selectedProduct && (
        <Viewer3D
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;