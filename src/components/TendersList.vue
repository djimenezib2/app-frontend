<template>
  <div>
    <the-header />
    <div class="container">
      <ul id="tenderList">
        <li v-for="tender in tenders" :key="tender.name">
          <div class="head">
            <h2 style="color: #a7a7ac">{{ tender.expedient }}</h2>
            <h2 v-if="tender.value" style="color: #44b188">
              {{ tender.value }}
            </h2>
          </div>
          <h3 class="type" style="color: #c4c3c1">{{ tender.contractType }}</h3>
          <h3 class="organization" style="color: #c4c3c1">
            {{ tender.contractingOrganization }}
          </h3>
          <p class="text" style="color: #c4c3c1">{{ tender.name }}</p>
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
  background-color: #3c3b41;
}
#tenderList {
  list-style-type: none;
}
li {
  margin: 2rem auto;
  width: 40rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: #313035;
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
