import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('speaker-container');

// 1. SCENE & RENDERER (Renderer harus dibuat duluan sebelum OrbitControls)
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// 2. CAMERA
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);

function updateCameraPosition() {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        camera.position.set(14, 7, 14); 
        camera.fov = 50; 
    } else {
        camera.position.set(10, 5, 10); 
        camera.fov = 40;
    }
    camera.updateProjectionMatrix();
}
updateCameraPosition();

// 3. LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xe61e2a, 5); 
spotLight.position.set(10, 10, 10);
scene.add(spotLight);

// 4. GLOBAL VARIABLES & CONTROLS
let model;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = false;

// 5. LOAD MODEL INNOVA ZENIX
const loader = new GLTFLoader();

loader.load('./asset/innova-v1.glb', (gltf) => {
    model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    model.position.sub(center); 
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 8 / maxDim;
    model.scale.set(scale, scale, scale);

    const applyMaterial = () => {
        const isDark = document.documentElement.classList.contains('dark');
        model.traverse((node) => {
            if (node.isMesh) {
                node.material = new THREE.MeshStandardMaterial({
                    color: isDark ? 0xffffff : 0x333333, 
                    transparent: true,
                    opacity: isDark ? 0.15 : 0.35,
                    wireframe: true,
                    emissive: isDark ? 0xffffff : 0x000000,
                    emissiveIntensity: isDark ? 0.1 : 0
                });
            }
        });
    };

    applyMaterial();
    scene.add(model);

}, undefined, (error) => {
    console.error("Gagal load mobil:", error);
});

// 6. ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    
    if (model) {
        model.rotation.y += 0.003; 
    }

    controls.update();
    renderer.render(scene, camera);
}
animate();

// 7. RESPONSIVE LISTENER
window.addEventListener('resize', () => {
    if (!container) return;
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    updateCameraPosition();
});

// 8. THEME OBSERVER
const observer = new MutationObserver(() => {
    if (model) {
        const isDark = document.documentElement.classList.contains('dark');
        model.traverse((node) => {
            if (node.isMesh && node.material) {
                node.material.color.setHex(isDark ? 0xffffff : 0x333333);
                node.material.opacity = isDark ? 0.15 : 0.35;
                node.material.emissive.setHex(isDark ? 0xffffff : 0x000000);
            }
        });
    }
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
