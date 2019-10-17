/**

 */
"use strict";

define([], function () {
	var PhysicsUtils = function () {
		this.calculatePositionDelta = function(_speedX, _speedY, _massCoeff, _radiusCoeff) {
			let inSpeedX = Number(_speedX),
				inSpeedY = Number(_speedY),
				radiusCoefficient = Number(_radiusCoeff||1),
				massCoefficient = Number(_massCoeff||1);

			return {
				speedX: inSpeedX - (inSpeedX * (this.drag * 1/radiusCoefficient)),
				speedY: inSpeedY - (inSpeedX * (this.gravity * 1/massCoefficient))
			}
		};

		this.calculateInitialSpeed = function(_dir, _speed) {
			let dir = Number(_dir),
				speed = Number(_speed);

			// TODO : USed polar coordinates to determine the initial velocities
			return {
				speedX: inSpeedX - (inSpeedX * (this.drag * 1/radiusCoefficient)),
				speedY: inSpeedY - (inSpeedX * (this.gravity * 1/massCoefficient))
			}
		};

		this.getRandomDir = function(){
			return Math.random()*(this.dirMax-this.dirFloor)
		};

		this.getRandomSpeed = function(){
			return Math.random()*(this.speedMax-this.speedFloor)
		};

		this.getRandomBallMass = function(){
			return Math.random()*(this.ballMassMax-this.ballMassFloor)
		};

		this.setConstants = function(_gravity, _drag,
									 _ballMassFloor, _ballMassMax,
									 _dirFloor, _dirMax,
									 _speedFloor, _speedMax){
			this.gravity = _gravity;
			this.drag = _drag;
			this.ballMassFloor = _ballMassFloor;
			this.ballMassMax = _ballMassMax;
			this.speedFloor = _speedFloor;
			this.speedMax = _speedMax;
			this.dirFloor = _dirFloor;
			this.dirMax = _dirMax
		};
	};


	return new PhysicsUtils
});