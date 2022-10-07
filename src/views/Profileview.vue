<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <h2 class="title">Dados de Acesso</h2>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="message1" label="Seu e-mail"></v-text-field>
                                    <v-btn class="ma-2" outlined color="indigo" block
                                        @click="dialogEmail = !dialogEmail">
                                        Trocar e-mail
                                    </v-btn>
                                </v-col>


                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="message2" label="Sua Senha"></v-text-field>
                                    <v-btn class="ma-2" outlined color="indigo" block
                                        @click="dialogValidate = !dialogValidate">
                                        Trocar Senha Button
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card>
                <h2 class="title">Dados de Perfil</h2>
                <v-card-text>
                    <FormProfileComponentVue @updateProfile="profileResult" />
                </v-card-text>
            </v-card>
        </v-col>

        <v-dialog v-model="dialogValidate" persistent max-width="590">
            <template v-slot:default="dialogValidate">
                <v-card>
                    <v-toolbar color="primary" dark>Digite sua senha para realizar a aoperação</v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation class="form">

                            <v-text-field v-model="message1" label="Seu e-mail"></v-text-field>
                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                name="input-10-1" label="Digite sua senha" hint="At least 8 characters" counter
                                @click:append="show1 = !show1">
                            </v-text-field>
                            <v-alert dense outlined type="error" v-if="error">
                                {{ errorMsg }}
                            </v-alert>
                            <v-text-field color="success" loading disabled v-if="load"></v-text-field>
                            <!-- -->
                        </v-form>
                    </v-card-text>



                    <v-card-actions class="justify-end">
                        <v-btn text @click="login()" class="primary">Concluir</v-btn>
                        <v-btn text @click="clear(dialogValidate)">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <v-dialog v-model="dialogEmail" persistent max-width="590">
            <template v-slot:default="dialogEmail">
                <v-card>
                    <v-toolbar color="primary" dark>Digite seu novo e-mail</v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation class="form">
                            <v-text-field v-model="email" :rules="[rules.valid, rules.required]"
                                label="Digite seu novo e-mail" required style="margin-top:5%;">
                            </v-text-field>
                            <v-alert dense outlined type="error" v-if="error">
                                {{ errorMsg }}
                            </v-alert>
                            <!-- -->
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="changeEmail(dialogEmail)" class="primary">Concluir</v-btn>
                        <v-btn text @click="clear(dialogEmail)">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <v-dialog v-model="dialogPass" persistent max-width="590">
            <template v-slot:default="dialogPass">
                <v-card>
                    <v-toolbar color="primary" dark>Digite sua nova senha:</v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation class="form">

                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                style="margin-top:5%;" :rules="[rules.required, rules.min]"
                                :type="show1 ? 'text' : 'password'" name="input-10-1" label="Digite sua senha"
                                hint="At least 8 characters" counter @click:append="show1 = !show1">
                            </v-text-field>
                            <v-text-field color="success" loading disabled v-if="load"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="changePass()" class="primary">Concluir</v-btn>
                        <v-btn text @click="clear(dialogPass)">Cancelar</v-btn>

                    </v-card-actions>


                </v-card>
            </template>
        </v-dialog>

        <v-dialog v-model="dialogAlert" persistent max-width="590">
            <template v-slot:default="dialogAlert">
                <v-card>
                    <v-toolbar color="primary" dark>Digite sua nova senha:</v-toolbar>
                    <v-card-text>

                        <h3>{{ msgAlert }}</h3>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="clear(dialogAlert)">Concluir</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>


        <v-dialog v-model="dialogAlertProfile" persistent max-width="590">
            <template v-slot:default="dialogAlertProfile">
                <v-card>
                    <v-toolbar color="primary" dark>Alerta sobre operação:</v-toolbar>
                    <v-card-text>
                        <h3 style="margin-top:8%">{{ msgAlertProfile }}</h3>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="clear(dialogAlertProfile)">Concluir</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-row>
</template>
<script>
import axios from 'axios';
import FormProfileComponentVue from '@/components/FormProfileComponent.vue';

export default {
    name: 'LoginView',
    data() {
        return {
            message1: 'exemplo@sinprev.com.br',
            message2: '************',
            msgAlertProfile: '',
            dialogAlertProfile: false,
            dialogEmail: false,
            dialogPass: false,
            dialogValidate: false,
            dialogAlert: false,
            show1: false,
            valid: false,
            load: false,
            msgAlert: '',
            error: "",
            password: '',
            email: '',
            rules: {
                required: value => !!value || 'Valor obrigatório.',
                valid: v => /.+@.+\..+/.test(v) || "E-mail inválido",
                min: v => v.length >= 6 || 'Senha deve conter no mínimo 6 characters',
            },
        }
    },
    methods: {
        profileResult(data){
            if(data.status === true && data.alert === false){
                console.log("Log Aplication: HHTSDA55875")
            }else if(data.status === false){
                this.dialogAlertProfile = true;
                this.msgAlertProfile = data.msg;
            }else{
                this.dialogAlertProfile = true;
                this.msgAlertProfile = data.msg;
            }

        },
        async loadData() {
            /*var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            axios.get("https://sinprev.com.br/user/profile/info", req).then((response) => {
                this.message1 = response.data.userDecode.token.email;
            }).catch((error) => {
                console.log(error)
            });*/
        },
        clear() {
            this.dialogAlertProfile = false;
            this.dialogEmail = false;
            this.dialogPass = false;
            this.dialogValidate = false;
            this.dialogAlert = false;
        },
        login() {
            this.load = true;
            if (this.$refs.form.validate()) {
                this.data = {
                    email: this.message1,
                    password: this.password
                }
                axios.post("https://sinprev.com.br/user/login", this.data)
                    .then(response => {
                        console.log(response)
                        localStorage.setItem("token", response.data.token);
                        console.log(response)
                        this.dialogValidate = false;
                        this.dialogPass = true;
                        this.load = false;
                        this.password = "";

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
        },
        changePass() {
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            this.load = true;
            if (this.$refs.form.validate()) {
                this.data = {
                    password: this.password,
                    token: localStorage.getItem("token")
                }
                axios.put("https://sinprev.com.br/user/reset/password/", this.data, req)
                    .then(response => {
                        console.log(response)
                        this.dialogValidate = false;
                        this.dialogPass = true;
                        this.load = false;
                        this.password = "";
                        this.dialogPass = false;
                        this.dialogAlert = true;
                        this.msgAlert = response.data.userUpdate.msg;

                    }).catch(error => {
                        console.log(error)
                        this.errorMsg = error.response.data.userUpdate.msg;
                        this.load = false;
                        this.error = true;
                        this.excludVar = error;
                        this.excludVar = '';
                        //time += 1;
                    });
            }
        },
        changeEmail() {
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            this.load = true;
            if (this.$refs.form.validate()) {
                this.data = {
                    email: this.email,
                }

                axios.put("https://sinprev.com.br/user/reset/email/", this.data, req)
                    .then(response => {
                        console.log(response)
                        this.email = "";
                        this.dialogEmail = false;
                        this.dialogAlert = true;
                        this.msgAlert = response.data.msg;

                    }).catch(error => {
                        console.log(error)
                    });
            }
        }

    },
    created: function () {
        this.loadData();
    },
    components: {
        FormProfileComponentVue
    }
}
</script>
<style scoped>
.title {
    text-align: center;
}

.form {
    margin-top: 8%;
}
</style>