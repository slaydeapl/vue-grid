<template>
  <div>
    <v-navigation-drawer right app width="400px">
      <UserMenu />
      <v-divider />

      <MultiValueMenu @load-multi="loadMulti" />
      <v-divider />

      <FDlist @load-item="loadItem" :v-if="socket" />

      <template v-slot:append>
        <div>
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <RenderGrid :grid-items="layout" />
    </v-main>
  </div>
</template>

<script>
export default {
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
      index: 4,
      notLoaded: [],
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
        x: (this.layout.length * 5) % (this.colNum || 25),
        y: this.layout.length + (this.colNum || 25), // puts it at the bottom
        h: 6,
        w: 5,
        i: this.index,
        title: val,
        type: 'SingleItem',
      })
      this.index++
    },
    loadMulti: async function (val) {
      val.forEach((element) => {
        this.$store.commit('SET_Req', {
          ...this.$store.state.socketReq,
          [element]: '',
        })
      })

      this.socket.send(JSON.stringify(this.$store.state.socketReq))
      // const index = this.notLoaded.map((item) => item.title).indexOf(val)

      this.layout.push({
        x: (this.layout.length * 5) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        h: 6,
        w: 5 * val.length,
        i: this.index,
        type: 'MultiItem',
        multiVal: val,
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
        try {
          var itemdata
          itemdata = event.data.replace(/[^ -~]/g, '')
          // console.log(itemdata)

          self.$store.commit('SET_Data', JSON.parse(itemdata))
        } catch (error) {
          // console.log(error)
        }
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
