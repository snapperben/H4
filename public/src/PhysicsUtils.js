/**
Object to handle all calculations of a ball on the canvas
 */
"use strict";
var PhysicsUtils = function () {
	this.calculatePositionDelta = function(_speedX, _speedY, _massCoeff, _radiusCoeff) {
		let deltaX = _speedX * this.frameTime,
			deltaY = _speedY * this.frameTime,
			newSpeedX = _speedX - ((_speedX * this.drag)*this.frameTime),
			newYSpeedY = _speedY - (this.gravity + (_speedY * this.drag));

		return {
			deltaX: deltaX,
			deltaY: deltaY,
			speedX: newSpeedX,
			speedY: newYSpeedY
		}
	};

	/**
	 * Calculate the initial speeds (returned as an array)
	 * @param _dir A random direction in degrees (0 == W, 90 === S)
	 * @param _speed a random speed in pixels per second
	 * @return {{speedY: number, speedX: number}}
	 */
	this.calculateInitialSpeed = function(_dir, _speed) {
		let dir = Number(_dir)/360*2*Math.PI,
			speed = Number(_speed);

		return {
			speedX: speed * Math.cos(dir),
			speedY: speed * Math.sin(dir)
		}
	};
	/**
	 * Calculates the new speeds after a collision
	 *
	 * @param _speedX - Incomming x speed
	 * @param _speedY - Incomming y speed
	 * @param _isXCollison - if true the collision is with the vertical sides (X changes sign)
	 *
	 * @return {{speedY: number, speedX: number}}
	 */
	this.calculatePostCollisonSpeed = function(_speedX, _speedY, _isXCollison, _isCollisionBoth) {
		let inSpeedX = this.numCnv(_speedX),
			inSpeedY = this.numCnv(_speedY),
			isXCollision = _isXCollison===true,
			inCorner = _isCollisionBoth===true;

		return {
			speedX: inSpeedX * (isXCollision?-1:inCorner?-1:1) * this.bounceEfficiency,
			speedY: inSpeedY * (isXCollision?inCorner?-1:1:-1) * this.bounceEfficiency
		}
	};

	this.getRandomDir = function(){
		return Math.random()*(this.dirMax-this.dirFloor) + this.dirFloor
	};

	this.getRandomSpeed = function(){
		return Math.random()*(this.speedMax-this.speedFloor) + this.speedFloor
	};

	this.isNum = function(_data) {
		return !(isNaN(Number(_data))||isUndef(_data))
	};

	this.numCnv = function(_value,_default, _noZero) {
		return _value === undefined || (isNaN(Number(_value)) || (_value === 0 && _noZero === true)) ?
			(typeof _default === 'number' ? Number(_default) : _default)
			: Number(_value)
	};
	this.setValue = function(_name, _value) {
		let val = this.numCnv(_value);
		switch(_name){
			case 'fps':
				this.frameTime = 1/val;
				break;
			case 'gravity':
				this.gravity = val;
				break;
			case 'bounce_efficiency':
				this.bounceEfficiency = val;
				break;
			case 'drag':
				this.drag = val;
				break;
			case 'dir_floor':
				this.dirFloor = val;
				break;
			case 'dir_max':
				this.dirMax = val;
				break;
			case 'speed_floor':
				this.speedFloor = val;
				break;
			case 'speed_max':
				this.speedMax = val;
				break;
			default:
				console.log("Physics Utils::setValue -> Unknown parameter '"+_name+"' supplied!");
				 break
		}
	}

	this.setValues = function(_fps, _gravity, _drag, _bounceEff, _dirFloor, _dirMax,
							  _speedFloor, _speedMax) {
		this.frameTime = 1/this.numCnv(_fps);
		this.gravity = this.numCnv(_gravity);
		this.drag = this.numCnv(_drag);
		this.speedFloor = this.numCnv(_speedFloor);
		this.speedMax = this.numCnv(_speedMax);
		this.dirFloor = this.numCnv(_dirFloor);
		this.dirMax = this.numCnv(_dirMax);
		this.bounceEfficiency = this.numCnv(_bounceEff)
	}

	/**
	 * Sets up some parameters of the active space
	 * @param _maxX - The maximum x value allowed
	 * @param _maxY - The maximum Y value allowed
	 * @param _collisionEfficiency - A number which says how much a ball is slowed/sped up after a collision
	 */
	this.setDimensions = function(_maxX, _maxY, _collisionEfficiency){
		this.maximumX = this.numCnv(_maxX);
		this.maximumY = this.numCnv(_maxY);
		this.collisionCoefficient = 1/this.numCnv(_collisionEfficiency, 1, true)
	};

	this.setup = function(_canvasBoundingRect){

	}

	this.testForCollision = function (_x, _y, _radius) {
		var minX = _x -_radius,maxX = _x + _radius,
			minY = _y -_radius,maxY = _y + _radius,
			xColl = minX <= 0 || maxX >= this.maximumX,
			yColl = minY <= 0 || maxY >= this.maximumY;
		return {
			isCollision: xColl || yColl,
			isXYCollision: xColl && yColl,
			isXCollision: xColl
		}
	};
}

export default new PhysicsUtils()