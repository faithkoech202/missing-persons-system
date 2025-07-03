<template>
  <div class="dashboard">
    <h2>Hospital Dashboard</h2>

    <div class="buttons">
      <router-link to="/hospital-report" class="btn">Report Unidentified Body</router-link>
      <router-link to="/all-unidentified" class="btn">View All Unidentified Bodies</router-link>
      <router-link to="/search-unidentified" class="btn">Search Unidentified Persons</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HospitalDashboard',
  created() {
    const role = localStorage.getItem('userRole');
    if (role !== 'hospital') {
      this.$router.push('/login-hospital');
    }
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: auto;
  padding: 40px;
  font-family: 'Poppins', sans-serif;
}

h2 {
  color: #00509e;
  text-align: center;
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn {
  display: block;
  padding: 15px;
  background-color: #00509e;
  color: white;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #003f7f;
}
</style>
