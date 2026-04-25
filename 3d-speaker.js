const container = document.getElementById('speaker-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 10, 15); // Sudut pandang agak dari atas agar gelombang terlihat jelas

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const spectrumGroup = new THREE.Group();
scene.add(spectrumGroup);

// --- 1. MEMBUAT SPEKTRUM 3D (Circular Visualizer) ---
const count = 128; // Jumlah batang spektrum
const radius = 4;
const bars = [];

for (let i = 0; i < count; i++) {
    // Geometri batang yang tipis dan tajam (Clean look)
    const geometry = new THREE.BoxGeometry(0.05, 1, 0.05); 
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        emissive: 0xe61e2a, // Glow warna merah khas Concerto
        emissiveIntensity: 0.5
    });
    
    const bar = new THREE.Mesh(geometry, material);
    
    // Atur posisi melingkar
    const angle = (i / count) * Math.PI * 2;
    bar.position.x = Math.cos(angle) * radius;
    bar.position.z = Math.sin(angle) * radius;
    bar.rotation.y = -angle;
    
    spectrumGroup.add(bar);
    bars.push(bar);
}

// --- 2. CENTER PIECE (Core yang berdenyut) ---
const coreGeo = new THREE.IcosahedronGeometry(1.5, 2); // Sphere abstrak
const coreMat = new THREE.MeshStandardMaterial({ 
    color: 0x111111, 
    wireframe: true, // Bentuk garis-garis transparan yang jernih
    transparent: true,
    opacity: 0.3
});
const core = new THREE.Mesh(coreGeo, coreMat);
scene.add(core);

// --- 3. LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xe61e2a, 2, 20);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// --- 4. CONTROLS ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// --- 5. ANIMASI GELOMBANG (Ambiance Sound Logic) ---
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.002;
    
    bars.forEach((bar, i) => {
        // Membuat efek gelombang sinus yang jernih (Smooth Ambiance)
        const wave = Math.sin(time + i * 0.1) * 1.5; 
        const wave2 = Math.sin(time * 0.5 + i * 0.05) * 1.5;
        
        // Skala tinggi batang berubah sesuai "suara"
        const scale = Math.abs(wave + wave2) + 0.1;
        bar.scale.y = scale;
        
        // Posisi Y disesuaikan agar batang tumbuh ke atas (seperti equalizer)
        bar.position.y = scale / 2;
        
        // Warna berubah intensitasnya sesuai tinggi (Glow effect)
        bar.material.emissiveIntensity = scale * 0.5;
    });
    
    // Animasi Core di tengah
    core.rotation.y += 0.01;
    core.scale.set(
        1 + Math.sin(time) * 0.1, 
        1 + Math.sin(time) * 0.1, 
        1 + Math.sin(time) * 0.1
    );
    
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
