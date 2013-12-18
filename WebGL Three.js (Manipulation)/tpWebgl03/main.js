var gl;
var cube;
var renderer;
var scene;
var camera;
var x, y;
var directeManip;
var indirecteManip;
var plane;
var rotationManip;

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
	indirecteManip=true;
	directeManip=false;
	rotationManip=false;
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
var ray;
function updateData() { 
	angleX=angleX+0.02; 
	cube.rotateOnAxis(new THREE.Vector3(1,0,0),angleX);
	//cube.translateOnAxis(new THREE.Vector3(1,0,0),0.5);	
	var projector=new THREE.Projector(); 
	ray=projector.pickingRay(new THREE.Vector3(x,y,0),camera);
	var arrayIntersect=ray.intersectObjects(scene.children); 
	if (arrayIntersect.length>0) { 
		var first = arrayIntersect[0]; 
		//first.object.rotationManip.z+=0.1; 
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

function onClick(event) {
	x = ((event.layerX-webglCanvas.offsetLeft)/webglCanvas.width-0.5)*2;
	y = (((webglCanvas.height-1.0)-(event.layerY-webglCanvas.offsetTop))/webglCanvas.height-0.5)*2;
}

var selectedObject;
var isMouseDown;

function handleMouseDown(event) {
	x = ((event.layerX-webglCanvas.offsetLeft)/webglCanvas.width-0.5)*2;
	y = (((webglCanvas.height-1.0)-(event.layerY-webglCanvas.offsetTop))/webglCanvas.height-0.5)*2;
	
	var projector=new THREE.Projector(); 
	var ray=projector.pickingRay(new THREE.Vector3(x,y,0),camera);
	var arrayIntersect=ray.intersectObjects(scene.children); 
	if (arrayIntersect.length>0) { 
		selectedObject = arrayIntersect[0].object; 
		plane = new THREE.Plane(new THREE.Vector3(0,0,1), -selectedObject.position.z);
	}
	isMouseDown=true;
}

function handleMouseUp(event) {
	isMouseDown=false;
}

function handleMouseMove(event) {
	if(isMouseDown==true) {
		if(indirecteManip==true) {
			var newX = ((event.layerX-webglCanvas.offsetLeft)/webglCanvas.width-0.5)*2;
			var newY = (((webglCanvas.height-1.0)-(event.layerY-webglCanvas.offsetTop))/webglCanvas.height-0.5)*2;
			var deltaX = newX-x;
			var deltaY = newY-y;
			
			var transformedObject = selectedObject.localToWorld(selectedObject.position);
			transformedObject = camera.worldToLocal(transformedObject);
			
			transformedObject.x += deltaX;
			transformedObject.y += deltaY;
			
			transformedObject = camera.localToWorld(transformedObject);
			selectedObject.position = selectedObject.worldToLocal(transformedObject);
			
			x=newX;
			y=newY;
		} 
		if(directeManip==true) {
			var newX = ((event.layerX-webglCanvas.offsetLeft)/webglCanvas.width-0.5)*2;
			var newY = (((webglCanvas.height-1.0)-(event.layerY-webglCanvas.offsetTop))/webglCanvas.height-0.5)*2;
			var vector = new THREE.Vector3(newX, newY, 0);
			var projector = new THREE.Projector();
			var ray = projector.pickingRay(vector, camera);

			var normal = camera.localToWorld(new THREE.Vector3(0, 0, 1));
			normal = selectedObject.worldToLocal(normal);

			plane.setFromNormalAndCoplanarPoint(normal, selectedObject.position);

			selectedObject.position.x = ray.ray.intersectPlane(plane).x
			selectedObject.position.y = ray.ray.intersectPlane(plane).y;
				
			x=newX;
			y=newY;				
        }
		if(rotationManip==true) {
			var newX = ((event.layerX-webglCanvas.offsetLeft)/webglCanvas.width-0.5)*2;
			var newY = (((webglCanvas.height-1.0)-(event.layerY-webglCanvas.offsetTop))/webglCanvas.height-0.5)*2;
			
			var angleX = camera.localToWorld(new THREE.Vector3(1,0,0));			
			angleX = selectedObject.worldToLocal(angleX);
			
			var angleY = camera.localToWorld(new THREE.Vector3(0,1,0));
			angleY = selectedObject.worldToLocal(angleY);
			
			var center = camera.localToWorld(new THREE.Vector3(0,0,0));
			center = selectedObject.worldToLocal(center);
			
			var deltaX = newX-x;
			var deltaY = newY-y;

			selectedObject.rotateOnAxis(angleX.sub(center), -deltaY*2/10);
			selectedObject.rotateOnAxis(angleY.sub(center), deltaX*2/10);
			
			x=newX;
			y=newY;
		}
	}
}

function handleMousewheel(event) { 
	var wheelX = ((event.layerX-webglCanvas.offsetLeft)/webglCanvas.width-0.5)*2;
	var wheelY = (((webglCanvas.height-1.0)-(event.layerY-webglCanvas.offsetTop))/webglCanvas.height-0.5)*2;	
	var projector=new THREE.Projector(); 
	var ray=projector.pickingRay(new THREE.Vector3(wheelX,wheelY,0),camera);
	var arrayIntersect=ray.intersectObjects(scene.children); 
	if (arrayIntersect.length>0) { 
		arrayIntersect[0].object.translateOnAxis(ray.ray.direction,event.detail/10);
	}
}
	
function main(){
	initGL();
	initScene();
	loop();
}
