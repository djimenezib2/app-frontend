<template>
  <div>
    <the-header />
    <div class="container">
      <div class="superadmin-container" v-if="userRole === 'superadmin'">
        <runnable-list />
        <error-list />
      </div>
      <hr class="solid" v-if="userRole === 'superadmin'" />
      <div id="tenders">
        <div class="tenders1">
          <info-card
            title="Licitaciones totales"
            :data="this.totalTenders"
          ></info-card>
          <info-card
            title="Licitaciones recogidas en el último día"
            :data="this.lastTenders"
          ></info-card>
        </div>
        <div class="tenders2">
          <info-card
            title="Licitaciones del BOE"
            :data="this.tendersBOE"
          ></info-card>
          <info-card
            title="Licitaciones de Contratación del Estado"
            :data="this.tendersCDE"
          ></info-card>
          <info-card
            title="Licitaciones de Contratos Menores"
            :data="this.tendersCM"
          ></info-card>
          <info-card
            title="Licitaciones del DRE"
            :data="this.tendersDRE"
          ></info-card>
          <info-card
            title="Licitaciones del TED"
            :data="this.tendersTED"
          ></info-card>
        </div>
      </div>
      <hr class="solid" />
      <div id="organizaciones">
        <info-card
          title="Organizaciones registradas"
          :data="this.totalOrganizations"
        ></info-card>
        <info-card
          title="Organizaciones contratantes"
          :data="this.contractingOrganizations"
        ></info-card>
        <info-card
          title="Organizaciones adjudicatarias"
          :data="this.bidderOrganizations"
        ></info-card>
      </div>
      <hr class="solid" />
      <div id="users">
        <info-card
          title="Usuarios registrados"
          :data="this.totalUsers"
        ></info-card>
        <info-card
          title="Usuarios registrados en el último día"
          :data="this.lastUsers"
        ></info-card>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from './TheHeader.vue';
import InfoCard from './InfoCard.vue';
import RunnableList from './RunnableList.vue';
import ErrorList from './ErrorList.vue';

export default {
  components: {
    TheHeader,
    InfoCard,
    RunnableList,
    ErrorList,
  },
  data() {
    return {
      totalTenders: 0,
      lastTenders: 0,
      totalOrganizations: 0,
      contractingOrganizations: 0,
      bidderOrganizations: 0,
      tendersBOE: 0,
      tendersCDE: 0,
      tendersCM: 0,
      tendersDRE: 0,
      tendersTED: 0,
      totalUsers: 0,
      lastUsers: 0,
    };
  },
  methods: {
    loadInfo() {
      this.getData();

      setInterval(() => {
        this.getData();
      }, 5000);
    },
    getData() {
      this.loadTotalTenders();
      this.loadLastTenders();
      this.loadTendersBOE();
      this.loadTendersCDE();
      this.loadTendersCM();
      this.loadTendersDRE();
      this.loadTendersTED();
      this.loadTotalOrganizations();
      this.loadContractingOrganizations();
      this.loadBidderOrganizations();
      this.loadTotalUsers();
      this.loadLastUsers();
    },
    loadTotalTenders() {
      fetch('http://127.0.0.1:3000/v1/tenders/counter')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.totalTenders = data.counter;
        });
    },
    loadLastTenders() {
      fetch('http://127.0.0.1:3000/v1/tenders/lastTenders')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.lastTenders = data.counter;
        });
    },
    loadTendersBOE() {
      fetch('http://127.0.0.1:3000/v1/tenders/source/boe')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.tendersBOE = data.totalItems;
        });
    },
    loadTendersCDE() {
      fetch('http://127.0.0.1:3000/v1/tenders/source/contratacionesdelestado')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.tendersCDE = data.totalItems;
        });
    },
    loadTendersCM() {
      fetch('http://127.0.0.1:3000/v1/tenders/source/contratacionesMenores')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.tendersCM = data.totalItems;
        });
    },
    loadTendersDRE() {
      fetch('http://127.0.0.1:3000/v1/tenders/source/dre')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.tendersDRE = data.totalItems;
        });
    },
    loadTendersTED() {
      fetch('http://127.0.0.1:3000/v1/tenders/source/ted')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.tendersTED = data.totalItems;
        });
    },
    loadTotalOrganizations() {
      fetch('http://127.0.0.1:3000/v1/organizations')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.totalOrganizations = data.totalItems;
        });
    },
    loadContractingOrganizations() {
      fetch(
        'http://127.0.0.1:3000/v1/organizations/publicContractingInstitutions'
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.contractingOrganizations = data.totalItems;
        });
    },
    loadBidderOrganizations() {
      fetch('http://127.0.0.1:3000/v1/organizations/bidders')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.bidderOrganizations = data.totalItems;
        });
    },
    loadTotalUsers() {
      fetch('http://127.0.0.1:3000/v1/users')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.totalUsers = data.results;
        });
    },
    loadLastUsers() {
      fetch('http://127.0.0.1:3000/v1/users/lastUsers')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.lastUsers = data.counter;
        });
    },
  },
  computed: {
    userRole() {
      return this.$store.state.userRole;
    },
  },
  mounted() {
    this.loadInfo();
  },
};
</script>

<style scoped>
.container {
  background-color: #3c3b41;
}

hr.solid {
  border-top: 1px solid #a7a7ac;
}

.superadmin-container {
  display: flex;
  justify-content: center;
}

.tenders1,
.tenders2,
#organizaciones,
#users {
  display: flex;
  justify-content: center;
}
</style>
