import * as THREE from "three";
import { OBJLoader } from "jsm/loaders/OBJLoader.js";
import getStarfield from "./libs/getStarfield.js";
import { getFresnelMat } from "./libs/getFresnelMat.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 3;
const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

let scrollPosY = 0;
function initScene() {
  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
  scene.add(earthGroup);
  const detail = 12;
  const loader = new THREE.TextureLoader();
  const geometry = new THREE.IcosahedronGeometry(1, detail);
  const material = new THREE.MeshPhongMaterial({
    map: loader.load("./assets/textures/00_earthmap1k.jpg"),
    specularMap: loader.load("./assets/textures/02_earthspec1k.jpg"),
    bumpMap: loader.load("./assets/textures/01_earthbump1k.jpg"),
    bumpScale: 0.04,
    matcap: loader.load("./assets/blue.jpg"),
  });

  const earthMesh = new THREE.Mesh(geometry, material);
  earthGroup.add(earthMesh);

  // option to add city lights
  // const lightsMat = new THREE.MeshBasicMaterial({
  //   map: loader.load("./assets/textures/03_earthlights1k.jpg"),
  //   blending: THREE.AdditiveBlending,
  // });
  // const lightsMesh = new THREE.Mesh(geometry, lightsMat);
  // earthGroup.add(lightsMesh);

  const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./assets/textures/04_earthcloudmap.jpg"),
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    alphaMap: loader.load("./assets/textures/05_earthcloudmaptrans.jpg"),
  });
  const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
  cloudsMesh.scale.setScalar(1.003);
  earthGroup.add(cloudsMesh);

  const fresnelMat = getFresnelMat();
  const glowMesh = new THREE.Mesh(geometry, fresnelMat);
  glowMesh.scale.setScalar(1.01);
  earthGroup.add(glowMesh);

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
  sunLight.position.set(-2, 0.5, 1.5);
  scene.add(sunLight);

  // Option to add gradient background
  // const gradientBackground = getLayer({
  //   hue: 0.6,
  //   numSprites: 8,
  //   opacity: 0.2,
  //   radius: 10,
  //   size: 24,
  //   z: -10.5,
  // });
  // scene.add(gradientBackground);

  const stars = getStarfield({ numStars: 5000 });
  scene.add(stars);

  let goalPos = 0;
  const rate = 0.1;
  function animate() {
    requestAnimationFrame(animate);
    goalPos = Math.PI * scrollPosY;

    cloudsMesh.rotation.y += 0.001;
    glowMesh.rotation.y += 0.002;
    stars.rotation.y -= 0.0002;

    earthMesh.rotation.y -= (earthMesh.rotation.y - goalPos * 1.0) * rate;

    // option to add city lights
    // lightsMesh.rotation.y -= (lightsMesh.rotation.y - goalPos * 1.0) * rate;
    renderer.render(scene, camera);
  }
  animate();
}
const manager = new THREE.LoadingManager();
const loader = new OBJLoader(manager);
let sceneData = {};
manager.onLoad = () => initScene(sceneData);
loader.load({}, (obj) => {
  let geometry;
  obj.traverse((child) => {
    if (child.type === "Mesh") {
      geometry = child.geometry;
    }
  });
  sceneData.geo = geometry;
});

window.addEventListener("scroll", () => {
  scrollPosY = window.scrollY / document.body.clientHeight;
});

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
