// JavaScript Document
/* POINT CLASS */
function Point (x, y) {
	// Members
	this.x = x;
	this.y = y;
	
	this.getX = function () {
		return this.x;
	}
	
	this.getY = function () {
		return this.y;	
	}
	
	this.setX = function (x) {
		this.x = x;
	}
	
	this.setY = function (y) {
		this.y = y;
	}
			
}

/* TRIANGLE CLASS */
function Triangle (positionX, positionY, width, height, canvas) {
	// Members
	this.canvas;
	this.width = width;
	this.height = height;
		
	this.points = { pointA: this.getPointA(), pointB: this.getPointB(), pointC: this.getPointC() };
	
	// Convenience Methods
	this.drawTriangle = function() {
		
	}
	
	this.init = function() {
		// Calculate the 'Points' for the drawing the shape
		var topPointX = positionX + (width / 2);
		var topPointY = positionY;
		var bottomLeftPointX = positionX; // Starts at the Left edge of 'positionX'
		var bottomLeftPointY = positionY + height; // Starts at 'positionY' and moves down the height of the triangle
		var bottomRightPointX = positionX + width; // Starts at the Right edge of 'positionX' and moves right the width of the triangle
		var bottomRightPointY = positionY + height;  // Starts at 'positionY' and moves down the height of the triangle
		
		// Top Point
		this.pointA = new Point( topPointX , topPointY );
		this.pointB = new Point( bottomLeftPointX, bottomLeftPointY );
		this.pointC = new Point( bottomRightPointX, bottomRightPointY );
	}
	
	// Getters & Setters
	this.getPointA = function () {
		return points[pointA];
	}
	
	this.getPointB = function () {
		return points[pointB];
	}
	
	this.getPointC = function () {
		return points[pointC];
	}
	
}