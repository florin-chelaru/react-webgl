import { type ThreeElements, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import type * as THREE from 'three'
import { Colors } from '../util/Colors'

export default function Pilot(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null)

  const angleHairs = useRef<number>(0)

  const numHairs = 12
  const hairs = useRef<THREE.Mesh[]>(new Array(numHairs))

  useEffect(() => {
    hairs.current.forEach((h) => h?.geometry.translate(0, 2, 0))
  }, [])

  useFrame(() => {
    hairs.current.forEach(
      (h, i) => h && (h.scale.y = 0.75 + Math.cos(angleHairs.current + i / 3) * 0.25)
    )
    angleHairs.current += 0.16
  })

  return (
    <mesh name="pilot" {...props} ref={ref} receiveShadow={true} castShadow={true}>
      {/* Body */}
      <mesh position={[2, -12, 0]}>
        <boxGeometry args={[15, 15, 15]} />
        <meshPhongMaterial color={Colors.brown} flatShading={true} />
      </mesh>
      {/* Face */}
      <mesh>
        <boxGeometry args={[10, 10, 10]} />
        <meshLambertMaterial color={Colors.pink} flatShading={true} />
      </mesh>
      {/* Hair */}
      <mesh position={[-5, 5, 0]}>
        {/* Top Hair*/}
        {Array.from({ length: 12 }, (_, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          const startPosZ = -4
          const startPosX = -4
          return (
            <mesh
              key={`hair-${i}`}
              ref={(ref) => ref && (hairs.current[i] = ref)}
              position={[startPosX + row * 4, 0, startPosZ + col * 4]}>
              <boxGeometry args={[4, 4, 4]} />
              <meshLambertMaterial color={Colors.brown} />
            </mesh>
          )
        })}
        {/* Hair Side Right */}
        <mesh position={[2, -2, 6]}>
          <boxGeometry args={[12, 4, 2]} />
          <meshLambertMaterial color={Colors.brown} />
        </mesh>
        {/* Hair Side Left */}
        <mesh position={[2, -2, -6]}>
          <boxGeometry args={[12, 4, 2]} />
          <meshLambertMaterial color={Colors.brown} />
        </mesh>
        {/* Hair Back */}
        <mesh position={[-1, -4, 0]}>
          <boxGeometry args={[2, 8, 10]} />
          <meshLambertMaterial color={Colors.brown} />
        </mesh>
      </mesh>
      {/* Glasses: Right Lens */}
      <mesh position={[6, 0, 3]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshLambertMaterial color={Colors.brown} />
      </mesh>
      {/* Glasses: Left Lens */}
      <mesh position={[6, 0, -3]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshLambertMaterial color={Colors.brown} />
      </mesh>
      {/* Glasses Frame */}
      <mesh>
        <boxGeometry args={[11, 1, 10.5]} />
        <meshLambertMaterial color={Colors.brown} />
      </mesh>
      {/* Left Ear */}
      <mesh position={[0, 0, -6]}>
        <boxGeometry args={[2, 3, 2]} />
        <meshLambertMaterial color={Colors.pink} />
      </mesh>
      {/* Right Ear */}
      <mesh position={[0, 0, 6]}>
        <boxGeometry args={[2, 3, 2]} />
        <meshLambertMaterial color={Colors.pink} />
      </mesh>
    </mesh>
  )
}
