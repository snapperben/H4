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

		this.calculateCollision = function(_dir, _speed, _x, _y) {
			let dir = Number(_dir)*180/Math.PI,
				speed = Number(_speed),
				isHorizCollision = false,
				isVertCollision = false,
				postCollisionDir = 0;

			return {
				speedX: speed * Math.cos(dir),
				speedY: speed * Math.sin(dir),
				dir: postCollisionDir
			}
		};

		this.calculateInitialSpeed = function(_dir, _speed, _isHCollision, _isVCollision) {
			let dir = Number(_dir)*180/Math.PI,
				speed = Number(_speed),
				isHorizCollision = _isHCollision === true,
				isVertCollision = _isVCollision === true,
				postCollisionDir = 0;

			return {
				speedX: speed * Math.cos(dir),
				speedY: speed * Math.sin(dir),
				dir: postCollisionDir
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