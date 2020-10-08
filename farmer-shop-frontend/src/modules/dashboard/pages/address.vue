<template>
  <div id="address-comp">
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
        :items="getAddress"
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
        <v-form id="form-address" ref="formAddress" @submit.prevent="_submit()">
          <v-card-title>
            <v-row class="card-header">
              <v-col xs="7" sm="8" md="8" lg="8" xl="8">
                <p class="title-card">{{ getLanguages.register }}</p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="form.user_id"
                  type="number"
                  :rules="[rules.required]"
                  required
                  color="secondary"
                  :disabled="creatingAddress"
                  outlined
                  :label="getLanguages.user_id"
                />
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="form.district"
                  :rules="[rules.required]"
                  required
                  color="secondary"
                  :disabled="creatingAddress"
                  outlined
                  :label="getLanguages.district"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="form.number"
                  :rules="[rules.required]"
                  type="number"
                  required
                  color="secondary"
                  :disabled="creatingAddress"
                  outlined
                  :label="getLanguages.number"
                />
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="form.street"
                  :rules="[rules.required]"
                  required
                  color="secondary"
                  :disabled="creatingAddress"
                  outlined
                  :label="getLanguages.street"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  auto-grow
                  rows="2"
                  row-height="15"
                  v-model="form.complement"
                  :rules="[rules.required]"
                  required
                  :disabled="creatingAddress"
                  outlined
                  color="secondary"
                  :label="getLanguages.complement"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="card-actions pa-4">
            <v-spacer />
            <v-btn
              color="error"
              rounded
              :disabled="creatingAddress"
              text
              @click="_closeDialog()"
              >{{ getLanguages.cancel }}</v-btn
            >
            <v-btn
              color="secondary"
              rounded
              form="form-address"
              type="submit"
              :loading="creatingAddress"
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
            :disabled="deletingAddress"
            @click="showDeleteDialig = false"
            >{{ getLanguages.cancel }}</v-btn
          >
          <v-btn
            text
            :loading="deletingAddress"
            @click="_deleteProduct(addressItem)"
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
  name: "address-comp",
  data: () => ({
    //Type Product
    showDialog: false,
    creatingAddress: false,
    form: {
      user_id: null,
      district: null,
      street: null,
      number: null,
      complement: null
    },
    addressItem: null,
    deletingAddress: false,
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
      getAddress: "dashboard/getAddress",
      getLanguages: "language/getLanguages"
    }),
    productItemComp: {
      get() {
        return this.productItem != null ? this.productItem : { name: "" };
      }
    },
    headers() {
      return [
        { text: this.getLanguages.district, value: "district" },
        { text: this.getLanguages.street, value: "street" },
        { text: this.getLanguages.number, value: "number" },
        { text: this.getLanguages.complement, value: "complement" },
        { text: this.getLanguages.actions, value: "actions", sortable: false }
      ];
    }
  },
  methods: {
    ...mapActions({
      actionLoad: "dashboard/actionLoadAddress",
      actionCreate: "dashboard/actionCreateAddress",
      actionEdit: "dashboard/actionEditAddress",
      actionDelete: "dashboard/actionDeleteAddress"
    }),
    async _submit() {
      this.form.user_id = parseInt(this.form.user_id);
      this.form.number = parseInt(this.form.number);
      console.log(this.form);
      if (this.form.id != null) {
        if (
          !isNaN(this.form.user_id) &&
          this.form.district != null &&
          this.form.street != null &&
          !isNaN(this.form.number) &&
          this.form.complement != null
        ) {
          this.creatingAddress = !this.creatingAddress;
          await this.actionEdit(this.form)
            .then(() => {
              this.creatingAddress = !this.creatingAddress;
              this.showDialog = !this.showDialog;
              this._clearField();
            })
            .catch(error => {
              this.creatingAddress = !this.creatingAddress;
              console.error(error);
            });
        } else {
          alert("Preencha todos os campos");
        }
      } else {
        if (
          !isNaN(this.form.user_id) &&
          this.form.district != null &&
          this.form.street != null &&
          !isNaN(this.form.number) &&
          this.form.complement != null
        ) {
          this.creatingAddress = !this.creatingAddress;
          await this.actionCreate(this.form)
            .then(() => {
              this.creatingAddress = !this.creatingAddress;
              this.showDialog = !this.showDialog;
              this._clearField();
            })
            .catch(error => {
              this.creatingAddress = !this.creatingAddress;
              console.error(error);
            });
        } else {
          alert("Preencha todos os campos");
        }
      }
    },

    async _deleteProduct(item) {
      this.deletingAddress = !this.deletingAddress;

      await this.actionDelete(item)
        .then(() => {
          this.deletingAddress = !this.deletingAddress;
          this.showDeleteDialig = !this.showDeleteDialig;
        })
        .catch(error => {
          console.log(error);
          this.deletingAddress = !this.deletingAddress;
        });
    },
    async _edit(item) {
      this.form = { ...item };
      this._openDialog();
    },
    async _deleteDialog(item) {
      this.addressItem = item;
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
      this.$refs.formAddress.resetValidation();
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
