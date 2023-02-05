import React from 'react'
import { type ThreeElements } from '@react-three/fiber'
import { Colors } from '../util/Colors'
import type THREE from 'three'

const Sea = React.forwardRef<THREE.Mesh, ThreeElements['mesh']>((props, ref) => {
  return (
    <mesh {...props} receiveShadow={true} ref={ref}>
      <mesh receiveShadow={true} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[600, 600, 800, 40, 10]} />
        <meshPhongMaterial
          color={Colors.blue}
          flatShading={true}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
    </mesh>
  )
})
export default Sea
