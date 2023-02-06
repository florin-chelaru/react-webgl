import React, { useEffect, useRef } from 'react'
import { type ThreeElements, useFrame } from '@react-three/fiber'
import { Colors } from '../util/Colors'
import type THREE from 'three'
import { getVertices, updateVertices } from '../util/geometryUtil'

interface Wave {
  x: number
  y: number
  z: number
  angle: number
  dist: number
  speed: number
}

const Sea = React.forwardRef<THREE.Mesh, ThreeElements['mesh']>((props, ref) => {
  const wavesRef = useRef<Wave[]>([])
  const geomRef = useRef<THREE.CylinderGeometry>(null)

  useEffect(() => {
    if (geomRef.current) {
      const vertices = getVertices(geomRef.current)
      wavesRef.current = vertices.map((v) => ({
        x: v.x,
        y: v.y,
        z: v.z,
        angle: Math.random() * Math.PI * 2,
        dist: 5 + Math.random() * 15,
        speed: 0.016 + Math.random() * 0.032
      }))
    }
  }, [])

  useFrame((state, _delta) => {
    if (!geomRef.current) {
      return
    }
    const vertices = getVertices(geomRef.current)
    wavesRef.current.forEach((w, i) => {
      vertices[i].x = w.x + Math.cos(w.angle) * w.dist
      vertices[i].y = w.y + Math.sin(w.angle) * w.dist
      w.angle += w.speed
    })
    updateVertices(geomRef.current, vertices)
  })

  return (
    <mesh {...props} receiveShadow={true} ref={ref} rotation-z={Math.PI / 2}>
      <mesh receiveShadow={true} rotation-x={-Math.PI / 2}>
        <cylinderGeometry ref={geomRef} args={[600, 600, 800, 40, 10]} />
        <meshPhongMaterial color={Colors.blue} flatShading={true} transparent={false} opacity={1} />
      </mesh>
    </mesh>
  )
})
export default Sea
