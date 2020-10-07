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
          :label="getLanguages.search_type_product"
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
          <span>{{ getLanguages.register }}</span>
        </v-tooltip>
      </div>
      <v-data-table
        :headers="headers"
        :items="getTypeProducts"
        :search="search"
        hide-default-footer
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
                <p class="title-card">{{ getLanguages.register }}</p>
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
                  :label="getLanguages.name"
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
              >{{ getLanguages.cancel }}</v-btn
            >
            <v-btn
              color="secondary"
              rounded
              form="form-typr-product"
              type="submit"
              :loading="creatingTypeProduct"
              >{{ getLanguages.save }}</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Dialog delete -->
    <v-dialog v-model="showDeleteDialig" max-width="400" persistent>
      <v-card>
        <v-card-title>{{ getLanguages.confirm_action }}</v-card-title>
        <v-card-text
          >{{ getLanguages.do_you_want_to_delete }}
          {{ productItemComp.name }}?</v-card-text
        >
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            text
            :disabled="deletingTypeProduct"
            @click="showDeleteDialig = false"
            >{{ getLanguages.cancel }}</v-btn
          >
          <v-btn
            text
            :loading="deletingTypeProduct"
            @click="_deleteProduct(typeProductItem)"
            >{{ getLanguages.confirm }}</v-btn
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
    typeProductItem: null,
    deletingTypeProduct: false,
    showDeleteDialig: false,

    search: "",

    /**
     * Regras
     */
    rules: {
      required: value => !!value || "Campo obrigatório."
    }
  }),
  computed: {
    ...mapGetters({
      getTypeProducts: "dashboard/getTypeProducts",
      getLanguages: "language/getLanguages"
    }),
    productItemComp: {
      get() {
        return this.productItem != null ? this.productItem : { name: "" };
      }
    },
    headers() {
      return [
        { text: this.getLanguages.name, value: "name" },
        { text: this.getLanguages.actions, value: "actions", sortable: false }
      ];
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
      this.typeProductItem = item;
      this.showDeleteDialig = !this.showDeleteDialig;
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
