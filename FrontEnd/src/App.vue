<template>
    <v-app>
        <v-app-bar app class="app-bar">
            <div class="d-flex align-center">
                <v-img alt="Mais a Logo" contain src="@/assets/logo-mais-a-educacao.svg" transition="scale-transition" width="80" />
            </div>
            <div class="title">
                <h1>Módulo Acadêmico</h1>
            </div>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",

    data: () => ({
        //
    }),
};
</script>
<style>
* {
    font-family: "Roboto", sans-serif;
}

.v-toolbar {
    all: initial;
}
.app-bar {
    position: relative !important;
    padding: 1rem;
    height: 10vh !important;
}

.app-bar .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>
