import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Canvas, useFrame, useLoader } from 'react-three-fiber';


// function Box(props: any) {
//     // This reference will give us direct access to the mesh
//     const mesh = useRef()

//     // Set up state for the hovered and active state
//     const [hovered, setHover] = useState(false)
//     const [active, setActive] = useState(false)

//     // Rotate mesh every frame, this is outside of React without overhead
//     useFrame(() => ((mesh.current as any).rotation.x = (mesh.current as any).rotation.y += 0.01))

//     return (
//         <mesh
//             {...props}
//             ref={mesh}
//             scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
//             onClick={(e) => setActive(!active)}
//             onPointerOver={(e) => setHover(true)}
//             onPointerOut={(e) => setHover(false)}>
//             <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//             <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
//         </mesh>
//     )
// }

function Loading() {
    return (
        <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[1, 16, 16]} />
            <meshStandardMaterial
                attach="material"
                color="white"
                transparent
                opacity={0.6}
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
}


function Arm(props: any) {
    const scene = useLoader(GLTFLoader, "/objects/arm.glb");

    console.log(scene)
    const mesh = useRef()
    useFrame(() => ((mesh.current as any).rotation.y += 0.01))
    return (
        <group>
            <mesh {...props}
                ref={mesh}
                visible
                geometry={(scene as any).nodes.Default.geometry}
                scale={[0.2, 0.2, 0.2]}
            >
                <meshStandardMaterial
                    attach="material"
                    color="#F9A825"
                    roughness={0.9}
                    metalness={0.2}
                />
            </mesh>
        </group>
    );
}

function UI(props: any) {
    return (
        <group>
            <mesh {...props}
                visible
                scale={[11, 0.2, 0.1]}
            >
                <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial
                    attach="material"
                    color="#6c63ff"
                    roughness={1}
                    metalness={0}
                />
            </mesh>
        </group>
    );
}

function Exercise() {


    return (
        <div className="h-100 w-100">
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={<Loading />}>

                    <Arm position={[0, -1.5, 0]} />
                    <UI position={[0, -3.5, 0]} />
                </Suspense>
                {/* <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} /> */}
            </Canvas>
        </div >
    );
}

export default Exercise;
