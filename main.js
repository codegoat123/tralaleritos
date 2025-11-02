// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .glb file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();

// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Mouse tracking (optional)
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Global reference to the model
let object;

// OrbitControls
let controls;

// Load Tralalerito
const loader = new GLTFLoader();
loader.load(
  'tralalerito.glb',
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Wait for DOM to be ready before appending
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container3D");
  if (container) {
    container.appendChild(renderer.domElement);
  } else {
    console.error("container3D not found in DOM");
  }
});

// Camera position
camera.position.z = 500;

// Lighting
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// Controls
controls = new OrbitControls(camera, renderer.domElement);

// Animate
function animate() {
  requestAnimationFrame(animate);

  if (object) {
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }

  renderer.render(scene, camera);
}

// Resize
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse tracking
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

// Start
animate();
