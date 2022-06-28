<template>
  <div>
    <v-navigation-drawer right app>
      <template v-slot:prepend>
        <v-list-item two-line link>
          <v-list-item-avatar>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            />
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
        <v-list-item v-for="item in notLoaded" :key="item.title">
          <v-btn block @click="loadItem(item.title)"
            >Add {{ item.title }}</v-btn
          >
        </v-list-item>

        <!-- From api -->

        <v-list-item v-for="n in 10" :key="n">
          <v-btn disabled block>{{ apiLoaded[n] }}</v-btn>
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
          :key="item.title"
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
            <span class="remove" @click="removeItem(item.title)">✖</span>
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
import CpuPercent from '../components/CpuPercent.vue'
import ProcessCount from '../components/ProcessCount.vue'
import gseLO2TempValuelabel1 from '../components/gseLO2TempValuelabel1.vue'
import EventName from '../components/EventName.vue'
import EventTime from '../components/EventTime.vue'
import CDTimeTimeText from '../components/CDTimeTimeText.vue'
import ProjectHealthText from '../components/ProjectHealthText.vue'

import axios from 'axios'

export default {
  components: {
    GridLayout,
    GridItem,
    SpeedGauge,
    PressureGauge,
    TempGauge,
    CombinedGauge,
    CpuPercent,
    ProcessCount,
    gseLO2TempValuelabel1,
    EventName,
    EventTime,
    CDTimeTimeText,
    ProjectHealthText,
  },
  data() {
    return {
      apiLoaded: [],
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
          x: 1,
          y: 0,
          w: 5,
          h: 4,
          i: '1',
          type: EventName,
          title: 'Event Name',
          minW: 5,
          minH: 4,
        },
        {
          x: 5,
          y: 0,
          w: 5,
          h: 4,
          i: '2',
          type: ProcessCount,
          title: 'Process Count',
          minW: 5,
          minH: 4,
        },
        {
          x: 6,
          y: 0,
          w: 4,
          h: 7,
          i: '4',
          type: CpuPercent,
          title: 'CPU Percent',
          minW: 4,
          minH: 7,
        },
        {
          x: 10,
          y: 0,
          w: 5,
          h: 4,
          i: '5',
          type: EventTime,
          title: 'Event Time',
          minW: 5,
          minH: 4,
        },
        {
          x: 1,
          y: 2,
          w: 5,
          h: 4,
          i: '6',
          type: CDTimeTimeText,
          title: 'CDTime_Time_Text',
          minW: 5,
          minH: 4,
        },
        {
          x: 1,
          y: 0,
          w: 5,
          h: 4,
          i: '7',
          type: gseLO2TempValuelabel1,
          title: 'gseLO2TempValuelabel1',
          minW: 5,
          minH: 4,
        },
        {
          x: 8,
          y: 2,
          w: 5,
          h: 4,
          i: '8',
          type: ProjectHealthText,
          title: 'Project Health Text',
          minW: 5,
          minH: 4,
        },
      ],
      notLoaded: [
        {
          x: 0,
          y: 0,
          w: 4,
          h: 8,
          i: '0',
          type: PressureGauge,
          title: 'Pressure Gauge',
          func: 'addPressure',
          minW: 4,
          minH: 8,
        },
        {
          x: 4,
          y: 0,
          w: 4,
          h: 7,
          i: '1',
          type: SpeedGauge,
          title: 'Speedometer',
          func: 'addSpeed',
          minW: 4,
          minH: 7,
        },
        {
          x: 10,
          y: 0,
          w: 4,
          h: 7,
          i: '2',
          type: TempGauge,
          title: 'Temp Gauge',
          func: 'addTemp',
          minW: 4,
          minH: 7,
        },
        {
          x: 15,
          y: 0,
          w: 10,
          h: 7,
          type: CombinedGauge,
          title: 'Combined Gauge',
          minW: 10,
          minH: 7,
        },
      ],
      draggable: true,
      resizable: true,
      colNum: 25,
      index: 4,
      customStyle: {
        size: 100,
      },
    }
  },
  mounted() {
    // this.$gridlayout.load();
    this.index = this.layout.length

    try {
      axios
        .get('http://192.168.0.45:5000/fds')
        // .then((response) => console.log(response.data.keys))
        .then((response) => (this.apiLoaded = response.data.keys.slice(0)))
      console.log(this.apiLoaded)
    } catch (error) {
      console.log(error)
    }
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
    removeItem: function (val) {
      const index = this.layout.map((item) => item.title).indexOf(val)
      // console.log(index)
      this.notLoaded.push({
        x: this.layout[index].x,
        y: this.layout[index].y,
        h: this.layout[index].h,
        w: this.layout[index].w,
        minW: this.layout[index].minW,
        minH: this.layout[index].minH,
        title: this.layout[index].title,
        type: this.layout[index].type,
      })
      this.layout.splice(index, 1)
    },
    loadItem: function (val) {
      const index = this.notLoaded.map((item) => item.title).indexOf(val)

      console.log(val)
      console.log(index)
      console.log(this.index)
      console.log(this.notLoaded[index])

      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.notLoaded[index].y,
        h: this.notLoaded[index].h,
        w: this.notLoaded[index].w,
        i: this.index,
        minW: this.notLoaded[index].minW,
        minH: this.notLoaded[index].minH,
        title: this.notLoaded[index].title,
        type: this.notLoaded[index].type,
      })
      this.index++
      this.notLoaded.splice(index, 1)
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
