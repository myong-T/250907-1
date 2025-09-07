import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. 장면(Scene) 생성
const scene = new THREE.Scene();

// 2. 카메라(Camera) 설정
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. 렌더러(Renderer) 설정
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 큐브(Cube) 생성
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// --- OrbitControls 추가 ---
const controls = new OrbitControls(camera, renderer.domElement);

// 5. 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);

    // controls.update()를 호출하여 마우스 상호작용 업데이트
    controls.update();

    renderer.render(scene, camera);
}
animate();

// 6. 윈도우 크기 변경 시 렌더러와 카메라 업데이트
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});