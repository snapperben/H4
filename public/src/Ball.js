/**
 Object to encapsulate all properties of a ball
 */
"use strict";
var Ball = function (_id, _radius, _mass, _colour) {
	this.id = _id;
	this.radius = _radius||25;
	this.colour = _colour||'#xFFF';
	this.mass = _mass

	this.x  = 0;
	this.y  = 0;
	this.initialSpeed  = 0;
	this.initialDir = 0;
};

/**
 * Sets a ball's initialtradjectory
 * @param _dir - The ball's initial direction
 * @param _speed - the ball's initial speed
 */
Ball.prototype.fire = function(_x, _y, _speedX, _speedY){
	this.x  = _x;
	this.y  = _y;
	this.speedX = _speedX;
	this.speedY = _speedY
};

Ball.prototype.setPosition = function(_x, _y, _xSpeed, _ySpeed){
	this.x = _x;
	this.y = _y;
	this.speedX = _xSpeed;
	this.speedY = _ySpeed;

	if (this.inCollision === true){
		this.inCollision = false
	}
}

Ball.prototype.setPostCollisionValues = function(_xSpeed, _ySpeed) {
	this.speedX = _xSpeed;
	this.speedY = _ySpeed;
}

export default Ball;
