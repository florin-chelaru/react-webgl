import React, { useRef } from 'react'
import Airplane from './Airplane'
import { useFrame } from '@react-three/fiber'
import type THREE from 'three'
import Sea from './Sea'
import Sky from './Sky'

function normalize(v: number, vmin: number, vmax: number, tmin: number, tmax: number) {
  const nv = Math.max(Math.min(v, vmax), vmin)
  const dv = vmax - vmin
  const pc = (nv - vmin) / dv
  const dt = tmax - tmin
  return tmin + pc * dt
}

export default function World() {
  const airplaneRef = useRef<THREE.Mesh>(null)
  const seaRef = useRef<THREE.Mesh>(null)
  const skyRef = useRef<THREE.Mesh>(null)

  useFrame((state, _delta) => {
    // update the airplane's position
    if (airplaneRef.current) {
      // let's move the airplane between -100 and 100 on the horizontal axis,
      // and between 25 and 175 on the vertical axis,
      // depending on the mouse position which ranges between -1 and 1 on both axes;
      // to achieve that we use a normalize function (see below)
      // const targetX = normalize(state.mouse.x, -0.75, 0.75, -100, 100)
      const targetY = normalize(state.mouse.y, -0.75, 0.75, 25, 175)

      // Move the plane at each frame by adding a fraction of the remaining distance
      airplaneRef.current.position.y += (targetY - airplaneRef.current.position.y) * 0.05

      // Rotate the plane proportionally to the remaining distance
      airplaneRef.current.rotation.z = (targetY - airplaneRef.current.position.y) * 0.0128
      airplaneRef.current.rotation.x = (airplaneRef.current.position.y - targetY) * 0.0064
    }

    if (seaRef.current) {
      seaRef.current.rotation.z += 0.0015
    }
    if (skyRef.current) {
      skyRef.current.rotation.z += 0.005
    }

    const camera = state.camera as THREE.PerspectiveCamera
    camera.fov = normalize(state.mouse.x, -1, 1, 40, 80)
    camera.updateProjectionMatrix()
  })

  return (
    <>
      <Airplane ref={airplaneRef} position={[0, 100, 0]} scale={[0.25, 0.25, 0.25]} />
      <Sea ref={seaRef} position-y={-600} position-z={-300} />
      <Sky ref={skyRef} position-y={-600} />
      {/*<OrbitControls />*/}
    </>
  )
}
