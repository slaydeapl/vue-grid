<template>
  <div>
    <!-- <VueSpeedMeter :customStyle="customStyle" /> -->
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5"> Speedometer </v-list-item-title>
        <v-list-item-subtitle>Vaya rocket speed</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-row align="center" justify="center">
      <VueSpeedMeter :customCurrentValue="speed" :customStyle="customStyle" />
    </v-row>
  </div>
</template>

<script>
import VueSpeedMeter from 'vue-speed-meter'

export default {
  components: {
    VueSpeedMeter,
  },
  data: function () {
    return {
      customStyle: {
        size: 175,
      },
      speed: 190,
    }
  },
  mounted() {
    window.setInterval(() => {
      this.changeSpeed()
    }, 100)
  },
  methods: {
    changeSpeed() {
      this.speed = Math.floor(Math.random() * (185 - 178) + 178) //The maximum is
    },
  },
}
</script>
