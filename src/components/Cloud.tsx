import React, { useEffect, useRef } from 'react'
import { type ThreeElements } from '@react-three/fiber'
import { Colors } from '../util/Colors'
import type * as THREE from 'three'

export default function Cloud(props: ThreeElements['mesh']) {
  const nBlocs = 3 + Math.floor(Math.random() * 3)

  const ref = useRef<THREE.Mesh>(null!)
  useEffect(() => {
    ref.current.rotateX(Math.PI / 2)
  }, [])
  return (
    <mesh {...props} ref={ref} receiveShadow={true} castShadow={true}>
      {Array.from({ length: nBlocs }, (_, i) => {
        const s = 0.1 + Math.random() * 0.9
        return (
          <mesh
            key={`cloudling-${i}`}
            position={[i * 15, Math.random() * 10, Math.random() * 10]}
            rotation-z={Math.random() * Math.PI * 2}
            rotation-y={Math.random() * Math.PI * 2}
            scale={[s, s, s]}
            castShadow={true}
            receiveShadow={true}>
            <boxGeometry args={[20, 20, 20]} />
            <meshPhongMaterial color={Colors.white} />
          </mesh>
        )
      })}
    </mesh>
  )
}
