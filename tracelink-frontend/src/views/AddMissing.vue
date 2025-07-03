<template>
  <div class="report-container">
    <h2> Report a Missing Person</h2>
    <form @submit.prevent="submitReport" enctype="multipart/form-data">
      <div class="form-group">
        <label>Full Name:</label>
        <input v-model="form.full_name" required />
      </div>

      <div class="form-group">
        <label>Date of Birth:</label>
        <input type="date" v-model="form.date_of_birth" />
      </div>

      <div class="form-group">
        <label>Gender:</label>
        <select v-model="form.gender" required>
          <option value="">--Select--</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div class="form-group">
        <label>Last Seen Location:</label>
        <input v-model="form.last_seen_location" required />
      </div>

      <div class="form-group">
        <label>Date Last Seen:</label>
        <input type="date" v-model="form.date_last_seen" required />
      </div>

      <div class="form-group">
        <label>Reporter Name:</label>
        <input v-model="form.reporter_name" required />
      </div>

      <div class="form-group">
        <label>Reporter Phone:</label>
        <input type="tel" v-model="form.reporter_phone" required />
      </div>

      <div class="form-group">
        <label>Distinguishing Marks:</label>
        <input v-model="form.distinguishing_marks" />
      </div>

      <div class="form-group">
        <label>Medical Conditions:</label>
        <input v-model="form.medical_conditions" />
      </div>

      <div class="form-group">
        <label>Social Media Handles:</label>
        <input v-model="form.social_media" />
      </div>

      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="form.description"></textarea>
      </div>

      <div class="form-group">
        <label>Upload Photo:</label>
        <input type="file" @change="handlePhotoUpload" accept="image/*" />
      </div>

      <button type="submit">Submit Report</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

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
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    handlePhotoUpload(event) {
      this.form.photo = event.target.files[0];
    },
    async submitReport() {
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }

      try {
        await axios.post('http://localhost:5000/api/public-reports', formData);
        this.successMessage = 'Report submitted successfully!';
        this.errorMessage = '';
        this.resetForm();
      } catch (error) {
        console.error('Submission error:', error);
        this.errorMessage = 'Failed to submit the report.';
        this.successMessage = '';
      }
    },
    resetForm() {
      this.form = {
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
      };
    }
  }
};
</script>

<style scoped>
.report-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 25px;
  border: 1px solid #ddd;
  background: #fefefe;
  border-radius: 10px;
  font-family: 'Segoe UI', sans-serif;
}
h2 {
  margin-bottom: 20px;
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input,
select,
textarea {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  background-color: #007acc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.success {
  color: green;
  margin-top: 15px;
}
.error {
  color: red;
  margin-top: 15px;
}
</style>

