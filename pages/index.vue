<template>
  <div>
    <v-navigation-drawer right app width="400px">
      <UserMenu />
      <v-divider />
      <!-- <MultiValue /> -->
      <!-- <v-divider /> -->

      <FDlist @load-item="loadItem" />

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

            <!-- <component :is="item.type" class="no-drag" /> -->
            <GenericValue :title="item.title" class="no-drag" />
          </v-card>
        </grid-item>
      </grid-layout>
    </v-main>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
      socket: null,
      items: [
        { title: 'Administration', icon: 'mdi-home-city', value: true },
        { title: 'Dashboards', icon: 'mdi-view-dashboard', value: false },
        {
          title: 'Preset Views',
          icon: 'mdi-view-dashboard-outline',
          value: false,
        },
        { title: 'My Views', icon: 'mdi-database', value: false },
      ],
      layout: [],
      notLoaded: [],
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
        // type: this.layout[index].type,
      })
      this.layout.splice(index, 1)
    },
    loadItem: async function (val) {
      this.$store.commit('SET_Req', {
        ...this.$store.state.socketReq,
        [val]: '',
      })

      this.socket.send(JSON.stringify(this.$store.state.socketReq))
      // const index = this.notLoaded.map((item) => item.title).indexOf(val)

      this.layout.push({
        x: (this.layout.length * 5) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        h: 6,
        w: 5,
        i: this.index,
        minW: 5,
        minH: 5,
        title: val,
      })
      this.index++
    },
  },
  created: function () {
    var initConnect = true
    let self = this

    console.log('Starting socket to WebSocket Server')
    this.socket = new WebSocket('ws://192.168.0.45:5000')

    this.socket.onmessage = function (event) {
      // console.log(self.$store.state.socketFDs)

      if (initConnect) {
        self.$store.commit('SET_FDs', JSON.parse(event.data).slice(0))
        console.log('FDs gathered. Populating options')
        initConnect = false
      } else {
        // console.log(event.data)
        self.$store.commit('SET_Data', JSON.parse(event.data))
      }
    }

    this.socket.onopen = function (event) {
      console.log(event)
      console.log('Successfully connected to the echo websocket server')
    }

    this.socket.onerror = function (event) {
      console.log('ERROR: ')
      console.log(event)
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
