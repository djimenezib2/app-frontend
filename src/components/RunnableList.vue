<template>
  <div class="runnables-container">
    <h2 style="color: #a7a7ac">Últimos rastreadores ejecutados</h2>
    <ul>
      <li v-for="runnable in runnables" :key="runnable.id">
        <p style="color: #44b188">
          {{ runnable.source }}: script "{{ runnable.type }}"; licitaciones
          nuevas/actualizadas: {{ runnable.items }}"
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      runnables: null,
    };
  },
  methods: {
    loadInfo() {
      this.loadRunnables();

      setInterval(() => {
        this.loadRunnables();
      }, 5000);
    },
    loadRunnables() {
      fetch('http://127.0.0.1:3000/v1/runnables?limit=5')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.runnables = data.data.doc;
        });
    },
  },
  mounted() {
    this.loadInfo();
  },
};
</script>

<style scoped>
.runnables-container {
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
