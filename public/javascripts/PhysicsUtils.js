/**

 */
"use strict";

define([], function () {
	var PhysicsUtils = function () {
		this.calculatePositionDelta = function(_speedX, _speedY, _massCoeff, _radiusCoeff) {
			let inSpeedX = this.numCnv(_speedX),
				inSpeedY = this.numCnv(_speedY),
				radiusCoefficient = this.numCnv(_radiusCoeff,1),
				massCoefficient = this.numCnv(_massCoeff,1);

			return {
				speedX: inSpeedX - (inSpeedX * (this.drag * 1/radiusCoefficient)),
				speedY: inSpeedY - (inSpeedX * (this.gravity * 1/massCoefficient))
			}
		};

		this.calculateCollision = function(_dir, _speed, _x, _y) {
			let dir = this.numCnv(_dir)*180/Math.PI,
				speed = this.numCnv(_speed),
				isHorizCollision = false,
				isVertCollision = false,
				postCollisionDir = 0;

			return {
				speedX: speed * Math.cos(dir),
				speedY: speed * Math.sin(dir),
				dir: postCollisionDir
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
		this.calculatePostCollisonSpeed = function(_speedX, _speedY, _isXCollison) {
			let inSpeedX = this.numCnv(_speedX),
				inSpeedY = this.numCnv(_speedY),
				isXCollision = _isXCollison===true;

			return {
				speedX: speedX * (isXCollision?-1:1) * this.collisionCoefficient,
				speedY: speedX * (isXCollision?1:-1) * this.collisionCoefficient
			}
		};

		this.calculateInitialSpeed = function(_dir, _speed) {
			let dir = Number(_dir)*180/Math.PI,
				speed = Number(_speed);

			return {
				speedX: speed * Math.cos(dir),
				speedY: speed * Math.sin(dir)
			}
		};

		this.getRandomBallMass = function(){
			return Math.random()*(this.ballMassMax-this.ballMassFloor)
		};

		this.getRandomDir = function(){
			return Math.random()*(this.dirMax-this.dirFloor)
		};

		this.getRandomSpeed = function(){
			return Math.random()*(this.speedMax-this.speedFloor)
		};

		this.isNum = function(_data) {
			return !(isNaN(Number(_data))||isUndef(_data))
		};

		this.numCnv = function(_value,_default, _noZero) {
			return _value === undefined || (isNaN(Number(_value)) || (_value === 0 && _noZero === true)) ?
				(typeof _default === 'number' ? Number(_default) : _default)
				: Number(_value)
		};
		this.setConstants = function(_gravity, _drag,
									 _ballMassFloor, _ballMassMax,
									 _dirFloor, _dirMax,
									 _speedFloor, _speedMax){
			this.gravity = this.numCnv(_gravity);
			this.drag = this.numCnv(_drag);
			this.ballMassFloor = this.numCnv(_ballMassFloor);
			this.ballMassMax = this.numCnv(_ballMassMax);
			this.speedFloor = this.numCnv(_speedFloor);
			this.speedMax = this.numCnv(_speedMax);
			this.dirFloor = this.numCnv(_dirFloor);
			this.dirMax = this.numCnv(_dirMax)
		};

		/**
		 * Sets up some parameters of the active space
		 * @param _maxX - The maximum x value allowed
		 * @param _maxY - The maximum Y value allowed
		 * @param _collisionEfficiency - A number which says how much a ball is slowed/sped up after a collision
		 */
		this.setDimentions = function(_maxX, _maxY, _collisionEfficiency){
			this.maximumX = this.numCnv(_maxX);
			this.maximumY = this.numCnv(_maxY);
			this.collisionCoefficient = 1/this.numCnv(_collisionEfficiency, 1, true)
		};

		this.testForCollision = function (_x, _y) {
			var minX = _x -_radius,maxX = _x + _radius,
				minY = _y -_radius,maxY = _y + _radius,
				xColl = minX <= 0 || maxX >= this.maximumX,
				yColl = minY <= 0 || maxY >= this.maximumY;
			return {
				isCollision: xColl || yColl,
				isXCollision: xColl
			}
		};
	}
	return new PhysicsUtils
});