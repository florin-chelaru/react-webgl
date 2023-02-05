import React from 'react'
import { Canvas } from '@react-three/fiber'
import World from './World'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { Colors } from '../util/Colors'

export default function FirstCanvas() {
  console.log('rendering first canvas')

  const width = 800
  const height = 600
  console.log(width, height)

  return (
    <Canvas shadows={{ type: THREE.BasicShadowMap }}>
      <PerspectiveCamera makeDefault fov={60} near={1} far={10000} position={[0, 100, 200]} />
      {/* <ambientLight intensity={0.5} /> */}
      <hemisphereLight args={[Colors.yellow, 0x000000, 0.9]} />
      <directionalLight
        args={[0xffffff, 0.9]}
        position={[150, 350, 350]}
        castShadow={true}
        shadow-camera-left={-400}
        shadow-camera-right={400}
        shadow-camera-top={400}
        shadow-camera-bottom={-400}
        shadow-camera-near={1}
        shadow-camera-far={1000}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <fog attach="fog" color={Colors.yellow} near={100} far={950} />
      {/* <fog attach="fog" color="0xf7d9aa" near={100} far={950} /> */}
      {/* <axesHelper args={[5]} /> */}
      <World />
    </Canvas>
  )
}
