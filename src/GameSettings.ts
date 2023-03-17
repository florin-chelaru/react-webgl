export interface GameSettings {
  speed: number
  baseSpeed: number
  targetBaseSpeed: number

  distance: number
  ratioSpeedDistance: number

  planeDefaultHeight: number
  planeAmpHeight: number

  seaRadius: number

  bonusDistanceTolerance: number
  bonusSpeed: number
  bonusLastSpawn: number
  distanceForBonusSpawn: number
}

export const GAME_SETTINGS: GameSettings = {
  speed: 0,
  baseSpeed: 0.00035,
  targetBaseSpeed: 0.00035,

  distance: 0,
  ratioSpeedDistance: 50,

  planeDefaultHeight: 100,
  planeAmpHeight: 80,

  seaRadius: 600,

  bonusDistanceTolerance: 15,
  bonusSpeed: 0.5,
  bonusLastSpawn: 0,
  distanceForBonusSpawn: 50
}
