import * as THREE from 'three'

export function getVertices(geometry: THREE.BufferGeometry): THREE.Vector3[] {
  // Idea from: https://stackoverflow.com/questions/69720682/vertices-does-not-exist-on-type-buffergeometry-in-threejs
  const position = geometry.getAttribute('position') as THREE.BufferAttribute

  return Array.from({ length: position.count }, (_, i) => {
    const v = new THREE.Vector3().fromBufferAttribute(position, i)
    console.log(v.toArray())
    return v
  })
}

export function updateVertices(geometry: THREE.BufferGeometry, vertices: THREE.Vector3[]) {
  // Idea from: https://stackoverflow.com/questions/69720682/vertices-does-not-exist-on-type-buffergeometry-in-threejs
  const position = geometry.getAttribute('position') as THREE.BufferAttribute
  vertices.forEach((v, i) => position.setXYZ(i, v.x, v.y, v.z))
  position.needsUpdate = true
}

const BOX_EQUIVALENT_INDICES = new Map<number, number[]>([
  [0, [0, 11, 17]],
  [11, [0, 11, 17]],
  [17, [0, 11, 17]],

  [1, [1, 9, 20]],
  [9, [1, 9, 20]],
  [20, [1, 9, 20]],

  [2, [2, 13, 19]],
  [13, [2, 13, 19]],
  [19, [2, 13, 19]],

  [3, [3, 15, 22]],
  [15, [3, 15, 22]],
  [22, [3, 15, 22]],

  [4, [4, 8, 21]],
  [8, [4, 8, 21]],
  [21, [4, 8, 21]],

  [5, [5, 10, 16]],
  [10, [5, 10, 16]],
  [16, [5, 10, 16]],

  [6, [6, 14, 23]],
  [14, [6, 14, 23]],
  [23, [6, 14, 23]],

  [7, [7, 12, 18]],
  [12, [7, 12, 18]],
  [18, [7, 12, 18]]
])

/**
 * Offsets the value of the vertex corresponding to the given index by the given coordinates.
 * @param geometry
 * @param i
 * @param offset
 */
export function offsetVertex(
  geometry: THREE.BoxGeometry,
  i: number,
  offset: THREE.Vector3 | [x: number, y: number, z: number]
) {
  const position = geometry.getAttribute('position') as THREE.BufferAttribute
  if (Array.isArray(offset)) {
    offset = new THREE.Vector3(offset[0], offset[1], offset[2])
  }

  const equivalentIndices = BOX_EQUIVALENT_INDICES.get(i)
  if (equivalentIndices) {
    const x = position.getX(i) + offset.x
    const y = position.getY(i) + offset.y
    const z = position.getZ(i) + offset.z
    equivalentIndices.forEach((index) => position.setXYZ(index, x, y, z))
    position.needsUpdate = true
  }
}
