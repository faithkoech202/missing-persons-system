<template>
  <div class="container">
    <h2>👨‍👩‍👧 Family Access Portal</h2>

    <div v-if="!person">
      <label>Enter Access Code</label>
      <input v-model="accessCode" placeholder="Enter your code" />
      <button @click="fetchStatus">Check Status</button>
    </div>

    <div v-else>
      <h3>Status for: {{ person.full_name }}</h3>
      <p><strong>Last Seen:</strong> {{ person.last_seen_location }} on {{ person.date_last_seen }}</p>
      <p><strong>Status:</strong> {{ person.status || 'Still under investigation' }}</p>
      <p><strong>Assigned Officer:</strong> {{ person.assigned_officer || 'Not assigned' }}</p>
      <p><strong>Notes:</strong> {{ person.notes || 'No updates yet' }}</p>
      <button @click="reset">Search Another</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accessCode: '',
      person: null
    };
  },
  methods: {
    async fetchStatus() {
      try {
        const res = await fetch(`http://localhost:3000/api/family-access/${this.accessCode}`);
        const data = await res.json();
        if (res.ok) {
          this.person = data;
        } else {
          alert(data.message || 'Invalid code or not found');
        }
      } catch (error) {
        alert('Error connecting to server');
      }
    },
    reset() {
      this.accessCode = '';
      this.person = null;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  color: #003366;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  background: #003366;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
}

button:hover {
  background: #00509e;
}

p {
  margin: 10px 0;
  font-size: 16px;
}
</style>
