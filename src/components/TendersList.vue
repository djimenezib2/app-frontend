<template>
  <div>
    <the-header title="Últimas Licitaciones"></the-header>
    <div class="container">
      <button @click="login('user@edu.tecnocampus.cat', 'user1234')">
        Log in as User
      </button>
      <button @click="login('admin@edu.tecnocampus.cat', 'admin1234')">
        Log in as Admin
      </button>
      <button
        @click="login('superadmin@edu.tecnocampus.cat', 'superadmin1234')"
      >
        Log in as SuperAdmin
      </button>
    </div>
    <div class="container">
      <ul id="tenderList">
        <li v-for="tender in tenders" :key="tender.name">
          <div class="head">
            <h2>{{ tender.expedient }}</h2>
            <h2 v-if="tender.value">{{ tender.value }}</h2>
          </div>
          <h3 class="type">{{ tender.contractType }}</h3>
          <h3 class="organization">{{ tender.contractingOrganization }}</h3>
          <p class="text">{{ tender.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheHeader from './TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      tenders: [],
      user: null,
      jwt: null,
    };
  },
  methods: {
    async login(email, password) {
      const data = {
        email,
        password,
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
      localStorage.token = responseData.token;
      this.user = responseData.data.user;
    },
    loadTenders() {
      fetch('http://127.0.0.1:3000/v1/tenders?limit=20&page=1')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          data = data.data.doc;
          const tenders = [];
          data.forEach((tender) => {
            const formattedValue = tender.contractEstimatedValue
              ? parseFloat(tender.contractEstimatedValue).toLocaleString(
                  'es-ES',
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }
                ) + ' €'
              : '';
            tenders.push({
              expedient: tender.expedient,
              contractType: tender.contractType,
              name: tender.name,
              value: formattedValue,
              contractingOrganization: tender.contractingOrganization.name,
            });
          });
          this.tenders = tenders;
        });
    },
  },
  mounted() {
    this.loadTenders();
  },
};
</script>

<style scoped>
.container {
  justify-content: center;
  display: flex;
}
#tenderList {
  list-style-type: none;
}
li {
  margin: 2rem auto;
  width: 40rem;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.26);
  background-color: #2b2b2b;
}
.head {
  display: flex;
  justify-content: space-between;
}

.head,
.text,
.organization,
.type {
  max-width: 38rem;
}
</style>
