/**

 */
"use strict";
define([], function () {
	var BallController = function () {
		this.ballStore = [];
		this.convas = null;

		this.setup = function(){
			this.ballStore = [];
		};

		this.createBall = function(){
			let dir = PhysicsUtils.calcRandDir(),
				speed = PhysicsUtils.calcRandSpeed(),
				startTime = now(),
				ball = new Ball(this.ballStore.length);
			this.ballStore.push(ball)

			ball.fire(dir, speed, startTime)
		}

		this.animateBalls = function(){
			for (let i=0;i<this.ballStore.length;i++){
				let currBall = this.ballStore[i];

			}
		}
	};

	return new BallController();
});
