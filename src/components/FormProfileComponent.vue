<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="name" label="Nome" outlined :rules="nameRules">
                    </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="cpf" label="CPF" outlined :rules="cpfRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="sexo" label="Sexo" outlined :rules="sexoRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="estadoCivil" label="Estado Civil" outlined :rules="estadoCivilRules">
                    </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="escolaridade" label="Escolaridade" outlined :rules="escolaridadeRules">
                    </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="dataNascimento" label="Data Nascimento" outlined
                        :rules="dataNascimentoRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="cidadeNascimento" label="Cidade Nascimento" outlined
                        :rules="cidadeNascimentoRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="estadoNascimento" label="Estado Nascimento" outlined
                        :rules="estadoNascimentoRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="rg" label="Rg" outlined :rules="rgRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="rgExpedicao" label="Rg Expedição" outlined :rules="rgExpedicaoRules">
                    </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="nomePai" label="Nome do pai" outlined :rules="nomePaiRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="nomeMae" label="Nome da mãe" outlined :rules="nomeMaeRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="cep" label="CEP" outlined :rules="cepRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="endereco" label="Endereço" outlined :rules="enderecoRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="numero" label="Número" outlined :rules="numeroRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="complemento" label="Complemento" outlined :rules="complementoRules">
                    </v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="bairro" label="Bairro" outlined :rules="bairroRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="estado" label="Estado" outlined :rules="estadoRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="cidade" label="Cidade" outlined :rules="cidadeRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="celular" label="Celular" outlined :rules="celularRules"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="fundo" label="Fundo" outlined :rules="fundoRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="empresa" label="Empresa" outlined :rules="empresaRules"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field v-model="matricula" label="Matrícula" outlined :rules="matriculaRules"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-btn block style="margin-top:2%;" @click="updateProfile">
                        Confirmar Dados
                    </v-btn>
                </v-col>


            </v-row>
        </v-container>
    </v-form>
</template>
<script>

import axios from 'axios';

export default {
    name: 'FormProfileComponent',
    data() {
        return {
            valid: true,
            dialogAlert: false,
            msgAlert: '',
            name: '',
            cpf: '',
            sexo: '',
            estadoCivil: '',
            escolaridade: '',
            dataNascimento: '',
            cidadeNascimento: '',
            estadoNascimento: '',
            rg: '',
            rgExpedicao: '',
            nomeMae: '',
            nomePai: '',
            cep: '',
            endereco: '',
            numero: 0,
            complemento: '',
            bairro: '',//AQUI
            estado: '',
            cidade: '',
            celular: '',
            fundo: '',
            empresa: '',
            matricula: '',
            obj: {},
            token: '',
            nameRules: [
                v => !!v || 'Nome não pode ser nulo'
            ],
            cpfRules: [
                v => !!v || 'Cpf não pode ser nulo'
            ],
            sexoRules: [
                v => !!v || 'Sexo não pode ser nulo'
            ],
            estadoCivilRules: [
                v => !!v || 'Estado civil não pode ser nulo'
            ],
            escolaridadeRules: [
                v => !!v || 'Escolaridade não pode ser nulo'
            ],
            dataNascimentoRules: [
                v => !!v || 'Data de nascimento não pode ser nulo'
            ],
            cidadeNascimentoRules: [
                v => !!v || 'Cidade de nascimento não pode ser nulo'
            ],
            estadoNascimentoRules: [
                v => !!v || 'Estado de nascimento não pode ser nulo'
            ],
            rgRules: [
                v => !!v || 'Nome não pode ser nulo'
            ],
            rgExpedicaoRules: [
                v => !!v || 'Rg de expedição não pode ser nulo'
            ],
            nomeMaeRules: [
                v => !!v || 'Nome da mãe não pode ser nulo'
            ],
            nomePaiRules: [
                v => !!v || 'Nome do pai não pode ser nulo'
            ],
            cepRules: [
                v => !!v || 'Cep não pode ser nulo'
            ],
            enderecoRules: [
                v => !!v || 'Endereço não pode ser nulo'
            ],
            numeroRules: [
                v => !!v || 'Número não pode ser nulo'
            ],
            complementoRules: [
                v => !!v || 'Complemento não pode ser nulo'
            ],
            bairroRules: [
                v => !!v || 'Bairro não pode ser nulo'
            ],
            estadoRules: [
                v => !!v || 'Estado não pode ser nulo'
            ],
            cidadeRules: [
                v => !!v || 'Cidade não pode ser nulo'
            ],
            celularRules: [
                v => !!v || 'Celular não pode ser nulo'
            ],
            fundoRules: [
                v => !!v || 'Fundo não pode ser nulo'
            ],
            empresaRules: [
                v => !!v || 'Empresa não pode ser nulo'
            ],
            matriculaRules: [
                v => !!v || 'Matrícula não pode ser nulo'
            ],
        }
    },
    methods: {
        clear() {
            this.dialogAlert = false;

        },
        getProfile() {
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            axios.get("https://sinprev.com.br/user/profile/", req)
                .then(response => {
                    console.log(response.data.data)
                    this.name = response.data.data.name;
                    this.cpf = response.data.data.cpf;
                    this.sexo = response.data.data.sexo;
                    this.estadoCivil = response.data.data.estadoCivil;
                    this.escolaridade = response.data.data.escolaridade;
                    this.dataNascimento = response.data.data.dataNascimento;
                    this.cidadeNascimento = response.data.data.cidadeNascimento;
                    this.estadoNascimento = response.data.data.estadoNascimento;
                    this.rg = response.data.data.rg;
                    this.rgExpedicao = response.data.data.rgExpedicao;
                    this.nomeMae = response.data.data.nomeMae;
                    this.nomePai = response.data.data.nomePai;
                    this.cep = response.data.data.cep;
                    this.endereco = response.data.data.endereco;
                    this.numero = response.data.data.numero;
                    this.complemento = response.data.data.complemento;
                    this.bairro = response.data.data.bairro;
                    this.estado = response.data.data.estado;
                    this.cidade = response.data.data.cidade;
                    this.celular = response.data.data.celular;
                    this.fundo = response.data.data.fundo;
                    this.empresa = response.data.data.empresa;
                    this.matricula = response.data.data.matricula;
                    this.$emit("updateProfile", {status: true,  alert: false, msg: "Cadastre seus dados de perfil para continuar"});

                }).catch(error => {
                    if (error.response.data.ex === true) {
                        //console.log(error.response.data.ex)                        
                        //this.dialogAlert = true;
                       // this.msgAlert = "Cadastre seus dados de perfil para continuar";
                        this.$emit("updateProfile", {status: null, msg: "Cadastre seus dados de perfil para continuar"});
                        localStorage.setItem("Cadastro", true);
                    } else {
                        console.log(error)
                    }
                });
        },
        updateProfile() {
            if (this.$refs.form.validate() == true) {
                const cadastro = localStorage.getItem("Cadastro");
                if (cadastro === true) {
                    var req = {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    };
                    this.token = localStorage.getItem("token");
                    this.obj = {
                        name: this.name,
                        cpf: this.cpf,
                        sexo: this.sexo,
                        estadoCivil: this.estadoCivil,
                        escolaridade: this.escolaridade,
                        dataNascimento: this.dataNascimento,
                        cidadeNascimento: this.cidadeNascimento,
                        estadoNascimento: this.estadoNascimento,
                        rg: this.rg,
                        rgExpedicao: this.rgExpedicao,
                        nomeMae: this.nomeMae,
                        nomePai: this.nomePai,
                        cep: this.cep,
                        endereco: this.endereco,
                        numero: this.numero,
                        complemento: this.complemento,
                        bairro: this.bairro,
                        estado: this.estado,
                        cidade: this.cidade,
                        celular: this.celular,
                        fundo: this.fundo,
                        empresa: this.empresa,
                        matricula: this.matricula,
                        token: this.token,
                    }
                    axios.put("https://sinprev.com.br/user/profile/", this.obj, req)
                        .then(response => {                           
                            console.log(response)
                            this.$emit("updateProfile", {status: true, msg: response.data.msg});
                        }).catch(error => {
                            this.$emit("updateProfile", {status: false, msg: "Erro ao atualizar perfil"});
                            console.log(error)
                        });

                } else {
                    var req2 = {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    };
                    this.token = localStorage.getItem("token");
                    this.obj = {
                        name: this.name,
                        cpf: this.cpf,
                        sexo: this.sexo,
                        estadoCivil: this.estadoCivil,
                        escolaridade: this.escolaridade,
                        dataNascimento: this.dataNascimento,
                        cidadeNascimento: this.cidadeNascimento,
                        estadoNascimento: this.estadoNascimento,
                        rg: this.rg,
                        rgExpedicao: this.rgExpedicao,
                        nomeMae: this.nomeMae,
                        nomePai: this.nomePai,
                        cep: this.cep,
                        endereco: this.endereco,
                        numero: this.numero,
                        complemento: this.complemento,
                        bairro: this.bairro,
                        estado: this.estado,
                        cidade: this.cidade,
                        celular: this.celular,
                        fundo: this.fundo,
                        empresa: this.empresa,
                        matricula: this.matricula,
                        user_id: this.token,
                    }
                    axios.post("https://sinprev.com.br/user/profile/", this.obj, req2)
                        .then(response => {
                            console.log(response)
                            this.$emit("updateProfile", {status: true, msg: response.data.msg});

                        }).catch(error => {
                            this.$emit("updateProfile", {status: false, msg: 'Erro ao cadastrar perfil'});
                            console.log(error)
                        });

                }
            }
        },
    },
    created: function () {
        this.getProfile();
    },
}    
</script>