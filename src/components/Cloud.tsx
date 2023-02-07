import React, { useEffect, useMemo, useRef } from 'react'
import { type ThreeElements } from '@react-three/fiber'
import { Colors } from '../util/Colors'
import type * as THREE from 'three'

export default function Cloud(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  useEffect(() => {
    ref.current.rotateX(Math.PI / 2)
  }, [])

  const cloudlingSizesRef = useRef<number[]>([])
  const cloudlingPositionsRef = useRef<Array<[x: number, y: number, z: number]>>([])

  useMemo(() => {
    const nBlocs = 3 + Math.floor(Math.random() * 5)
    const cloudlingSizes = [0.1 + Math.random() * 0.9]
    for (let i = 0; i < Math.floor(nBlocs / 2); ++i) {
      const r = Math.random()
      const s = r * cloudlingSizes[0]
      cloudlingSizes.push(s)
      cloudlingSizes.splice(0, 0, s)
    }
    const cloudlingPositions: Array<[x: number, y: number, z: number]> = [
      [0, 0, cloudlingSizes[0] * 0.5 * 20]
    ]
    for (let i = 1; i < nBlocs; ++i) {
      const px =
        cloudlingPositions[i - 1][0] +
        (cloudlingSizes[i - 1] * 20) / 2 +
        (cloudlingSizes[i] * 20) / 2
      cloudlingPositions.push([px, 0, cloudlingSizes[i] * 0.5 * 20])
    }

    cloudlingSizesRef.current = cloudlingSizes
    cloudlingPositionsRef.current = cloudlingPositions
  }, [])

  return (
    <mesh {...props} ref={ref} receiveShadow={true} castShadow={true}>
      {cloudlingSizesRef.current.map((s, i) => (
        <mesh
          key={`cloudling-${i}`}
          position={cloudlingPositionsRef.current[i]}
          rotation-z={Math.random() * Math.PI * 2}
          rotation-y={Math.random() * Math.PI * 2}
          scale={[s, s, s]}
          castShadow={true}
          receiveShadow={true}>
          {/*<boxGeometry args={[20, 20, 20, 1, 1, 1]} />*/}
          <sphereGeometry args={[20, 5, 5]} />
          <meshPhongMaterial color={Colors.white} transparent={true} opacity={0.5} />
        </mesh>
      ))}
    </mesh>
  )
}
