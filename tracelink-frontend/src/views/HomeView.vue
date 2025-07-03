<template>
  <div class="home">
    <div class="card card-flex">
      <div class="info-section">
        <h1> Welcome to TraceLink</h1>
        <p>Your trusted system for tracking missing persons and unidentified bodies across Kenya.</p>
        <p class="disclaimer"><strong>Disclaimer:</strong> <b>A person should have been missing for at least 24hrs before reporting.</b></p>

        <div class="buttons">
          <router-link to="/login-police" class="btn"> Police Login</router-link>
          <router-link to="/login-family" class="btn"> Family Access</router-link>
          <router-link to="/login-hospital" class="btn"> Hospital Login</router-link>
          <router-link to="/public-report" class="btn"> Submit Public Report</router-link>
        </div>

        <div class="contact">
          <h3>📞 Contact Us</h3>
          <p>Email: <a href="mailto:support@tracelink.ke">support@tracelink.ke</a></p>
          <p>Phone: +254 712 345 678</p>
          <p>Address: 3rd Floor, NHIF Building, Nairobi</p>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2025 TraceLink. All rights reserved.</p>
      <p>Powered by the National ICT Innovation Program</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(to bottom right, #d9eaf7, #f0f7ff);
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

.card {
  background: white;
  padding: 60px 60px 40px 60px; /* Increased padding */
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 900px; /* Broader card */
  width: 100%;
  margin: auto;
}

.card-flex {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
}

.info-section {
  flex: 1;
  min-width: 0;
}

h1 {
  color: #003366;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
  color: #333;
}

.disclaimer {
  color: #b20000;
  font-size: 15px;
  margin: 12px 0 18px 0;
  font-weight: bold;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 30px;
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

.contact {
  background-color: #f5faff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 10px;
  font-size: 14px;
}

.contact h3 {
  margin-bottom: 10px;
  color: #003366;
}

.contact a {
  color: #00509e;
  text-decoration: underline;
}

.footer {
  text-align: center;
  font-size: 13px;
  margin-top: 20px;
  color: #777;
}

@media (max-width: 700px) {
  .card-flex {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>
  color: #00509e;
  text-decoration: underline;
}

.footer {
  text-align: center;
  font-size: 13px;
  margin-top: 20px;
  color: #777;
}

@media (max-width: 700px) {
  .card-flex {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .logo-section {
    margin-bottom: 10px;
  }
}
