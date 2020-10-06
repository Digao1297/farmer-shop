<template>
  <div id="type-product">
    <v-card class="pa-4">
      <div class="header-table">
        <v-text-field
          class="input-table"
          v-model="search"
          rounded
          required
          color="secondary"
          label="Pesquisar produto"
          append-icon="mdi-magnify"
        />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              v-on="on"
              class="mr-1"
              v-bind="attrs"
              color="secondary"
              @click.prevent="_openDialog()"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Cadastrar</span>
        </v-tooltip>
      </div>
      <v-data-table
        :headers="headers"
        :items="getTypeProducts"
        :search="search"
        :items-per-page="5"
        class="elevation-1"
      >
        <!-- Ignorar esse erro pq o eslint é bugado -->
        <template v-slot:item.actions="{ item }">
          <v-icon small class="icon mr-4" @click="_edit(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small class="icon" @click="_deleteDialog(item)"
            >mdi-delete</v-icon
          >
        </template>
      </v-data-table>
    </v-card>
    <!-- Dialog edit e create -->
    <v-dialog v-model="showDialog" max-width="400" persistent>
      <v-card>
        <v-form
          id="form-typr-product"
          ref="formTypeProduct"
          @submit.prevent="_submit()"
        >
          <v-card-title>
            <v-row class="card-header">
              <v-col xs="7" sm="8" md="8" lg="8" xl="8">
                <p class="title-card">Cadastrar</p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="form.name"
                  :rules="[rules.required]"
                  required
                  color="secondary"
                  :disabled="creatingTypeProduct"
                  outlined
                  label="Nome"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="card-actions pa-4">
            <v-spacer />
            <v-btn
              color="error"
              rounded
              :disabled="creatingTypeProduct"
              text
              @click="_closeDialog()"
              >Cancelar</v-btn
            >
            <v-btn
              color="secondary"
              rounded
              form="form-typr-product"
              type="submit"
              :loading="creatingTypeProduct"
              >Salvar</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Dialog delete -->
    <v-dialog v-model="showDeleteDialig" max-width="400" persistent>
      <v-card>
        <v-card-title>Confirmar ação</v-card-title>
        <v-card-text>Deseja deletar {{ productItemComp.name }}?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            text
            :disabled="deletingTypeProduct"
            @click="showDeleteDialig = false"
            >Cancelar</v-btn
          >
          <v-btn
            text
            :loading="deletingTypeProduct"
            @click="_deleteProduct(productItem)"
            >Confirmar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "type-product",
  data: () => ({
    //Type Product
    showDialog: false,
    creatingTypeProduct: false,
    form: {
      name: null
    },
    productItem: null,
    deletingTypeProduct: false,
    showDeleteDialig: false,

    search: "",
    headers: [
      { text: "Nome", value: "name" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    /**
     * Regras
     */
    rules: {
      required: value => !!value || "Campo obrigatório."
    }
  }),
  computed: {
    ...mapGetters({
      getTypeProducts: "dashboard/getTypeProducts"
    }),
    productItemComp: {
      get() {
        return this.productItem != null ? this.productItem : { name: "" };
      }
    }
  },
  methods: {
    ...mapActions({
      actionLoad: "dashboard/actionLoad",
      actionCreate: "dashboard/actionCreate",
      actionEdit: "dashboard/actionEdit",
      actionDelete: "dashboard/actionDelete"
    }),
    async _submit() {
      if (this.form.id != null) {
        if (this.form.name != null) {
          this.creatingTypeProduct = !this.creatingTypeProduct;
          await this.actionEdit(this.form)
            .then(() => {
              this.creatingTypeProduct = !this.creatingTypeProduct;
              this.showDialog = !this.showDialog;
              this._clearField();
            })
            .catch(error => {
              this.creatingTypeProduct = !this.creatingTypeProduct;
              console.error(error);
            });
        } else {
          alert("Preencha todos os campos");
        }
      } else {
        if (this.form.name != null) {
          this.creatingTypeProduct = !this.creatingTypeProduct;
          await this.actionCreate(this.form)
            .then(() => {
              this.creatingTypeProduct = !this.creatingTypeProduct;
              this.showDialog = !this.showDialog;
              this._clearField();
            })
            .catch(error => {
              this.creatingTypeProduct = !this.creatingTypeProduct;
              console.error(error);
            });
        } else {
          alert("Preencha todos os campos");
        }
      }
    },

    async _deleteProduct(item) {
      this.deletingTypeProduct = !this.deletingTypeProduct;

      await this.actionDelete(item)
        .then(() => {
          this.deletingTypeProduct = !this.deletingTypeProduct;
          this.showDeleteDialig = !this.showDeleteDialig;
        })
        .catch(error => {
          console.log(error);
          this.deletingTypeProduct = !this.deletingTypeProduct;
        });
    },
    async _edit(item) {
      this.form = item;
      this._openDialog();
    },
    async _deleteDialog(item) {
      this.actionDelete(item);
    },
    _openDialog() {
      this.showDialog = !this.showDialog;
    },
    _closeDialog() {
      this._clearField();
      this.showDialog = !this.showDialog;
    },
    _clearField() {
      this.form = {
        name: null
      };
      this.$refs.formTypeProduct.resetValidation();
    }
  },
  created() {
    this.actionLoad();
  }
};
</script>

<style lang="scss" scoped>
.header-table {
  display: flex;
  justify-content: space-between;
}
.input-table {
  max-width: 30vw !important;
}
</style>
