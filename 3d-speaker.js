const container = document.getElementById('speaker-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 5, 10); 

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const speakerGroup = new THREE.Group();
scene.add(speakerGroup);

// 1. OUTER RING / CHASSIS (Pelek Luar yang tebal dan datar)
const ringGeo = new THREE.CylinderGeometry(3.2, 3.2, 0.15, 64);
const ringMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.8, roughness: 0.2 });
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.position.y = 0.8;
speakerGroup.add(ring);

// 2. SURROUND (Karet melengkung di pinggir cone)
const surroundGeo = new THREE.TorusGeometry(2.8, 0.15, 16, 100);
const surroundMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1 });
const surround = new THREE.Mesh(surroundGeo, surroundMat);
surround.rotation.x = Math.PI / 2;
surround.position.y = 0.7;
speakerGroup.add(surround);

// 3. MAIN CONE (Lebih curam ke bawah)
const coneGeo = new THREE.CylinderGeometry(2.7, 1.2, 1.5, 64, 1, true);
const coneMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 1, side: THREE.DoubleSide });
const cone = new THREE.Mesh(coneGeo, coneMat);
cone.position.y = 0;
speakerGroup.add(cone);

// 4. DIAMOND DUST CAP (Dust cap ikonik Audio Circle)
const dustCapGeo = new THREE.IcosahedronGeometry(1.2, 1); 
const dustCapMat = new THREE.MeshStandardMaterial({ 
    color: 0xcccccc, 
    metalness: 0.9, 
    roughness: 0.1, 
    flatShading: true 
});
const dustCap = new THREE.Mesh(dustCapGeo, dustCapMat);
dustCap.position.y = -0.5;
speakerGroup.add(dustCap);

// 5. THE BASKET (Tiang Penyangga agar TIDAK terlihat seperti UFO)
for (let i = 0; i < 4; i++) {
    const barGeo = new THREE.BoxGeometry(0.2, 2.5, 0.4);
    const barMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a });
    const bar = new THREE.Mesh(barGeo, barMat);
    
    // Atur posisi tiang melingkar
    const angle = (i / 4) * Math.PI * 2;
    bar.position.x = Math.cos(angle) * 1.8;
    bar.position.z = Math.sin(angle) * 1.8;
    bar.position.y = -0.5;
    bar.rotation.y = -angle;
    bar.rotation.z = Math.PI / 6 * (bar.position.x > 0 ? 1 : -1); // Miringkan tiang ke arah magnet
    speakerGroup.add(bar);
}

// 6. BOTTOM MAGNET (Bagian bawah yang berat)
const magnetGeo = new THREE.CylinderGeometry(2, 2, 1.2, 32);
const magnetMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.9, roughness: 0.3 });
const magnet = new THREE.Mesh(magnetGeo, magnetMat);
magnet.position.y = -1.8;
speakerGroup.add(magnet);

// --- LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.position.set(5, 10, 5);
scene.add(spotLight);

const redLight = new THREE.PointLight(0xe61e2a, 1);
redLight.position.set(-5, 2, 5);
scene.add(redLight);

// --- CONTROLS & ANIMATION ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;

function animate() {
    requestAnimationFrame(animate);
    
    // Animasi Getar (Vibrating)
    const time = Date.now() * 0.01;
    const shake = Math.sin(time) * 0.03;
    cone.position.y = shake;
    dustCap.position.y = -0.5 + shake;
    
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();
