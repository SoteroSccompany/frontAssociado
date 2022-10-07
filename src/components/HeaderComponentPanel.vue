<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Área do Associado</v-toolbar-title>
      <v-btn class="" fab dark small color="blue" @click="logout()" :style="width">
        <v-icon dark>
          mdi-account-arrow-right-outline
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"><img src="../assets/LogoSinprev.png" /></v-avatar>
        <div>Área do Associado</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text, href] in links" :key="icon" link :to="href">
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
  
<script>
export default {
  name: "HeaderComponentPanel",
  emits: ["handeDrawer"],
  data() {
    return {
      drawer: true,

      links: [
        ['mdi-inbox-arrow-down', 'Home', '/dashboard'],
        ['mdi-home', 'Perfil', '/profile'],
      ],
    };
  },
  created: function () {
    
    if (localStorage.getItem('iuguerr') == null) {
      this.links.push(['mdi-book-open-outline', 'Planos', '/planos']);
      this.links.push(['mdi-card-bulleted', 'Método de pagamento', '/payment-method']);
    } 

  },
  computed: {
    width() {
      var a = 0;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          a = "margin-left: 40%";
          break;
        case "sm":
          a = "margin-left:40%";
          break;
        case "md":
          a = "margin-left:70%";
          break;
        case "lg":
          a = "margin-left:75%";
          break;
        case "xl":
          a = "margin-left:75%";
          break;
      }
      return a;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      window.location.href = 'https://areaassociado.herokuapp.com';
    }
  },
};
</script>
<style scoped>
.router {
  text-decoration: black;
}
</style>

/* var req = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
axios
  .post("http://localhost:8686/validate", {}, req)
  .then((res) => {
    console.log(res);
    if (res.data.role == "User") {
      this.links = [
        ["mdi-microsoft-windows", "Dashboard", "/userDashboard"],
        ["mdi-account", "Perfil", "/profile"],
        ["mdi-clipboard-list-outline", "Avaliações", "/assessment"],
      ];
      this.name = res.data.role;
    } else {
      this.links = [
        ["mdi-microsoft-windows", "Dashboard", "/dashboard"],
        ["mdi-account", "Profile", "/profile"],
        ["mdi-clipboard-list-outline", "Users", "/users"],
        ["mdi-account-multiple-check-outline", "Users aprov", "/user/aprov"],
        ];
      this.name = res.data.role;
    }
  })
  .catch((err) => {
    console.log(err.response);
    localStorage.removeItem("token");
    window.location.href = "http://localhost:8080/login";
  });*/