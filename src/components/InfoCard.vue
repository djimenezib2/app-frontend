<template>
  <div class="card-container">
    <ul>
      <li>
        <h2 style="color: #a7a7ac">{{ title }}</h2>
        <h3>
          <p v-if="counting" style="color: #c4c3c1; font-size: 1.4rem">
            {{ currentCount }}
          </p>
          <p v-else style="color: #c4c3c1; font-size: 1.4rem">{{ data }}</p>
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
.card-container {
  margin: 2rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: #313035;
}

ul {
  padding: 0;
  list-style-type: disc;
  list-style-type: none;
  text-align: center;
}

li {
  align-items: center;
}
</style>
