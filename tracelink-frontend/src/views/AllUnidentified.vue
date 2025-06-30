<!-- src/views/AllUnidentified.vue -->
<template>
  <div class="container">
    <h2>🧍 All Unidentified Bodies</h2>

    <table>
      <thead>
        <tr>
          <th>Date Found</th>
          <th>Location Found</th>
          <th>Estimated Age</th>
          <th>Gender</th>
          <th>Physical Description</th>
          <!-- <th>Clothing Description</th>
          <th>Special Characteristics</th> -->
          <th>Hospital Name</th>
          <th>Hospital Contact</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="body in unidentifiedBodies" :key="body.id">
          <td>{{ body.date_found }}</td>
          <td>{{ body.found_location }}</td>
          <td>{{ body.age_estimate }}</td>
          <td>{{ body.gender }}</td>
          <td>{{ body.physical_description }}</td>
          <!-- <td>{{ body.clothing_description }}</td>
          <td>{{ body.special_characteristics }}</td> -->
          <td>{{ body.hospital_name }}</td>
          <td>{{ body.hospital_contact }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../api'; // Axios instance

export default {
  data() {
    return {
      unidentifiedBodies: []
    };
  },
  async created() {
    try {
      const response = await api.get('/unidentified-bodies');
      this.unidentifiedBodies = response.data;
    } catch (err) {
      console.error('Error fetching unidentified bodies:', err);
    }
  }
};
</script>

<style scoped>
.container {
  padding: 30px;
  font-family: 'Poppins', sans-serif;
}
h2 {
  color: #003366;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th, td {
  padding: 10px;
  border: 1px solid #ccc;
}
th {
  background: #00509e;
  color: white;
  text-align: left;
}
tbody tr:nth-child(even) {
  background: #f5f9ff;
}
</style>
