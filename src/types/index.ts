export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  arEnabled: boolean;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  category: string | null;
  arOnly: boolean;
}