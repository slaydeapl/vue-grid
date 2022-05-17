<template>
  <div>
    <v-navigation-drawer right app>
      <template v-slot:prepend>
        <v-list-item two-line link>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :input-value="item.value"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-btn block @click="addItem">Add Item</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block @click="addMeter">Add Meter</v-btn>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
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
            <span class="move">⬤</span>

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
import CombinedGauge from '../components/CombinedGauge.vue'

export default {
  components: {
    GridLayout,
    GridItem,
    SpeedGauge,
    PressureGauge,
    TempGauge,
    CombinedGauge,
  },
  data() {
    return {
      items: [
        { title: 'Administration', icon: 'mdi-home-city', value: true },
        { title: 'Dashboards', icon: 'mdi-view-dashboard', value: false },
        // { title: 'My Account', icon: 'mdi-account' },
        {
          title: 'Preset Views',
          icon: 'mdi-view-dashboard-outline',
          value: false,
        },
        { title: 'My Views', icon: 'mdi-database', value: false },
      ],
      layout: [
        {
          x: 0,
          y: 0,
          w: 4,
          h: 8,
          i: '0',
          type: PressureGauge,
          minW: 4,
          minH: 8,
        },
        { x: 4, y: 0, w: 4, h: 7, i: '1', type: SpeedGauge, minW: 4, minH: 7 },
        { x: 10, y: 0, w: 4, h: 7, i: '2', type: TempGauge, minW: 4, minH: 7 },
        {
          x: 15,
          y: 0,
          w: 10,
          h: 7,
          i: '3',
          type: CombinedGauge,
          minW: 10,
          minH: 7,
        },
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
