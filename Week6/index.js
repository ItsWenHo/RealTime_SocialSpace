/*
This example uses the OrbitControls addon by importing it separately from the main THREE codebase.

*/
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer;

let myObjects = [];
let inactiveMat, activeMat;
let mouse;

const colorList = [
  0xff99c8,
  0xfcf6bd,
  0xd0f4de,
  0xa9def9,
  0xe4c1f9,
  0xf8ad9d,
  0xffdab9,
  0xc9ada7,
  0xe3d5ca,
  0xffd6ff,
  0xbbd0ff,
  0x98f5e1,
  0xead2ac
];



function init() {
  // create a scene in which all other objects will exist
  scene = new THREE.Scene();

  // create a camera and position it in space
  let aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 5; // place the camera in space
  camera.position.y = 5;
  camera.lookAt(0, 0, 0);

  // the renderer will actually show the camera view within our <canvas>
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let gridHelper = new THREE.GridHelper(25, 25);
  scene.add(gridHelper);



  // add orbit controls
  let controls = new OrbitControls(camera, renderer.domElement);

  // createGridOfObjects();
  // create several objects which we can activate with raycasting
  // use a shared geometry for each object
  let geo = new THREE.TorusGeometry(1, 0.5, 12, 12);
  activeMat = new THREE.MeshBasicMaterial({ color: 0xb07d62 });
  inactiveMat = new THREE.MeshBasicMaterial();

  for (let i = 0; i < 10; i++) {
    // and use a different material (because we will alter it when an object is raycast)

    let mesh = new THREE.Mesh(geo, inactiveMat);

    mesh.position.set(
      (Math.random() - 0.5) * 20,
      0,
      (Math.random() - 0.5) * 20
    );
    mesh.rotation.y = Math.random() * 2;
    scene.add(mesh);
    myObjects.push(mesh);
  }

  // add a raycast on click
  mouse = new THREE.Vector2(0, 0);
  document.addEventListener(
    "mousemove",
    (ev) => {
      // three.js expects 'normalized device coordinates' (i.e. between -1 and 1 on both axes)
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

      const color = getColorFromMousePosition(mouse.x, mouse.y);
      scene.background = color;
    },
    false
  );

  let raycaster = new THREE.Raycaster();
  document.addEventListener("click", (ev) => {
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(myObjects);
    if (intersects.length > 0) {
      // If the mouse intersects with the torus geometry, create a sphere at the intersection point
      let sphereGeo = new THREE.SphereGeometry(0.1, 8, 8);
      let getRandomColor = getRandomColorList();
      let sphereMat = new THREE.MeshBasicMaterial({ color: getRandomColor });
      let sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.copy(intersects[0].point);
      scene.add(sphere);
    }

    // reset all materials
    for (let i = 0; i < myObjects.length; i++) {
      myObjects[i].material = inactiveMat;
    }
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material = activeMat;
    }
  });


  loop();
}

function getRandomColorList() {
  return colorList[Math.floor(Math.random() * colorList.length)];
}


function getColorFromMousePosition(x, y) {
  // Map mouse position to specific colors
  const colorMap = [
    { x: -1, y: -1, color: new THREE.Color(0xedafb8) },
    { x: 1, y: -1, color: new THREE.Color(0x0f7e1d7) },
    { x: -1, y: 1, color: new THREE.Color(0xdedbd2) },
    { x: 1, y: 1, color: new THREE.Color(0xb0c4b1) }
  ];

  let closestColor = colorMap[0];
  let minDistance = Infinity;
  for (const item of colorMap) {
    const distance = Math.sqrt((x - item.x) ** 2 + (y - item.y) ** 2);
    if (distance < minDistance) {
      closestColor = item;
      minDistance = distance;
    }
  }

  return closestColor.color;
}


function createGridOfObjects() {
  let geo = new THREE.SphereGeometry(0.25, 20, 20);
  let mat = new THREE.MeshBasicMaterial({ color: "red" });

  let interactionGeo = new THREE.BoxGeometry(1, 0.1, 1);

  for (let i = -10; i <= 10; i++) {
    for (let j = -10; j <= 10; j++) {
      // create the mesh which will move
      let mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(i, 0, j);
      myGridObjects.push(mesh);
      scene.add(mesh);

      // create a second mesh which will only be used for raycasting
      // and won't be visible
      let interactionMesh = new THREE.Mesh(interactionGeo, mat);
      interactionMesh.position.set(i, 0, j);
      // add this mesh to a layer which is visible to the raycaster but not the camera
      interactionMesh.layers.set(2);

      // store a reference to the visible mesh in the interaction meshes' userData
      interactionMesh.userData.mesh = mesh;

      myGridInteractionObjects.push(interactionMesh);
      scene.add(interactionMesh);
    }
  }
}

function loop() {
  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop); // pass the name of your loop function into this function
}

init();
