<template>
  <div class="dashboard">
    <h1>👮 Police Dashboard</h1>
    <p>Welcome, officer. Use the options below to manage missing persons cases.</p>

    <div class="buttons">
      <router-link to="/add-missing" class="btn">➕ Report New Missing Person</router-link>
      <router-link to="/all-missing" class="btn">📋 View All Missing Persons</router-link>
      <router-link to="/search-missing" class="btn">🔍 Search Missing Persons</router-link>
      <router-link to="/match-unidentified" class="btn">🧬 Match Unidentified Bodies</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoliceDashboard',
};
</script>

<style scoped>
.dashboard {
  padding: 40px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
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
  max-width: 400px;
  margin: 0 auto;
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
