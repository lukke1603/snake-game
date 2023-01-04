

/**
 * available Meal types
 */
export const MealTypes = {
  Mouse: 0,
  Frog: 1
};

/**
 * generate a random position where the meal should be located
 * use Math.random() and Math.round()
 * 
 * attention: the meal must not be located under the snakes tail
 * 
 * return an object similiar to this:
 * {
 *    type: 0 or 1,
 *    position: {
 *      x: number,
 *      y: number
 *    }
 * }
 * 
 * @param {number} columns 
 * @param {number} rows 
 * @param {array} snakePixels  
 */
export const generateRandomMeal = (columns, rows, snakePixels) => {
  let hasCollissionWithSnakeTail;
  let position;

  do {
    position = {
      x: Math.floor(Math.random() * columns) + 1,
      y: Math.floor(Math.random() * rows) + 1,
    };

    hasCollissionWithSnakeTail = snakePixels.some(({ x, y }) => x === position.x && y === position.y);
  } while (hasCollissionWithSnakeTail)

  return {
    position,
    type: Math.round(Math.random())
  };
}

/**
 * calculate the next coordinate the snake will move to
 * 
 * result should look similiar to { x: number, y: number }
 *
 * @param {array} snakePixels
 * @param {number} direction 
 */
export const calculateNextSnakePixel = (snakePixels, direction) => {
  let headPixel = { ...snakePixels[snakePixels.length - 1] };

  switch (direction) {
    case 38:
      return { x: headPixel.x, y: --headPixel.y };
    case 39:
      return { x: ++headPixel.x, y: headPixel.y };
    case 40:
      return { x: headPixel.x, y: ++headPixel.y };
    case 37:
      return { x: --headPixel.x, y: headPixel.y };
  }
}

/**
 * check whether the snake is allowed to turn.
 * 
 * a turn is only allowed to its left or right side - not backward directly
 * 
 * return the new direction the snake has to move
 * 
 * @param {number} newDirection the direction entered by the user with the arrow keys 
 * @param {number} currentDirection 
 */
export const identifyNextDirection = (newDirection, currentDirection) => {
  const leftSteer = currentDirection === 37 ? 40 : currentDirection - 1;
  const rightSteer = currentDirection === 40 ? 37 : currentDirection + 1;

  if (newDirection === leftSteer || newDirection === rightSteer) {
    return newDirection;
  }

  return currentDirection;
}

/**
 * check whether the head of the snake crashes into its own tail
 * 
 * return a boolean
 * 
 * @param {array} snakePixels 
 */
export const hasSelfCollission = (snakePixels) => {
  const headPixel = snakePixels.slice(-1)[0];

  const hasCollission = snakePixels.slice(0, -1).some(({ x, y }) => {
    return x === headPixel.x && y === headPixel.y;
  });

  return hasCollission;
}

/**
 * check whether the head of the snake crashes into the wall
 * 
 * return a boolean
 * 
 * @param {array} snakePixels 
 */
export const hasWallCollission = (snakePixels, columns, rows) => {
  const { x, y } = snakePixels.slice(-1)[0];

  return x < 0 || x > columns || y < 0 || y > rows;
}

/**
 * check whether the snake has found a meal
 * compare the heads position with the meals one
 * 
 * @param {array} snakePixels 
 * @param {mealObject} meal 
 */
export const hasFoundMeal = (snakePixels, meal) => {
  const { x, y } = snakePixels.slice(-1)[0];
  const { x: mealX, y: mealY } = meal.position;

  return x === mealX && y === mealY;
}