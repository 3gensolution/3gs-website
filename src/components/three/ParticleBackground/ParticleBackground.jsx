import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './ParticleBackground.scss';

const Particles = ({ count = 500, color = '#FF6B35' }) => {
  const mesh = useRef();
  const light = useRef();
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 20;

      temp.push({ time, factor, speed, x, y, z, mx: 0, my: 0 });
    }
    return temp;
  }, [count, viewport]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = particles[i].x;
      pos[i * 3 + 1] = particles[i].y;
      pos[i * 3 + 2] = particles[i].z;
    }
    return pos;
  }, [particles, count]);

  useFrame((state) => {
    particles.forEach((particle, index) => {
      let { time, factor, speed, x, y, z } = particle;
      time = particle.time += speed / 2;

      const a = Math.cos(time) + Math.sin(time * 1) / 10;
      const b = Math.sin(time) + Math.cos(time * 2) / 10;
      const s = Math.max(1.5, Math.cos(time) * 2);

      dummy.position.set(
        x + Math.cos((time / 10) * factor) + (Math.sin(time * 1) * factor) / 10,
        y + Math.sin((time / 10) * factor) + (Math.cos(time * 2) * factor) / 10,
        z + Math.cos((time / 10) * factor) + (Math.sin(time * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={light} distance={40} intensity={8} color={color} />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </instancedMesh>
    </>
  );
};

const NetworkLines = ({ count = 50, color = '#FF6B35' }) => {
  const lines = useRef();
  const { viewport } = useThree();

  const linePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const startX = (Math.random() - 0.5) * viewport.width * 1.5;
      const startY = (Math.random() - 0.5) * viewport.height * 1.5;
      const startZ = (Math.random() - 0.5) * 10;
      const endX = startX + (Math.random() - 0.5) * 5;
      const endY = startY + (Math.random() - 0.5) * 5;
      const endZ = startZ + (Math.random() - 0.5) * 5;
      positions.push([startX, startY, startZ, endX, endY, endZ]);
    }
    return positions;
  }, [count, viewport]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (lines.current) {
      lines.current.rotation.z = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <group ref={lines}>
      {linePositions.map((pos, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(pos)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={0.15}
          />
        </line>
      ))}
    </group>
  );
};

const GridPlane = ({ color = '#FF6B35' }) => {
  const grid = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (grid.current) {
      grid.current.position.z = -5 + Math.sin(time * 0.2) * 0.5;
    }
  });

  return (
    <group ref={grid} position={[0, 0, -5]} rotation={[-Math.PI / 3, 0, 0]}>
      <gridHelper
        args={[50, 50, color, color]}
        material-transparent
        material-opacity={0.1}
      />
    </group>
  );
};

const ParticleBackground = ({
  variant = 'default',
  particleCount = 300,
  color = '#FF6B35'
}) => {
  return (
    <div className="particle-background">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#0D0D0D', 5, 30]} />
        <Particles count={particleCount} color={color} />
        {variant === 'network' && <NetworkLines count={30} color={color} />}
        {variant === 'grid' && <GridPlane color={color} />}
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
