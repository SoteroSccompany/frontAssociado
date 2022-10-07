<template>
    <v-hover v-slot="{ hover }" close-delay="200">


        <v-card :loading="loading" class="mx-auto my-12" max-width="774" :elevation="hover ? 16 : 2">
            <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img height="250" src="../assets/LogoSinprev.png"></v-img>

            <v-card-title style="margin-left:5%" >Sistema em manutenção - Será enviado um e-mail para todos assim que retornar</v-card-title>


            <v-divider class="mx-4"></v-divider>

          <!--  <v-card-title style="margin-left:32%;">Clique no botão para retornar</v-card-title>
            <v-card-title style="margin-left:32%;">Sistema em manutenção - Retorno as 20:00 horas do dia 06/10/2022</v-card-title>
            <v-card-text>
                <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>

                </v-chip-group>
            </v-card-text> -->

            <v-card-actions>
                <v-btn color="primary" class="mr-4" @click="back" block>
                    Retornar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>
<script>
export default {
    name: "NotFoundView",
    methods:{
        back(){
            //this.$router.push({name: 'home'})
        }
    }
}
</script>
<style scoped>
</style>