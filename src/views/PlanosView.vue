<template>
    <div>
        <v-progress-circular :size="250" color="primary" indeterminate style="margin-left:35%; margin-top: 15%;"
            v-if="loading"></v-progress-circular>
        <v-row v-if="!loading">
            <v-hover v-slot="{ hover }" close-delay="200" v-for="plan in planos" :key="plan.id">
                <v-card class="mx-auto" width="550" style="margin-top:5%; margin-bottom: 5%;"
                    :elevation="hover ? 16 : 2">
                    <!--v-for="[icon, text, href] in links" :key="icon" link :to="href"-->
                    <v-card-title style="margin-top:1%;">
                        Plano: {{ plan.name }}
                    </v-card-title>
                    <v-card-subtitle>
                        Valor: {{ plan.price }}<br />
                        Duração: {{ plan.time }}<br />
                    </v-card-subtitle>

                    <v-card-actions>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                Open Dialog
                            </v-btn>
                        </template>
                        <v-btn color="primary lighten-2" @click="change({ plan: plan.identifier })" text>
                            Trocar de plano
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="error lighten-2" text
                            v-if="plan.identifier == user.identifier ? 'Seu atual plano' : ''" @click="changeMethod">
                            Trocar Pagamento
                        </v-btn>
                        <v-spacer></v-spacer>
                        {{ plan.identifier == user.identifier ? 'Atual' : '' }}
                    </v-card-actions>
                </v-card>
            </v-hover>
            <div name="modalChangePLan">
                <v-dialog v-model="dialog" persistent max-width="590">
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar color="primary" dark>Alterar Plano </v-toolbar>
                            <v-form ref="form" v-model="valid" lazy-validation class="form">
                                <v-card-text>
                                    <div class="text-h5 pa-12">Digite sua senha para confirmar a troca de plano:
                                        <v-text-field :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                            v-model="password" :rules="[rules.required, rules.min]"
                                            :type="showPass ? 'text' : 'password'" name="input-10-2"
                                            label="Digite sua senha" @click:append="showPass = !showPass">
                                        </v-text-field>

                                        Plano atual: {{ user.identifier }} <br />
                                        Plano de destino: {{ changePlanName }}
                                    </div>
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn color="primary lighten-2" @click="changePlan()" text>
                                        Confirmar
                                    </v-btn>
                                    <v-btn text @click="clear(dialog)">Cancelar</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </template>
                </v-dialog>
            </div>
            <v-dialog v-model="dialog1" persistent max-width="590">
                <template v-slot:default="dialog1">
                    <v-card>
                        <v-toolbar color="primary" dark>Notificação</v-toolbar>
                        <v-card-text>
                            <div class="text-h5 pa-12">
                                {{ msgApi }}
                            </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn text @click="clear(dialog1)">Concluir</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>

            <v-dialog v-model="dialogPlan" persistent max-width="590">
                <template v-slot:default="dialogPlan">
                    <v-card>
                        <v-toolbar color="primary" dark>Notificação</v-toolbar>
                        <v-card-text>
                            <div class="text-h5 pa-12">
                                Método de pagamento Atual: {{ user.method }} <br />
                            </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn text @click="clear()">Cancelar</v-btn>
                            <v-btn text @click="UpdateMethod(dialogPlan)">Trocar para {{user.method == "Boleto" ?
                            "Cartão": "Boleto"}}</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "PlanosView",
    data: () => {
        return {
            dialogPlan: false,
            show: false,
            loading: true,
            planos: [],
            user: "",
            dialog: false,
            dialog1: false,
            showPass: false,
            valid: false,
            card: false,
            password: "",
            changePlanName: "",
            msgApi: "",
            object: {},
            rules: {
                required: value => !!value || 'Valor obrigatório.',
                min: (v) => v?.length >= 6 || 'Senha deve conter no mínimo 6 characters',
            }
        }

    },
    components: {
    },
    methods: {
        async UpdateMethod() {
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            const card = await axios.get("https://sinprev.com.br/user/payment", req);
            if (card.data.status) {
                if(card.data.card){
                        this.card = true
                }else{
                        this.card = false
                }
            }else{
                console.log(card)
            }
            this.object = {
                method: this.user.method,
                plan: this.user.identifier
            }
            if (this.card) {
                axios.put("https://sinprev.com.br/user/iugu/updateMethod", this.object, req)
                    .then((response) => {
                        console.log(response)
                        this.dialogPlan = false;
                        this.dialog1 = true;
                        this.msgApi = response.data.msg
                        this.object = {};
                        this.user.metho == "Boleto" ? this.user.method = "Cartão" : this.user.method = "Boleto"
                    })
                    .catch((error) => {
                        console.log(error)
                        this.dialogPlan = false;
                    });
            } else {

                this.dialog1 = true;
                this.msgApi = "Você não possui cartão cadastrado. Vá em metodos de pagamento e cadastre um cartão."
            }



        },
        changeMethod() {
            this.dialogPlan = true;
        },
        clear() {
            this.dialog = false;
            this.dialog1 = false;
            this.dialogPlan = false;
            this.password = "";
            this.msgApi = "";
        },
        change(data) {
            this.changePlanName = data.plan;
            this.dialog = true;

        },
        async changePlan() {
            if (this.$refs.form.validate()) {
                this.object = {
                    password: this.password,
                    newPlan: this.changePlanName,
                    Oldplan: this.user.identifier
                }
                this.dialog = false;
                this.password = "";
                var req = {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                };
                try {
                    const msg = await axios.post("https://sinprev.com.br/user/iugu/Altersubscription", this.object, req);
                    this.user.identifier = this.changePlanName;
                    this.dialog1 = true;
                    this.msgApi = msg.data.msg
                    this.object = {};
                } catch (err) {
                    this.dialog1 = true;
                    this.msgApi = err.response.data.msg;
                }
            }
        },
        loadData() {
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            axios.get("https://sinprev.com.br/user/iugu/subscription", req)
                .then(response => {
                    console.log(response)
                    localStorage.setItem("user", JSON.stringify(response.data.data.data.user));
                    localStorage.setItem("plan", JSON.stringify(response.data.data.data.plans));
                    var storage = JSON.parse(localStorage.getItem("plan"));
                    var storageUser = JSON.parse(localStorage.getItem("user"));
                    this.planos = storage;
                    this.planos.sort(function (a, b) {
                        if (a.id > b.id) return 1;
                        if (a.id < b.id) return -1;
                        return 0;
                    })
                    this.user = storageUser
                    this.loading = false;
                    return;
                }).catch(error => {
                    console.log(error);
                });
        }

    },
    created: function () {
        this.loadData();
        /*if (localStorage.getItem('user') === null || localStorage.getItem('plan') === null) {
           
        } else {
        }*/
    }
}
</script>
<style scoped>

</style>