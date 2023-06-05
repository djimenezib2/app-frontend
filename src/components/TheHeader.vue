<template>
  <header>
    <div class="container">
      <div class="centered-heading">
        <div
          :style="isLogged ? { marginLeft: '12rem' } : { marginLeft: 0 }"
        ></div>
        <router-link
          to="/admin"
          v-if="userRole === 'admin' || userRole === 'superadmin'"
          class="admin"
          :style="
            currentPath === '/admin'
              ? {
                  color: '#278667',
                  backgroundColor: '#27262b',
                  border: '1px solid #3a393e',
                }
              : { color: '#bcbbc1' }
          "
        >
          <font-awesome-icon icon="user-shield" />
          <h1 style="font-size: 0.7rem">ADMIN</h1>
        </router-link>
        <router-link
          to="/licitaciones"
          class="licitaciones"
          :style="
            currentPath === '/licitaciones'
              ? {
                  color: '#278667',
                  backgroundColor: '#27262b',
                  border: '1px solid #3a393e',
                }
              : { color: '#bcbbc1' }
          "
        >
          <font-awesome-icon icon="list" />
          <h1 style="font-size: 0.7rem">LICITACIONES</h1>
        </router-link>
      </div>
      <div v-if="isLogged" class="right-content">
        <h3 style="color: #bcbbc1; font-size: 0.9rem">
          Bienvenido, {{ userName }}
        </h3>
        <button
          @click="logOut"
          class="button"
          style="
            margin-left: 3rem;
            font-size: 0.9rem;
            background-color: #e82766;
            border: 1px solid #e82766;
          "
        >
          Log out
        </button>
      </div>
      <button v-else @click="goToLogin" class="button">Log In</button>
    </div>
  </header>
</template>

<script>
export default {
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
    logOut() {
      localStorage.removeItem('token');
      this.$store.state.userRole = '';
      // this.$router.go();
      this.$router.push('/login');
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
  computed: {
    currentPath() {
      return this.$route.path;
    },
    userRole() {
      return this.$store.state.userRole;
    },
  },
  mounted() {
    this.checkIfLogged();
  },
};
</script>
<style scoped>
.button {
  font: inherit;
  background-color: #44b188;
  border: 1px solid #44b188;
  color: #dfdde6;
  cursor: pointer;
  width: 5rem;
  height: 2rem;
  margin-right: 1rem;
  border-radius: 1rem;
  margin-left: auto;
}

button:hover,
button:active {
  background-color: #056741;
  border: 1px solid #056741;
  transform: scale(1.1);
}

.container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 4.5rem;
  background-color: #1d1c21;
}

.centered-heading {
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 2rem;
  text-align: center;
}

.licitaciones,
.admin {
  display: flex;
  flex-direction: column;
  color: #bcbbc1;
  text-decoration: none;
  width: 5rem;
  padding: 0.5rem;
  border-radius: 0.7rem;
}

.licitaciones:hover,
.admin:hover {
  background-color: #3b3a3f;
  border-radius: 0.7rem;
}

.right-content {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
