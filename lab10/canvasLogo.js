// Debug vars
var DEBUG = false;
var NODES = false;
var VALUES = false;

// GLOBAL VARIABLES
var canvas;





/* MAIN METHOD */
function initiate(){
	// Setup the canvas
	var elem=document.getElementById('canvas');
	canvas=elem.getContext('2d');

	// Draw the Logo
	drawLogo(0,0, 500, 70, 10);

}







function drawLogo(positionX, positionY, width, height, padding) {
	
	// Calculate Position of Elements
	var graphicAX = positionX + padding;
	var graphicAY = positionY + padding;
	
	// GraphicA
	var graphicAWidth = width / 6;
	var graphicAHeight = height;
	
	// Underline
	var underlineX1 = graphicAWidth + padding;
	var underlineY1 = height + padding;
	var underlineX2 = width - graphicAWidth - (padding * 2);
	var underlineY2 = height + padding;
	
	// Text
	var textX = positionX + graphicAWidth + (padding * 2);
	var textY = underlineY1;
	
	// Colors
	
	if (DEBUG && NODES) alert("Enter drawLogo(positionX, positionY)" + "\n"
								+ "positionX: " + positionX + "\n"
								+ "positionY: " + positionY + "\n"
								+ "graphicAWidth: " + graphicAWidth + "\n"
								+ "graphicAHeight: " + graphicAHeight + "\n");
	
	
								
	// Draw the Elements of the Logo
	drawUnderline(underlineX1, underlineY2, underlineX2, underlineY2, "red", 3);
	drawGraphicA(graphicAX, graphicAY,  width / 6 , height);
	drawText(textX, textY, "mericana Co");
	
}

function drawUnderline(x1, y1, x2, y2, stroke, strokeSize) {
	if (DEBUG && NODES) alert("Enter drawUnderline(x1, y1, x2, y2, stroke, strokeSize)");
	// Set Stroke
	canvas.strokeStyle = stroke;
	
	// Set Line Width
	canvas.lineWidth = strokeSize;
	
	// Move Pen
	canvas.moveTo(x1, y1);
	
	// Create Path
	canvas.lineTo(x1, y1);
	canvas.lineTo(x2, y2);
	
	// Add the Stroke
	canvas.stroke();
	
	// Save
	canvas.save();
	
	// Reset Canvas
	canvas.lineWidth = 1;
}

function drawGraphicA(positionX, positionY, width, height) {
	
	// Dark Square
	var sqrPadding = width * ( 1 / 16 );
	var sqrPosX = positionX + (width / 4) + sqrPadding;
	var sqrPosY = positionY + (height / 2);
	var sqrWidth = width * (3 / 8);
	var sqrHeight = sqrPosY - positionY; 

	// Fill/Stroke
	var sqrFill = 'rgb(125,0,0)';
	var whiteFill = "white";
	var noStroke = "none";
		
	drawBackA(positionX, positionY, width, height);
	drawDarkSquare(sqrPosX, sqrPosY, sqrWidth, sqrHeight, sqrFill, noStroke);
	drawWhiteTriangle(sqrPosX + 1, sqrPosY + 1, sqrWidth - 2, sqrHeight - 1, whiteFill, whiteFill);	
}

function drawText(positionX, positionY, string) {
	canvas.fillStyle = 'red';
	canvas.font="italic 48px Arial, sans-serif";
	canvas.textAlign="start";
	canvas.textBaseline="bottom";
	canvas.fillText(string, positionX, positionY);
}

function drawBackA(positionX, positionY, width, height) {
	// Create Gradieant Color Scheme

	var colorScheme = [ 'rgb(150,0,0)', 'rgb(255,0,0)' ];
	if (DEBUG && VALUES) alert("colorScheme: " + colorScheme.toString());
	if(DEBUG) alert("REPLACE WITH TRIANGLE CLASS!");
	var gradient = createGradient(75, 10, 75, 300, colorScheme);
	drawBalancedTriangle(positionX, positionY, width, height, gradient, "none");
}

function drawDarkSquare(positionX, positionY, width, height, fillstyle, strokestyle) {
	
	// Setup Fill & Stroke
	canvas.fillStyle = fillstyle;
	canvas.strokeStyle = strokestyle;
	
	// Reposition Pen
	canvas.moveTo(positionX, positionY);
	
	// Draw Rect
	canvas.fillRect(positionX,positionY,width,height);
	
	// Save
	canvas.save();
		
}

function drawWhiteTriangle(positionX, positionY, width, height, fillstyle, strokestyle) {
	drawBalancedTriangle(positionX, positionY, width, height, fillstyle, strokestyle);
}



// CONVENIENCE METHODS
function drawBalancedTriangle(positionX, positionY, width, height, fillstyle, strokestyle) {
	if (DEBUG && NODES) alert("Enter drawBalancedTriangle(positionX, positionY, width, height, fillstyle)" + "\n"
								+ "positionX: " + positionX + "\n"
								+ "positionY: " + positionY + "\n"
								+ "width: " + width + "\n"
								+ "height: " + height + "\n"
								+ "fillstyle: " + fillstyle + "\n");
								
	// Calculate the 'Points' for the drawing the shape
	var topPointX = positionX + (width / 2);
	var topPointY = positionY;
	var bottomLeftPointX = positionX; // Starts at the Left edge of 'positionX'
	var bottomLeftPointY = positionY + height; // Starts at 'positionY' and moves down the height of the triangle
	var bottomRightPointX = positionX + width; // Starts at the Right edge of 'positionX' and moves right the width of the triangle
	var bottomRightPointY = positionY + height;  // Starts at 'positionY' and moves down the height of the triangle
	
	
	
	if (DEBUG && VALUES) alert("drawBalancedTriangle() Internal Variables" + "\n"
								+ "topPointX: " + topPointX + "\n"
								+ "topPointY: " + topPointY + "\n"
								+ "bottomLeftPointX: " + bottomLeftPointX + "\n"
								+ "bottomLeftPointY: " + bottomLeftPointY + "\n"
								+ "bottomRightPointX: " + bottomRightPointX + "\n"
								+ "bottomRightPointY: " + bottomRightPointY + "\n");
	
	
	// Set the Fill Style
	canvas.fillStyle = fillstyle;
	canvas.strokeStyle = strokestyle;
	
	// Position the Pen
	canvas.moveTo(topPointX, topPointY);
	
	// Begin Drawing
	canvas.beginPath();
	
	// Draw initial PointA
	canvas.lineTo(topPointX, topPointY);
	// Draw from PointA to PointB
	canvas.lineTo(bottomLeftPointX, bottomLeftPointY);
	// Draw from PointB to PointC
	canvas.lineTo(bottomRightPointX, bottomRightPointY);
	// Draw from PointC to PointA
	canvas.lineTo(topPointX, topPointY);
	
	
	// Fill the Shape
	canvas.stroke();
	canvas.fill();
	canvas.closePath();
	
	// Save
	canvas.save();
	if (DEBUG && NODES) alert("Exit drawBalancedTriangle()");
}


function createGradient(x1, y1, x2, y2, colors) {
	if (DEBUG && NODES) alert("Enter createGradient(colors)");
	var gradient = canvas.createLinearGradient(x1, y1, x2, y2);

	for (i = 0; i < colors.length; i++) {
		if(DEBUG && VALUES) alert("colors[" + i + "]: " + colors[i]);
		gradient.addColorStop( (i/colors.length) , colors[ i ] );	
	}

	return gradient;
}


window.addEventListener("load", initiate, false);