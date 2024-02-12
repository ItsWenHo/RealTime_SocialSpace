import * as THREE from "three";
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//creating text loader
// const loader = new THREE.FontLoader();

// loader.load('/Users/wendy/Documents/RealTime_SocialSpace/Week3/font/Rustic Shine_Regular.json', function (font: THREE.Font) {
//   const geometry = new THREE.TextGeometry('BARBER SHOP', {
//     font: font,
//     size: 6,
//     hright: 2,
//   })

//   const textMesh = new THREE.Mesh(geometry, [
//     new THREE.MeshPhongMaterial({ color: 0xffffff })
//   ])

//   textMesh.castShadow = true
//   textMesh.position(0.5, 1.35, 3);
//   scene.add(textMesh)
// });

// Create a scene container in which all other objects will exist
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3a3439);

// Create a camera and position it in space
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 8;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create controls
// const loader = new GLTFLoader();
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enabled = true;

// controls.target = mainBuilding.position;

// Create main structure
const mainStructure = new THREE.BoxGeometry(6, 4, 6);
const pebbleBaige = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mainBuilding = new THREE.Mesh(mainStructure, pebbleBaige);
scene.add(mainBuilding);

// Create roof
const rooftTop1RedD = new THREE.BoxGeometry(6.5, 0.3, 5.5);
const brightRed = new THREE.MeshBasicMaterial({ color: 0x890202 });
const rooftTop1BrightRed = new THREE.Mesh(rooftTop1RedD, brightRed);
rooftTop1BrightRed.position.set(0, 0.6, 0.5);
scene.add(rooftTop1BrightRed);

const rooftTop2RedD = new THREE.BoxGeometry(6.5, 0.3, 5.5);
const rooftTop2BrightRed = new THREE.Mesh(rooftTop2RedD, brightRed);
rooftTop2BrightRed.position.set(0, 2, 0.5);
scene.add(rooftTop2BrightRed);

//Sign 
const sign = new THREE.BoxGeometry(6.5, 1.2, 0.1);
const sighBlue = new THREE.MeshBasicMaterial({ color: 0x00084D });
const signBacking = new THREE.Mesh(sign, sighBlue);
signBacking.position.set(0, 1.35, 3);
scene.add(signBacking);

//door
const door = new THREE.BoxGeometry(1.5, 2, 0.1);
const doorTexture = new THREE.MeshBasicMaterial({ color: 0x887E77 });
const frontDoor = new THREE.Mesh(door, doorTexture);
frontDoor.position.set(0.5, -1, 3);
scene.add(frontDoor);

//window
const window = new THREE.BoxGeometry(1.5, 2, 0.1);
const windowTexture = new THREE.MeshBasicMaterial({ color: 0x778188 });
const frontWindow = new THREE.Mesh(window, windowTexture);
frontWindow.position.set(1, -1, 3);
scene.add(frontWindow);



// function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   renderer.render(scene, camera);
// }

// animate();
renderer.render(scene, camera);