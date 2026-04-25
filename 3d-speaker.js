// --- SCRIPT 3D: QUANTUM DOTS ---
const container = document.getElementById('speaker-container');

// 1. SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 5, 20); // Kamera agak jauh agar awan partikel terlihat penuh

// 2. RENDERER (Antialias, Alpha transparan)
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// --- 3. MEMBUAT QUANTUM DOTS (Ribuan Partikel) ---
const geometry = new THREE.BufferGeometry();
const vertices = [];
const particlesCount = 5000; // Jumlah partikel (kurangi jika lemot)

for (let i = 0; i < particlesCount; i++) {
    // Sebarkan partikel secara acak dalam bentuk lingkaran/bola
    const x = (Math.random() - 0.5) * 30;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 30;
    vertices.push(x, y, z);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

// Material Partikel (Glow neon yang jernih)
const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1, // Titik sangat kecil
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending // Efek glow saat bertumpuk
});

const points = new THREE.Points(geometry, material);
scene.add(points);

// --- 4. LIGHTING ---
// Tidak butuh lampu eksternal karena partikel sudah bersinar sendiri

// --- 5. CONTROLS ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5; // Berputar pelan seperti ambiance

// --- 6. ANIMASI GELOMBANG QUANTUM ---
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    
    // Akses posisi setiap partikel untuk membuat gelombang
    const positions = points.geometry.attributes.position.array;
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const z = positions[i3 + 2];
        
        // Gelombang Sinus murni (Smooth Ambiance)
        positions[i3 + 1] = Math.sin(time + x * 0.5) * Math.cos(time + z * 0.5) * 2;
    }
    points.geometry.attributes.position.needsUpdate = true; // Beritahu Three.js posisi berubah

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
