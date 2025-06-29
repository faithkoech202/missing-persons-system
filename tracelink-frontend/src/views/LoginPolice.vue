<!-- src/views/LoginPolice.vue -->
<template>
  <div class="login">
    <h2>Police Login</h2>
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
    async login() {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await response.json();
        console.log('Login response:', data); // <-- Debug log

        if (!response.ok) {
          this.error = data.message || 'Invalid credentials';
          return;
        }

        // Store token and role
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);

        // Navigate if user is police
        if (data.role === 'police') {
          this.$router.push('/police-dashboard');
        } else {
          this.error = 'Not authorized as police';
        }
      } catch (err) {
        this.error = 'Login failed. Try again.';
        console.error(err);
      }
    }
  }
};
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
