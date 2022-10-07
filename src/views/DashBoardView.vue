<template>
    <v-item-group>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-item>
                        <v-hover v-slot="{ hover }" close-delay="200">
                            <v-card class="align-center" height="150" :elevation="hover ? 16 : 2">
                                <v-card-title>
                                    <v-icon large>
                                        mdi-badge-account-horizontal
                                    </v-icon>
                                    <pre> </pre>
                                    <h3>Situação:</h3>
                                </v-card-title>
                                <v-card-text>
                                    <h1 style="margin-left:35%" v-if="loadData == false"><strong>{{ planSituation
                                    }}</strong></h1>

                                    <v-progress-circular :size="50" color="primary" indeterminate
                                        v-if="loadData == true"></v-progress-circular>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-item>
                </v-col>

                <v-col cols="12" md="4">
                    <v-item>
                        <v-hover v-slot="{ hover }" close-delay="200">
                            <v-card class="align-center" height="150" :elevation="hover ? 16 : 2">
                                <v-card-title>
                                    <v-icon large>
                                        mdi-book-open
                                    </v-icon>
                                    <pre> </pre>
                                    <h3>Plano:</h3>
                                </v-card-title>
                                <v-card-text>
                                    <h2 style="margin-left:15%" v-if="loadData == false"><strong>{{ namePlan }}</strong>
                                    </h2>

                                    <v-progress-circular :size="50" color="primary" indeterminate
                                        v-if="loadData == true"></v-progress-circular>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-item>
                </v-col>

                <v-col cols="12" md="4">
                    <v-item>
                        <v-hover v-slot="{ hover }" close-delay="200">
                            <v-card class="align-center" height="150" :elevation="hover ? 16 : 2">
                                <v-card-title>
                                    <v-icon large>
                                        mdi-account-cash-outline
                                    </v-icon>
                                    <pre> </pre>
                                    <h3>Forma de pagamento:</h3>
                                </v-card-title>
                                <v-card-text>
                                    <h1 style="margin-right:65%" v-if="loadData == false"><strong>{{ paymentMethod
                                    }}</strong></h1>

                                    <v-progress-circular :size="50" color="primary" indeterminate
                                        v-if="loadData == true"></v-progress-circular>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-item>
                </v-col>
            </v-row>
            <v-row>
                <v-expansion-panels multiple style="width:98%; margin-left:1%">
                    <v-expansion-panel>
                        <v-expansion-panel-header>Notificações - Nenhuma notificação no momento
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            {{ newUser }}

                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
        </v-container>
        <v-dialog v-model="dialogAlert" persistent max-width="590">
            <template v-slot:default="dialogAlert">
                <v-card>
                    <v-toolbar color="primary" dark>ALERTA</v-toolbar>
                    <v-card-text style="margin-top:1%;">

                        <h3>O SINPREV está trocando o meio para realizar o pagamento das mensalidades. <br>
                            Será necessário a atualização dos seus dados para continuar utilizando a área do associado
                        </h3>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="clear(dialogAlert)">Continuar para página de atualização</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-item-group>
</template>

<script>
import axios from 'axios';
export default {
    //JSON.parse()
    //JSON.stringify()
    name: "DashBoardView",
    data: () => {
        return {
            dialogAlert: false,
            On: "0",
            Auth: "0",
            Block: "0",
            newUser: "",
            planSituation: "",
            paymentMethod: "",
            namePlan: "",
            loadData: false,
        }

    },
    methods: {
        clear() {
            this.dialogAlert = false;
            this.$router.push({ name: 'updateIugu' });
        }
    },
    components: {
    },
    created: function () {
        localStorage.getItem("safepayError") == null ? this.dialogAlert = false : this.dialogAlert = true;
        this.loadData = true;
        if (localStorage.getItem('user') === null || localStorage.getItem('plan') === null) {
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
                    this.planSituation = response.data.data.data.user.active;
                    this.paymentMethod = response.data.data.data.user.method;
                    this.namePlan = response.data.data.data.user.plan;
                    this.loadData = false;
                }).catch(error => {
                    console.log(error);
                });
        } else {
            var storage = JSON.parse(localStorage.getItem("user"));
            this.planSituation = storage.active;
            this.paymentMethod = storage.method;
            this.namePlan = storage.plan;
            this.loadData = false;
            return;
        }
    }
}
</script>
<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>

