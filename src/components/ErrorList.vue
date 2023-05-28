<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="error in errors" :key="error.id">
        <p>
          Status: {{ error.status }}; Error: {{ error.message }}; Status Code:
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
.container {
  margin: 2rem auto;
  /* width: 30rem; */
  width: fit-content;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(238, 238, 238, 0.26);
  background-color: #393e46;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  border: solid 1px;
}
</style>
