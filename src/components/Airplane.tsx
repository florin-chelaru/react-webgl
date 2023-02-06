import { extend, type Object3DNode, type ThreeElements, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Colors } from '../util/Colors'
import * as THREE from 'three'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
import Pilot from './Pilot'

extend({ ConvexGeometry })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    convexGeometry: Object3DNode<ConvexGeometry, typeof ConvexGeometry>
  }
}

const Airplane = React.forwardRef<THREE.Mesh, ThreeElements['mesh']>((props, ref) => {
  const propellerRef = useRef<THREE.Mesh>(null!)

  useFrame(() => propellerRef.current && (propellerRef.current.rotation.x += 0.3))

  return (
    <mesh ref={ref} {...props} castShadow={true} receiveShadow={true}>
      {/*  Cabin  */}
      <mesh castShadow={true} receiveShadow={true}>
        <convexGeometry
          args={[
            [
              [40, 25, 25],
              [40, 25, -25],
              [-40, 15, -5],
              [-40, 15, 5],

              [-40, 5, 5],
              [-40, 5, -5],
              [40, -25, -25],
              [40, -25, 25]
            ].map((v) => new THREE.Vector3(v[0], v[1], v[2]))
          ]}
        />
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
      <Pilot position={[-10, 27, 0]} />
    </mesh>
  )
})
export default Airplane
