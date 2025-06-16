<!-- src/views/UpdateMissing.vue -->
<template>
  <div class="update-form">
    <h2>Update Missing Person</h2>
    <form @submit.prevent="updatePerson">
      <label>Full Name</label>
      <input v-model="person.full_name" required />

      <label>Date of Birth</label>
      <input type="date" v-model="person.date_of_birth" required />

      <label>Gender</label>
      <select v-model="person.gender" required>
        <option disabled value="">Select</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <label>Last Seen Location</label>
      <input v-model="person.last_seen_location" required />

      <label>Date Last Seen</label>
      <input type="date" v-model="person.date_last_seen" required />

      <label>Clothing Description</label>
      <textarea v-model="person.clothing_description" />

      <label>Physical Description</label>
      <textarea v-model="person.physical_description" />

      <label>Special Characteristics</label>
      <textarea v-model="person.special_characteristics" />

      <label>Behavior Notes</label>
      <textarea v-model="person.behavior_notes" />

      <label>Reporter Name</label>
      <input v-model="person.reporter_name" required />

      <label>Reporter Phone</label>
      <input v-model="person.reporter_phone" required />

      <label>Reporter Relationship</label>
      <input v-model="person.reporter_relationship" />

      <button type="submit">Update</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      person: {
        full_name: '',
        date_of_birth: '',
        gender: '',
        last_seen_location: '',
        date_last_seen: '',
        clothing_description: '',
        physical_description: '',
        special_characteristics: '',
        behavior_notes: '',
        reporter_name: '',
        reporter_phone: '',
        reporter_relationship: ''
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await api.get(`/missing-persons/${id}`);
      this.person = response.data;
    } catch (error) {
      this.errorMessage = 'Failed to load person data';
    }
  },
  methods: {
    async updatePerson() {
      try {
        await api.put(`/missing-persons/${this.$route.params.id}`, this.person);
        this.successMessage = 'Person updated successfully!';
        this.errorMessage = '';
      } catch (err) {
        this.errorMessage = 'Update failed';
        this.successMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.update-form {
  max-width: 600px;
  margin: auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
}
label {
  display: block;
  margin-top: 15px;
}
input, textarea, select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}
button {
  margin-top: 20px;
  padding: 12px;
  width: 100%;
  background: #00509e;
  color: white;
  border: none;
  border-radius: 5px;
}
.success {
  color: green;
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
