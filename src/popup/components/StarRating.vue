<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  maxStars: {
    type: Number,
    default: 5
  }
})

const hoverValue = ref(0)

const totalStars = computed(() => {
  return Array(props.maxStars).fill(0)
})

const starFilled = (index) => {
  return index < props.value || index < hoverValue
}

const emit = defineEmits(['ratingSet'])

const setRating = (rating) => {
  emit('ratingSet', rating)
}

const hoverRating = (rating) => {
  return hoverValue
}

const resetHover = () => {
  hoverValue.value = 0;
}
</script>

<template>
  <div class="star-rating">
    <span v-for="(star, index) in props.maxStars" :key="index" @click="setRating(index + 1)"
      @mouseover="hoverRating(index + 1)" @mouseleave="resetHover">
      <i :class="{ 'fas': starFilled(index), 'far': !starFilled(index) }">&#9733;</i>
    </span>
  </div>
</template>


<style scoped>
.star-rating {
  font-size: 24px;
  cursor: pointer;
}

.star-rating span {
  margin-right: 5px;
}
</style>