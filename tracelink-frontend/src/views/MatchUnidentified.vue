<!-- src/views/MatchUnidentified.vue -->
<template>
  <div class="container">
    <h2>🧩 Match Unidentified Bodies</h2>
    <button @click="matchData">Find Possible Matches</button>

    <div v-if="matches.length">
      <div v-for="match in matches" :key="match.id" class="match">
        <p><strong>Missing Person:</strong> {{ match.missing_name }}</p>
        <p><strong>Body Found:</strong> {{ match.body_description }}</p>
        <p><strong>Location:</strong> {{ match.found_location }}</p>
        <hr />
      </div>
    </div>
    <p v-else>No matches found.</p>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      matches: []
    };
  },
  methods: {
    async matchData() {
      try {
        const response = await api.get('/match-bodies');
        this.matches = response.data;
      } catch (err) {
        console.error('Matching error:', err);
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
button {
  background: #00509e;
  color: white;
  padding: 10px 20px;
  border: none;
  margin-bottom: 20px;
}
.match {
  background: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
}
</style>
