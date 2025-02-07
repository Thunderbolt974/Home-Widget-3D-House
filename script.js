// Assurer que le lien s'ouvre dans la même fenêtre
document.getElementById("widget-link").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = this.href;
});

// Création de la scène
var scene = new THREE.Scene();

// Création de la caméra (centrée sur la maison)
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0.5, 0.5, 3.2);

// Création du moteur de rendu
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(150, 150);
document.getElementById('widget').appendChild(renderer.domElement);

// Matériau de la maison (clair et transparent)
var material = new THREE.MeshStandardMaterial({
    color: 0xf8f8f8,  
    transparent: true,  
    opacity: 0.4,       
    roughness: 0.1,     
    metalness: 0.1      
});

// Matériau pour le toit (rouge-brique transparent)
var roofMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xB22222,  
    transparent: true, 
    opacity: 0.6, 
    roughness: 0.3, 
    metalness: 0.2 
});

// Matériau pour les contours
var edgeMaterial = new THREE.LineBasicMaterial({ color: 0x888888, linewidth: 2 });

// **Groupe contenant toute la maison pour une rotation parfaite**
var house = new THREE.Group();

// Corps de la maison (cube)
var cubeSize = 1.1;
var geometryCube = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
var cube = new THREE.Mesh(geometryCube, material);
house.add(cube);

// Arêtes visibles pour le cube
var cubeEdges = new THREE.EdgesGeometry(geometryCube);
var cubeLine = new THREE.LineSegments(cubeEdges, edgeMaterial);
house.add(cubeLine);

// Toit (pyramide aplatie avec base réduite)
var pyramidHeight = 0.6;  
var pyramidBase = 0.9;  
var geometryPyramid = new THREE.ConeGeometry(pyramidBase, pyramidHeight, 4);
geometryPyramid.rotateX(Math.PI / 0.5);
var pyramid = new THREE.Mesh(geometryPyramid, roofMaterial);
pyramid.position.y = cubeSize / 2 + pyramidHeight / 2;
pyramid.rotation.y = 14.93;
house.add(pyramid);

// Ajout des arêtes visibles pour le toit
var pyramidEdges = new THREE.EdgesGeometry(geometryPyramid);
var pyramidLine = new THREE.LineSegments(pyramidEdges, edgeMaterial);
pyramidLine.position.copy(pyramid.position);
pyramidLine.rotation.copy(pyramid.rotation);
house.add(pyramidLine);

// Porte (fixée sur la face avant)
var doorWidth = 0.3;
var doorHeight = 0.7;
var geometryDoor = new THREE.BoxGeometry(doorWidth, doorHeight, 0.01);
var doorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xfffafa,  
    transparent: true, 
    opacity: 0.5, 
    roughness: 0.3, 
    metalness: 0.2 
});
var door = new THREE.Mesh(geometryDoor, doorMaterial);
door.position.set(0, -0.25, cubeSize / 2 + 0.025);
house.add(door);

// **Ajout du groupe "house" à la scène**
scene.add(house);

// Ajout d'une lumière équilibrée
var light = new THREE.PointLight(0xffffff, 0.8, 100);
light.position.set(0, 2, 2);
scene.add(light);

// Animation (rotation autour de l'axe central)
function animate() {
    requestAnimationFrame(animate);
    house.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Démarrer l'animation
animate();
