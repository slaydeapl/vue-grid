<template>
  <v-dialog transition="dialog-bottom-transition" max-width="1500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn block v-bind="attrs" v-on="on">Add multiple</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Opening from the bottom</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <FDlist @load-item="queItem" :selectedItems="itemsToAdd" />
              </v-col>
              <v-col cols="6">
                <ul v-for="item in itemsToAdd" :key="item">
                  {{
                    item
                  }}
                </ul>
              </v-col>
            </v-row>
          </v-container>
          <div class="text-h2 pa-12"></div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            text
            @click="
              dialog.value = false
              $emit('load-multi', itemsToAdd)
              itemsToAdd = []
            "
            >Add</v-btn
          >
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      itemsToAdd: [],
    }
  },
  methods: {
    queItem(val) {
      this.itemsToAdd.push(val)
    },
  },
}
</script>
