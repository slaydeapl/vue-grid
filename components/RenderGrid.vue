<template>
  <grid-layout
    :layout.sync="gridItems"
    :col-num="colNum"
    :row-height="30"
    :is-draggable="draggable"
    :is-resizable="resizable"
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="item in gridItems"
      :key="item.title"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :minW="item.minW"
      :minH="item.minH"
      drag-allow-from=".move"
      drag-ignore-from=".no-drag"
    >
      <v-card class="grid-card" color="#26c6da" dark height="100%">
        <!-- <span class="remove" @click="removeItem(item.title)">✖</span> -->
        <span class="move">⬤</span>

        <component :is="item.type" :item="item" class="no-drag" />
        <!-- <GenericValue :title="item.title" class="no-drag" /> -->
      </v-card>
    </grid-item>
  </grid-layout>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  props: ['gridItems'],
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
      draggable: true,
      resizable: true,
      colNum: 25,
      customStyle: {
        size: 100,
      },
    }
  },
}
</script>

<style>
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
/*************************************/
.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}

/* Performance */
/* .vue-grid-item.cssTransforms {
  transition-property: inherit !important;
}
.vue-resizable.resizing {
  pointer-events: none;
}
.vue-draggable-dragging {
  pointer-events: none;
} */
/* ----------- */

.vue-grid-item {
  overflow: hidden;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
</style>
