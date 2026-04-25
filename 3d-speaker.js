import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('speaker-container');

// 1. SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(12, 6, 12); // Posisi sudut agar mobil terlihat gagah

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 2. LIGHTING (Agar siluet Zenix terlihat jelas)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xe61e2a, 5); // Aksen Merah Concerto
spotLight.position.set(10, 10, 10);
scene.add(spotLight);

// 3. LOAD MODEL INNOVA ZENIX
const loader = new GLTFLoader();

// GANTI 'innova_zenix.glb' dengan path file kamu (misal: 'assets/zenix.glb')
loader.load('asset/innova-v1.glb', (gltf) => {
    const model = gltf.scene;

    // Hitung bounding box agar mobil otomatis di tengah
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center); 

    model.traverse((node) => {
        if (node.isMesh) {
            // Efek X-Ray Transparan
            node.material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.15, // Tipis transparan
                wireframe: true, // Garis bodi terlihat
                emissive: 0xffffff,
                emissiveIntensity: 0.1
            });
        }
    });

    scene.add(model);

    // 4. TAMBAHKAN AUDIO NODES (Titik cahaya di posisi speaker)
    // Kamu bisa sesuaikan koordinat ini dengan posisi pintu/dashboard mobilnya
    const addSpeakerNode = (x, y, z) => {
        const geo = new THREE.SphereGeometry(0.2, 16, 16);
        const mat = new THREE.MeshBasicMaterial({ color: 0xe61e2a });
        const node = new THREE.Mesh(geo, mat);
        node.position.set(x, y, z);
        model.add(node); // Tempel ke mobil
    };

    addSpeakerNode(1.5, 0.5, 1);  // Pintu Depan Kanan
    addSpeakerNode(-1.5, 0.5, 1); // Pintu Depan Kiri
    addSpeakerNode(0, 1.2, 1.5);  // Dashboard Tengah

    // 5. ANIMASI
    function animate() {
        requestAnimationFrame(animate);
        
        // Mobil berputar pelan
        model.rotation.y += 0.003;
        
        // Efek denyut cahaya pada speaker nodes
        const scale = 1 + Math.sin(Date.now() * 0.005) * 0.2;
        model.children.forEach(child => {
            if (child.isMesh && child.geometry.type === "SphereGeometry") {
                child.scale.set(scale, scale, scale);
            }
        });

        controls.update();
        renderer.render(scene, camera);
    }
    animate();

}, undefined, (error) => {
    console.error("Gagal load model mobil:", error);
});

// 6. CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
