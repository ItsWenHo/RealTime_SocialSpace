/*
This example uses the OrbitControls addon by importing it separately from the main THREE codebase.

*/
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { getArtworkData } from "./getArtworkData.js";

let scene, camera, renderer;
let imageDisplays = [];


function init() {
  // create a scene in which all other objects will exist
  scene = new THREE.Scene();

  // create a camera and position it in space
  let aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 2;
  camera.position.y = 0;
  camera.lookAt(scene.position);

  // the renderer will actually show the camera view within our <canvas>
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //
  // let gridHelper = new THREE.GridHelper(25, 25);
  // scene.add(gridHelper);

  getDataAndDisplay();
}

init();

var rotationSpeed = Math.PI / 2000;
var totalRotation = 0.01;

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Update the camera's rotation
  camera.rotation.y += rotationSpeed;
  // camera.rotation.z += rotationSpeed;

  // Update the total rotation
  totalRotation += rotationSpeed;

  // Check if the camera has completed a full 360-degree rotation
  if (totalRotation >= Math.PI * 8) {
    totalRotation = 0.01;
  }

  // Render the scene
  renderer.render(scene, camera);
}

animate();

async function getDataAndDisplay() {
  let artworkData = await getArtworkData("Brooklyn");

  console.log(artworkData);

  // Define spiral parameters
  let spiralRadius = 5;
  let spiralHeight = 4;
  let numImages = artworkData.length;

  for (let i = 0; i < numImages; i++) {
    // Get the URL of the artwork
    let image_id = artworkData[i].data.image_id;
    let imageUrl = "https://www.artic.edu/iiif/2/" + image_id + "/full/843,/0/default.jpg";

    // Create a new MyImageDisplay object and pass in the scene and the URL
    let imageDisplay = new MyImageDisplay(scene, imageUrl);

    // Calculate spiral position
    let theta = (i / numImages) * Math.PI * 2; // Angle based on index
    let x = spiralRadius * Math.cos(theta);
    let y = (i / numImages) * spiralHeight;
    let z = spiralRadius * Math.sin(theta); // Increment height based on index

    // Set the location of the display
    imageDisplay.setPosition(x, y, z);

    // Add the imageDisplay to an array
    imageDisplays.push(imageDisplay);
  }
}


// our draw loop
function loop() {
  // do something to each image display
  for (let i = 0; i < imageDisplays.length; i++) {
    imageDisplays[i].doAction(0.01);
  }
  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);
  // ask our window to draw the next frame when it's ready
  window.requestAnimationFrame(loop);
}






// here we're using a class to encapsulate all of the code related to displaying an image
class MyImageDisplay {
  constructor(scene, imageUrl) {
    // load the image texture from the provided URL
    let imageTexture = new THREE.TextureLoader().load(imageUrl);

    // create geometry and material with texture
    let geo = new THREE.BoxGeometry(1, 1, 1);
    let mat = new THREE.MeshBasicMaterial({ map: imageTexture });
    let mesh = new THREE.Mesh(geo, mat);

    // save the mesh to 'this' object so we can access it elsewhere in the class
    this.mesh = mesh;

    // add it to the scene add add a position
    scene.add(mesh);
  }

  // a method which sets the position of the mesh
  setPosition(x, y, z) {
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }

  // a method which does something to the mesh
  doAction(amount) {
    this.mesh.rotateX(amount);
    this.mesh.rotateY(amount);
    this.mesh.rotateZ(amount);
  }
}
