import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('speaker-container');
if (container) {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    const updateCameraPosition = () => {
        const isMobile = window.innerWidth < 768;
        camera.position.set(12, 6, 12); 
        camera.fov = isMobile ? 60 : 40;
        camera.updateProjectionMatrix();
    };
    updateCameraPosition();

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    let model;
    const loader = new GLTFLoader();
    loader.load('asset/scene.gltf', (gltf) => {
        model = gltf.scene;
        
        const applyMaterial = () => {
            const isDark = document.documentElement.classList.contains('dark');
            model.traverse((node) => {
                if (node.isMesh) {
                    node.material.color.setHex(isDark ? 0xffffff : 0x333333);
                    node.material.transparent = true;
                    node.material.opacity = isDark ? 0.2 : 0.4;
                    node.material.wireframe = true;
                }
            });
        };

        applyMaterial();
        scene.add(model);

        // Listener untuk perubahan tema (Dark/Light)
        const observer = new MutationObserver(applyMaterial);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    }, undefined, (error) => console.error("Error loading 3D:", error));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    function animate() {
        requestAnimationFrame(animate);
        if (model) model.rotation.y += 0.002;
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        updateCameraPosition();
    });
}
