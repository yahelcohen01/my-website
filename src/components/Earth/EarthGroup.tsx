import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import earthMapImg from "../../assets/textures/00_earthmap1k.jpg";
import specMapImg from "../../assets/textures/02_earthspec1k.jpg";
import bumpMapImg from "../../assets/textures/01_earthbump1k.jpg";
import blueImg from "../../assets/blue.jpg";
import cloudMapImg from "../../assets/textures/04_earthcloudmap.jpg";
import cloudAlphaMapImg from "../../assets/textures/05_earthcloudmaptrans.jpg";
import { getFresnelMat } from "../../functions/getFresnelMat";

interface EarthGroupProps {
  scrollPosY: number;
}

export function EarthGroup({ scrollPosY }: EarthGroupProps) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const cloudsMeshRef = useRef<THREE.Mesh>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);

  const [goalPos, setGoalPos] = useState(0);

  // Loading all textures in an array using useLoader with TextureLoader
  const loader = useLoader(THREE.TextureLoader, [
    earthMapImg,
    specMapImg,
    bumpMapImg,
    blueImg,
    cloudMapImg,
    cloudAlphaMapImg,
  ]);

  const earthMap = loader[0];
  const specMap = loader[1];
  const bumpMap = loader[2];
  const matcap = loader[3];
  const cloudMap = loader[4];
  const cloudAlphaMap = loader[5];

  const geometry = new THREE.IcosahedronGeometry(1, 12);
  const material = new THREE.MeshPhongMaterial({
    map: earthMap,
    specularMap: specMap,
    bumpMap: bumpMap,
    bumpScale: 0.04,
    // @ts-ignore
    matcap: matcap,
  });

  const cloudsMat = new THREE.MeshStandardMaterial({
    map: cloudMap,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    alphaMap: cloudAlphaMap,
  });

  const fresnelMat = getFresnelMat();

  useFrame(() => {
    const rate = 0.1;
    setGoalPos(Math.PI * scrollPosY);

    if (cloudsMeshRef.current && glowMeshRef.current) {
      cloudsMeshRef.current.rotation.y += 0.001;
      glowMeshRef.current.rotation.y += 0.002;
    }
    if (earthMeshRef.current) {
      earthMeshRef.current.rotation.y -=
        (earthMeshRef.current.rotation.y - goalPos * 1.0) * rate;
    }
  });

  return (
    <group ref={earthGroupRef} rotation={[(-23.4 * Math.PI) / 180, -0.8, -0.5]}>
      <mesh ref={earthMeshRef} geometry={geometry} material={material} />
      <mesh
        ref={cloudsMeshRef}
        geometry={geometry}
        material={cloudsMat}
        scale={[1.003, 1.003, 1.003]}
      />
      <mesh
        ref={glowMeshRef}
        geometry={geometry}
        material={fresnelMat}
        scale={[1.01, 1.01, 1.01]}
      />
    </group>
  );
}
