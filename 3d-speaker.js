import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('speaker-container');

// 1. SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(12, 6, 12); 

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 2. LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xe61e2a, 5); 
spotLight.position.set(10, 10, 10);
scene.add(spotLight);

// 3. GLOBAL VARIABLES
let model;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;

// 4. LOAD MODEL INNOVA ZENIX
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

    model.traverse((node) => {
        if (node.isMesh) {
            const isDark = document.documentElement.classList.contains('dark');
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

    scene.add(model);

    // FUNGSI MARKER (Jika ingin dipakai nanti)
    const addSpeakerNode = (x, y, z) => {
        const nodeGroup = new THREE.Group();
        const geo = new THREE.SphereGeometry(0.05, 16, 16); 
        const mat = new THREE.MeshBasicMaterial({ color: 0xe61e2a });
        const node = new THREE.Mesh(geo, mat);
        const glowGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({ color: 0xe61e2a, transparent: true, opacity: 0.2 });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        nodeGroup.add(node);
        nodeGroup.add(glow);
        nodeGroup.position.set(x, y, z);
        model.add(nodeGroup); 
    };

    // Saat ini dikosongkan agar mobil bersih
}, undefined, (error) => {
    console.error("Gagal load mobil:", error);
});

// 5. ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    
    if (model) {
        model.rotation.y += 0.003; // Hanya rotasi tenang
    }

    controls.update();
    renderer.render(scene, camera);
}

// JALANKAN ANIMASI (Ini yang tadi lupa dipanggil)
animate();

// 6. LISTENERS
window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

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
