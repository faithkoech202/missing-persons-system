<template>
  <div class="container">
    <h2>🚔 Report a Missing Person</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Full Name</label>
        <input v-model="form.full_name" required />
      </div>

      <div class="form-group">
        <label>Date of Birth</label>
        <input type="date" v-model="form.date_of_birth" />
      </div>

      <div class="form-group">
        <label>Gender</label>
        <select v-model="form.gender" required>
          <option disabled value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div class="form-group">
        <label>Last Seen Location</label>
        <input v-model="form.last_seen_location" />
      </div>

      <div class="form-group">
        <label>Date & Time Last Seen</label>
        <input type="datetime-local" v-model="form.date_last_seen" />
      </div>

      <div class="form-group">
        <label>Reporter Name</label>
        <input v-model="form.reporter_name" />
      </div>

      <div class="form-group">
        <label>Reporter Phone</label>
        <input v-model="form.reporter_phone" />
      </div>

<div class="form-group">
  <label>Upload Photo</label>
  <input type="file" @change="handleFileUpload" />
</div>

<div class="form-group">
  <label>Distinguishing Marks</label>
  <input v-model="form.distinguishing_marks" />
</div>

<div class="form-group">
  <label>Medical Conditions</label>
  <input v-model="form.medical_conditions" />
</div>

<div class="form-group">
  <label>Social Media Handles</label>
  <input v-model="form.social_media" />
</div>

<div class="form-group">
  <label>Additional Description</label>
  <textarea v-model="form.description" rows="3"></textarea>
</div>

      <button type="submit">Submit Report</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
  full_name: '',
  date_of_birth: '',
  gender: '',
  last_seen_location: '',
  date_last_seen: '',
  reporter_name: '',
  reporter_phone: '',
  distinguishing_marks: '',
  medical_conditions: '',
  social_media: '',
  description: '',
  photo: null
}
    }
  },
  methods: {
    async submitForm() {
      try {
        const res = await fetch('http://localhost:3000/api/missing-persons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });
        const data = await res.json();
        alert('Success! Access Code: ' + data.access_code);
      } catch (err) {
        alert('Something went wrong.');
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #003366;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  margin-top: 10px;
  width: 100%;
  background: #003366;
  color: white;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #00509e;
}
</style>
