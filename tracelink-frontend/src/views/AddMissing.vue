<template>
  <div class="container">
    <h2>🚔 Report a Missing Person</h2>

    <div v-if="success" class="success-message">
      <p>✅ Missing person reported successfully!</p>
      <p><strong>Access Code:</strong> {{ accessCode }}</p>
      <p>Give this code to the family so they can track the case.</p>
    </div>

    <form @submit.prevent="submitForm" v-if="!success">
      <div class="form-group" v-for="(label, key) in inputFields" :key="key">
        <label>{{ label }}</label>
        <input
          v-if="key !== 'description' && key !== 'photo'"
          :type="key.includes('date') ? 'datetime-local' : 'text'"
          v-model="form[key]"
        />
        <textarea
          v-else-if="key === 'description'"
          v-model="form.description"
          rows="3"
        ></textarea>
        <input
          v-else-if="key === 'photo'"
          type="file"
          @change="handleFileUpload"
        />
      </div>

      <div class="form-group">
        <label>Gender</label>
        <select v-model="form.gender" required>
          <option disabled value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
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
      },
      accessCode: '',
      success: false,
      inputFields: {
        full_name: 'Full Name',
        date_of_birth: 'Date of Birth',
        last_seen_location: 'Last Seen Location',
        date_last_seen: 'Date & Time Last Seen',
        reporter_name: 'Reporter Name',
        reporter_phone: 'Reporter Phone',
        distinguishing_marks: 'Distinguishing Marks',
        medical_conditions: 'Medical Conditions',
        social_media: 'Social Media Handles',
        description: 'Additional Description',
        photo: 'Upload Photo'
      }
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.photo = event.target.files[0];
    },
    async submitForm() {
  const formData = new FormData();
  for (const key in this.form) {
    if (key === 'photo' && this.form[key] == null) continue;
    formData.append(key, this.form[key]);
  }

  const token = localStorage.getItem('token');

  try {
    const res = await fetch('http://localhost:5000/api/missing-persons', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    console.log('Server Response:', data);

    if (res.ok) {
      // ✅ Show success message
      this.accessCode = data.access_code;
      this.success = true;

      // ✅ Scroll to top so user sees the message
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // ✅ Delay resetting the form and hiding the message
      setTimeout(() => {
        this.resetForm();
        this.success = false;
      }, 5000); // 5 seconds
    } else {
      alert(data.message || 'Something went wrong.');
    }
  } catch (err) {
    alert('Error submitting form.');
    console.error(err);
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
input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
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
.success-message {
  background-color: #e6ffed;
  border-left: 5px solid #28a745;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 6px;
}
</style>
