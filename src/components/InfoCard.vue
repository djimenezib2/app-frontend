<template>
  <div class="container">
    <ul>
      <li>
        <h2>{{ title }}</h2>
        <h3>
          <span v-if="counting">{{ currentCount }}</span>
          <span v-else>{{ data }}</span>
        </h3>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['title', 'data'],
  data() {
    return {
      counting: false,
      currentCount: 0,
    };
  },
  watch: {
    data(newVal) {
      this.startCountAnimation(newVal);
    },
  },
  methods: {
    startCountAnimation(newVal) {
      this.counting = true;
      const duration = 1500;
      const frameRate = 40;
      const totalFrames = Math.ceil(duration / (1000 / frameRate));
      const increment = Math.ceil(newVal / totalFrames);

      let count = this.currentCount;
      const interval = setInterval(() => {
        count += increment;
        if (count >= newVal) {
          clearInterval(interval);
          count = newVal;
          this.counting = false;
        }
        this.currentCount = count;
      }, duration / totalFrames);
    },
  },
};
</script>

<style scoped>
li {
  margin: 2rem auto;
  /* width: 30rem; */
  width: fit-content;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(238, 238, 238, 0.26);
  background-color: #393e46;
}
ul {
  list-style-type: none;
}
</style>
