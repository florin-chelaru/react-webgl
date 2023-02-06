import * as THREE from 'three'

export function getVertices(geometry: THREE.BufferGeometry): THREE.Vector3[] {
  // Idea from: https://stackoverflow.com/questions/69720682/vertices-does-not-exist-on-type-buffergeometry-in-threejs
  const position = geometry.getAttribute('position') as THREE.BufferAttribute

  console.log(`before: ${JSON.stringify(position.array)}`)

  return Array.from({ length: position.count }, (_, i) => {
    const v = new THREE.Vector3().fromBufferAttribute(position, i)
    console.log(v.toArray())
    return v
  })
}

export function updateVertices(geometry: THREE.BufferGeometry, vertices: THREE.Vector3[]) {
  // Idea from: https://stackoverflow.com/questions/69720682/vertices-does-not-exist-on-type-buffergeometry-in-threejs
  const position = geometry.getAttribute('position') as THREE.BufferAttribute
  vertices.forEach((v, i) => {
    console.log(v.toArray())
    position.setXYZ(i, v.x, v.y, v.z)
  })
  console.log(`after: ${JSON.stringify(position.array)}`)
  console.log(position.array.length)
  position.needsUpdate = true
}
