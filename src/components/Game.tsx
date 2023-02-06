import React from 'react'
import { Canvas } from '@react-three/fiber'
import World from './World'
import { PerspectiveCamera } from '@react-three/drei'

export default function Game() {
  console.log('rendering first canvas')

  const width = 800
  const height = 600
  console.log(width, height)

  return (
    <Canvas shadows="soft">
      <PerspectiveCamera makeDefault fov={60} near={1} far={10000} position={[0, 100, 200]} />
      <hemisphereLight groundColor={0x000000} color={0xaaaaaa} intensity={0.5} />
      <ambientLight args={[0xdc8874, 0.5]} />
      <directionalLight
        color={0xffffff}
        intensity={2}
        position={[150, 350, 350]}
        castShadow={true}
        shadow-camera-left={-400}
        shadow-camera-right={400}
        shadow-camera-top={1000}
        shadow-camera-bottom={-400}
        shadow-camera-near={1}
        shadow-camera-far={1000}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <fog attach="fog" args={[0xf7d9aa, 100, 950]} />
      {/* <axesHelper args={[5]} /> */}
      <World />
    </Canvas>
  )
}
