// --- SCRIPT 3D: COSMIC JELLYFISH ---
const container = document.getElementById('speaker-container');

// 1. SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 10); // Fokus lurus

// 2. RENDERER (Antialias, Alpha transparan)
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// --- 3. MEMBUAT BOLA CAIR (Jellyfish Mesh) ---
// Pakai subdivisi tinggi (64) agar permukaannya mulus saat bergelombang
const geometry = new THREE.IcosahedronGeometry(4, 64); 

// Material "Merkuri" (Sangat mengkilap, Cair)
const material = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, // Putih Pearl
    metalness: 1, // Full metalik untuk efek pantulan air
    roughness: 0.1, // Sangat halus
    flatShading: false
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Simpan posisi asli vertices untuk referensi animasi
geometry.userData.originalPositions = geometry.attributes.position.array.slice();

// --- 4. LIGHTING (Kunci untuk efek CAIR) ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Cahaya dasar lemah
scene.add(ambientLight);

// Lampu utama yang tajam dari Depan-Atas (untuk sorotan putih)
const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(0, 10, 5);
scene.add(topLight);

// Lampu aksen Merah dari Samping-Belakang (Memberikan gradasi di tepian bola)
const sideRedLight = new THREE.PointLight(0xe61e2a, 1.2, 15);
sideRedLight.position.set(-8, -2, -5);
scene.add(sideRedLight);

// --- 5. CONTROLS ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5; // Berputar sangat pelan

// --- 6. ANIMASI CAIR (Meliuk-liuk Organik) ---
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    
    // Akses Vertices untuk efek distorsi cair
    const positions = geometry.attributes.position.array;
    const originalPositions = geometry.userData.originalPositions;
    
    for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];
        
        // Perhitungan Noise Sinus yang rumit untuk gerakan cair
        const noise = Math.sin(time + x * 0.5) * Math.cos(time + y * 0.5) * Math.sin(time + z * 0.5) * 0.4;
        
        // Terapkan distorsi ke posisi X, Y, dan Z
        positions[i] = x * (1 + noise);
        positions[i + 1] = y * (1 + noise);
        positions[i + 2] = z * (1 + noise);
    }
    geometry.attributes.position.needsUpdate = true; // Beritahu Three.js posisi berubah

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
