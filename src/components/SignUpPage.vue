<template>
  <div>
    <form @submit.prevent="submitForm">
      <h1>Sign Up</h1>
      <div class="form-control">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" v-model="name" />
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input id="email" name="email" type="text" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="password"
        />
      </div>
      <div style="display: flex; justify-content: center">
        <button>Sign Up</button>
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
      name: '',
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
        name: this.name,
        email: this.email,
        password: this.password,
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        'http://127.0.0.1:3000/v1/users/signup',
        requestOptions
      );
      const responseData = await response.json();

      if (responseData === 'fail') {
        this.errorMessage = responseData.message;
        this.validity = responseData.status;
      } else {
        localStorage.token = responseData.token;
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
  padding: 2rem;
  background-color: #313035;
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
  font-size: 1rem;
  background-color: #e82766;
  border: 1px solid #e82766;
  cursor: pointer;
  width: 5rem;
  height: 2rem;
  border-radius: 1rem;
  color: #dfdde6;
  margin-top: 1rem;
}

button:hover,
button:active {
  transform: scale(1.1);
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
