<template>
  <div class="public-report-form">
    <h2>Public Reporting</h2>

    <form @submit.prevent="submitReport" enctype="multipart/form-data">
      <!-- Main Input Grid -->
      <div class="form-grid">
        <div
          class="form-group"
          v-for="([key, label]) in filteredLabels"
          :key="key"
        >
          <label :for="key">{{ label }}</label>
          <input
            :type="key.includes('date') ? 'date' : 'text'"
            :id="key"
            v-model="form[key]"
            required
          />
        </div>

        <!-- Gender Dropdown -->
        <div class="form-group">
          <label for="gender">Gender</label>
          <select id="gender" v-model="form.gender" required>
            <option disabled value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <!-- Description Textarea -->
      <div class="form-group full-width">
        <label for="description">Detailed Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Photo Upload -->
      <div class="form-group full-width">
        <label for="photo">Photo</label>
        <input type="file" id="photo" @change="handleFileUpload" accept="image/*" />
        <div v-if="photoPreview" class="photo-preview">
          <p><strong>Photo Preview:</strong></p>
          <img :src="photoPreview" alt="Preview" />
        </div>
      </div>

      <!-- Submit Button and Message -->
      <button type="submit">Submit Report</button>
      <p v-if="message" :class="{ success: success, error: !success }">{{ message }}</p>
    </form>
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
      labels: {
        full_name: 'Full Name',
        date_of_birth: 'Date of Birth',
        last_seen_location: 'Last Seen Location',
        date_last_seen: 'Date Last Seen',
        reporter_name: 'Reporter Name',
        reporter_phone: 'Reporter Phone',
        distinguishing_marks: 'Distinguishing Marks',
        medical_conditions: 'Medical Conditions',
        social_media: 'Social Media Handle'
      },
      message: '',
      success: false,
      photoPreview: null
    };
  },
  computed: {
    filteredLabels() {
      return Object.entries(this.labels);
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.form.photo = file;
      this.photoPreview = file ? URL.createObjectURL(file) : null;
    },
    async submitReport() {
      try {
        const formData = new FormData();
        for (const key in this.form) {
          if (key === 'photo') {
            if (this.form.photo) {
              formData.append('photo', this.form.photo);
            }
          } else {
            formData.append(key, this.form[key]);
          }
        }

        const response = await axios.post('http://localhost:5000/api/public-reports', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        this.message = `Report submitted successfully! Your Access Code is: ${response.data.access_code}`;
        this.success = true;

        // Reset form
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
        this.photoPreview = null;
      } catch (error) {
        console.error('Submission error:', error);
        if (error.response) {
          console.error('Backend response:', error.response.data);
          this.message = `Failed to submit report: ${error.response.data.message || error.response.statusText}`;
        } else {
          this.message = 'Failed to submit report. Please check your network or try again later.';
        }
        this.success = false;
      }
    }
  }
};
</script>

<style scoped>
.public-report-form {
  max-width: 850px;
  margin: auto;
  font-family: 'Poppins', sans-serif;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width {
  margin-top: 20px;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
}

input,
select,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  background: #00509e;
  color: white;
  padding: 12px 24px;
  border: none;
  margin-top: 25px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  border-radius: 5px;
}

button:hover {
  background-color: #003f7d;
}

.success {
  color: green;
  margin-top: 15px;
}

.error {
  color: red;
  margin-top: 15px;
}

.photo-preview {
  margin-top: 10px;
  text-align: center;
}

.photo-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
