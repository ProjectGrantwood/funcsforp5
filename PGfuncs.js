/** @object Object containing some useful constants
*/
const PG = {
	PHI: (1 + Math.sqrt(5)) / 2,
	aPHI: (1 + Math.sqrt(5)) / 2 - 1,
	E: Math.E,
	PI: Math.PI,
	TAU: Math.PI * 2,
	R2: Math.sqrt(2),
	R3_4: Math.sqrt(3 / 4),
};

function asinh(input) {
	return Math.asinh(input);
}

function acosh(input) {
	return Math.acosh(input);
}

function atanh(input) {
	return Math.atanh(input);
}

function sinh(input) {
	return Math.sinh(input);
}

function cosh(input) {
	return Math.cosh(input);
}

function tanh(input) {
	return Math.tanh(input);
}

function ctg(input){
	return 1/Math.tan(input);
}

function sec(input){
	return 1/Math.cos(input);
}

function csc(input){
	return 1/Math.sin(input);
}

function sin2(input){
	return (1-Math.cos(2*input))/2;
}

function cos2(input){
	return (1+Math.cos(2*input))/2;
}

function tan2(input){
	return (sin2(input)*2)/(cos2(input)*2);
}

function ctg2(input){
	return (cos2(input)*2)/(sin2(input)*2);
}

function scaleMovingObject(anObject, amount){
	anObject.size*=amount;
	anObject.vel.mult(amount);
}

function pgLog(x, y=Math.E) {
	return Math.log(x) / Math.log(y);
}

function pgBin(val){
		return (val>>>0).toString(2);
}

function bitRotDown(val, spaces){
	let valStr = pgBin(val);
	for (let i = 0; i < spaces; i ++){
		let valArr = Array.from(valStr);
		let final = valArr[valArr.length-1];
		valArr.pop();
		valArr.reverse();
		valArr.push(final);
		valArr.reverse();
		valStr = "";
		for (let dig of valArr){
			valStr+=dig;
		}
	}
	return parseInt(valStr, 2);
}

function bitRotUp(val, spaces){
	let valStr = pgBin(val);
	for (let i = 0; i < spaces; i ++){
		let valArr = Array.from(valStr);
		let first = valArr[0];
		let final = valArr[valArr.length-1];
		valArr.reverse();
		valArr.pop();
		valArr.reverse();
		valArr.push(first)
		valStr = "";
		for (let dig of valArr){
			valStr+=dig;
		}
	}
	return parseInt(valStr, 2);
}

function nacci(maxValue, returnSequence = false){
	let fib;
	let nFib = 2;
	let pFib = 1;
	let count = 0;
	if (returnSequence === false){
		fib = 1;
		while(count<=maxValue-2){
			nFib += fib;
			pFib = fib;
			fib = nFib - pFib;
			count++;
		}
	} else if (returnSequence === true){
		fib = [1];
		while(count<=maxValue-2){
			nFib += fib[count];
			pFib = fib[count];
			fib.push(nFib - pFib);
			count++;
		}
	}
	return fib;
}

function partition(val, amt){
	let valCopy = val;
	let ratio = valCopy/(amt - 1)
	if (ratio < 1){
		console.log('function partition() failed: argument "val" must be greater than or equal to argument "amt"')
	}
	else {
		let arrayOfVals = [];
		while (arrayOfVals.length < amt-1) {
			let toAdd = Math.floor(Math.floor(Math.random() * ratio)+ratio/2);
			valCopy -= toAdd;
			arrayOfVals.push(toAdd)
		}
		arrayOfVals.push(valCopy)
		return arrayOfVals;
	}
}

function randomNumberArray(len, arrayMax, arrayMin=0, roundingType='NONE') {
	if (roundingType === 'NONE') {
		return Array.from(Array(len), ()=>(arrayMin + Math.random() * arrayMax));
	} else if (roundingType === 'FLOOR') {
		return Array.from(Array(len), ()=>(Math.floor(arrayMin + Math.random() * arrayMax)));
	} else if (roundingType === 'CEIL') {
		return Array.from(Array(len), ()=>(Math.ceil(arrayMin + Math.random() * arrayMax)));
	} else if (roundingType === 'ROUND') {
		return Array.from(Array(len), ()=>(Math.round(arrayMin + Math.random() * arrayMax)));
	}
}

function pickFrom(iterable) {
	return iterable[Math.floor(Math.random() * iterable.length)];
}

function inc(input, increment, roundingType='ROUND') {
	if (roundingType === 'FLOOR') {
		return Math.floor(input / increment) * increment;
	} else if (roundingType === 'CEIL') {
		return Math.ceil(input / increment) * increment;
	} else if (roundingType === 'ROUND') {
		return Math.round(input / increment) * increment;
	}
}

function pgNorm(val, min, max) {
	return function(val) {
		return (val - min) / (max - min);
	}
	;
}

function pTest(prob, scale=1, testVal=Math.random()) {
	if (testVal * scale <= prob) {
		return 1;
	} else {
		return 0;
	}
}

/** @function
* description: a wrapping function for p5js.
* currently only accepts objects that contain an "x" and "y" property, and updates those properties accordingly.
* this is intended to work primarily with p5.Vector objects, but can work with any object that has properties labeled "x" and "y".
*/
function pgWrap(p5Vector, constraints=[0, width, 0, height]) {
	if (p5Vector.x < constraints[0]) {
		p5Vector.x = constraints[1];
	}
	if (p5Vector.x > constraints[1]) {
		p5Vector.x = constraints[0];
	}
	if (p5Vector.y < constraints[2]) {
		p5Vector.y = constraints[3];
	}
	if (p5Vector.y > constraints[3]) {
		p5Vector.y = constraints[2];
	}
	return p5Vector;
}

/** @function
* description: a custom linear interpolation function. This function automatically rounds to four decimal places (with optional parameters for greater precision), and
* also allows the user to require all weighting to be added to the minimum value of the two first arguments, rather than the first argument.
* parameters: (value 1, value 2, distance, significant digits, force distance weight on the lower value)
*/

function pgLerp(v0, v1, t, sigDig=4, force_positive_direction=false) {
	let rawLerp;
	let sigDigExpansion = Math.pow(10, sigDig);
	if (force_positive_direction === false) {
		rawLerp = (1 - t) * v0 + t * v1;
	} else if (force_positive_direction === true) {
		let lowVal = Math.min(v0, v1);
		let highVal = Math.max(v0, v1);
		rawLerp = (1 - t) * lowVal + t * highVal;
	}
	return Math.round(sigDigExpansion * rawLerp) / sigDigExpansion;
}

/**rInc()
* description: returns a random value within a specified range, rounded to a user-specified increment.
* parameters: (input, increment, ['CEIL', 'FLOOR', 'ROUND'])
*/
function rInc(input, increment, roundingType='ROUND') {
	return inc(Math.random() * input, increment, roundingType);
}

/** expandToInt()
* description: takes a float value of and multiplies it by 10 (using recursion) until it is an integer.
*parameters: (float)
*/
function expandToInt(floatVal) {
	if (Math.round(floatVal) === floatVal) {
		return floatVal;
	} else {
		return expandToInt(floatVal * 10);
	}
}
/** reduceTo()
* description: reduces the user input incrementally by a given factor (default ten) for a given number of iterations.
* parameters: (input number, number of iterations, factor by which to reduce)
*/
function reduceTo(input, iterations, factor=10) {
	let output = input;
	for (let i = Math.pow(factor, iterations); i > (1 / (Math.pow(factor, iterations))); i /= factor) {
		output /= i;
	}
	return output;
}
/** merp()
  description: A function that returns the linear interpolation of two different values, with a set distance determined by
  the square root of the product of the sum and the difference of those values (normalized between 0 and 1 using p5's norm() function).
  parameters: (value1, value2)--note: these values may be out of order, as the function automatically determines which
  is the greater of the two values.
*/
function merp(val1, val2) {
	let high = Math.max(val1, val2);
	let low = Math.min(val1, val2);
	let distance = norm(Math.sqrt((high + low) * (high - low)), low, high);
	return pgLerp(low, high, distance);
}
/** rCol()
description: returns a random color.
parameters: (return p5 color object or array, alpha value, maximum red value, maximum green value, maximum blue value)
*/
function rCol(alpha=255, rMax=255, gMax=255, bMax=255, isP5Color=true) {
	if (isP5Color === false) {
		let r = Math.random() * rMax;
		let g = Math.random() * gMax;
		let b = Math.random() * bMax;
		return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
	} else {
		return color(Math.random() * rMax, Math.random() * gMax, Math.random() * bMax, alpha);
	}
}

function invertColor(p5Color, flags = "111"){
	if (flags !== typeof String){
		flags = flags.toString(10);
	}
	let r, g, b;
		if (flags[0]==="0"){
			r = red(p5Color);
		} else if (flags[0] === "1"){
			r = 255-red(p5Color);
		}
		if (flags[1]==="0"){
			g = green(p5Color);
		} else if (flags[1] === "1"){
			g = 255-green(p5Color);
		}
		if (flags[2]==="0"){
			b = blue(p5Color);
		} else if (flags[2] === "1"){
			b = 255-blue(p5Color);
		}
	return color(r, g, b);
}

function muss(value, scale=1) {
	return (Math.random() * value * scale) - (Math.random() * value * scale);
}

/**rLerpColor()
  description: returns a p5 color object, using the p5 lerpColor() value of the input color and a randomized color, at the specified distance.
  parameters: (p5color, ['RGB', 'HSL', 'HSB'], return range, 0<distance<1)
*/
function rLerpColor(p5color, modeType='RGB', distance=0.25) {
	let a = alpha(p5color);
	if (modeType === 'RGB') {
		let r = red(p5color) + muss(red(p5color)) * distance;
		let g = green(p5color) + muss(green(p5color)) * distance;
		let b = blue(p5Color) + muss(blue(p5Color)) * distance;
		return lerpColor(p5color, color(r, g, b, a), distance);
	} else {
		let h = hue(p5color) + muss(hue(p5color)) * distance;
		let s = saturation(p5color) + muss(saturation(p5color)) * distance;
		if (modeType === 'HSL') {
			let l = luminosity(p5color) + muss(luminosity(p5color)) * distance;
			return lerpColor(p5color, color(h, s, l, a), distance);
		} else if (modeType === 'HSB') {
			let b = brightness(p5color) + muss(brightness(p5color)) * distance;
			return lerpColor(p5color, color(h, s, b, a), distance);
		}
	}
}
/** rComplex()
//
//  description: A function that returns an array with a user-defined length with random values, constrained by the merp() function (included in this library).
//
//  parameters: (array length, max "height" of each number in the array, minimum value for merp(), maximum value for merp())
*/
function rComplex(xLen, yMax, chanceMin=0.1, chanceMax=1) {
	let valueContainer = [];
	for (let i = 0; i < xLen; i++) {
		valueContainer[i] = 0;
		for (let j = 0; j < yMax; j++) {
			let prob = Math.random();
			if (prob < (merp(Math.random() * chanceMin, Math.random() * chanceMax))) {
				valueContainer[i]++;
			}
		}
	}
	return valueContainer;
}

function randOne(val) {
	return pickFrom([1, -1]) * val;
}
/**Polygon
//
//  description: A class from which the user can create regular polygons of any number of sides.
//  static methods:
//    Polygon.calcAngle(number of sides, angle mode): for determining the interior angled of the polygon, given the number of sides.
//  constructor: (x position, y position, number of sides, radius, p5color, ['DEGREES', 'RADIANS'])
//  properties:
//    x position
//    y position
//    radius length
//    angle type
//    interior angle
//    color
//  methods:
//     setColor(p5color): changes the polygon object's color property to the specified p5color.
//     convertType(): toggles the polygon object's angle mode property between 'DEGREES' and 'RADIANS'.
//     show(): draws the polygon.
//
//
*/
class Polygon {
	static calcAngle(n, type=this.type) {
		if (type == 'RADIANS') {
			angleMode(RADIANS);
			return (Math.PI * 2) / n;
		} else if (type == 'DEGREES') {
			angleMode(DEGREES);
			return 360 / n;
		}
	}
	constructor(x, y, npoints, radius=20, col=rCol(), type='DEGREES') {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.type = type;
		this.angle = Polygon.calcAngle(npoints, type);
		if (col == typeof p5.Color || col == typeof String) {
			this.color = col;
		} else if (col == typeof Number) {
			this.color = color(col);
		}
	}
	setColor(p5color) {
		this.color = p5color;
		return this.color;
	}
	convertType() {
		if (this.type == 'RADIANS') {
			this.type = 'DEGREES';
			angleMode(DEGREES);
			this.angle = Polygon.calcAngle((Math.PI * 2) / this.angle)
		} else if (type == 'DEGREES') {
			this.type = 'RADIANS';
			angleMode(RADIANS);
			this.angle = Polygon.calcAngle(360 / this.angle)
		}
		return this.type;
	}
	show() {
		let fullCircle;
		if (this.type == 'RADIANS') {
			fullCircle = Math.PI * 2;
		} else if (this.type == 'DEGREES') {
			fullCircle = 360;
		}
		fill(this.color);
		beginShape();
		for (let a = 0; a < fullCircle; a += this.angle) {
			let sx = this.x + Math.cos(a) * this.radius;
			let sy = this.y + Math.sin(a) * this.radius;
			vertex(sx, sy);
		}
		endShape(CLOSE);
	}
}

class ObjectArray {
	constructor(objectClass, container=[]) {
		this.class = objectClass;
		this.container = container;
	}

	replace(anObject, anotherObject) {
		if (anObject instanceof this.class && anotherObject instanceof this.class) {
			let anObjectIndex = this.container.indexOf(anObject);
			this.container.splice(anObjectIndex, 1, anotherObject)
			return;
		} else {
			return false;
		}
	}
}
