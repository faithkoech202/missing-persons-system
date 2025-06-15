<template>
  <div class="container">
    <h2>🏥 Report Unidentified Body</h2>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="form-group">
        <label>Gender</label>
        <select v-model="form.gender" required>
          <option disabled value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Unknown</option>
        </select>
      </div>

      <div class="form-group">
        <label>Approximate Age</label>
        <input type="number" v-model="form.age_estimate" />
      </div>

      <div class="form-group">
        <label>Found Location</label>
        <input v-model="form.found_location" />
      </div>

      <div class="form-group">
        <label>Date Found</label>
        <input type="date" v-model="form.date_found" />
      </div>

      <div class="form-group">
        <label>Physical Description</label>
        <textarea v-model="form.physical_description" rows="4"></textarea>
      </div>

      <div class="form-group">
        <label>Photograph</label>
        <input type="file" @change="handleFileUpload" />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        gender: '',
        age_estimate: '',
        found_location: '',
        date_found: '',
        physical_description: '',
        photo: null
      }
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.photo = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      for (let key in this.form) {
        formData.append(key, this.form[key]);
      }

      try {
        const res = await fetch('http://localhost:3000/api/unidentified-bodies', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          alert('Report submitted successfully');
        } else {
          alert('Failed to submit report');
        }
      } catch (err) {
        alert('Error connecting to server');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #800000;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: 600;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  margin-top: 10px;
  width: 100%;
  background: #800000;
  color: white;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #a10000;
}
</style>
