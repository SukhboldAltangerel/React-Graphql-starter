import { useRef, useState } from 'react'
import styles from './three.module.css'
import { Canvas, useFrame } from '@react-three/fiber'

export default function Three() {
   return (
      <div className="">
         Three
         <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
         </Canvas>
      </div>
   )
}

function Box({ ...props }) {
   const mesh = useRef()
   const [hovered, setHovered] = useState(false)
   const [active, setActive] = useState(false)
   useFrame((state, delta) => mesh.current.rotation.x += 0.01)

   return (
      <mesh
         {...props}
         ref={mesh}
         scale={active ? 1.5 : 1}
         onClick={() => setActive(!active)}
         onPointerOver={() => setHovered(true)}
         onPointerOut={() => setHovered(false)}
      >
         <boxGeometry args={[1, 1, 1]} />
         <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
   )
}
