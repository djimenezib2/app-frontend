<template>
  <div>
    <form @submit.prevent="submitForm">
      <h1>Login</h1>
      <div class="form-control">
        <label for="email"> Your Email</label>
        <input id="email" name="email" type="text" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">Your Password</label>
        <input
          id="password"
          class="password"
          type="password"
          v-model="password"
        />
      </div>
      <div>
        <button>Login</button>
      </div>
      <div v-if="validity === 'fail'" class="error-message">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      validity: 'pending',
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      this.errorMessage = '';
      this.validity = 'pending';

      const data = {
        email: this.email,
        password: this.password,
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        'http://127.0.0.1:3000/v1/users/login',
        requestOptions
      );
      const responseData = await response.json();

      if (responseData.status === 'fail') {
        this.errorMessage = responseData.message;
        this.validity = responseData.status;
      } else {
        localStorage.token = responseData.token;
        this.$store.state.userRole = responseData.data.user.role;
        this.$router.push({ path: '/licitaciones' });
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  width: fit-content;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.26);
  padding: 2rem;
  background-color: #2b2b2b;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
}

h1 {
  margin: 0.5rem 0;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
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

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
