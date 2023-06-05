<template>
  <div class="errors-container">
    <h2 style="color: #a7a7ac">Errores recientes en la plataforma</h2>
    <ul>
      <li v-for="error in errors" :key="error.id">
        <p style="color: #e82766">
          Error: {{ error.message }}; Status Code:
          {{ error.statusCode }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      errors: null,
    };
  },
  methods: {
    loadInfo() {
      this.loadErrors();

      setInterval(() => {
        this.loadErrors();
      }, 5000);
    },
    loadErrors() {
      fetch('http://127.0.0.1:3000/v1/errors?limit=5')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.errors = data.data.doc;
        });
    },
  },
  mounted() {
    this.loadInfo();
  },
};
</script>

<style scoped>
.errors-container {
  margin: 2rem;
  max-width: 40rem;
  /* width: 30rem; */
  padding: 1rem;
  border-radius: 12px;
  background-color: #313035;
}

ul {
  padding: 0;
  list-style-type: disc;
  /* list-style-type: none; */
  /* list-style: inside; */
}

li {
  display: flex;
  align-items: center;
}
</style>
