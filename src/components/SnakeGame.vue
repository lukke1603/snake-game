<script setup>
import { computed, ref } from 'vue';
import { 
  calculateNextSnakePixel,
  generateRandomMeal, 
  hasFoundMeal, 
  hasSelfCollission, 
  hasWallCollission, 
  identifyNextDirection, 
  MealTypes
} from '../services/snakeService';

const pixelSize = 20;
const rows = 20;
const columns = 30;
let mealEnergy = 0;
let tickInterval;

const snakePixels = ref([
  { x: 7, y: Math.round(rows * 0.7) },
  { x: 8, y: Math.round(rows * 0.7) },
  { x: 9, y: Math.round(rows * 0.7) },
  { x: 10, y: Math.round(rows * 0.7) },
]);

/**
 * 38 => up
 * 39 => right
 * 40 => down
 * 37 => left
 */
const direction = ref(39);
const temporaryDirection = ref(39);
const meal = ref(generateRandomMeal(columns, rows, snakePixels.value));
const width = ref(columns * pixelSize);
const height = ref(rows * pixelSize);

const tickDuration = ref(200);
const isResultVisible = ref(false);



const snakeMatrix = computed(() => {
  return Object.assign({}, ...snakePixels.value.map(pixel => ({ [`${pixel.x}-${pixel.y}`]: pixel })))
});

const stopGame = () => {
  clearInterval(tickInterval);
  isResultVisible.value = true;
}

const tickHandler = () => {
  direction.value = temporaryDirection.value;

  const pixelsToSlice = mealEnergy ? 0 : 1;
  mealEnergy = Math.max(0, --mealEnergy);

  snakePixels.value = [
    ...snakePixels.value.slice(pixelsToSlice),
    calculateNextSnakePixel(snakePixels.value, direction.value)
  ];

  if (hasWallCollission(snakePixels.value, columns, rows) || hasSelfCollission(snakePixels.value)) {
    stopGame();
  }

  if (hasFoundMeal(snakePixels.value, meal.value)) {
    mealEnergy = meal.value.type + 1;

    meal.value = generateRandomMeal(columns, rows, snakePixels.value);
    tickDuration.value -= tickDuration.value < 75 ? 4 : 7;
    clearInterval(tickInterval);
    tickInterval = setInterval(tickHandler, tickDuration.value);
  }
}

tickInterval = setInterval(tickHandler, tickDuration.value);

const handleKeyEvent = (e) => {
  if (e.which >= 37 && e.which <= 40) {
    const nextDirection = identifyNextDirection(e.which, direction.value);
    if (nextDirection !== direction.value) {
      temporaryDirection.value = nextDirection;
    }
  }
}

window.addEventListener('keydown', handleKeyEvent);
</script>

<template>
  <main>
    <div class="container" :style="{ width: `${width}px`, height: `${height}px` }">
      <div class="playground" :style="{ opacity: isResultVisible ? 0.5 : 1 }">
        <div v-for="row in rows" :key="`row-${row}`" class="row">
          <div v-for="col in columns" :key="`col-${col}`" class="col">
            <div v-if="snakeMatrix[`${col}-${row}`]" class="snake-body"></div>
            <template v-else-if="meal.position.x === col && meal.position.y === row">
              <mdicon v-if="meal.type === MealTypes.Mouse" name="rodent" :width="pixelSize" :height="pixelSize"
                class="icon" />
              <i v-if="meal.type === MealTypes.Frog" class="fa-solid fa-frog icon"></i>
            </template>
          </div>
        </div>
      </div>

      <!-- 
        Exercise 7
        render the result overlay when the game ends
        hint: See the code above to determine which state is relevant for rendering

        @see https://vuejs.org/guide/essentials/conditional.html
       -->
      <div v-if="false" class="result">
        <h1>GAME OVER</h1>

        <!-- 
          Exercise 8
          print the length of the snake instead of "0"
          
          @see https://vuejs.org/guide/essentials/template-syntax.html
         -->
        <h3>Result: 0</h3>
        <a href="/"><button>PLAY AGAIN</button></a>
      </div>
    </div>
  </main>
</template>