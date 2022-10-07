<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <NavBar />
            </v-col>
            <v-col cols="9">
                <TableStudents />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import TableStudents from "../components/TableStudents.vue";

export default {
    name: "HomeView",

    components: {
        NavBar,
        TableStudents,
    },
};
</script>
<style>
.v-main {
    padding: 0 !important;
}
</style>
