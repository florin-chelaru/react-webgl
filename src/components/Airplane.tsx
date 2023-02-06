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
      <mesh position={[50, 0, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[20, 50, 50, 1, 1, 1]} />
        <meshPhongMaterial color={Colors.white} flatShading={true} />
      </mesh>
      {/*  Tail  */}
      <mesh position={[-40, 20, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[15, 20, 5, 1, 1, 1]} />
        <meshPhongMaterial color={Colors.red} flatShading={true} />
      </mesh>
      {/*  Wing  */}
      <mesh position={[0, 15, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[30, 5, 120, 1, 1, 1]} />
        <meshPhongMaterial color={Colors.red} flatShading={true} />
      </mesh>
      {/*  Windshield  */}
      <mesh position={[5, 27, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[3, 15, 20, 1, 1, 1]} />
        <meshPhongMaterial
          color={Colors.white}
          flatShading={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      {/*  Propeller  */}
      <mesh ref={propellerRef} position={[60, 0, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[20, 10, 10, 1, 1, 1]} />
        <meshPhongMaterial color={Colors.brown} flatShading={true} />
        {/*  Blade 1 */}
        <mesh position={[8, 0, 0]} castShadow={true} receiveShadow={true}>
          <boxGeometry args={[1, 80, 10, 1, 1, 1]} />
          <meshPhongMaterial color={Colors.brownDark} flatShading={true} />
        </mesh>
        {/*  Blade 2 */}
        <mesh
          position={[8, 0, 0]}
          castShadow={true}
          receiveShadow={true}
          rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[1, 80, 10, 1, 1, 1]} />
          <meshPhongMaterial color={Colors.brownDark} flatShading={true} />
        </mesh>
      </mesh>
      {/* Wheel Protection Right */}
      <mesh position={[25, -20, 25]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[30, 15, 10]} />
        <meshPhongMaterial color={Colors.red} flatShading={true} />
      </mesh>
      {/* Wheel Protection Left */}
      <mesh position={[25, -20, -25]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[30, 15, 10]} />
        <meshPhongMaterial color={Colors.red} flatShading={true} />
      </mesh>

      {/* Wheel Right */}
      <mesh position={[25, -28, 25]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[24, 24, 4]} />
        <meshPhongMaterial color={Colors.brownDark} flatShading={true} />
        {/* Axis */}
        <mesh castShadow={true} receiveShadow={true}>
          <boxGeometry args={[10, 10, 6]} />
          <meshPhongMaterial color={Colors.brown} flatShading={true} />
        </mesh>
      </mesh>
      {/* Wheel Left */}
      <mesh position={[25, -28, -25]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[24, 24, 4]} />
        <meshPhongMaterial color={Colors.brownDark} flatShading={true} />
        {/* Axis */}
        <mesh castShadow={true} receiveShadow={true}>
          <boxGeometry args={[10, 10, 6]} />
          <meshPhongMaterial color={Colors.brown} flatShading={true} />
        </mesh>
      </mesh>
      {/* Wheel Back */}
      <mesh position={[-35, -5, 0]} scale={[0.5, 0.5, 0.5]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[24, 24, 4]} />
        <meshPhongMaterial color={Colors.brownDark} flatShading={true} />
        {/* Axis */}
        <mesh castShadow={true} receiveShadow={true}>
          <boxGeometry args={[10, 10, 6]} />
          <meshPhongMaterial color={Colors.brown} flatShading={true} />
        </mesh>
      </mesh>

      {/* Suspension */}
      <mesh position={[-35, -5, 0]} rotation-z={-0.3} castShadow={true} receiveShadow={true}>
        <mesh position-y={10}>
          <boxGeometry args={[4, 20, 4]} />
          <meshPhongMaterial color={Colors.red} flatShading={true} />
        </mesh>
      </mesh>

      <Pilot position={[-10, 27, 0]} />
    </mesh>
  )
})
export default Airplane
