/**

 */
"use strict";
var BallController = function () {
	this.isSetup = false;

	this.setup = async function(_canvasElement){
		this.canvasElem = _canvasElement;
		this.boundingRect = _canvasElement.getBoundingClientRect();

		//this.config = await fetch('')
		var physicsUtileModule = await import('/src/PhysicsUtils.js');
		this.physicsUtils = physicsUtileModule.default
		var ballModule = await import('/src/Ball.js');
		this.Ball = ballModule.default
		var drawUtilsModule = await import('/src/DrawUtils.js');
		this.drawUtils = drawUtilsModule.default

		this.resetController(null);
		this.isSetup = true
	}

	this.resetController = function(_config){
		this.ballStore = [];
		//this.physicsUtils.setUp()
		this.drawUtils.setup(this.canvasElem.getContext('2d'));
	}
	this.setBounds = function () {

	}
	this.canvasClick = function (_event) {
		if (this.isSetup) {
			var clickX = _event.clientX - this.boundingRect.left,
				clickY = _event.clientY - this.boundingRect.top;

			console.log('Canvas clicked = X:' + clickX + ', Y:' + clickY);
			console.log('X% :' + Math.floor(clickX / this.boundingRect.width * 10000) / 100 +
							', Y%:' + Math.floor(clickY / this.boundingRect.height * 10000) / 100)
		}
	}

	this.createBall = function(_initialX,_initialY, _radius){
		let dir = physicsUtils.calcRandDir(),
			speed = physicsUtils.calcRandSpeed(),
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
}
export default new BallController ()
