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
  const tv = tmin + pc * dt
  return tv
}

export default function World() {
  const airplaneRef = useRef<THREE.Mesh>(null)
  const seaRef = useRef<THREE.Mesh>(null)
  const skyRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    // update the airplane's position
    if (airplaneRef.current) {
      // let's move the airplane between -100 and 100 on the horizontal axis,
      // and between 25 and 175 on the vertical axis,
      // depending on the mouse position which ranges between -1 and 1 on both axes;
      // to achieve that we use a normalize function (see below)

      const targetX = normalize(state.mouse.x, -0.75, 0.75, -100, 100)
      const targetY = normalize(state.mouse.y, -0.75, 0.75, 25, 175)
      airplaneRef.current.position.y = targetY
      airplaneRef.current.position.x = targetX
    }

    if (seaRef.current) {
      seaRef.current.rotation.z += 0.001
    }
    if (skyRef.current) {
      skyRef.current.rotation.z += 0.002
    }
  })

  // const scene = useThree((state) => state.scene)
  // scene.fog = new THREE.Fog()

  return (
    <>
      <Airplane ref={airplaneRef} position={[0, 100, 0]} scale={[0.25, 0.25, 0.25]} />
      <Sea ref={seaRef} position-y={-600} />
      <Sky ref={skyRef} position-y={-600} />
      {/*  <OrbitControls />  */}
    </>
  )
}
