<template>
    <v-hover v-slot="{ hover }" close-delay="200">
        <v-card  class="mx-auto my-12" max-width="774" :elevation="hover ? 16 : 2">
            <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img height="250" src="../assets/LogoSinprev.png"></v-img>

            <v-card-title style="margin-left:30%;">Confirmação de troca de e-mail</v-card-title>


            <v-divider class="mx-4"></v-divider>

            <v-card-title style="margin-left:22%;">Clique no botão para confirmar a troca de e-mail</v-card-title>

            <v-card-text>

                
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" class="mr-4" @click="ConfirmEmail" block>
                    Acessar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>
<script>
import axios from 'axios';
export default {
    name: 'ConfirmEmailChange',
    data() {
        return {

        }
    },
    methods:{
        ConfirmEmail(){
            const token = this.$route.params.token;
            axios.get(`https://sinprev.com.br/user/reset/email/${token}`)
            .then(res=>{
                console.log(res);
                this.$router.push('/');
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    created: function () {
        console.log(this.$route.params.token);
    }
}
</script>