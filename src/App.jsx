import React, { useRef, useState } from 'react'
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Planet(props) {
  const meshRef = useRef()
  useFrame((state, delta) => (meshRef.current.rotation.y += delta))
  const colorMap = useLoader(TextureLoader, 'public/texture.jpg')

  return (
    <mesh
      {...props}
      ref={meshRef}
      >
      <sphereGeometry args={[1, 128, 64]}/>
      <meshStandardMaterial map={colorMap}/>
    </mesh>
  )
}

export default function App() {
  return <Canvas
  camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
  >
    <ambientLight intensity={Math.PI / 2}/>
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
    <Planet/>
  </Canvas>
}
