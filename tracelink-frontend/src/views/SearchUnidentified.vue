<template>
  <div class="search-container">
    <h2>Search Unidentified Bodies</h2>

    <form @submit.prevent="search">
      <label for="date">Date Found:</label>
      <input type="date" v-model="filters.date_found" />

      <label for="location">Found Location:</label>
      <input type="text" v-model="filters.found_location" placeholder="e.g. Nakuru" />

      <label for="gender">Gender:</label>
      <select v-model="filters.gender">
        <option value="">Any</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Search</button>
    </form>

    <div v-if="results.length">
      <h3>Results:</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estimated Age</th>
            <th>Gender</th>
            <th>Description</th>
            <th>Found Location</th>
            <th>Date Found</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="body in results" :key="body.id">
            <td>{{ body.id }}</td>
            <td>{{ body.estimated_age }}</td>
            <td>{{ body.gender }}</td>
            <td>{{ body.physical_description }}</td>
            <td>{{ body.found_location }}</td>
            <td>{{ body.date_found }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="searched && results.length === 0" class="no-results">
      No matching unidentified bodies found.
    </p>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      filters: {
        date_found: '',
        found_location: '',
        gender: ''
      },
      results: [],
      searched: false
    };
  },
  methods: {
    async search() {
      try {
        const params = new URLSearchParams(this.filters).toString();
        const response = await api.get(`/unidentified-bodies/search?${params}`);
        this.results = response.data;
      } catch (err) {
        console.error('Error searching unidentified bodies:', err);
      }
      this.searched = true;
    }
  }
};
</script>

<style scoped>
.search-container {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  font-family: 'Poppins', sans-serif;
}
label {
  display: block;
  margin-top: 15px;
}
input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #00509e;
  color: white;
  border: none;
  border-radius: 5px;
}
table {
  margin-top: 30px;
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ccc;
}
th {
  background-color: #003366;
  color: white;
}
.no-results {
  margin-top: 20px;
  color: red;
}
</style>
