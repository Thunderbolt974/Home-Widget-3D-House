document.getElementById("widget-link").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = this.href;
});

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0.5, 0.5, 3.2);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(150, 150);
renderer.shadowMap.enabled = true;
document.getElementById('widget').appendChild(renderer.domElement);

var material = new THREE.MeshStandardMaterial({
    color: 0xf8f8f8,  
    transparent: true,  
    opacity: 0.4,       
    roughness: 0.1,     
    metalness: 0.1      
});

var roofMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xB22222,  
    transparent: true, 
    opacity: 0.6, 
    roughness: 0.3, 
    metalness: 0.2 
});

var edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });

var house = new THREE.Group();

var cubeSize = 1.1;
var geometryCube = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
var cube = new THREE.Mesh(geometryCube, material);
cube.castShadow = true;
cube.receiveShadow = true;
house.add(cube);

var cubeEdges = new THREE.EdgesGeometry(geometryCube);
var cubeLine = new THREE.LineSegments(cubeEdges, edgeMaterial);
house.add(cubeLine);

var pyramidHeight = 0.6;  
var pyramidBase = 0.9;  
var geometryPyramid = new THREE.ConeGeometry(pyramidBase, pyramidHeight, 4);
geometryPyramid.rotateX(Math.PI / 0.5);
var pyramid = new THREE.Mesh(geometryPyramid, roofMaterial);
pyramid.position.y = cubeSize / 2 + pyramidHeight / 2;
pyramid.rotation.y = 14.93;
pyramid.castShadow = true;
pyramid.receiveShadow = true;
house.add(pyramid);

var pyramidEdges = new THREE.EdgesGeometry(geometryPyramid);
var pyramidLine = new THREE.LineSegments(pyramidEdges, edgeMaterial);
pyramidLine.position.copy(pyramid.position);
pyramidLine.rotation.copy(pyramid.rotation);
house.add(pyramidLine);

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

scene.add(house);

var groundGeometry = new THREE.PlaneGeometry(100, 100);
var groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = - Math.PI / 2;
ground.position.y = -0.6;
ground.receiveShadow = true;
scene.add(ground);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.005;

light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 50;
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    house.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
