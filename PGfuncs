	/*

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

                              INCREMENTING FUNCTIONS

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


                                            inc()

  description: returns a user-defined input, rounded to a user-defined increment.

  parameters: (input, increment, ['CEIL', 'FLOOR', 'ROUND'])

*/

function inc(input, increment, roundingType) {
  let incPut;
  if (roundingType === 'FLOOR') {
    incPut = Math.floor(input / increment) * increment;
  } else if (roundingType === 'CEIL') {
    incPut = Math.ceil(input / increment) * increment;
  } else if (roundingType === 'ROUND') {
    incPut = Math.round(input / increment) * increment;
  }
  return incPut;
}

/*
                                     rInc()
  description: returns a random value within a specified range, rounded to a user-specified
               increment.

   parameters: (input, increment, ['CEIL', 'FLOOR', 'ROUND'])

*/

function rInc(input, increment, roundingType) {
    return inc(Math.random() * input, increment, roundingType);
}

/*
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

                                    COLOR FUNCTIONS

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

                                       rCol()

description: returns a random color.

parameters: (alpha value, maximum red value, maximum green value, maximum blue value)

*/

function rCol(a, rMax, gMax = rMax, bMax = gMax) {
    return color(Math.random() * rMax, Math.random() * gMax, Math.random() * bMax, a);
}

/*
                                        rLerp()

  description: returns the linear interpolation (through the p5 function "lerp()") 
               of the input color, using a randomized color, at the specified distance.

  parameters: (p5color, ['RGB', 'HSL', 'HSB'], return range, 0<distance<1)

*/

function rLerp(p5color, modeType = 'RGB', range = 100, distance = 0.25) {

  let newColor;
  let d = distance;

  colorMode(RGB, range);

    if (Math.abs(distance) >= 1) {
        if (distance >= range) {
            d = norm(d, -d - range, range + d);
        } else {
            d = norm(d, -range, range);
        }
    }

    let a = alpha(p5color);
    let r = red(p5color);
    let g = green(p5color);
    let b = blue(p5color);

    r = r + (Math.random() * r) - (Math.random() * r);
    g = g + (Math.random() * g) - (Math.random() * g);
    b = b + (Math.random() * b) - (Math.random() * b);

    newColor = color(r, g, b, a);

    if (modeType === 'RGB') {
        newColor = lerpColor(p5color, newColor, d);
    } else if (modeType === 'HSL') {
        colorMode(HSL, range);
        newColor = lerpColor(p5color, newColor, d);
    } else if (modeType === 'HSB') {
        colorMode(HSB, range);
        newColor = lerpColor(p5color, newColor, d);
    }
  
  return newColor;
  
}

/*
                                        merp()

  description: A function that returns the linear interpolation of two different values by using
  the square root of the product of their sum and their difference as the distance.

  parameters: (smaller value, larger value)

*/

function merp(lowVal, highVal) {
  let high = Math.max(Math.abs(lowVal), Math.abs(highVal));
  let low = Math.min(Math.abs(lowVal), Math.abs(highVal));
 return lerp(low, high, norm(Math.sqrt((high + low) * (high - low)), low, high));
}
