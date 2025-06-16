<!-- src/views/MissingPersonDetails.vue -->
<template>
  <div class="details" v-if="person">
    <h2>Case: {{ person.full_name }}</h2>
    <ul>
      <li><strong>DOB:</strong> {{ person.date_of_birth }}</li>
      <li><strong>Gender:</strong> {{ person.gender }}</li>
      <li><strong>Last Seen Location:</strong> {{ person.last_seen_location }}</li>
      <li><strong>Date Last Seen:</strong> {{ person.date_last_seen }}</li>
      <li><strong>Reporter:</strong> {{ person.reporter_name }} ({{ person.reporter_phone }})</li>
    </ul>
  </div>
  <p v-else>Loading case details...</p>
</template>

<script>
import axios from '../api';

export default {
  data() {
    return {
      person: null
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const res = await axios.get(`/missing-persons/${id}`);
      this.person = res.data;
    } catch (err) {
      console.error(err);
      alert('Failed to load case.');
    }
  }
};
</script>

<style scoped>
.details {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
