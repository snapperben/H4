/**
Utilities to draw all elements on the canvas
 */
"use strict";
var DrawUtils = function () {
	this.clearCanvas = function(){
		if (this.context) {
			this.context.clearRect(0, 0, this.width, this.height)
		}
	}

	this.drawBall = function(_x, _y, _radius, _col) {
		if (this.context) {
			//this.context.strokeStyle = '#000000';
			//this.context.fillStyle = '#000000';
			this.context.beginPath();
			this.context.arc(_x, _y, _radius, 0, 2 * Math.PI);
			this.context.stroke();
			this.context.fill();
		}
	}

	this.setDimensions = function(_width, _height){
		this.width = _width;
		this.height = _height;
	}

	this.setup = function(_canvasContext){
		this.context = _canvasContext;
	}
}

export default new DrawUtils()
