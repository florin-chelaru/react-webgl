import { type ThreeElements, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Colors } from '../util/Colors'
import type THREE from 'three'

const Airplane = React.forwardRef<THREE.Mesh, ThreeElements['mesh']>((props, ref) => {
  const propellerRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => (propellerRef.current.rotation.x += 0.3))

  return (
    <mesh ref={ref} {...props} castShadow={true} receiveShadow={true}>
      {/*  Cabin  */}
      <mesh castShadow={true} receiveShadow={true}>
        <boxGeometry args={[60, 50, 50, 1, 1, 1]} />
        <meshPhongMaterial color={Colors.red} flatShading={true} />
      </mesh>
      {/*  Engine  */}
      <mesh position={[40, 0, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[20, 50, 50, 1, 1, 1]} />
        <meshPhongMaterial color={Colors.white} flatShading={true} />
      </mesh>
      {/*  Tail  */}
      <mesh position={[-35, 25, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[15, 20, 5, 1, 1, 1]} />
        <meshPhongMaterial color={Colors.red} flatShading={true} />
      </mesh>
      {/*  Wing  */}
      <mesh castShadow={true} receiveShadow={true}>
        <boxGeometry args={[40, 8, 150, 1, 1, 1]} />
        <meshPhongMaterial color={Colors.red} flatShading={true} />
      </mesh>
      {/*  Propeller  */}
      <mesh ref={propellerRef} position={[50, 0, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[20, 10, 10, 1, 1, 1]} />
        <meshPhongMaterial color={Colors.brown} flatShading={true} />
        {/*  Blade  */}
        <mesh position={[8, 0, 0]} castShadow={true} receiveShadow={true}>
          <boxGeometry args={[1, 100, 20, 1, 1, 1]} />
          <meshPhongMaterial color={Colors.brownDark} flatShading={true} />
        </mesh>
      </mesh>
    </mesh>
  )
})
export default Airplane
