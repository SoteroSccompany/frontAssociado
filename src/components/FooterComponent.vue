
<template>
    <v-row justify="center" no-gutters>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
            {{  new Date().getFullYear()  }} <strong>© Sinprev - todos os direitos reservados</strong>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'FooterComponent',
    data: () => ({
        links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
};


</script>
