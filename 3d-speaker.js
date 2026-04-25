import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

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

loader.load('asset/innova-v1.glb', (gltf) => {
    model = gltf.scene;

    // Centering & Auto-Scaling (Agar mobil pas di container)
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    model.position.sub(center); // Pindah ke titik pusat
    
    // Sesuaikan skala mobil agar tidak terlalu besar/kecil (asumsi target lebar 8 unit)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 8 / maxDim;
    model.scale.set(scale, scale, scale);

    model.traverse((node) => {
        if (node.isMesh) {
            node.material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.15, 
                wireframe: true, 
                emissive: 0xffffff,
                emissiveIntensity: 0.1
            });
        }
    });

    scene.add(model);

    // 5. TAMBAHKAN AUDIO NODES
    const addSpeakerNode = (x, y, z) => {
        const geo = new THREE.SphereGeometry(0.2, 16, 16);
        const mat = new THREE.MeshBasicMaterial({ color: 0xe61e2a });
        const node = new THREE.Mesh(geo, mat);
        node.position.set(x, y, z);
        model.add(node); 
    };

    // Koordinat ini relatif terhadap model mobil
    addSpeakerNode(1.5, 0.5, 1);  
    addSpeakerNode(-1.5, 0.5, 1); 
    addSpeakerNode(0, 1.2, 1.5);  

}, (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, (error) => {
    console.error("Gagal load model mobil:", error);
});

// 6. ANIMATION LOOP (Di luar loader agar render berjalan terus)
function animate() {
    requestAnimationFrame(animate);
    
    if (model) {
        model.rotation.y += 0.003; // Putar mobil
        
        // Animasi denyut Speaker Nodes
        const scaleNode = 1 + Math.sin(Date.now() * 0.005) * 0.2;
        model.children.forEach(child => {
            if (child.geometry && child.geometry.type === "SphereGeometry") {
                child.scale.set(scaleNode, scaleNode, scaleNode);
            }
        });
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

// 7. RESIZE HANDLER
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
