/**

 */
"use strict";
var BallController = function () {
	this.isSetup = false;

	this.animateBalls = function(){
		this.drawUtils.clearCanvas();
		for (let i=0;i<this.ballStore.length;i++){
			let currBall = this.ballStore[i],
				newVals = this.physicsUtils.calculatePositionDelta(currBall.speedX, currBall.speedY);
			currBall.setPosition(currBall.x + newVals.deltaX, currBall.y + newVals.deltaY,
								 newVals.speedX, newVals.speedY);
			this.drawUtils.drawBall(currBall.x, currBall.y, currBall.radius, currBall.colour)

			let collisionData = this.physicsUtils.testForCollision(currBall.x, currBall.y, currBall.radius)
			if (collisionData.isCollision) {
				let postCollisionSpeeds = this.physicsUtils.calculatePostCollisonSpeed(currBall.speedX, currBall.speedY,
																					   collisionData.isXCollision, collisionData.isXYCollision)
				currBall.setPostCollisionValues(postCollisionSpeeds.speedX, postCollisionSpeeds.speedY)
			}
		}
	}

	this.canvasClick = function (_event) {
		if (this.isSetup) {
			var clickX = _event.clientX - this.boundingRect.left,
				clickY = _event.clientY - this.boundingRect.top;
			var ballId = this.createBall(clickX, clickY);
		}
	}

	this.createBall = function(_initialX,_initialY){
		let speed = this.physicsUtils.getRandomSpeed(),
			dir = this.physicsUtils.getRandomDir(),
			radius = this.getRandomRadius(),
			mass = this.getRandomMass(),
			ball = new this.Ball(this.ballStore.length, radius, mass),
			initSpeeds = this.physicsUtils.calculateInitialSpeed(dir, speed);

		console.log("New ball Dir:"+dir+", Speed:"+speed+" at x:"+_initialX+", y:"+_initialY+" (speedx:"+initSpeeds.speedX+", SpeedY:"+initSpeeds.speedY+")")
		ball.fire(_initialX, _initialY, initSpeeds.speedX, initSpeeds.speedY);
		this.ballStore.push(ball);
		return ball.id
	}

	this.getRandomMass = function(){
		return Math.random()*(this.ballMassMax-this.ballMassFloor)+this.ballMassFloor
	}

	this.getRandomRadius = function(){
		return Math.random()*(this.ballRadiusMax-this.ballRadiusFloor)+this.ballRadiusFloor
	}

	this.fullAnimationLoop = function(){
		this.animateBalls();
		window.requestFullAnimationFrame(this.fullAnimationLoop);
	}.bind(this)

	this.resetController = function() {
		let conf = this.config;
		this.ballStore = [];
		this.physicsUtils.setValues(conf.constants.fps, conf.constants.gravity,
									conf.constants.drag,conf.constants.bounce_efficiency,
									conf.variables.dir_floor, conf.variables.dir_max,
									conf.variables.speed_floor, conf.variables.speed_max);
		this.drawUtils.setup(this.canvasElem.getContext('2d'));
		this.setBallParameters(conf.balls.radius_floor, conf.balls.radius_max,
							   conf.balls.ball_mass_floor, conf.balls.ball_mass_max)
	}

	this.setBallParameters = function (_radiusFloor, _radiusMax, _massFloor, _massMax){
		this.ballRadiusFloor = this.physicsUtils.numCnv(_radiusFloor);
		this.ballRadiusMax = this.physicsUtils.numCnv(_radiusMax);
		this.ballMassFloor = this.physicsUtils.numCnv(_massFloor);
		this.ballMassMax = this.physicsUtils.numCnv(_massMax);
	}

	this.setParameterValue = function(_name, _value) {
		let val = this.numCnv(_value);
		switch (_name) {
			case 'ball_radius_floor':
				this.ballRadiusFloor = val;
				break;
			case 'ball_radius_max':
				this.ballRadiusMax = val;
				break;
			case 'ball_mass_floor':
				this.ballRadiusFloor = val;
				break;
			case 'ball_mass_max':
				this.ballRadiusMax = val;
				break;
			default:
				this.physicsUtils.setValue(_name, _value);
				break
		}
	}
	this.setup = async function(_canvasElement){
		this.canvasElem = _canvasElement;

		var configResponse = await fetch(window.document.URL+'config');
		this.config = await configResponse.json();
		var physicsUtileModule = await import('/src/PhysicsUtils.js');
		this.physicsUtils = physicsUtileModule.default;
		var ballModule = await import('/src/Ball.js');
		this.Ball = ballModule.default;
		var drawUtilsModule = await import('/src/DrawUtils.js');
		this.drawUtils = drawUtilsModule.default;

		this.resetController();
		this.setupDimensions();
		this.isSetup = true;

		let fps = this.config.constants.fps;
		if (fps > 25){
			window.requestFullAnimationFrame(this.fullAnimationLoop);
		} else {
			this.timeout = 1000/fps;
			this.slowAnimationLoop()
		}
	}

	this.setupDimensions = function(){
		this.boundingRect = this.canvasElem.getBoundingClientRect();
		this.maxX = this.boundingRect.right - this.boundingRect.left;
		this.maxY = this.boundingRect.bottom - this.boundingRect.top;
		this.physicsUtils.setDimensions(this.maxX, this.maxY);
		this.drawUtils.setDimensions(this.maxX, this.maxY);
	}

	this.slowAnimationLoop = function() {
		this.animateBalls();
		window.setTimeout(this.slowAnimationLoop, this.timeout)
	}.bind(this)
}
export default new BallController ()
