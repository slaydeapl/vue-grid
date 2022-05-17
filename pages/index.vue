<template>
  <div>
    <v-navigation-drawer right app>
      <button @click="addItem">Add Item</button><br />
      <button @click="addMeter">Add Meter</button>
    </v-navigation-drawer>
    <v-main>
      <grid-layout
        :layout.sync="layout"
        :col-num="colNum"
        :row-height="30"
        :is-draggable="draggable"
        :is-resizable="resizable"
        :vertical-compact="true"
        :use-css-transforms="true"
      >
        <grid-item
          :key="item.i"
          v-for="item in layout"
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
            <span class="remove" @click="removeItem(item.i)">✖</span>
            <span class="move">🐵</span>

            <component :is="item.type" class="no-drag" />
          </v-card>
        </grid-item>
      </grid-layout>
    </v-main>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import SpeedGauge from '../components/SpeedGauge.vue'
import PressureGauge from '../components/PressureGauge.vue'
import TempGauge from '../components/TempGauge.vue'

export default {
  components: {
    GridLayout,
    GridItem,
    SpeedGauge,
    PressureGauge,
    TempGauge,
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 2, h: 2, i: '0' },
        {
          x: 2,
          y: 0,
          w: 4,
          h: 8,
          i: '1',
          type: PressureGauge,
          minW: 4,
          minH: 8,
        },
        { x: 4, y: 0, w: 2, h: 2, i: '2' },
        { x: 6, y: 0, w: 2, h: 2, i: '3' },
        { x: 8, y: 0, w: 2, h: 2, i: '4' },
        { x: 10, y: 0, w: 4, h: 7, i: '5', type: SpeedGauge, minW: 4, minH: 7 },
        { x: 12, y: 0, w: 4, h: 7, i: '6', type: TempGauge, minW: 4, minH: 7 },
        { x: 14, y: 0, w: 4, h: 7, i: '7', type: TempGauge, minW: 4, minH: 7 },
      ],
      draggable: true,
      resizable: true,
      colNum: 25,
      index: 0,
      customStyle: {
        size: 100,
      },
    }
  },
  mounted() {
    // this.$gridlayout.load();
    this.index = this.layout.length
  },
  methods: {
    addItem: function () {
      // Add a new item. It must have a unique key!
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        w: 2,
        h: 2,
        i: this.index,
      })
      // Increment the counter to ensure key is always unique.
      this.index++
    },
    addMeter: function () {
      // Add a new item. It must have a unique key!
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        w: 2,
        h: 5,
        i: this.index,
      })
      // Increment the counter to ensure key is always unique.
      this.index++
    },
    removeItem: function (val) {
      const index = this.layout.map((item) => item.i).indexOf(val)
      this.layout.splice(index, 1)
    },
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
