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
			currBall.setPosition(currBall.x + newVals.deltaX, currBall.x + newVals.deltaX,
								 newVals.speedX, newVals.speedX);
			this.drawUtils.drawBall(currBall.x, currBall.y, currBall.radius, currBall.colour)
		}
	}

	this.canvasClick = function (_event) {
		if (this.isSetup) {
			var clickX = _event.clientX - this.boundingRect.left,
				clickY = _event.clientY - this.boundingRect.top;

			var ballId = this.createBall(clickX, clickY)
			console.log('New ball created (id:'+ballId+') X:' + clickX + ', Y:' + clickY);
			console.log('X% :' + Math.floor(clickX / this.boundingRect.width * 10000) / 100 +
							', Y%:' + Math.floor(clickY / this.boundingRect.height * 10000) / 100)
		}
	}

	this.createBall = function(_initialX,_initialY){
		let speed = this.physicsUtils.getRandomSpeed(),
			dir = this.physicsUtils.getRandomDir(),
			radius = this.getRandomRadius(),
			mass = this.getRandomMass(),
			ball = new Ball(this.ballStore.length, radius, mass);

		ball.fire(dir, speed);
		this.ballStore.push(ball);
		return ball.id
	}

	this.getRandomMass = function(){
		return Math.random()*(this.ballMassMax-this.ballMassFloor)
	}

	this.getRandomRadius = function(){
		return Math.random()*(this.ballRadiusMax-this.ballRadiusFloor)
	}

	this.resetController = function() {
		let conf = this.config;
		this.ballStore = [];
		this.physicsUtils.setValues(conf.constants.gravity, conf.constants.drag,
									conf.balls.ball_mass_floor, conf.balls.ball_mass_max,
									conf.variables.speed_floor, conf.variables.speed_max,
									conf.variables.dir_floor, conf.variables.dir_max);
		this.drawUtils.setup(this.canvasElem.getContext('2d'));
	}

	this.setBallParameters = function (_radiusFloor, _radiusMax, _massFloor, _massMax){
		this.ballRadiusFloor = this.numCnv(_radiusFloor);
		this.ballRadiusMax = this.numCnv(_radiusMax);
		this.ballMassFloor = this.numCnv(_massFloor);
		this.ballMassMax = this.numCnv(_massMax);
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

		this.animateBalls()
	}

	this.setupDimensions = function(){
		this.boundingRect = this.canvasElem.getBoundingClientRect();
		this.maxX = this.boundingRect.right - this.boundingRect.left;
		this.maxY = this.boundingRect.bottom - this.boundingRect.top;
		this.physicsUtils.setDimensions(this.maxX, this.maxY);
		this.drawUtils.setDimensions(this.maxX, this.maxY);
	}
}
export default new BallController ()
