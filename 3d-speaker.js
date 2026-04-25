// --- SCRIPT 3D: NEON SILK ---
const container = document.getElementById('speaker-container');

// SCENE & CAMERA (Fokus jarak dekat agar anyaman sutra terlihat detail)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 10); 

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const ribbonGroup = new THREE.Group();
scene.add(ribbonGroup);

// --- MEMBUAT NEON SILK (Pita Bergelombang) ---
const count = 5; // Jumlah pita sutra
const curves = [];

for (let i = 0; i < count; i++) {
    // Membuat jalan kurva acak
    const points = [];
    for (let j = 0; j < 20; j++) {
        points.push(new THREE.Vector3(j - 10, Math.sin(j * 0.5) * 2, (Math.random() - 0.5) * 2));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    curves.push(curve);
    
    // Geometri Tube (Tabung tipis seperti benang neon)
    const geometry = new THREE.TubeGeometry(curve, 100, 0.05, 8, false);
    
    // Material Neon (Glow Gradasi)
    const material = new THREE.MeshStandardMaterial({ 
        color: i % 2 === 0 ? 0xffffff : 0xe61e2a, // Putih & Merah Concerto
        emissive: i % 2 === 0 ? 0xffffff : 0xe61e2a,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.7
    });
    
    const tube = new THREE.Mesh(geometry, material);
    ribbonGroup.add(tube);
}

// --- LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 10);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// --- CONTROLS & ANIMATION ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0; // Berputar perlahan

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    
    // Animasi Sutra (Meliuk-liuk pelan)
    ribbonGroup.children.forEach((tube, i) => {
        tube.rotation.y = Math.sin(time + i) * 0.1;
        tube.position.y = Math.sin(time * 0.5 + i) * 0.5;
    });
    
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
