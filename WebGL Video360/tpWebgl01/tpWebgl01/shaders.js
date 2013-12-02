/** **************************************** * read shaders (read from html elements) and compile * **/ 
function getVertShader() { 
	var vertCode =
		'attribute vec2 vertexPosition;' +
		'attribute vec4 vertexColor;'+
		'attribute vec2 vertexTexture;' +
		'varying vec4 vColor;' +
		'varying vec2 vTexture;' +
		'void main(void) {' +
		'  gl_Position = vec4(vertexPosition, 0.0, 1.0);' +
		'  /*vColor = vertexColor;*/' +
		'  vTexture = vertexTexture;' +
		'}';

   	var vertShader = gl.createShader(gl.VERTEX_SHADER);
   	gl.shaderSource(vertShader, vertCode);
   	gl.compileShader(vertShader);
   	if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS))
     		throw new Error(gl.getShaderInfoLog(vertShader));
	return vertShader;	
} 

function getFragShader() {
	var fragCode =
		'precision mediump float;' +
		'varying vec4 vColor;' +
		'varying vec2 vTexture;' +
		'uniform sampler2D sampler;' +
      		'void main(void) {' +
      		'   /*gl_FragColor = vColor;*/' +
		'   gl_FragColor = texture2D(sampler, vec2(vTexture.s, vTexture.t));' +
      		'}';

   	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
   	gl.shaderSource(fragShader, fragCode);
   	gl.compileShader(fragShader);
   	if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS))
      		throw new Error(gl.getShaderInfoLog(fragShader));
	return fragShader;
}

/** ******************************************* */ /** create the program shader (vertex+fragment) : code is read from html elements * */ 
function createProgram(id) { 
	var programShader = gl.createProgram();
   	gl.attachShader(programShader, getVertShader());
   	gl.attachShader(programShader, getFragShader());
   	gl.linkProgram(programShader);
   	if (!gl.getProgramParameter(programShader, gl.LINK_STATUS))
      		throw new Error(gl.getProgramInfoLog(programShader));
	console.log("compilation shader ok"); 
	return programShader; 
}
