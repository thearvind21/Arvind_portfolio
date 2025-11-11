import { Canvas } from '@react-three/fiber';
import { Grid } from '@react-three/drei';

export default function Grid3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        {/* Subtle infinite grid with soft fade; transparent background */}
        <Grid
          args={[60, 60]}
          position={[0, -1.5, 0]}
          cellSize={1}
          cellThickness={0.3}
          sectionSize={5}
          sectionThickness={0.6}
          cellColor="#ffffff10"
          sectionColor="#ffffff12"
          fadeDistance={15}
          fadeStrength={0.9}
          infiniteGrid
        />
      </Canvas>
    </div>
  );
}
