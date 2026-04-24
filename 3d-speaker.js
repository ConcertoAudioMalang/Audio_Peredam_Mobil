const container = document.getElementById('speaker-container');

// 1. SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 7); // Posisi kamera agak tinggi agar terlihat geometrinya

// 2. RENDERER (Antialias agar mulus, Alpha agar background transparan)
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Penting untuk layar Retina laptop
container.appendChild(renderer.domElement);

// --- MEMBUAT MODEL SPEAKER AUDIO CIRCLE ---
const speakerGroup = new THREE.Group();
scene.add(speakerGroup);

// A. BASKET / FRAME (Lingkaran Luar Hitam) - Ref: image_1.png
const basketGeo = new THREE.TorusGeometry(3, 0.2, 16, 64);
const basketMat = new THREE.MeshStandardMaterial({ 
    color: 0x111111, 
    roughness: 0.8,
    metalness: 0.2
});
const basket = new THREE.Mesh(basketGeo, basketMat);
basket.rotation.x = Math.PI / 2; // Berdirikan
speakerGroup.add(basket);

// B. MAGNET BOTTOM (Chrome Mengkilap) - Ref: image_3.png
const magnetGeo = new THREE.CylinderGeometry(2, 2, 1.5, 32);
const magnetMat = new THREE.MeshStandardMaterial({ 
    color: 0xaaaaaa, // Warna Chrome/Silver
    metalness: 1, // Full metal
    roughness: 0.1 // Sangat mengkilap
});
const magnet = new THREE.Mesh(magnetGeo, magnetMat);
magnet.position.y = -1; // Taruh di bawah
speakerGroup.add(magnet);

// C. CONE / DIAPHRAGM (Karet Hitam di sekeliling Cone)
const coneGeo = new THREE.CylinderGeometry(2.8, 1.8, 1, 32, 1, true); // Terbuka di tengah
const coneMat = new THREE.MeshStandardMaterial({ 
    color: 0x151515, 
    roughness: 0.9, 
    side: THREE.DoubleSide 
});
const coneInner = new THREE.Mesh(coneGeo, coneMat);
coneInner.position.y = 0.4;
coneInner.rotation.x = Math.PI; // Balik agar mengerucut ke dalam
speakerGroup.add(coneInner);

// D. DUST CAP - THE GEOMETRIC DIAMOND (INSPIRASI UTAMA) - Ref: image_2.png
// Kita pakai IcosahedronGeometry (Rendah Detail) untuk efek Geometric "Diamond"
const dustCapGeo = new THREE.IcosahedronGeometry(1.6, 1); 
const dustCapMat = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, // Putih/Silver Terang
    metalness: 0.8, 
    roughness: 0.2, 
    flatShading: true // PENTING: Membuat pola geometric/diamond terlihat jelas
});
const dustCap = new THREE.Mesh(dustCapGeo, dustCapMat);
dustCap.position.y = 0.6; // Taruh di tengah cone
speakerGroup.add(dustCap);

// 3. LIGHTING (Pencahayaan agar Chrome & Geometric terlihat)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Cahaya dasar
scene.add(ambientLight);

// Point Light dari Depan Atas (Refleksi Diamond)
const frontLight = new THREE.PointLight(0xffffff, 1.2);
frontLight.position.set(5, 5, 10);
scene.add(frontLight);

// Point Light dari Belakang (Untuk kilau Magnet Chrome)
const backLight = new THREE.PointLight(0xffffff, 0.8);
backLight.position.set(-5, -5, -10);
scene.add(backLight);

// 4. INTERAKSI (OrbitControls)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Gerakan mulus
controls.dampingFactor = 0.05;
controls.enableZoom = false; // Supaya tidak mengganggu scroll
controls.autoRotate = true; // Berputar sendiri pelan-pelan
controls.autoRotateSpeed = 1.0; // Kecepatan putar

// 5. ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Wajib untuk damping
    renderer.render(scene, camera);
}

// 6. RESPONSIVE RESIZE
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Jalankan animasi
animate();