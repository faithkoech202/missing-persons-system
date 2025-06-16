<!-- src/views/SearchMissing.vue -->
<template>
  <div class="container">
    <h2>🔍 Search Missing Person</h2>
    <input v-model="searchQuery" placeholder="Enter name or location..." @input="searchMissing" />

    <table v-if="results.length">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Gender</th>
          <th>Last Seen Location</th>
          <th>Date Last Seen</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in results" :key="person.id">
          <td>{{ person.full_name }}</td>
          <td>{{ person.gender }}</td>
          <td>{{ person.last_seen_location }}</td>
          <td>{{ person.date_last_seen }}</td>
          <td><router-link :to="`/missing/${person.id}`">View</router-link></td>
        </tr>
      </tbody>
    </table>

    <p v-else>No matching records found.</p>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      searchQuery: '',
      results: []
    };
  },
  methods: {
    async searchMissing() {
      if (this.searchQuery.trim() === '') {
        this.results = [];
        return;
      }

      try {
        const response = await api.get('/missing-persons/search', {
          params: { query: this.searchQuery }
        });
        this.results = response.data;
      } catch (err) {
        console.error('Search error:', err);
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 30px;
  font-family: 'Poppins', sans-serif;
}
input {
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ccc;
}
th {
  background-color: #00509e;
  color: white;
}
</style>
