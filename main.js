import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. 장면(Scene) 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

// 2. 카메라(Camera) 설정
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. 렌더러(Renderer) 설정
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✨ 텍스처 파일 경로 설정 (PNG 파일 경로)
const texturePath = './textures/wave.png';

// 4. TextureLoader를 이용해 로컬 이미지 불러오기
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
    texturePath,
    function (tex) {
        // 로딩이 완료되면 텍스처를 재질에 적용
        material.map = tex;
        material.needsUpdate = true;
    },
    undefined,
    function (err) {
        console.error('An error happened loading the texture.', err);
    }
);

// 5. 구(Sphere) 생성 및 재질 설정
const geometry = new THREE.SphereGeometry(1, 64, 32);
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0.2,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 6. AmbientLight (주변광)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 7. DirectionalLight (태양광)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// 8. OrbitControls 추가
const controls = new OrbitControls(camera, renderer.domElement);

// 9. 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// 10. 윈도우 크기 변경 시 렌더러와 카메라 업데이트
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});