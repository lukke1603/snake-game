/**
 * available Meal types
 */
export const MealTypes = {
  Mouse: 0,
  Frog: 1,
};

/**
 * Exercise 1
 *
 * calculate the next coordinate the snake will move to
 *
 * result should look similiar to { x: number, y: number }
 *
 * @param {array} snakePixels
 * @param {number} direction
 */
export const calculateNextSnakePixel = (snakePixels, direction) => {
  // implementation here

  return { x: null, y: null };
};

/**
 * Exercise 2
 *
 * Now, your snake only moves in one direction.
 * check whether the snake is allowed to turn.
 *
 * a turn is only allowed to its left or right side - not backward directly
 *
 * 38 => up
 * 39 => right
 * 40 => down
 * 37 => left
 *
 * return the new direction the snake has to move
 *
 * @param {number} newDirection the direction entered by the user with the arrow keys
 * @param {number} currentDirection
 */
export const identifyNextDirection = (newDirection, currentDirection) => {
  // implementation here

  return currentDirection;
};

/**
 * Exercise 3
 *
 * The snake is very hungry!
 *
 * generate a random position where a meal should be located
 * use Math.random() and Math.round()
 *
 * use Math.random to generate the MealType (frog or mouse)
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
  // implementation here

  return {
    position: {
      x: null,
      y: null,
    },
    type: null,
  };
};

/**
 * Exercise 4
 *
 * To grow larger, the snake must eat
 *
 * check whether the snake has found a meal
 * compare the heads position with the meals one
 *
 * @param {array} snakePixels
 * @param {mealObject} meal
 */
export const hasFoundMeal = (snakePixels, meal) => {
  // implementation here

  return false;
};

/**
 * Exercise 5
 *
 * The game ends when the snake bites its own tail
 *
 * check whether the head of the snake crashes into its own tail
 *
 * return a boolean
 *
 * @param {array} snakePixels
 */
export const hasSelfCollission = (snakePixels) => {
  // implementation here

  return false;
};

/**
 * Exercise 6
 *
 * The game also ends when the snake crashes into the wall.
 *
 * check whether the head of the snake crashes into the wall
 *
 * return a boolean
 *
 * @param {array} snakePixels
 */
export const hasWallCollission = (snakePixels, columns, rows) => {
  // implementation here

  return false;
};
