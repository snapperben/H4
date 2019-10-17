/**

 */
"use strict";

define([], function () {
	var PhysicsUtils = function () {
		this.calculatePositionDelta = function(_startTime, _timeNow, _speed, _dir){
			let ret = {
				deltaX:0,
				deltaY:0
			}

			return ret
		};

		this.setConstants = function(_gravity, _drag, _ballMassFloor, _ballMassMax, _dirFloor, _dirMax, _speedFloor, _speedMax){
			this.gravity = _gravity;
			this.drag = _drag;
			this.ballMassFloor = _ballMassFloor;
			this.ballMassMax = _ballMassMax;
			this.speedFloor = _speedFloor;
			this.speedMax = _speedMax;
			this.dirFloor = _dirFloor;
			this.dirMax = _dirMax
		};
		this.getRandomDir = function(){
			return Math.random()*(this.dirMax-this.dirFloor)
		}
		this.getRandomSpeed = function(){
			return Math.random()*(this.speedMax-this.speedFloor)
		}
		this.getRandomBallMass = function(){
			return Math.random()*(this.ballMassMax-this.ballMassFloor)
		}
	};


	return new PhysicsUtils
});