<template>
  <div>
    <v-row>
      <v-card style="width:100%; margin-top:2%;">
        <h2 style="margin-left: 35%;">Metodos de pagamento</h2>
        <v-row>
          <v-col cols="6">
            <v-hover v-slot="{ hover }" close-delay="200">
              <v-card class="mx-auto" :width="width" style="margin-top:5%; margin-bottom: 5%;"
                :elevation="hover ? 16 : 2">
                <!--v-for="[icon, text, href] in links" :key="icon" link :to="href"-->
                <v-card-title style="margin-top:1%;">
                  Metodo:
                </v-card-title>
                <v-card-text>
                  <h2>Boleto</h2>
                </v-card-text>

                <v-card-actions>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Open Dialog
                    </v-btn>
                  </template>

                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="6">
            <v-hover v-slot="{ hover }" close-delay="200">
              <v-card class="mx-auto" :width="width" style="margin-top:5%; margin-bottom: 5%;"
                :elevation="hover ? 16 : 2">
                <!--v-for="[icon, text, href] in links" :key="icon" link :to="href"-->
                <v-card-title style="margin-top:1%;">
                  Metodo:
                </v-card-title>
                <v-card-text>
                  <h2>Cartão de Crédito</h2>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="primary lighten-2" text v-if="card == false" @click="closeCard()">
                    adicionar cartão
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-card>
      <v-col cols="12" v-if="success">
        <v-alert border="top" colored-border type="info" elevation="2">
          Método cadastrado com sucesso!
        </v-alert>
      </v-col>
      <v-col cols="12" v-if="failed">
        <v-alert border="right" colored-border type="error" elevation="2">
          Erro ao cadastrar método de pagamento! Entre em contato com o suporte.
        </v-alert>
      </v-col>
      <v-col cols="12" v-if="loadData == true">
        <v-progress-linear indeterminate color="cyan"></v-progress-linear>
      </v-col>
      <v-col cols="12">
        <CreditCardForm v-if="visible" @payment="payment" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import CreditCardForm from '../components/CreditCardForm.vue'
export default {
  name: 'AddCreditCardView',
  data() {
    return {
      loadData: false,
      success: false,
      failed: false,
      plan: false,
      plan1: false,
      visible: false,
      checkbox: false,
      checkbox1: false,
      card: false,
    };
  },
  methods: {
    payment(obj) {
      this.closeCard();
      this.failed = false;
      this.success = false;
      this.loadData = !this.loadData;
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios.post("https://sinprev.com.br/user/payment/add", obj, req)
        .then(res => {
          console.log(res)
          this.loadData = !this.loadData;
          this.success = true;
          this.card = true;

        }).catch(err => {
          this.loadData = !this.loadData;
          console.log(err)
          this.failed = true;
          this.card = false;
        });
    },
    closeCard() {
      this.visible = !this.visible;
    },
    checkboxFunc() {
      this.checkbox = !this.checkbox
    },
    load() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios.get("https://sinprev.com.br/user/payment", req)
        .then(res => {
          console.log(res);
          if (res.data.card) {
            this.plan1 = true
            this.plan = false
            this.card = true
          } else {
            this.plan1 = false
            this.plan = true
            this.card = false
          }
        }).catch(err => {
          console.log(err)
        });
    },

  },
  components: {
    CreditCardForm
  },

  computed: {
    width() {
      var a = 0;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          a = "200";
          break;
        case "sm":
          a = "250";
          break;
        case "md":
          a = "350";
          break;
        case "lg":
          a = "350";
          break;
        case "xl":
          a = "350";
          break;
      }
      return a;
    }
  },
  created: function () {
    this.load();
  }

}
</script>
<style>

</style>

