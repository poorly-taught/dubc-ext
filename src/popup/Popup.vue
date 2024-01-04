<script setup lang="js">
import { ref } from 'vue';
import StarRating from './components/StarRating.vue'

const rating = ref(0)

const starRatingHandler = (value) => {
  rating.value = value
}

const submitHandler = () => {
  rating.value = 0
}


</script>

<template>
  <main>
    <div>
      {{ rating }}
    </div>
    <div>
      <StarRating :value="0" :maxStars="5" @ratingSet="starRatingHandler"/>
    </div>
    <div>
      <button @click="submitHandler">submit</button>
    </div>

  </main>
</template>

<style>
:root {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

body {
  min-width: 20rem;
  color-scheme: light dark;
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

/* h3 {
  color: #42b983;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 2rem auto;
} */

</style>
