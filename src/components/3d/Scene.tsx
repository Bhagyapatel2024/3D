import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Furniture } from './Furniture';
import { Product } from '../../types';
import { SceneLighting } from './SceneLighting';
import { Ground } from './Ground';

interface SceneProps {
  product: Product;
}

export const Scene: React.FC<SceneProps> = ({ product }) => {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
      />
      
      <SceneLighting />
      <Furniture product={product} />
      <Ground />
      <Environment preset="apartment" />
    </Canvas>
  );
};