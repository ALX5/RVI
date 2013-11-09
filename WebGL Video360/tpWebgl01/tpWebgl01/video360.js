var gl;
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

function initDataGL() {
	//createProgram();
	//getShader();
}

function main(){
	initGL();
}

/** **************************************** * read shaders (read from html elements) and compile * **/ 
function getShader(id) { 
	var shaderScript = document.getElementById(id); 
	var k = shaderScript.firstChild; 
	var str=k.textContent; 
	var shader; 
	if (shaderScript.type == "x-shader/x-fragment") { 
		shader = gl.createShader(gl.FRAGMENT_SHADER); 
	} else if (shaderScript.type == "x-shader/x-vertex") { 
		shader = gl.createShader(gl.VERTEX_SHADER); 
	} 
	gl.shaderSource(shader, str); 
	gl.compileShader(shader); 
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { 
		alert(gl.getShaderInfoLog(shader)); 
		return null; 
	} 
	return shader; 
} 

/** ******************************************* */ /** create the program shader (vertex+fragment) : code is read from html elements * */ 
function createProgram(id) { 
	var programShader=gl.createProgram(); 
	var vert=getShader(id+"-vs"); 
	var frag=getShader(id+"-fs"); 
	gl.attachShader(programShader,vert); 
	gl.attachShader(programShader,frag); 
	gl.linkProgram(programShader); 
	if (!gl.getProgramParameter(programShader,gl.LINK_STATUS)) { 
		alert(gl.getProgramInfoLog(programShader)); 
		return null; 
	} 
	console.log("compilation shader ok"); 
	return programShader; 
}
