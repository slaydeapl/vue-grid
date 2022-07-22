<template>
  <v-list dense>
    <RecycleScroller
      class="scroller"
      :items="$store.state.socketFDs"
      :item-size="5"
      key-field="id"
      v-slot="{ item }"
    >
      <v-list-item v-if="!Object.keys($store.state.socketReq).includes(item)">
        <v-btn block @click="$emit('load-item', item)">{{ item }}</v-btn>
      </v-list-item>
    </RecycleScroller>
    <!-- </template> -->
  </v-list>
</template>

<script>
import Vue from 'vue'

export default {
  components: {
    RecycleScroller,
  },
}
</script>
