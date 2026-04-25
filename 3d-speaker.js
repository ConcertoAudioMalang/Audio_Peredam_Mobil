// --- SCRIPT 3D: SONIC WIREFRAME ---
const container = document.getElementById('speaker-container');

// SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 8); // Fokus jarak dekat

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// --- MEMBUAT SONIC WIREFRAME (Objek Geometris) ---
// Kita pakai IcosahedronGeometry dengan subdivisi tinggi agar pola diamond banyak
const geometry = new THREE.IcosahedronGeometry(2.5, 4); 

// Material Wireframe (Garis-garis neon transparan)
const material = new THREE.MeshStandardMaterial({ 
    color: 0x111111, 
    emissive: 0xffffff, // Glow putih
    emissiveIntensity: 0.5,
    wireframe: true, // HANYA MENAMPILKAN GARIS
    transparent: true,
    opacity: 0.4
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Tambahkan "Inti" di tengah
const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
const coreMat = new THREE.MeshStandardMaterial({ color: 0xe61e2a, emissive: 0xe61e2a });
const core = new THREE.Mesh(coreGeo, coreMat);
scene.add(core);

// --- LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const frontLight = new THREE.PointLight(0xffffff, 1);
frontLight.position.set(5, 5, 5);
scene.add(frontLight);

// --- CONTROLS ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

// Simpan posisi asli vertices untuk reset
geometry.userData.originalPositions = geometry.attributes.position.array.slice();

// --- ANIMASI DENYUT SONIC ---
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.002;
    
    // Akses Vertices untuk efek denut (Pulse)
    const positions = geometry.attributes.position.array;
    const originalPositions = geometry.userData.originalPositions;
    
    for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];
        
        // Buat efek denjut acak (seperti Noise)
        const pulse = Math.sin(time + x * 0.5 + y * 0.3) * 0.15;
        
        positions[i] = x * (1 + pulse);
        positions[i + 1] = y * (1 + pulse);
        positions[i + 2] = z * (1 + pulse);
    }
    geometry.attributes.position.needsUpdate = true;
    
    // Animasi Core (Berdenyut sinkron)
    core.scale.set(1 + Math.sin(time) * 0.1, 1 + Math.sin(time) * 0.1, 1 + Math.sin(time) * 0.1);
    
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
