import React, { useRef, useState } from 'react'
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Planet({rozmiar}) {
  const meshRef = useRef()
  useFrame((state, delta) => (meshRef.current.rotation.y += delta))
  const colorMap = useLoader(TextureLoader, 'public/texture.jpg')

  return (
    <mesh
      ref={meshRef}
      scale={rozmiar}
      >
      <sphereGeometry args={[1, 128, 64]}/>
      <meshStandardMaterial map={colorMap}/>
    </mesh>
  )
}

function PlanetCanvas({rozmiar}) {
  const bg = useLoader(TextureLoader, 'public/star_bg.jpg')
  return (
    <Canvas scene={{'background': bg, 'backgroundIntensity':0.2}}>
      <ambientLight intensity={Math.PI / 8}/>
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
      <Planet rozmiar={rozmiar}/>
    </Canvas>
  )
}

export default function App() {
  const [rozmiar, setRozmiar] = useState(1)
  return <div className="flex flex-row h-full">
    <PlanetCanvas rozmiar={rozmiar}/>
    <div className="flex flex-col p-4 bg-gray-600 w-1/4 items-center">
      <p className='text-white text-2xl mb-2'>Suwaki</p>
      <label className='text-white'>Rozmiar</label>
      <input type='range' min='0.5' max='3' step='0.001' value={rozmiar}
      onChange={(e)=>setRozmiar(e.target.value)}/>
      <p className='text-white'>{rozmiar}</p>
    </div>
  </div>

}
