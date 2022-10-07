<template>
  <v-container>
    <v-row class="row-1">
    <v-card >
      <div class="card">
        <h2>User Login</h2>
        <v-form ref="form" v-model="valid" lazy-validation class="form">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
            Login
          </v-btn>

          <v-btn color="error" class="mr-4" to="/forgotPass"> Forgot Password
          </v-btn>

          <v-alert
            dense
            outlined
            type="error"
            v-if="errorMsg !== ''"
            class="alert"
          >
            {{ errorMsg }}
          </v-alert>
        </v-form>
      </div>
    </v-card>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
    }),
  }
</script>

