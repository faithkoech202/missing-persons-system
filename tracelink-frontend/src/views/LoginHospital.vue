<!-- src/views/LoginHospital.vue -->
<template>
  <div class="login">
    <h2>Hospital Login</h2>
    <form @submit.prevent="login">
      <label>Username:</label>
      <input v-model="username" type="text" required />

      <label>Password:</label>
      <input v-model="password" type="password" required />

      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      if (this.username === 'hospital' && this.password === '1234') {
        localStorage.setItem('userRole', 'hospital');
        this.$router.push('/hospital-dashboard'); 
      } else {
        this.error = 'Invalid hospital credentials.';
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}
label {
  display: block;
  margin-top: 20px;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}
button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background: #00509e;
  color: white;
  border: none;
  border-radius: 5px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
