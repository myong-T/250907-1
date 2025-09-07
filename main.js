import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. 장면(Scene) 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

// 2. 카메라(Camera) 설정
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 4);

// 3. 렌더러(Renderer) 설정
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 조명 추가
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 5. 큐브의 각 면 생성 및 그룹화
const faceMaterial = new THREE.MeshStandardMaterial({ color: 0x4285F4 }); // 파란색
const faceGeometry = new THREE.BoxGeometry(1, 1, 0.01);

// 중심이 될 앞면 (움직이지 않음)
const frontFace = new THREE.Mesh(faceGeometry, faceMaterial);
scene.add(frontFace);

// 왼쪽 그룹 (왼쪽 면)
const leftGroup = new THREE.Group();
leftGroup.position.x = -0.5;
frontFace.add(leftGroup);
const leftFace = new THREE.Mesh(faceGeometry, faceMaterial);
leftFace.position.x = -0.5;
leftGroup.add(leftFace);

// 오른쪽 그룹 (오른쪽 면)
const rightGroup = new THREE.Group();
rightGroup.position.x = 0.5;
frontFace.add(rightGroup);
const rightFace = new THREE.Mesh(faceGeometry, faceMaterial);
rightFace.position.x = 0.5;
rightGroup.add(rightFace);

// 윗면 그룹
const topGroup = new THREE.Group();
topGroup.position.y = 0.5;
frontFace.add(topGroup);
const topFace = new THREE.Mesh(faceGeometry, faceMaterial);
topFace.position.y = 0.5;
topGroup.add(topFace);

// 아랫면 그룹
const bottomGroup = new THREE.Group();
bottomGroup.position.y = -0.5;
frontFace.add(bottomGroup);
const bottomFace = new THREE.Mesh(faceGeometry, faceMaterial);
bottomFace.position.y = -0.5;
bottomGroup.add(bottomFace);

// 뒷면 그룹 (오른쪽 면에 연결)
const backGroup = new THREE.Group();
backGroup.position.x = 0.5;
rightFace.add(backGroup);
const backFace = new THREE.Mesh(faceGeometry, faceMaterial);
backFace.position.x = 0.5;
backGroup.add(backFace);

// 6. OrbitControls 추가
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 7. 애니메이션 루프
let isUnfolding = true;
let progress = 0;
const speed = 0.01;

function animate() {
    requestAnimationFrame(animate);

    // 애니메이션 진행 상태 업데이트
    if (isUnfolding) {
        progress += speed;
        if (progress >= 1) {
            progress = 1;
            isUnfolding = false;
        }
    } else {
        progress -= speed;
        if (progress <= 0) {
            progress = 0;
            isUnfolding = true;
        }
    }

    // 각 그룹의 회전 애니메이션
    leftGroup.rotation.y = THREE.MathUtils.lerp(0, Math.PI / 2, progress);
    rightGroup.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 2, progress);
    
    // ✨ 윗면과 아랫면 회전 방향 변경
    topGroup.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 2, progress);    // 이전: -Math.PI / 2
    bottomGroup.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 2, progress); // 이전: Math.PI / 2
    
    backGroup.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 2, progress);

    controls.update();
    renderer.render(scene, camera);
}
animate();

// 8. 윈도우 크기 변경 시 렌더러와 카메라 업데이트
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});