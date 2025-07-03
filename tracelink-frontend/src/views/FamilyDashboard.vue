<!-- src/views/FamilyDashboard.vue -->
<template>
  <div class="dashboard">
    <h2>Family Access Dashboard</h2>

    <!-- Access Code Input -->
    <div class="access-form">
      <label for="accessCode">Enter Access Code:</label>
      <input v-model="accessCode" type="text" id="accessCode" />
      <button @click="fetchCase">View My Case</button>
    </div>

    <!-- Case Details -->
    <div v-if="caseData" class="case-details">
      <h3>Case Details</h3>
      <p><strong>Name:</strong> {{ caseData.full_name }}</p>
      <p><strong>Gender:</strong> {{ caseData.gender }}</p>
      <p><strong>Date of Birth:</strong> {{ caseData.date_of_birth }}</p>
      <p><strong>Last Seen:</strong> {{ caseData.last_seen_location }} on {{ caseData.date_last_seen }}</p>
      <p><strong>Status:</strong> {{ caseData.status || 'Under Investigation' }}</p>
    </div>

    <!-- Message if no case found -->
    <p v-if="noCaseFound" class="error">No case found for that access code.</p>

    <!-- Support Contacts -->
    <div class="support">
      <h4>Need Help?</h4>
      <p>Contact your local police or use the helpline below:</p>
      <ul>
        <li>Police Helpline: 999</li>
        <li>Email: support@tracelink.org</li>
      </ul>
    </div>

    <button class="logout" @click="logout">Logout</button>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'FamilyDashboard',
  data() {
    return {
      accessCode: '',
      caseData: null,
      noCaseFound: false
    };
  },
  methods: {
    async fetchCase() {
      try {
        const response = await api.get(`/family-access/${this.accessCode}`);
        this.caseData = response.data;
        this.noCaseFound = false;
      } catch (error) {
        this.caseData = null;
        this.noCaseFound = true;
      }
    },
    logout() {
      localStorage.removeItem('userRole');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: auto;
  padding: 30px;
  font-family: 'Poppins', sans-serif;
  background: #fdfdfd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.access-form {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background: #00509e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.case-details {
  background: #f0f8ff;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.error {
  color: red;
  font-weight: bold;
}

.support {
  margin-top: 20px;
  background: #f8f8f8;
  padding: 15px;
  border-radius: 6px;
}

.logout {
  margin-top: 30px;
  background: #d9534f;
}
</style>
