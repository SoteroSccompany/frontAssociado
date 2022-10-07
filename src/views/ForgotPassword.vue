<template>

    <div>
        <v-card class="containerLogin">
            <v-row no-gutters>
                <v-col cols="6">
                    <div max-height="949" class="cardLogotext">

                        <v-img height="150" src="../../src/assets/LogoSinprev.png"></v-img>

                        <v-card-title>Perdeu sua senha?</v-card-title>

                        <v-card-text>

                            <div class="my-4 text-subtitle-1">
                                Digite seu e-mail e enviaremos um link para você redefinir sua senha.
                            </div>

                            <div>Área destinada apenas para filiados</div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                    </div>
                </v-col>


                <v-col class="col1" cols="6">
                    <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="550">
                        <v-card class="cardLogin" max-width="550">
                            <v-form ref="form" v-model="valid" lazy-validation class="form">
                                <v-text-field v-model="email" :rules="[rules.valid, rules.required]"
                                    label="Digite seu e-mail" required>
                                </v-text-field>

                                <div class="form-group-botons">
                                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="login" block>
                                        Recurepar senha
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


            </v-row>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios';
export default {

    data: () => {
        return {
            show1: false,
            valid: false,
            password: '',
            email: '',
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
        async login() {
            //var time = 0;
            this.load = true;

            if (this.$refs.form.validate()) {
                this.data = {
                    email: this.email
                }
                axios.post("https://sinprev.com.br/user/reset", this.data)
                    .then(response => {
                        console.log(response)
                        this.load = false;
                        this.excludVar = response;
                        this.excludVar = '';
                        this.$router.push('/');
                    }).catch(error => {
                        console.log(error)
                        this.errorMsg = error.response.data.msg;
                        this.load = false;
                        this.error = true;
                        this.excludVar = error;
                        this.excludVar = '';
                    });
            }

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