const container = document.getElementById('speaker-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 4, 8); // Kamera agak menjauh agar distorsi berkurang

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const speakerGroup = new THREE.Group();
scene.add(speakerGroup);

// --- PERBAIKAN A: PELEK LUAR (Lebih Tipis & Elegan) ---
const basketGeo = new THREE.TorusGeometry(3, 0.08, 16, 100); // Tube dikurangi dari 0.2 ke 0.08
const basketMat = new THREE.MeshStandardMaterial({ 
    color: 0x050505, 
    roughness: 0.5,
    metalness: 0.5
});
const basket = new THREE.Mesh(basketGeo, basketMat);
basket.rotation.x = Math.PI / 2;
speakerGroup.add(basket);

// --- PERBAIKAN B: CONE (Dibuat Lebih Dalam & Mengerucut) ---
// CylinderGeometry(atas, bawah, tinggi, segmen, open-ended)
const coneGeo = new THREE.CylinderGeometry(2.9, 0.8, 2, 64, 1, true); 
const coneMat = new THREE.MeshStandardMaterial({ 
    color: 0x111111, 
    roughness: 1, 
    side: THREE.DoubleSide 
});
const cone = new THREE.Mesh(coneGeo, coneMat);
cone.position.y = -0.5; // Diturunkan agar terlihat "masuk" ke dalam
speakerGroup.add(cone);

// --- PERBAIKAN C: DIAMOND DUST CAP (Lebih Kecil & Tajam) ---
const dustCapGeo = new THREE.IcosahedronGeometry(1.1, 1); // Ukuran dikecilkan agar proporsional
const dustCapMat = new THREE.MeshStandardMaterial({ 
    color: 0xcccccc, 
    metalness: 0.9, 
    roughness: 0.1, 
    flatShading: true // Ini kunci efek diamond-nya
});
const dustCap = new THREE.Mesh(dustCapGeo, dustCapMat);
dustCap.position.y = -0.3; // Diletakkan di dasar cone
speakerGroup.add(dustCap);

// --- PERBAIKAN D: MAGNET (Dibuat Lebih Lebar & Berkilau) ---
const magnetGeo = new THREE.CylinderGeometry(1.8, 1.8, 1.2, 32);
const magnetMat = new THREE.MeshStandardMaterial({ 
    color: 0x666666,
    metalness: 1,
    roughness: 0.2
});
const magnet = new THREE.Mesh(magnetGeo, magnetMat);
magnet.position.y = -2;
speakerGroup.add(magnet);

// --- PERBAIKAN E: LIGHTING (Lebih Studio-ish) ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Lampu utama dari atas (fokus ke Diamond)
const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(0, 10, 5);
scene.add(topLight);

// Lampu samping (agar metalik Magnet terlihat)
const sideLight = new THREE.PointLight(0xe61e2a, 0.5); // Aksen merah dikit di pantulan
sideLight.position.set(-10, 0, 5);
scene.add(sideLight);

// --- CONTROLS ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;

function animate() {
    requestAnimationFrame(animate);
    // Tambahkan sedikit efek getaran halus (Pulse) seperti speaker lagi bunyi
    const time = Date.now() * 0.005;
    dustCap.scale.set(1 + Math.sin(time) * 0.02, 1 + Math.sin(time) * 0.02, 1 + Math.sin(time) * 0.02);
    
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
