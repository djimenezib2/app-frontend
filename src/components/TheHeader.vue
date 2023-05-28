<template>
  <header>
    <h1>{{ title }}</h1>
    <h3 v-if="isLogged">Bienvenido {{ userName }}</h3>
    <button v-else @click="goToLogin">Log In</button>
  </header>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      isLogged: false,
      userName: '',
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    checkIfLogged() {
      if (localStorage.token) {
        this.isLogged = true;
        this.getUserName(localStorage.token);
      }
    },
    async getUserName(token) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      };
      const response = await fetch(
        'http://127.0.0.1:3000/v1/users/checkAuth',
        requestOptions
      );
      const responseData = await response.json();
      this.userName = responseData.name;
    },
  },
  mounted() {
    this.checkIfLogged();
  },
};
</script>
<style scoped>
header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #008d94;
  color: #eeeeee;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>
