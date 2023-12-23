<script setup>
import AccessGate from './components/AccessGate.vue';

const handleUserAuthenticated = () => {
  console.log("we're logging...")
}

</script>

<template>
  <div id="app-wrapper">
    <AccessGate @userAuthenticated="handleUserAuthenticated"/>
  </div>
</template>

<style scoped>
#app-wrapper {
  background-color: gray;
}
</style>
