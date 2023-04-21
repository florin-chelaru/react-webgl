import React, { useCallback, useImperativeHandle, useRef, useState } from 'react'
import Particle, { type ParticleProps } from './Particle'
import * as THREE from 'three'
import { type MeshProps, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { Power2 } from 'gsap/gsap-core'

interface ParticleHolderProps extends MeshProps {}

export interface ParticleHolderHandle {
  spawnParticles: (pos: THREE.Vector3, density: number, color: number, scale: number) => void
}

interface ParticleInfo {
  pos: THREE.Vector3
  color: number
  scale: number
}

const ParticleHolder = React.forwardRef<ParticleHolderHandle, ParticleHolderProps>((props, ref) => {
  const [particles, setParticles] = useState<Map<number, ParticleInfo>>(new Map())
  const nextKey = useRef(0)
  const explodingParticles = useRef<Set<number>>(new Set())

  const explode = useCallback(
    (particle: THREE.Mesh, key: number, { pos, color, scale }: ParticleInfo) => {
      console.log(`particle ${key} x=${particle.position.x} y=${particle.position.y}`)
      if (explodingParticles.current.has(key)) {
        return
      }
      console.log(`exploding particle ${key}`)
      explodingParticles.current.add(key)

      const mat = particle.material as THREE.MeshPhongMaterial
      mat.color = new THREE.Color(color)
      mat.needsUpdate = true

      particle.scale.set(scale, scale, scale)

      // const targetX = pos.x + (-1 + Math.random() * 2) * 50
      const targetX = pos.x + 50
      // const targetY = pos.y + (-1 + Math.random() * 2) * 50
      const targetY = pos.y + 50
      // const speed = 0.8 + Math.random() * 0.2
      const speed = 2 // + Math.random() * 0.2
      // gsap.to(particle.rotation, speed, { x: Math.random() * 12, y: Math.random() * 12 })
      // gsap.to(particle.scale, speed, { x: 0.4, y: 0.4, z: 0.4 })
      gsap.to(particle.position, speed, {
        x: targetX,
        y: targetY,
        // delay: Math.random() * 0.1,
        delay: 0.1,
        ease: Power2.easeOut,
        onComplete: function () {
          setTimeout(() => {
            const copy = new Map(particles)
            copy.delete(key)
            explodingParticles.current.delete(key)
            setParticles(copy)
          }, 0)
        }
      })
    },
    []
  )

  useImperativeHandle(ref, () => ({
    spawnParticles(pos, density, color, scale) {
      const copy = [...particles]
      copy.push(
        ...([...Array(density)].map(() => [
          nextKey.current++,
          {
            pos,
            color,
            scale
          }
        ]) as Array<[key: number, particle: ParticleInfo]>)
      )

      setParticles(new Map(copy))
    }
  }))

  useFrame((_state, _delta) => {})

  console.log(`rendering ${particles.size} particles`)
  return (
    <mesh {...props} receiveShadow={true} castShadow={true}>
      {[...particles.entries()].map((tuple) => (
        <Particle
          key={`particle-${tuple[0]}`}
          theKey={`particle-${tuple[0]}`}
          position={tuple[1].pos}
          material-color={tuple[1].color}
          scale={new THREE.Vector3(tuple[1].scale, tuple[1].scale, tuple[1].scale)}
          ref={(ref) => {
            if (ref != null) {
              explode(ref, tuple[0], tuple[1])
            }
          }}
        />
      ))}
    </mesh>
  )
})

export default ParticleHolder
