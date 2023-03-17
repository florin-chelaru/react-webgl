import React, {
  createRef,
  type MutableRefObject,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { type MeshProps, useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import Bonus, { type BonusHandler } from './Bonus'
import { GAME_SETTINGS } from '../GameSettings'

interface BonusHolderProps extends MeshProps {}

export interface BonusHolderHandle {
  spawnBonuses: () => void
  checkAirplaneCollision: (position: THREE.Vector3) => void
}

interface BonusData {
  element: JSX.Element
  ref: MutableRefObject<BonusHandler | null>
}

const BonusHolder = React.forwardRef<BonusHolderHandle, BonusHolderProps>((props, ref) => {
  // const [changedSwitch, setChangedSwitch] = useState<number>(0)
  // const bonuses = useRef<BonusData[]>([])
  const [bonuses, setBonuses] = useState<BonusData[]>([])
  // const bonusPool = useRef<BonusData[]>([])
  const lastCleanup = useRef(0)
  const nextKey = useRef(0)

  useImperativeHandle(ref, () => ({
    spawnBonuses() {
      // console.log(
      //   `spawning bonuses. current bonuses: ${bonuses.current.length}; bonuses pool: ${bonusPool.current.length}`
      // )

      if (bonuses.length >= 30) {
        return
      }

      const copy = [...bonuses]

      const newBonusCount = 1 + Math.floor(Math.random() * 10)

      // amplitude of sinusoid position of the bonuses
      const amplitude = 10 + Math.round(Math.random() * 10)

      // height from ground
      const d =
        GAME_SETTINGS.seaRadius +
        GAME_SETTINGS.planeDefaultHeight +
        (-1 + Math.random() * 2) * (GAME_SETTINGS.planeAmpHeight - 20)

      for (let i = 0; i < newBonusCount; ++i) {
        const angle = -i * 0.02
        const distance = d + Math.cos(i * 0.5) * amplitude
        const x = -GAME_SETTINGS.seaRadius + Math.sin(angle) * distance
        const y = Math.cos(angle) * distance

        const bonusRef = createRef<BonusHandler>()
        const bonus = {
          element: (
            <Bonus
              initialAngle={angle}
              initialDistance={distance}
              position-x={x}
              position-y={y}
              ref={bonusRef}
              key={`bonus-${nextKey.current++}`}
            />
          ),
          ref: bonusRef
        }

        copy.push(bonus)
      }

      setBonuses(copy)
      console.log(`spawned bonuses: ${copy.length}`)
    },
    checkAirplaneCollision(position: THREE.Vector3) {
      // console.log('checking collisions')
      const keep = []
      for (let i = 0; i < bonuses.length; ++i) {
        const bonus = bonuses[i]
        if (!bonus.ref.current?.mesh) {
          continue
        }

        const diffPos = position.clone().sub(bonus.ref.current.mesh.position.clone())
        const d = diffPos.length()
        if (d < GAME_SETTINGS.bonusDistanceTolerance) {
          // console.log(`collision: d=${d}`)
          // bonusPool.current.push(bonuses.current.splice(i, 1)[0])
          // changed = true
          // particlesHolder.spawnParticles(coin.mesh.position.clone(), 5, 0x009999, 0.8)
          // addEnergy()
          // --i
        } else {
          keep.push(bonus)
        }
      }

      if (keep.length < bonuses.length) {
        setBonuses(keep)
      }
    }
  }))

  useFrame((state, _delta) => {
    if (Math.floor(state.clock.elapsedTime - lastCleanup.current) < 2) {
      // only check once every 2s
      return
    }
    const keep = []
    lastCleanup.current = state.clock.elapsedTime
    for (let i = 0; i < bonuses.length; ++i) {
      const bonus = bonuses[i]
      if (!bonus.ref.current?.mesh) {
        continue
      }

      if (bonus.ref.current.angle <= Math.PI) {
        keep.push(bonus)
      }
    }
    console.log('cleaned up some bonuses')
    if (keep.length < bonuses.length) {
      setBonuses(keep)
    }
  })

  console.log(`rendering ${bonuses.length} bonuses`)
  return (
    <mesh {...props} receiveShadow={true} castShadow={true}>
      {bonuses.map((bonus) => bonus.element)}
    </mesh>
  )
})

export default BonusHolder
