<template>
    <v-list dense>
        <v-list-item class="item" v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
                <v-icon class="item-icon">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title class="item-title">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
/* eslint-disable */
export default {
    name: "NavBar",
    data: () => ({
        drawer: null,
        items: [
            { title: "Alunos", icon: "mdi-account-group" },
            // { title: "Usuarios", icon: "mdi-account-cog" },
        ],
    }),
};
</script>

<style>
.card-title {
    background-color: #3f51b5;
    color: white;
}

.item {
    background-color: #3f51b5;
    border-radius: 10px 0 0 10px;
}

.item::after {
    content: "";
    position: absolute;
    left: 100%;
    width: 50px;
    height: 100%;
    background-color: #ff000000;
    border-top: white 20px solid;
    border-top: 20px solid white;
    border-bottom: 20px solid white;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left: 38px solid #3f51b5;
}

.item-icon {
    color: white !important;
}

.item-title {
    color: white;
    font-size: 1.2rem !important;
}
</style>
