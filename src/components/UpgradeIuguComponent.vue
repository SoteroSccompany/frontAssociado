<template>
    <div>
        <v-progress-linear :value="valueProgress"></v-progress-linear>
        <div style="margin-top:2%;">
            <v-expansion-panels v-model="openProfile">
                <v-expansion-panel :readonly="readonlyProfile">
                    <v-expansion-panel-header>
                        Dados de cadastro
                        <template v-slot:actions>
                            <v-icon color="primary" v-if="initProfile == true">
                                $expand
                            </v-icon>
                            <v-icon color="teal" v-if="checkprofile == true">
                                mdi-check
                            </v-icon>
                            <v-icon color="error" v-if="errorProfile == true">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <formAddProfile @updateProfile="profileRegister" />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel :readonly="readonlyCard">
                    <v-expansion-panel-header disable-icon-rotate>
                        Cartão de crédito
                        <template v-slot:actions>
                            <v-icon color="primary" v-if="initCard == true">
                                $expand
                            </v-icon>
                            <v-icon color="teal" v-if="checkCard == true">
                                mdi-check
                            </v-icon>
                            <v-icon color="error" v-if="errorCard == true">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <CreditCard @payment="payment" />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel :readonly="readonlyPlan">
                    <v-expansion-panel-header disable-icon-rotate>
                        Plano
                        <template v-slot:actions>
                            <v-icon color="primary" v-if="initPlan == true">
                                $expand
                            </v-icon>
                            <v-icon color="teal" v-if="checkPlan == true">
                                mdi-check
                            </v-icon>
                            <v-icon color="error" v-if="errorPlan == true">
                                mdi-alert-circle
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-alert dense outlined type="error" v-if="duplicate == true">
                            Só pode escolher um plano! <br> Para trocar de plano desative o atual e ative o novo.
                        </v-alert>
                        <v-col class="d-flex" cols="12" sm="12">
                            <v-select v-model="select" item-text="name" item-value="identifier" label="Select"
                                :items="items" persistent-hint return-object single-line></v-select>
                        </v-col>

                        <v-btn block color="primary" @click="conclude">
                            Clique aqui para realizar a atualização dos dados
                        </v-btn>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import formAddProfile from '../components/FormProfileComponent'
import CreditCard from '../components/CreditCardForm'
export default {
    name: "UpgradeIuguComponent",
    data() {
        return {
            select: {},
            items: [],
            duplicate: false,
            mensal: {},
            trimestral: {},
            semestral: {},
            anual: {},
            switch1: false,
            switch2: false,
            switch3: false,
            switch4: false,
            objCard: {},
            openProfile: 0,
            dialogAlert: false,
            valueProgress: 0,
            readonlyProfile: false,
            readonlyCard: true,
            readonlyPlan: true,
            errorProfile: false,
            errorCard: false,
            errorPlan: false,
            checkprofile: false,
            checkCard: false,
            checkPlan: false,
            initProfile: true,
            initCard: true,
            initPlan: true,
        }
    },
    methods: {
        async conclude() {
            const obj = {
                number: this.objCard.number,
                verification_value: this.objCard.verification_value,
                first_name: this.objCard.first_name,
                last_name: this.objCard.last_name,
                month: this.objCard.month,
                year: this.objCard.year,
                identifier: this.select.identifier,
            }

            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            try {
                await axios.post("https://sinprev.com.br/user/updatePagSeguro", obj, req);
                this.$emit("updateIugu", { status: true })
            } catch (err) {
                console.log(err);
                this.$emit("updateIugu", { status: false })

            }

            /*
               .then(res => {
               })
               .catch(err=>{
               })
               */
            //console.log(obj);
        },
        profileRegister(data) {
            console.log(data)
            if (data.status === true && data.alert == false) {
                this.readonlyProfile = true;
                this.checkprofile = true;
                this.initProfile = false;
                this.readonlyCard = false;
                this.valueProgress = 33;
                this.openProfile = 1;
            } else if (data.status == false) {
                this.readonlyProfile = true;
                this.errorProfile = true;
                this.dialogAlert = true;
                this.$emit("updateIugu", { status: false });

            } else if (data.exit === true) {
                this.readonlyProfile = true;
                this.checkprofile = true;
                this.initProfile = false;
                this.valueProgress = 33;
                this.openProfile = 1;
            }
        },
        payment(data) {
            this.objCard = data;
            this.readonlyCard = true;
            this.checkCard = true;
            this.initCard = false;
            this.readonlyPlan = false;
            this.valueProgress = 66;
            this.openProfile = 2;
        },
        laodPlan() {
            var storage = JSON.parse(localStorage.getItem("plan"));
            console.log(storage);
            this.mensal = storage[3]
            this.trimestral = storage[0]
            this.semestral = storage[1]
            this.anual = storage[2]
            const anual = { name: `${this.anual.name} - Valor: ${this.anual.price}`, identifier: this.anual.identifier };
            const trimestral = { name: `${this.trimestral.name} - Valor: ${this.trimestral.price}`, identifier: this.trimestral.identifier };
            const semestral = { name: `${this.semestral.name} - Valor: ${this.semestral.price}`, identifier: this.semestral.identifier };
            const mensal = { name: `${this.mensal.name} - Valor: ${this.mensal.price}`, identifier: this.mensal.identifier };
            this.items.push(mensal);
            this.items.push(trimestral);
            this.items.push(semestral);
            this.items.push(anual);
        }

    },
    components: {
        formAddProfile,
        CreditCard
    },
    created: function () {
        this.laodPlan();
    }
}
</script>