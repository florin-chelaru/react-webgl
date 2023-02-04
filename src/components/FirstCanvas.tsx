import React, { useRef, useState } from 'react'
import type THREE from 'three'
import { Canvas, type ThreeElements, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props: ThreeElements['mesh']) {
  console.log('rendering box')
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => {
        click(!clicked)
      }}
      onPointerOver={(event) => {
        hover(true)
      }}
      onPointerOut={(event) => {
        hover(false)
      }}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'orange' : 'pink'} />
    </mesh>
  )
}

export default function FirstCanvas() {
  console.log('rendering first canvas')
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <Canvas
        camera={{
          fov: 75,
          aspect: 800 / 600,
          near: 0.1,
          far: 1000,
          position: [0, 2, 5]
        }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-1.2, 0, 0]} rotation={[5, 5, 0]} />
        {/* <Box position={[1.2, 0, 0]} /> */}
        <axesHelper args={[5]} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
