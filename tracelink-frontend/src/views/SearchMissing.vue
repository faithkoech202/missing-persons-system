<template>
  <div class="container">
    <h2> Search Missing Persons</h2>

    <input
      type="text"
      v-model="searchTerm"
      @input="search"
      placeholder="Enter full name..."
    />

    <div v-if="loading">Searching...</div>
    <div v-if="error && !loading" class="error">{{ error }}</div>
    <ul v-if="results.length">
      <li v-for="person in results" :key="person.id">
        <strong>{{ person.full_name }}</strong> — Last seen at {{ person.last_seen_location }}
      </li>
    </ul>

    <p v-if="!loading && results.length === 0 && searchTerm">No results found.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: '',
      results: [],
      loading: false,
      error: ''
    };
  },
  methods: {
    async search() {
      if (!this.searchTerm.trim()) {
        this.results = [];
        this.error = '';
        return;
      }

      this.loading = true;
      this.error = '';
      try {
        const res = await axios.get(
          `http://localhost:5000/api/missing-persons/search?query=${encodeURIComponent(this.searchTerm)}`
        );
        // Log response for debugging
        console.log('Search response:', res.data);
        this.results = Array.isArray(res.data) ? res.data : [];
        if (!this.results.length) {
          this.error = 'No results found.';
        }
      } catch (err) {
        console.error('Search error:', err);
        this.results = [];
        this.error = 'Search failed. Please check your connection or try again later.';
      } finally {
        this.loading = false;
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
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.error {
  color: red;
  margin-bottom: 10px;
}
</style>
