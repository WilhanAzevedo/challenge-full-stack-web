<template>
    <v-data-table :headers="headers" :items="students" :search="search" sort-by="RA" class="elevation-1">
        <template v-slot:top>
            <div class="table-title">
                <span>Consulta de Alunos</span>
            </div>
            <v-toolbar flat>
                <v-text-field class="search" v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Cadastrar Aluno </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="editedItem.name" label="Nome" id="name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="editedItem.email" label="Email" id="email"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="editedItem.ra" label="Registro Academico (RA)" id="ra" :disabled="enable"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-mask="'###.###.###-##'" v-model="editedItem.cpf" label="CPF" id="cpf" :disabled="enable"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
                            <v-btn color="green darken-1" text @click="save"> Salvar </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Tem certeza que deseja excluir esse aluno?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="closeDelete">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small color="success" class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon small color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
    </v-data-table>
</template>

<script>
import students from "@/services/requests/students";
export default {
    name: "TableStudents",

    created() {
        this.initialize();
    },

    data: () => ({
        dialog: false,
        dialogDelete: false,
        search: "",
        headers: [
            { text: "Registro Academico", value: "ra" },
            { text: "Nome", value: "name" },
            { text: "CPF", value: "cpf" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        students: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            ra: "",
            cpf: "",
            email: "",
        },
        defaultItem: {
            name: "",
            ra: "",
            cpf: "",
            email: "",
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Novo Aluno" : "Editar Aluno";
        },
        enable() {
            return this.editedIndex === -1 ? false : true;
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    methods: {
        initialize() {
            students
                .getAllStudents()
                .then((response) => {
                    this.students = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        editItem(item) {
            this.editedIndex = this.students.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.students.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            students
                .deleteStudent(this.editedItem.id)
                .then((response) => {})
                .catch((error) => {
                    console.log(error);
                });
            this.students.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                students.updateStudent(this.editedItem.id, this.editedItem).then((response) => {});
                Object.assign(this.students[this.editedIndex], this.editedItem);
            } else {
                students
                    .createStudent(this.editedItem)
                    .then((response) => {
                        this.students.push(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            this.close();
        },
    },
};
</script>

<style>
.table-title {
    font-size: 1.3rem;
    font-weight: 500;
    color: #333;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.search {
    margin-right: 5rem;
}

.text-h5 {
    width: 80%;
    text-align: center;
    margin: auto;
}
</style>
