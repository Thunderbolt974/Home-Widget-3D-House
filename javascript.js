// Redirection du lien
document.getElementById("widget-link").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = this.href;
});

// Création de la scène Three.js
var scene = new THREE.Scene();

// Caméra
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0.5, 0.5, 3.2);

// Rendu
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(150, 150);
renderer.shadowMap.enabled = true;
document.getElementById('widget').appendChild(renderer.domElement);

// Matériaux
var material = new THREE.MeshStandardMaterial({
    color: 0x333333,
    transparent: true,
    opacity: 0.4,
    roughness: 0.1,
    metalness: 0.5
});

// Création du modèle d'appareil photo 3D
var cameraModel = new THREE.Group();

// Corps principal (boîtier)
var bodyGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.5);
var body = new THREE.Mesh(bodyGeometry, material);
body.castShadow = true;
body.receiveShadow = true;
cameraModel.add(body);

// Objectif (cylindre)
var lensGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.6, 32);
var lens = new THREE.Mesh(lensGeometry, material);
lens.position.set(0, 0, 0.45);
cameraModel.add(lens);

// Ombre portée (sol)
var groundGeometry = new THREE.PlaneGeometry(100, 100);
var groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.6;
ground.receiveShadow = true;
scene.add(ground);

// Lumière
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2);
light.target.position.set(0, 0, 0);
light.castShadow = true;
scene.add(light);

// Ajout de l'appareil photo à la scène
scene.add(cameraModel);

// Animation de rotation
function animate() {
    requestAnimationFrame(animate);
    cameraModel.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Démarrer l'animation
animate();
