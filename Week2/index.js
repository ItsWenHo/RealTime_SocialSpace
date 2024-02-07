// Because this is a module script, we can import code from other modules
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
import * as THREE from "three";

// create a scene container in which all other objects will exist
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x997b66);

// create a camera and position it in space
let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 8; // place the camera in space

// the renderer will actually show the camera view within our <canvas>
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);




// create a sphere
let geometry = new THREE.SphereGeometry(1, 15, 8);
let material = new THREE.MeshBasicMaterial({ color: 0xffcb69 });
let myMesh = new THREE.Mesh(geometry, material);
scene.add(myMesh);
myMesh.position.x = -1;
myMesh.position.y = -2;
myMesh.position.z = 1;

//cube
let geometry2 = new THREE.BoxGeometry(3, 12, 10);
let material2 = new THREE.MeshBasicMaterial({ color: 0xd08c60 });
let cube = new THREE.Mesh(geometry2, material2);
scene.add(cube);
cube.position.x = 4;
cube.position.y = 2;
cube.position.z = 0.5;

let geometry3 = new THREE.BoxGeometry(15, 7.8, 3);
let material3 = new THREE.MeshBasicMaterial({ color: 0xd9ae94 });
let cube1 = new THREE.Mesh(geometry3, material3);
scene.add(cube1);
cube1.position.x = -6;
cube1.position.y = 1.4;
cube1.position.z = -1.8;


let shawdow = new THREE.CircleGeometry(1.3, 40);
let material4 = new THREE.MeshBasicMaterial({ color: 0x7a6352 });
let shawdowSephere = new THREE.Mesh(shawdow, material4);
scene.add(shawdowSephere);
shawdowSephere.rotation.x += 5;
shawdowSephere.position.x = -1;
shawdowSephere.position.y = -2.5;
shawdowSephere.position.z = 1;

//window
let window1 = new THREE.CircleGeometry(3, 40);
let material5 = new THREE.MeshBasicMaterial({ color: 0xc7a189 });
let roundWindow1 = new THREE.Mesh(window1, material5);
scene.add(roundWindow1);
// roundWindow1.rotation.x += 5;
roundWindow1.position.x = -5;
roundWindow1.position.y = 1.5;
roundWindow1.position.z = 0;

let window2 = new THREE.CircleGeometry(2.8, 40);
let material6 = new THREE.MeshBasicMaterial({ color: 0x997b66 });
let roundWindow2 = new THREE.Mesh(window2, material6);
scene.add(roundWindow2);
// roundWindow1.rotation.x += 5;
roundWindow2.position.x = -5;
roundWindow2.position.y = 1.55;
roundWindow2.position.z = 0;

let painting1 = new THREE.BoxGeometry(0.2, 4, 2);
let material7 = new THREE.MeshBasicMaterial({ color: 0x797d62 });
let wallPainting1 = new THREE.Mesh(painting1, material7);
scene.add(wallPainting1);
wallPainting1.position.x = 2;
wallPainting1.position.y = 1;
wallPainting1.position.z = 1;

let painting2 = new THREE.BoxGeometry(0.2, 2, 2);
let material8 = new THREE.MeshBasicMaterial({ color: 0xf1dca7 });
let wallPainting2 = new THREE.Mesh(painting2, material8);
scene.add(wallPainting2);
wallPainting2.position.x = 2;
wallPainting2.position.y = 2;
wallPainting2.position.z = 4;


let painting4 = new THREE.BoxGeometry(0.19, 1.8, 2.1);
let material10 = new THREE.MeshBasicMaterial({ color: 0x9b9b7a });
let wallPainting4 = new THREE.Mesh(painting4, material10);
scene.add(wallPainting4);
wallPainting4.position.x = 2;
wallPainting4.position.y = -0.2;
wallPainting4.position.z = 4;



// const sculpture = new THREE.TorusKnotGeometry(1.3, 0.2, 100, 5);
// const material11 = new THREE.MeshStandardMaterial({
//   color: 0xdce0d9,
//   roughness: roughness,
//   metalness: metalness,

//   roughnessMap: roughnessMap,
//   metalnessMap: metalnessMap,

//   envMap: envMap, // important -- especially for metals!
//   envMapIntensity: envMapIntensity
// });

const sculpture = new THREE.TorusKnotGeometry(1.2, 0.3, 100, 5);
const material11 = new THREE.MeshStandardMaterial({ color: 0xdce0d9, roughness: 0, metalness: 0 })
const torusKnot = new THREE.Mesh(sculpture, material11);
scene.add(torusKnot);
// torusKnot.rotation.y += 5.5;
torusKnot.position.x = -4.5;
torusKnot.position.y = 1.3;
torusKnot.position.z = 0;


let painting3 = new THREE.BoxGeometry(0.2, 1, 2);
let material9 = new THREE.MeshBasicMaterial({ color: 0xffffff });
let wallPainting3 = new THREE.Mesh(painting3, material9);
scene.add(wallPainting3);
wallPainting3.position.x = 2;
wallPainting3.position.y = 0;
wallPainting3.position.z = 4;

const directionalLight = new THREE.DirectionalLight(0x4DBCF0, 2);
directionalLight.rotation.y += 45;
directionalLight.position.x = -3;
directionalLight.position.y = 5;
directionalLight.position.z = 3;
scene.add(directionalLight);

directionalLight.receiveShadow = true;
directionalLight.castShadow = true;

// const light = new THREE.AmbientLight(0x404040); // soft white light
// light.position.x = 1;
// light.position.x = 1;
// light.position.x = 1;
// scene.add(light);

let frameCount = 0;
const amplitude = 0.5;
const whiteOffset = 2;
let velocityY = 0.5;
let velocityX = 1;

function draw() {
  frameCount = frameCount + 1;
  wallPainting3.position.y = amplitude * Math.sin(frameCount / 50) + whiteOffset;

  // wallPainting3.position.y = amplitude * Math.sin(Date.now() * 0.001) * 2;
  // wallPainting3.position.y = Math.cos(frameCount / 50);
  // torusKnot.scale.y = Math.sin(frameCount / 10) * 1;
  // wallPainting3.position.y = Math.cos(frameCount / 40) * 1;
  // torusKnot.scale.y = Math.sin(frameCount / 10) * 1;
  // or move the camera
  // camera.position.z -= 0.1;

  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);

  window.requestAnimationFrame(draw);
}

function bounce() {
  velocityY += 0.0002;
  myMesh.position.y -= velocityY;


  if (myMesh.position.y < -2) {
    myMesh.position.y = -1;
    myMesh.position.x += -0.001;
    myMesh.position.z += 0.001;
    velocityY *= -0.05;
    velocityX *= -0.5;

  }
  window.requestAnimationFrame(bounce);
}

function bounceShadow() {
  // velocityY += 0.0001;
  // myMesh.position.y -= velocityY;
  shawdowSephere.scale.y = Math.sin(frameCount / -30) * 1;
  shawdowSephere.scale.x = Math.sin(frameCount / -30) * 1;
  // if (myMesh.position.y < -2) {
  //   myMesh.position.y = -1;
  //   myMesh.position.x += -0.001;
  //   myMesh.position.z += 0.001;
  //   velocityY *= -0.05;
  //   velocityX *= -0.5;
  // }
  window.requestAnimationFrame(bounceShadow);
}



function animation() {
  torusKnot.rotation.y = frameCount / 50;
  torusKnot.rotation.z = frameCount / 50;

  window.requestAnimationFrame(animation);
}

animation();
draw();
bounce();
bounceShadow();

// let myLight = new THREE.AmbientLight('0xffffff');
// scene.add(myLight);

// finally, take a picture of the scene and show it in the <canvas>
renderer.render(scene, camera);
