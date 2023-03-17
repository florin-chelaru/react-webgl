import React, { type ForwardedRef, useCallback, useImperativeHandle, useRef } from 'react'
import { type MeshProps, useFrame } from '@react-three/fiber'
import { GAME_SETTINGS } from '../GameSettings'
import type * as THREE from 'three'

export interface BonusProps extends MeshProps {
  initialAngle: number
  initialDistance: number
}

export interface BonusHandler {
  readonly angle: number
  readonly distance: number
  readonly mesh: THREE.Mesh | null
}

const Bonus = React.forwardRef<BonusHandler, BonusProps>(
  ({ initialAngle, initialDistance, ...props }: BonusProps, ref: ForwardedRef<BonusHandler>) => {
    const angle = useRef<number>(initialAngle)
    const distance = useRef<number>(initialDistance)
    const meshRef = useRef<THREE.Mesh | null>(null)

    const updateMeshPosition = useCallback(() => {
      if (!meshRef.current) {
        return
      }
      meshRef.current.position.y =
        -GAME_SETTINGS.seaRadius + Math.sin(angle.current) * distance.current
      meshRef.current.position.x = Math.cos(angle.current) * distance.current
    }, [])

    useImperativeHandle(ref, () => ({
      get angle(): number {
        return angle.current
      },

      get distance(): number {
        return distance.current
      },

      get mesh(): THREE.Mesh | null {
        return meshRef.current
      }
    }))

    useFrame((state, delta) => {
      angle.current += GAME_SETTINGS.speed * delta * GAME_SETTINGS.bonusSpeed
      if (angle.current > Math.PI * 2) {
        angle.current -= Math.PI * 2
      }
      updateMeshPosition()

      if (meshRef.current) {
        meshRef.current.rotation.z += Math.random() * 0.1
        meshRef.current.rotation.y += Math.random() * 0.1
      }
    })

    return (
      <mesh ref={meshRef} {...props} receiveShadow={true} castShadow={true}>
        <tetrahedronGeometry args={[5, 0]} />
        <meshPhongMaterial color={0x009999} shininess={0} specular={0xffffff} />
      </mesh>
    )
  }
)

export default Bonus
