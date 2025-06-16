<!-- src/views/LoginFamily.vue -->
<template>
  <div class="login">
    <h2>Family Access</h2>
    <form @submit.prevent="login">
      <label>Email:</label>
      <input v-model="email" type="email" required />

      <label>Access Code:</label>
      <input v-model="accessCode" type="text" required />

      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      accessCode: '',
      error: ''
    };
  },
  methods: {
    login() {
      // Dummy check – replace with API call later
      if (this.accessCode.length === 6 && this.email.includes('@')) {
        localStorage.setItem('userRole', 'family');
        this.$router.push('/family-dashboard');

      } else {
        this.error = 'Invalid email or access code.';
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

