<!-- src/views/AllMissing.vue -->
<template>
  <div class="container">
    <h2>🕵️ All Reported Missing Persons</h2>

    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Last Seen Location</th>
          <th>Date Last Seen</th>
          <th>Clothing</th>
          <th>Physical Description</th>
          <th>Special Characteristics</th>
          <th>Behavior Notes</th>
          <th>Reporter Name</th>
          <th>Reporter Phone</th>
          <th>Relationship</th>
          <th>Date Reported</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in missingPersons" :key="person.id">
          <td>{{ person.full_name }}</td>
          <td>{{ person.date_of_birth }}</td>
          <td>{{ person.gender }}</td>
          <td>{{ person.last_seen_location }}</td>
          <td>{{ person.date_last_seen }}</td>
          <td>{{ person.clothing_description }}</td>
          <td>{{ person.physical_description }}</td>
          <td>{{ person.special_characteristics }}</td>
          <td>{{ person.behavior_notes }}</td>
          <td>{{ person.reporter_name }}</td>
          <td>{{ person.reporter_phone }}</td>
          <td>{{ person.reporter_relationship }}</td>
          <td>{{ person.date_reported }}</td>
          <td>
            <!-- ✅ View Details Link -->
            <router-link :to="`/missing/${person.id}`" class="view-link">View</router-link>
            <router-link :to="`/missing/${person.id}`">View</router-link> |
            <router-link :to="`/missing/${person.id}/edit`">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../api'; // Axios instance you set up in frontend

export default {
  data() {
    return {
      missingPersons: []
    };
  },
  async created() {
    try {
      const response = await api.get('/missing-persons');
      this.missingPersons = response.data;
    } catch (err) {
      console.error('Error fetching data:', err);
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
.view-link {
  color: #00509e;
  text-decoration: underline;
  cursor: pointer;
}
</style>
