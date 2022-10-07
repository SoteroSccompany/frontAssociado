<template>
    <div>


        <UpgradeIuguComponent @updateIugu="update" v-if="updateComponent == true" />

        <v-dialog v-model="dialogAlert" persistent max-width="590">
            <template v-slot:default="dialogAlert">
                <v-card>
                    <v-toolbar color="primary" dark>ALERTA</v-toolbar>
                    <v-card-text style="margin-top:1%;">

                        <h3>Ocorreu um erro no servidor do SINPREV</h3>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="clear(dialogAlert)">Clique para recarregar a página e refaça seu cadastro
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <v-dialog v-model="dialogAlertOK" persistent max-width="590">
            <template v-slot:default="dialogAlertOK">
                <v-card>
                    <v-toolbar color="primary" dark>Processo concluído!</v-toolbar>
                    <v-card-text style="margin-top:1%;">

                        <h3>Atualização de dados concluída com sucesso</h3>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="conclude(dialogAlertOK)">Clique e refaça seu login
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

    </div>
</template>
<script>
import UpgradeIuguComponent from '@/components/UpgradeIuguComponent.vue';
export default {
    name: "UpdateIuguView",
    data: () => {
        return {
            dialogAlert: false,
            dialogAlertOK: false,
            updateComponent: true,

        }
    },
    methods: {
        update(data) {
            if (data.status == true) {
                this.updateComponent = false
                this.dialogAlertOK = true                
            } else {
                this.$dialogAlert = true
            }

        },
        clear() {
            location.reload();
        },
        conclude(){
            window.location.href = "https://areaassociado.herokuapp.com/";
        }

    },
    components: {
        UpgradeIuguComponent
    }
}
</script>