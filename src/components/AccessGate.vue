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
import { reactive, ref, defineEmits } from 'vue'
import { useGun } from '@/composables/useGun'

const emit = defineEmits(['userAuthenticated'])

const isSignUp = ref(true)

const toggleForm = () => {
  isSignUp.value = !isSignUp.value
}

const formData = reactive({
  username: null,
  password: null
})

const resetFormData = () => {
  formData.username = null
  formData.password = null
}

const gun = useGun()

const submitForm = async () => {


  if (isSignUp.value) {
    try {
      await gun.createUser(formData)
      resetFormData()
      toggleForm()
    } catch (err) {
      console.error(err)
    }
  }

  if (!isSignUp.value) {
    try {
      const result = await gun.loginUser(formData)
      resetFormData()
      emit('userAuthenticated', result)
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