// Assurer que le lien s'ouvre dans la même fenêtre
document.getElementById("widget-link").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = this.href;
});

// Création de la scène
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0.5, 0.5, 3.2);

// Création du moteur de rendu
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(150, 150);
renderer.shadowMap.enabled = true;
document.getElementById('widget').appendChild(renderer.domElement);

// Matériau de la maison
var material = new THREE.MeshStandardMaterial({
    color: 0xf8f8f8,
    transparent: true,
    opacity: 0.4,
    roughness: 0.1,
    metalness: 0.1
});

// Contours
var edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });

// Création de l'appareil photo (cube représentant le boîtier)
var camera3D = new THREE.Group();
var cubeGeometry = new THREE.BoxGeometry(1.1, 0.7, 0.5);
var cameraBody = new THREE.Mesh(cubeGeometry, material);
cameraBody.castShadow = true;
cameraBody.receiveShadow = true;
camera3D.add(cameraBody);

// Ajout des arêtes du cube
var cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
var cubeLine = new THREE.LineSegments(cubeEdges, edgeMaterial);
camera3D.add(cubeLine);

// Objectif (cylindre sur le devant)
var lensGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
var lensMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, transparent: true, opacity: 0.8 });
var lens = new THREE.Mesh(lensGeometry, lensMaterial);
lens.rotation.x = Math.PI / 2;
lens.position.z = 0.5;
camera3D.add(lens);

// Lumière et ombre
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2);
light.target.position.set(0, 0, 0);
light.castShadow = true;
scene.add(light);

// Ajout du modèle à la scène
scene.add(camera3D);

// Animation
function animate() {
    requestAnimationFrame(animate);
    camera3D.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
