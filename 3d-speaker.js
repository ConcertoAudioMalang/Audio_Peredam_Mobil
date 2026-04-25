const container = document.getElementById('speaker-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 15); // Kamera lurus ke depan agar bentuk bola sempurna

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// --- 1. MEMBUAT QUANTUM SPHERE (Awan Partikel Bulat) ---
const particlesCount = 8000; // Lebih banyak titik agar bola terlihat padat
const positions = new Float32Array(particlesCount * 3);
const originalRadius = new Float32Array(particlesCount);

for (let i = 0; i < particlesCount; i++) {
    // Math untuk menyebar titik secara merata di permukaan bola
    const phi = Math.acos(-1 + (2 * i) / particlesCount);
    const theta = Math.sqrt(particlesCount * Math.PI) * phi;
    
    const radius = 5; // Jari-jari bola
    const i3 = i * 3;
    
    positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
    positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    originalRadius[i] = radius;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.06,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const quantumSphere = new THREE.Points(geometry, material);
scene.add(quantumSphere);

// --- 2. INTI MERAH (The Calibration Core) ---
// Memberikan aksen merah Concerto di tengah bola agar tidak pucat
const coreGeo = new THREE.IcosahedronGeometry(2, 2);
const coreMat = new THREE.MeshStandardMaterial({
    color: 0xe61e2a,
    emissive: 0xe61e2a,
    emissiveIntensity: 0.5,
    wireframe: true,
    transparent: true,
    opacity: 0.2
});
const core = new THREE.Mesh(coreGeo, coreMat);
scene.add(core);

// --- 3. LIGHTING ---
const pointLight = new THREE.PointLight(0xe61e2a, 2, 20);
pointLight.position.set(0, 0, 0); // Lampu dari dalam bola
scene.add(pointLight);

// --- 4. CONTROLS ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.8;

// --- 5. ANIMASI GELOMBANG SONIK ---
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    
    const posAttribute = geometry.attributes.position;
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Ambil posisi normal (vektor dari pusat ke titik)
        let x = positions[i3];
        let y = positions[i3 + 1];
        let z = positions[i3 + 2];
        
        // Hitung jarak dari pusat
        const dist = Math.sqrt(x*x + y*y + z*z);
        
        // Tambahkan noise gelombang (Organic Pulse)
        const wave = Math.sin(dist + time * 2 + x * 0.5) * 0.3;
        const scale = 1 + wave;
        
        posAttribute.array[i3] = x * scale;
        posAttribute.array[i3 + 1] = y * scale;
        posAttribute.array[i3 + 2] = z * scale;
    }
    posAttribute.needsUpdate = true;
    
    // Core berdenyut perlahan
    core.scale.set(
        1 + Math.sin(time * 1.5) * 0.1,
        1 + Math.sin(time * 1.5) * 0.1,
        1 + Math.sin(time * 1.5) * 0.1
    );
    core.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
