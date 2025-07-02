<!-- src/views/MatchUnidentified.vue -->
<template>
  <div class="container">
    <h2>🧩 Match Unidentified Bodies</h2>

    <button @click="matchData" :disabled="loading">
      {{ loading ? 'Searching...' : 'Find Possible Matches' }}
    </button>

    <div v-if="matches.length">
      <div v-for="(match, index) in matches" :key="index" class="match-card">
        <p><strong>Missing Person:</strong> {{ match.missing_name }}</p>
        <p><strong>Body Description:</strong> {{ match.body_description }}</p>
        <p><strong>Found Location:</strong> {{ match.found_location }}</p>
      </div>
    </div>

    <p v-else-if="!loading" class="no-match">No matches found yet.</p>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      matches: [],
      loading: false
    };
  },
  methods: {
    async matchData() {
      this.loading = true;
      try {
        const response = await api.get('/match/match-bodies');
        this.matches = response.data || [];
      } catch (err) {
        console.error('Matching error:', err);
        alert('Error fetching matches.');
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.matchData();
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  background: #fefefe;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Poppins', sans-serif;
}

h2 {
  text-align: center;
  color: #003366;
  margin-bottom: 20px;
}

button {
  display: block;
  margin: 0 auto 20px;
  background: #00509e;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}
button:disabled {
  background: #999;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background: #003f7f;
}

.match-card {
  background: #f3f8ff;
  border-left: 4px solid #00509e;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 6px;
}

.no-match {
  text-align: center;
  font-style: italic;
  color: #777;
}
</style>
