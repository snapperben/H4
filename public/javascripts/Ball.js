/**

 */
"use strict";
define([], function () {
	var Ball = function (_id, _radius, _colour) {
		this.id = _id;
		this.radius = _radius||25;
		this.colour = _colour||xFFF;

		this.startX  = 0;
		this.startY  = 0;
		this.initialSpeed  = 0;
		this.initialDir = 0;
	};
	Ball.prototype.setMotion = function(_dir, _speed, _startTime){

	};
	/**
	 * Sets a ball's initialtradjectory
	 * @param _dir
	 * @param _speed
	 * @param _startTime
	 */
	Ball.prototype.fire = function(_dir, _speed, _startTime){

	};

	/**
	 * Sets a ball's new trajectory after a bounce
	 * @param _dir
	 * @param _speed
	 * @param _startTime
	 */
	Ball.prototype.bounce = function(_dir, _speed, _startTime){

	};
	return Ball;
});
