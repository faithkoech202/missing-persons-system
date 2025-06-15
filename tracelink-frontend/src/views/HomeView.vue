<template>
  <div class="home">
    <div class="card">
      <h1>👥 Welcome to TraceLink</h1>
      <p>Your trusted system for tracking missing persons and unidentified bodies.</p>

      <div class="buttons">
        <router-link to="/add-missing" class="btn">🚔 Police: Report Missing Person</router-link>
        <router-link to="/family-access" class="btn">👨‍👩‍👧 Family: Check Status</router-link>
        <router-link to="/hospital" class="btn">🏥 Hospital: Report Unidentified Body</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #d9eaf7, #f0f7ff);
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

h1 {
  color: #003366;
  margin-bottom: 10px;
}

p {
  margin-bottom: 30px;
  color: #333;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn {
  background-color: #00509e;
  color: white;
  padding: 12px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #003f7d;
}
</style>
