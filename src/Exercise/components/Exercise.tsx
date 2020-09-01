// import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
// import { Switch, Route, Link } from "react-router-dom";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { Canvas, useFrame, useLoader, useThree, extend, ReactThreeFiber } from 'react-three-fiber';
// import { Camera, PerspectiveCamera, MathUtils, SkeletonHelper, AnimationMixer } from 'three';
// import { Slider } from '@material-ui/core';
// import { Col, Row } from 'react-bootstrap';
// import {
//     faPlay
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// extend({ OrbitControls });

// declare global {
//     namespace JSX {
//         interface IntrinsicElements {
//             orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
//         }
//     }
// }

// function lerp(v0: any, v1: any, t: any) {
//     return v0 * (1 - t) + v1 * t
// }

// function Loading() {
//     return (
//         <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
//             <sphereGeometry attach="geometry" args={[1, 16, 16]} />
//             <meshStandardMaterial
//                 attach="material"
//                 color="white"
//                 transparent
//                 opacity={0.6}
//                 roughness={1}
//                 metalness={0}
//             />
//         </mesh>
//     );
// }


// const CameraControls = () => {
//     // Get a reference to the Three.js Camera, and the canvas html element.
//     // We need these to setup the OrbitControls component.
//     // https://threejs.org/docs/#examples/en/controls/OrbitControls
//     const {
//         camera,
//         gl: { domElement },
//     } = useThree();
//     // Ref to the controls, so that we can update them on every frame using useFrame
//     const controls = useRef();



//     useFrame((state) => {
//         return ((controls.current as any).update())
//     })
//     return <orbitControls ref={controls} args={[camera, domElement]} />;
// };

// function moveJoint(joint: any) {
//     let degrees = { x: Math.random() * 500, y: Math.random() * 500 }
//     joint.rotation.xD = lerp(joint.rotation.xD || 0, degrees.y, 0.1)
//     joint.rotation.yD = lerp(joint.rotation.yD || 0, degrees.x, 0.1)
//     joint.rotation.x = MathUtils.degToRad(joint.rotation.xD)
//     joint.rotation.y = MathUtils.degToRad(joint.rotation.yD)
//     //console.log(joint.rotation)
// }



// function Body(props: any) {

//     const {
//         scene,
//     } = useThree();

//     //const loaded = useLoader(GLTFLoader, "/objects/BodyRigged.glb");
//     const loaded = useLoader(GLTFLoader, "/objects/stacy.glb");

//     console.log(loaded)

//     const group = useRef()
//     const bodyRef = useRef()
//     const forearmRef = useRef()

//     const actions = useRef() as any
//     const [mixer] = useState(() => new AnimationMixer((loaded as any).nodes)) 

//     useFrame((state, delta) => mixer.update(delta))

//     useEffect(() => {
//         actions.current = { idle: mixer.clipAction((loaded as any).animations[8], group.current) }
//         actions.current.idle.play()
//         return () => (loaded as any).animations.forEach((clip : any) => mixer.uncacheClip(clip))
//     }, [])

//     useFrame((state, delta) => {
//         mixer.update(delta)
//         //console.log((bodyRef.current as any))
//         //console.log((bodyRef.current as any).skeleton.bones[4].rotation._x)
//         //return ((bodyRef.current as any).skeleton.bones[4].rotation._x += 0.1)
//        // moveJoint((bodyRef.current as any).skeleton.bones[32])
//        // console.log((bodyRef.current as any).skeleton.bones[32].rotation)
//         //console.log((loaded as any).nodes.Arm.rotation)
//         //console.log((bodyRef.current as any).skeleton.bones[4].rotation)
//     })

//     return (
//         <group ref={group} {...props} dispose={null} >
//             <primitive object={(loaded as any).nodes.mixamorigHips} />
//             <skinnedMesh {...props}
//                 //ref={bodyRef}
//                 //visible
//                 geometry={(loaded as any).nodes.stacy.geometry}
//                 skeleton={(loaded as any).nodes.stacy.skeleton}
//                 //scale={[0.2, 0.2, 0.2]}
//                 scale={[10, 10, 10]}
//                 position={[0, -10, 0]}
//             >
//                 <meshStandardMaterial
//                     attach="material"
//                     color="#F9A825"
//                     roughness={0.9}
//                     metalness={0.2}
//                 />
//             </skinnedMesh>
//         </group>
//     );
// }


// function Exercise() {

//     const [time, setTime] = useState<number>(0)
//     const [arm, setArm] = useState<number>(0.0)
//     const [forearm, setForearm] = useState<number>(0.0)
//     const [play, setPlay] = useState<boolean>(false)

//     return (
//         <>
//             <div className="h-100 w-100">
//                 <Row style={{ height: "95%" }}>
//                     <Col xs={9}>
//                         <Canvas camera={{ fov: 75, position: [0, 0, 20], rotation: [0, 0, 0] }}>
//                             <CameraControls />
//                             <ambientLight />
//                             <pointLight position={[10, 10, 10]} />
//                             <Suspense fallback={<Loading />}>
//                                 {/* <Body position={[4, -15, 0]} armProps={{ rotation: [0, arm, 0] }} /> */}
//                                 <Body position={[0, 0, 0]} />
//                             </Suspense>
//                         </Canvas>
//                     </Col>
//                     <Col xs={3}>
//                         Arm
//                         <Slider
//                             defaultValue={0}
//                             valueLabelDisplay="off"
//                             value={arm}
//                             onChange={(event: any, newValue: number | number[]) => {
//                                 setArm(newValue as number);
//                             }}
//                             step={0.1}
//                             min={0}
//                             max={Math.PI * 2}
//                             className={"w-100"}
//                         />
//                         <br />
//                         Forearm
//                         <Slider
//                             defaultValue={0}
//                             valueLabelDisplay="off"
//                             value={forearm}
//                             onChange={(event: any, newValue: number | number[]) => {
//                                 //setForearm(newValue as number);
//                             }}
//                             step={0.1}
//                             min={0}
//                             max={Math.PI * 2}
//                             className={"w-100"}
//                         />
//                     </Col>
//                 </Row>
//                 <Row style={{ height: "5%" }}>
//                     <Col xs={12}>
//                         <FontAwesomeIcon icon={faPlay} style={{ width: "10%" }} color={"#F9A825"} onClick={() => (setPlay(!play))} />
//                         <Slider

//                             valueLabelDisplay="off"
//                             value={time}
//                             onChange={(event: any, newValue: number | number[]) => {
//                                 //setTime(newValue as number);
//                             }}
//                             step={1}
//                             min={-1}
//                             max={300}
//                             style={{ width: "90%" }}
//                         />
//                     </Col>
//                 </Row>
//             </div >
//         </>
//     );
// }

// export default Exercise;



// Auto-generated by https://github.com/react-spring/gltfjsx

import * as THREE from "three"
import React, { useEffect, useRef, useState, Suspense, useMemo } from "react"
import { useLoader, useFrame, Canvas, useThree, extend, ReactThreeFiber } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Row, Col } from "react-bootstrap"
import { Slider } from "@material-ui/core";

extend({ OrbitControls });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
        }
    }
}


function lerp(v0: any, v1: any, t: any) {
    return v0 * (1 - t) + v1 * t
}


const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();



    useFrame((state) => {
        //console.log(camera.position)
        //console.log(camera.rotation)
        return ((controls.current as any).update())
    })
    return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function moveJoint(amount: number, joint: any, degreeLimit = 40) {
    //let degrees = { x: Math.random() * 360, y: Math.random() * 360 }
    let degrees = { x: amount, y: amount, z: amount }
    joint.rotation.xD = lerp(joint.rotation.xD || 0, degrees.y, 0.1)
    joint.rotation.yD = lerp(joint.rotation.yD || 0, degrees.x, 0.1)
    joint.rotation.x = THREE.MathUtils.degToRad(joint.rotation.xD)
    joint.rotation.y = THREE.MathUtils.degToRad(joint.rotation.yD)
}

function Model({ ...props }) {
    console.log("> MODEL RENDER")
    const group = useRef()
    const loaded = useLoader(GLTFLoader, "/objects/BodyRigged.glb")
    console.log(loaded)

    const [bones, skeleton] = useMemo(() => {
        if (!(loaded as any).bones) (loaded as any).bones = loaded.scene.children[0].children[0];
        if (!(loaded as any).skeleton)
        (loaded as any).skeleton = (loaded.scene.children[0].children[1] as any).skeleton;
        console.log("LOADER FINALIZED")

        return [(loaded as any).bones, (loaded as any).skeleton];
    }, [loaded]);



    const nodes = (loaded as any).nodes
    //const animations = (loaded as any).animations
    //const texture = useLoader(THREE.TextureLoader, "/objects/stacy.jpg")

    //const actions = useRef()
    //const [mixer] = useState(() => new THREE.AnimationMixer(nodes["Stacy"]))
    //useFrame((state, delta) => mixer.update(delta))
    useEffect(() => {
        //(actions as any).current = { idle: mixer.clipAction(animations[8], group.current) } as any
        //(actions as any).current.idle.play()
        //return () => animations.forEach((clip: any) => mixer.uncacheClip(clip))
    }, [])

    let angle = 0

    useFrame((state, delta) => {
        //mixer.update(delta)
        angle++
        moveJoint(props.arm, nodes.Arm0)
        //moveJoint(angle, nodes.Arm1)
        //moveJoint(nodes.mixamorigNeck)
        //moveJoint(nodes.mixamorigSpine)
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
                <primitive object={bones} />
                <skinnedMesh geometry={nodes["Body_low"].geometry} skeleton={nodes["Body_low"].skeleton}>
                    <meshPhongMaterial attach="material" color="#b3720a" skinning />
                    {/* <meshPhongMaterial attach="material" map={texture} map-flipY={false} skinning /> */}
                </skinnedMesh>
            </group>
        </group>
    )
}



function Exercise() {

    //const arm = useRef(0)
    const [arm, setArm] = useState(0)

    console.log("> EXERCISE RENDER")

    // useEffect(() => {
    //     setInterval(() => {
    //         arm.current += 0.1
    //         console.log(arm.current)
    //     }, 40)
    // }, [])


    return (
        <>
            <div className="h-100 w-100">
                <Row style={{ height: "95%" }}>
                    <Col xs={9}>
                        <Canvas
                            camera={{ fov: 50, position: [0.0, 2.0, 15.0], rotation: [0, 0, 0] }}
                        >
                            <CameraControls />
                            <ambientLight />
                            <pointLight position={[20, 20, 20]} />
                            <Suspense fallback={null}>
                                {/* <Body position={[4, -15, 0]} armProps={{ rotation: [0, arm, 0] }} /> */}
                                <Model position={[1.5, 0, 0]} arm={arm} />
                            </Suspense>
                        </Canvas>
                    </Col>
                    <Col xs={3}>
                        Arm
                         <Slider
                            defaultValue={0}
                            valueLabelDisplay="off"
                            value={arm}

                            onChange={(event: any, newValue: number | number[]) => {
                                setArm(newValue as number)
                            }}
                            step={1}
                            min={0}
                            max={180}
                            className={"w-100"}
                        />
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default Exercise;



                // function Arm(props: any) {
                //     const scene = useLoader(GLTFLoader, "/objects/splitarm.glb");

                //     const armRef = useRef()
                //     const forearmRef = useRef()
                //     useFrame(() => {
                //         //console.log((mesh.current as any).rotation.y)
                //         //return ((mesh.current as any).rotation.y += 0.01)
                //     })

                //     const location = props.position.map((value: any, index: any) => {
                //         if (index === 0)
                //             return value + (scene as any).nodes.Arm.children[0].position.x * 0.2
                //         if (index === 1)
                //             return value + (scene as any).nodes.Arm.children[0].position.y * 0.2
                //         if (index === 2)
                //             return value + (scene as any).nodes.Arm.children[0].position.z * 0.2

                //     })

                //     return (
                //         <group>
                //             <mesh {...props}
                //                 ref={armRef}
                //                 visible
                //                 geometry={(scene as any).nodes.Arm.geometry}
                //                 scale={[0.2, 0.2, 0.2]}
                //             >
                //                 <meshStandardMaterial
                //                     attach="material"
                //                     color="#F9A825"
                //                     roughness={0.9}
                //                     metalness={0.2}
                //                 />
                //                 <mesh
                //                     {...props.forearm}
                //                     ref={forearmRef}
                //                     visible
                //                     geometry={(scene as any).nodes.Arm.children[0].geometry}
                //                     position={[(scene as any).nodes.Arm.children[0].position.x, (scene as any).nodes.Arm.children[0].position.y, (scene as any).nodes.Arm.children[0].position.z]}
                //                 >
                //                     <meshStandardMaterial
                //                         attach="material"
                //                         color="#F9A825"
                //                         roughness={0.9}
                //                         metalness={0.2}
                //                     />
                //                 </mesh>
                //             </mesh>
                //         </group>
                //     );
                // }



