<template>
  <div>
    <v-autocomplete
      auto-select-first
      clearable
      v-model="value"
      :items="searchOptions"
    ></v-autocomplete>
    <v-virtual-scroll
      :items="unRequested"
      item-height="40"
      max-height="500"
      max-width="400"
      :bench="20"
    >
      <template v-slot="{ item }">
        <v-list-item class="listItem">
          <v-btn block small @click="$emit('load-item', item)" class="listItem">
            {{ item }}
          </v-btn>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script>
export default {
  props: ['selectedItems'],
  data() {
    return {
      value: '',
    }
  },
  computed: {
    socketFDs() {
      return this.$store.state.socketFDs
    },
    socketReq() {
      return this.$store.state.socketReq
    },
    searchOptions: function () {
      var that = this
      return that.socketFDs.filter(function (item) {
        return !Object.keys(that.socketReq).includes(item)
      })
    },
    unRequested: function () {
      var that = this
      if (!that.value) {
        return that.socketFDs
          .filter(function (item) {
            return !Object.keys(that.socketReq).includes(item)
          })
          .filter(function (item) {
            if (that.selectedItems) {
              return !that.selectedItems.includes(item)
            }
            return true
          })
      }
      return that.socketFDs
        .filter(function (item) {
          return item.includes(that.value)
        })
        .filter(function (item) {
          return !Object.keys(that.socketReq).includes(item)
        })
    },
  },
}
</script>

<style>
.listItem {
  width: 350px;
}
button {
  overflow: hidden;
}
</style>
