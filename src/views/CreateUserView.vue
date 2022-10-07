<template app>
    <div>
        <v-card class="containerLogin">
            <v-row no-gutters>
                <div class="desktop">

                </div>
                <v-col :cols="width">
                    <div max-height="949" class="cardLogotext">

                        <v-img height="150" src="../../src/assets/LogoSinprev.png"></v-img>

                        <v-card-title>Área do Associado</v-card-title>

                        <v-card-text>

                            <div class="my-4 text-subtitle-1">
                                Acesse a área para saber suas faturas, extratos, boletos e muito mais.
                                Caso necessário, abra um chamado em sua área de atendimento.
                            </div>

                            <div>Área destinada apenas para filiados</div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                    </div>
                </v-col>

                <v-col class="col1" :cols="width">
                    <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="550">
                        <v-card class="cardLogin" max-width="550">
                            <v-form ref="form" v-model="valid" lazy-validation class="form">
                                <v-text-field v-model="email" :rules="[rules.valid, rules.required]"
                                    label="Digite seu e-mail" required>
                                </v-text-field>
                                <v-text-field v-model="nameUser" :rules="[rules.required]" label="Digite seu CPF"
                                    required type="text">
                                </v-text-field>
                                <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="Digite sua senha" hint="At least 6 characters" counter
                                    @click:append="show1 = !show1">
                                </v-text-field>

                                <div class="form-group-botons">
                                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="login" block>
                                        Cadastrar
                                    </v-btn>
                                </div>
                                <v-text-field color="success" loading disabled v-if="load"></v-text-field>



                                <v-alert dense outlined type="error" v-if="error">
                                    {{ errorMsg }}
                                </v-alert>
                                <!-- -->
                            </v-form>
                        </v-card>
                    </v-parallax>
                </v-col>
                <v-dialog v-model="dialogUser" persistent max-width="590">
                <template v-slot:default="dialogUser">
                    <v-card>
                        <v-toolbar color="primary" dark>Notificação</v-toolbar>
                        <v-card-text>
                            <div class="text-h5 pa-12">
                                Registro efetuado com sucesso! Confirme seu e-mail para acessar a área do associado.
                            </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn text @click="createUser(dialogUser)">Concluir</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>


            </v-row>
        </v-card>
    </div>
</template>
  <script>
import axios from 'axios';

export default {
    name: 'CreateUserView',

    data: () => {
        return {
            show1: false,
            dialogUser: false,
            valid: false,
            password: '',
            email: '',
            nameUser: '',
            rules: {
                required: value => !!value || 'Valor obrigatório.',
                min: v => v.length >= 6 || 'Senha deve conter no mínimo 6 characters',
                valid: v => /.+@.+\..+/.test(v) || "E-mail inválido"
            },
            data: {},
            load: false,
            error: false,
            check: false,
            errorMsg: '',
            excludVar: '',
        }
    },

    methods: {
        createUser(dialog){
            var temp = dialog;
            console.log(temp)
            this.$router.push({ name: 'home' })

        },
        async login() {
            //var time = 0;

            if (this.$refs.form.validate()) {
                this.load = true;
                const timeElapsed = new Date();
                const year = timeElapsed.getFullYear();
                const mounthPure = timeElapsed.getMonth() +1;
                const mounth = mounthPure < 10 ? '0' + mounthPure : mounthPure;
                const day = timeElapsed.getDate();
                const date = year + "/"+ mounth + "/" + day;
                const cpf1 = this.nameUser.replace("-","");
                const cpf2 = cpf1.replace(".","");
                const cpf = cpf2.replace(".","");

                //const date = today.toLocaleDateString()
                this.data = {
                    email: this.email,
                    password: this.password,
                    cpf: cpf,
                    createdAt: date
                }
                console.log(this.data)
                axios.post("https://sinprev.com.br/user", this.data)
                    .then(response => {
                        console.log(response);
                        this.dialogUser = true;
                    }).catch(error => {
                        console.log(error)
                        this.errorMsg = error.response.data.msg;
                        this.load = false;
                        this.error = true;
                        this.excludVar = error;
                        this.excludVar = '';
                        //time += 1;
                    });
            }

        }
    },
    computed: {
        width() {
            var a = 0;
            switch (this.$vuetify.breakpoint.name) {
                case "xs":
                    a = 12;
                    break;
                case "sm":
                    a = 12;
                    break;
                case "md":
                    a = 6;
                    break;
                case "lg":
                    a = 6;
                    break;
                case "xl":
                    a = 6;
                    break;
            }
            return a;
        }
    },

    components: {
    },
}
</script>
  
  <style scoped>
  p {
      font-style: italic;
      font-weight: bold;
      font-size: 30px;
      font-family: arial, sans-serif;
  
  }
  
  .v-alert {
      margin-top: 1%;
  }
  
  h1 {
      text-align: center;
      font-size: 80px;
  }
  
  .form-group-botons {
      margin-top: 10%;
  }
  
  .cardLogotext {
      padding: 5%;
  }
  
  .cardLogin {
      padding: 5%;
      text-align: center;
      justify-content: center;
      margin-left: 3%;
  }
  
  .containerLogin {
      flex-direction: column;
      justify-content: center;
  }
  
  .col1 {
      flex-direction: column;
      justify-items: left;
  }
  </style>