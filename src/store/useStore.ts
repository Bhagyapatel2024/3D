import { create } from 'zustand';
import { CartItem, FilterState } from '../types';

interface StoreState {
  cart: CartItem[];
  filters: FilterState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  filters: {
    minPrice: 0,
    maxPrice: 10000,
    category: null,
    arOnly: false,
  },
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));