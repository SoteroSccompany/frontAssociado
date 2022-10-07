<template>
  <v-app>
    <HeaderComponentPanel v-if="nav == true" />
    <HeaderComponent v-else />

    <v-main>
      <v-container >
        <router-view class="view" />
      </v-container>
    </v-main>

    <v-footer color="primary lighten-1" padless>
      <footer-component />
    </v-footer>
  </v-app>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponentPanel from './components/HeaderComponentPanel.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import axios from 'axios';

export default {
  components: { FooterComponent, HeaderComponentPanel, HeaderComponent },
  name: 'App',

  data: () => {
    return {
      nav: false,
      temp: '',
    }
  },
  created: function () {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.nav = false;
    } else {
      axios.get("https://sinprev.com.br/user/verify", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(response => {
        this.temp = response;
        this.temp = "";
        this.nav = true;
      }).catch(error => {
        this.temp = error;
        this.temp = "";
        this.nav = false;
      });


    }
  },



}

</script>

<style scoped>
</style>
