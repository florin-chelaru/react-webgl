import { type MeshProps, useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import React, { type ForwardedRef, useCallback, useImperativeHandle, useRef } from 'react'
import { GAME_SETTINGS } from '../GameSettings'

export interface ParticleProps extends MeshProps {
  theKey: string
}

const Particle = React.memo(
  React.forwardRef<THREE.Mesh, ParticleProps>(
    ({ position, scale, ...props }: ParticleProps, ref: ForwardedRef<THREE.Mesh>) => {
      // the problem here is that the position changes but the ref doesn't
      // const posRef = useRef(position)
      // const scaleRef = useRef(scale)

      return (
        <mesh
          ref={ref}
          position={position}
          scale={scale}
          // position={posRef.current}
          // scale={scaleRef.current}
          {...props}
          receiveShadow={true}
          castShadow={true}>
          <tetrahedronGeometry args={[3, 0]} />
          <meshPhongMaterial
            color={0x009999}
            shininess={0}
            specular={0xffffff}
            flatShading={true}
          />
        </mesh>
      )
    }
  )
)

export default Particle
