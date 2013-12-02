var gl;
var programShader;
var verticesBuffer;
var colorsBuffer;
var textureBuffer;
var textureImage; 

function initGL(){
	canvas=document.getElementById("webglCanvas");
	gl=canvas.getContext("webgl");
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
	}
}

function initShaders() {
	programShader=createProgram("hello");
}

function initBuffers() {
	var vertices = [
      	 0.0,  0.5,  0.0,
         -0.5, -0.5,  0.0,
         0.5, -0.5,  0.0
   	];
   	verticesBuffer = gl.createBuffer();
   	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
   	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var colors = [
         1.0, 0.0, 0.0, 1.0,
         0.0, 0.0, 1.0, 1.0,
         0.0, 1.0, 0.0, 1.0
    	];
	colorsBuffer = gl.createBuffer();
   	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	textureBuffer = gl.createBuffer(); 
    	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer); 
    	var textures = [ 
      	 0.0,  0.5,  0.0,
         -0.5, -0.5,  0.0,
         0.5, -0.5,  0.0
	]; 
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW); 
    	textureBuffer.itemSize = 2; 
    	textureBuffer.numItems = 24;
}

function initTexture() { 
	textureImage = gl.createTexture(); 
	textureImage.image = new Image(); 
    	textureImage.image.onload = function() { 
      		loadedTexture(textureImage) 
    	} 
    	textureImage.image.src = "EarthDay1024.jpg"; 
}

function loadedTexture(texture) { 
    	gl.bindTexture(gl.TEXTURE_2D, texture); 
    	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 
    	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image); 
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); 
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); 
    	gl.bindTexture(gl.TEXTURE_2D, null); 
}

function main(){
	initGL();
	initShaders();
	initBuffers();
	initTexture(); 
	loop();
}

function loop() { 
	drawScene(); 
	updateData(); 
	window.requestAnimationFrame(loop); 
}

function drawScene() {
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
   	gl.clear(gl.COLOR_BUFFER_BIT);
   
   	gl.useProgram(programShader);
 
	var position = gl.getAttribLocation(programShader, "vertexPosition");
   	gl.enableVertexAttribArray(position);
   	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
   	gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

	/*var color = gl.getAttribLocation(programShader, "vertexColor");
   	gl.enableVertexAttribArray(color);
   	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
   	gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);*/

	var texture = gl.getAttribLocation(programShader, "vertexTexture");
   	gl.enableVertexAttribArray(texture);
   	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
   	gl.vertexAttribPointer(texture, 3, gl.FLOAT, false, 0, 0); 
	
	gl.activeTexture(gl.TEXTURE0); 
    	gl.bindTexture(gl.TEXTURE_2D, textureImage); 
    	gl.uniform1i(programShader.samplerUniform, 0); 

   	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function updateData() {
}
