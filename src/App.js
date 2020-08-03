import React, { useState, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, extend, useFrame } from 'react-three-fiber'
import { a, useSpring } from 'react-spring/three'
import './App.css';

extend({ OrbitControls })

function Cube(props) {
  const ref = useRef()
  const [isBig, setIsBig] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01

  })

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0
  })

  const color = isHovered ? 'lightskyblue' : 'cornflowerblue'

  return (
    <a.mesh
      {...props}
      ref={ref}
      scale={size}
      position-x={x}
      castShadow={true}
      receiveShadow={true}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHovered(false)}
      onPointerOver={() => setIsHovered(true)}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 8, 6]} />
      <meshPhongMaterial
        flatShading={true}
        roughness={1}
        metalness={0.5}
        shininess={100} attach="material" color={color}
      />
    </a.mesh>
  )
}

// box args = [width, height, depth ]
// sphere args = [radius (1), width min=3 (8), height min=2 (6)]
// cylinder args = [radiusTop, radiusBottom, height, radialSegments]

function Plane() {
  return (
    <mesh
      receiveShadow={true}
      rotation={[(-Math.PI / 2), 0, 0]}
      position={[0, -2, -5]}>
      <planeBufferGeometry attach="geometry" args={[20, 20]} />
      <meshStandardMaterial attach="material" color="tan" />
    </mesh>
  )
}

function Scene() {
  const { camera, gl: { domElement } } = useThree()
  return (
    <>
      <ambientLight />
      <spotLight
        castShadow={true}
        intensity={0.5}
        position={[0, 10, 4]} />
      <Plane />
      <Cube rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Cube rotation={[10, 20, 0]} position={[3, 3, -2]} />
      <orbitControls args={[camera, domElement]} />
    </>
  )
}

function App() {
  return (
    <Canvas shadowMap={true}>
      <Scene />
    </Canvas>
  );
}

export default App;
