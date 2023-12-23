<template>
  <div id="access-gate-wrapper">
    <div class="options">
      <span @click="toggleForm" :class="!isSignUp ? 'option' : 'option-active'">Sign Up</span>
      <span>/</span>
      <span @click="toggleForm" :class="isSignUp ? 'option' : 'option-active'">Login</span>
    </div>
    <div class="accessGateFormWrapper">
      <form @submit.prevent="submitForm" class="accessGateForm">
        <label for="username">Username</label>
        <input v-model="formData.username" type="text" id="username" name="username" required>
        <label for="password">Password</label>
        <input v-model="formData.password" type="password" id="password" name="password" required>
        <button type="submit">{{ isSignUp ? 'Sign Up' : 'Login' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useGun } from '@/composables/useGun'

const isSignUp = ref(true)
const toggleForm = () => {
  isSignUp.value = !isSignUp.value
}

const gun = useGun()

const formData = reactive({
  username: null,
  password: null
})
const submitForm = async () => {
  if (isSignUp.value) {
    try {
      await gun.createUser(formData)
    } catch (err) {
      console.error(err)
    }
  }

  if (!isSignUp.value) {
    try {
      await gun.loginUser(formData)
    } catch (err) {
      console.error(err)
    }
  }
}


</script>

<style scoped>
#access-gate-wrapper {
  background-color: lightgray;
  width: 200px;
}

.option {
  cursor: pointer;
  color: black;
}

.option-active {
  cursor: pointer;
  color: red
}

</style>