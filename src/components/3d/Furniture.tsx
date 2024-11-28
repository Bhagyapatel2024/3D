import { useEffect, useState } from 'react';
import { Product } from '../../types';
import { generateMesh } from './meshGenerators';

interface FurnitureProps {
  product: Product;
}

export const Furniture: React.FC<FurnitureProps> = ({ product }) => {
  const [mesh, setMesh] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const generatedMesh = generateMesh(product);
    setMesh(generatedMesh);
  }, [product]);

  if (!mesh) {
    return null;
  }

  return <>{mesh}</>;
}