import React from 'react'
import { type ThreeElements } from '@react-three/fiber'
import Cloud from './Cloud'
import type THREE from 'three'

const Sky = React.forwardRef<THREE.Mesh, ThreeElements['mesh']>((props, ref) => {
  const nClouds = 100
  const stepAngle = (Math.PI * 2) / nClouds
  return (
    <mesh {...props} receiveShadow={true} castShadow={true} ref={ref}>
      {Array.from({ length: nClouds }, (_, i) => {
        const a = stepAngle * i
        const h = 750 + Math.random() * 200
        const s = Math.random() * 2
        return (
          <Cloud
            key={`cloud-${i}`}
            position={[Math.cos(a) * h, Math.sin(a) * h, 300 - Math.random() * 400]}
            rotation-z={a + Math.PI / 2}
            scale={[s, s, s]}
          />
        )
      })}
    </mesh>
  )
})
export default Sky
