import { Box, Cylinder } from '@react-three/drei';
import { Product } from '../../types';

const INCH_TO_UNIT = 0.0254; // Convert inches to meters

export function generateMesh(product: Product): JSX.Element {
  const width = product.dimensions.width * INCH_TO_UNIT;
  const height = product.dimensions.height * INCH_TO_UNIT;
  const depth = product.dimensions.depth * INCH_TO_UNIT;

  switch (product.category) {
    case 'Living Room':
      return generateSofa(width, height, depth);
    case 'Dining':
      return generateTable(width, height, depth);
    default:
      return generateGenericBox(width, height, depth);
  }
}

function generateSofa(width: number, height: number, depth: number) {
  return (
    <group position={[0, height / 2, 0]}>
      {/* Base */}
      <Box args={[width, height * 0.4, depth]} castShadow>
        <meshStandardMaterial color="#666666" />
      </Box>
      
      {/* Back */}
      <Box 
        args={[width, height * 0.6, depth * 0.2]} 
        position={[0, height * 0.1, -depth * 0.4]} 
        castShadow
      >
        <meshStandardMaterial color="#666666" />
      </Box>
      
      {/* Cushions */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Box
          key={i}
          args={[width / 3 - 0.05, height * 0.2, depth * 0.8]}
          position={[
            (i - 1) * (width / 3),
            height * 0.2,
            depth * 0.1
          ]}
          castShadow
        >
          <meshStandardMaterial color="#888888" />
        </Box>
      ))}
    </group>
  );
}

function generateTable(width: number, height: number, depth: number) {
  return (
    <group position={[0, height / 2, 0]}>
      {/* Table top */}
      <Box args={[width, height * 0.05, depth]} position={[0, height * 0.45, 0]} castShadow>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Legs */}
      {[
        [width * 0.4, depth * 0.4],
        [width * 0.4, -depth * 0.4],
        [-width * 0.4, depth * 0.4],
        [-width * 0.4, -depth * 0.4],
      ].map(([x, z], i) => (
        <Cylinder
          key={i}
          args={[height * 0.03, height * 0.03, height * 0.9]}
          position={[x, 0, z]}
          castShadow
        >
          <meshStandardMaterial color="#8B4513" />
        </Cylinder>
      ))}
    </group>
  );
}

function generateGenericBox(width: number, height: number, depth: number) {
  return (
    <Box args={[width, height, depth]} position={[0, height / 2, 0]} castShadow>
      <meshStandardMaterial color="#A0522D" />
    </Box>
  );
}