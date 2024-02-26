import * as THREE from "three";

// Create a scene container in which all other objects will exist
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x3a3439);

// Create a camera and position it in space
let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 9; // place the camera in space

// The renderer will actually show the camera view within our <canvas>
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create main structure
const mainStructure = new THREE.BoxGeometry(6, 4, 5);
const pebbleBeige = new THREE.MeshBasicMaterial({ color: 0xD6C6AF });
const mainBuilding = new THREE.Mesh(mainStructure, pebbleBeige);
scene.add(mainBuilding);

// Create roof
const roofTop1RedD = new THREE.BoxGeometry(6.5, 0.3, 5.5);
const brightRed = new THREE.MeshBasicMaterial({ color: 0x890202 });
const roofTop1BrightRed = new THREE.Mesh(roofTop1RedD, brightRed);
roofTop1BrightRed.position.set(0, 0.6, 0);
scene.add(roofTop1BrightRed);

const roofTop2RedD = new THREE.BoxGeometry(6.5, 0.3, 5.5);
const roofTop2BrightRed = new THREE.Mesh(roofTop2RedD, brightRed);
roofTop2BrightRed.position.set(0, 2, 0);
scene.add(roofTop2BrightRed);

// Sign 
let textureLoader = new THREE.TextureLoader();
let signTexture = textureLoader.load('./assets/BarberShop.png');

console.log(signTexture);

const signGeometry = new THREE.BoxGeometry(6, 1, 0.1);
const signMaterial = new THREE.MeshPhongMaterial({ map: signTexture });
const signBacking = new THREE.Mesh(signGeometry, signMaterial);
signBacking.position.set(0, 1.3, 2.55);
scene.add(signBacking);

// Door
const doorGeometry = new THREE.BoxGeometry(1.2, 2, 0.1);
const doorTexture = new THREE.MeshBasicMaterial({ color: 0x887E77 });
const frontDoor = new THREE.Mesh(doorGeometry, doorTexture);
frontDoor.position.set(0.5, -1, 2.5);
scene.add(frontDoor);

// Window
const windowGeometry = new THREE.BoxGeometry(2, 1.5, 0.1);
const windowTexture = new THREE.MeshBasicMaterial({ color: 0x887E77 });
const frontWindow = new THREE.Mesh(windowGeometry, windowTexture);
frontWindow.position.set(-1.75, -0.75, 2.5);
scene.add(frontWindow);

// Poster
const posterTexture = new THREE.TextureLoader().load('./assets/SalonPoster.png');
const posterGeometry = new THREE.BoxGeometry(1, 1.25, 0.1);
const posterMaterial = new THREE.MeshPhongMaterial({ map: posterTexture });
const frontPoster = new THREE.Mesh(posterGeometry, posterMaterial);
frontPoster.position.set(2, -0.75, 2.5);
frontPoster.rotation.z = -0.25; // Set rotation correctly
scene.add(frontPoster);

// Barber pole
const rolling = new THREE.TextureLoader().load('./assets/poleTexture.png');
const geometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 32);
const material = new THREE.MeshPhongMaterial({ map: rolling });
const cylinder = new THREE.Mesh(geometry, material);
cylinder.position.set(-3.25, 1.3, 2.5);
scene.add(cylinder);

const geometry2 = new THREE.CylinderGeometry(0.15, 0.15, 1, 32);
const cylinder2 = new THREE.Mesh(geometry2, material);
cylinder2.position.set(3.25, -0.5, 2.5);
scene.add(cylinder2);

const geometry3 = new THREE.CylinderGeometry(0.15, 0.15, 1, 32);
const cylinder3 = new THREE.Mesh(geometry3, material);
cylinder3.position.set(-0.45, -0.5, 2.5);
scene.add(cylinder3);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

directionalLight.receiveShadow = true;
directionalLight.castShadow = true;

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

ambientLight.receiveShadow = true;
ambientLight.castShadow = true;

let theta = 0; // Initial angle
let frameCount = 0;

// // Function to animate objects
// function animate() {
//   requestAnimationFrame(animate);
//   // Update the camera position
//   theta += 0.001;
//   const radius = 9;
//   const x = radius * Math.cos(theta);
//   const z = radius * Math.sin(theta);
//   camera.position.set(x, 0, z);

//   camera.lookAt(scene.position);
//   renderer.render(scene, camera);
// }



function animation() {
  frameCount = frameCount + 1;
  cylinder3.rotation.y = frameCount / 50;
  cylinder2.rotation.y = frameCount / 50;
  cylinder.rotation.y = frameCount / 50;

  theta += 0.001;
  const radius = 9;
  const x = radius * Math.cos(theta);
  const z = radius * Math.sin(theta);
  camera.position.set(x, 0, z);

  camera.lookAt(scene.position);
  renderer.render(scene, camera);

  window.requestAnimationFrame(animation);
}

animation();
renderer.render(scene, camera);