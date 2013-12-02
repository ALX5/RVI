var gl;

var cube;

var renderer;
var scene;
var camera;

function initGL(){
	webglCanvas=document.getElementById("webglCanvas");
	gl=webglCanvas.getContext("webgl");
	if(!gl){
		alert("can't initialize webgl context");
	}
	else{
		console.log(gl.getParameter(gl.VERSION)+"|"+gl.getParameter(gl.VENDOR)+"|"+
		gl.getParameter(gl.RENDERER)+"|"+
		gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
		gl.clearColor(0,0,0,1);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.DEPTH_BUFFER_BIT|gl.COLOR_BUFFER_BIT);
		renderer = new THREE.WebGLRenderer({canvas : webglCanvas});
		renderer.setClearColor(new THREE.Color(0xeeeeee),1.0);
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(45,1.0,0.1,1000);
	}
}

function initScene() {
	/*var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.0,10,10), 
		new THREE.MeshLambertMaterial( { color : 0x00FF00}));
	scene.add(sphere); */
	cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
		new THREE.MeshBasicMaterial( { color : 0x00FF00} ));
	//scene.add(cube);
	createCubes(100);
	camera.position.z = 10;
	var pointLight = new THREE.PointLight(0xFFFFFF); 
	pointLight.position.z = 10;
	scene.add(pointLight);	
}

function loop() { 
	drawScene(); 
	updateData(); 
	window.requestAnimationFrame(loop); 
}

function drawScene() {
	renderer.render(scene,camera);
}

var angleX=0.0; 
function updateData() { 
	angleX=angleX+0.02; 
	cube.rotateOnAxis(new THREE.Vector3(1,0,0),angleX);
	//cube.translateOnAxis(new THREE.Vector3(1,0,0),0.5);	
	var projector=new THREE.Projector(); 
	var ray=projector.pickingRay(new THREE.Vector3(0,0,0),camera);
	var arrayIntersect=ray.intersectObjects(scene.children); 
	if (arrayIntersect.length>0) { 
		var first = arrayIntersect[0]; 
		console.log(first.distance); 
		console.log(first.point); 
		first.object.rotation.z+=0.1; 
	}
}

function createCubes(nbCubes) {
	for(var i=0; i<nbCubes; i++) {
		var cubeSize = Math.random();
		var newCube = new THREE.Mesh(new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize),
		new THREE.MeshLambertMaterial( { color : Math.random()*0xFFFFFF } ));
		var xTranslationLenght = -4 + Math.random()*8;
		var yTranslationLenght = -4 + Math.random()*8;
		var zTranslationLenght = -4 + Math.random()*8;
		newCube.translateOnAxis(new THREE.Vector3(1,0,0),xTranslationLenght);
		newCube.translateOnAxis(new THREE.Vector3(0,1,0),yTranslationLenght);
		newCube.translateOnAxis(new THREE.Vector3(0,0,1),zTranslationLenght);
		scene.add(newCube);		
	}
}

function handleKeyDown(event) { 
	switch (event.keyCode) { 
		case 90 /* z */: camera.translateOnAxis(new THREE.Vector3(0,0,-1),0.2);break; 
		case 83 /* s */: camera.translateOnAxis(new THREE.Vector3(0,0,1),0.2);break; 
		case 81 /* q */: camera.rotateOnAxis(new THREE.Vector3(0,1,0),0.02);break; 
		case 68 /* d */: camera.rotateOnAxis(new THREE.Vector3(0,-1,0),0.02);break;  
		case 65 /* a */: camera.rotateOnAxis(new THREE.Vector3(1,0,0),0.02);break; 
		case 69 /* e */: camera.rotateOnAxis(new THREE.Vector3(-1,0,0),0.02);break; 
	}
} 

window.addEventListener("keydown",handleKeyDown,false);

function onclick_page(event) {
  x = event.clientX;
  y = event.clientY;
}

function main(){
	initGL();
	initScene();
	loop();
}
