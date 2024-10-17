import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { getStarfield } from "../functions/getStarfield";
import { EarthGroup } from "./Earth/EarthGroup";

interface SceneProps {
  scrollPosY: number;
}

export function Scene({ scrollPosY }: SceneProps) {
  const { scene } = useThree();

  useEffect(() => {
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    const stars = getStarfield({ numStars: 5000 });
    scene.add(stars);
  }, [scene]);

  return <EarthGroup scrollPosY={scrollPosY} />;
}
