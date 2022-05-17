<template>
  <div>
    <!-- <VueSpeedMeter :customStyle="customStyle" /> -->

    <v-row align="center" justify="center">
      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h5"> Speedometer </v-list-item-title>
          </v-list-item-content> </v-list-item
        ><VueSpeedMeter
          :customCurrentValue="speed1"
          :customStyle="customStyle1"
      /></v-col>

      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h5">
              Pressure Gauge
            </v-list-item-title>
          </v-list-item-content> </v-list-item
        ><VueSpeedMeter
          :customCurrentValue="speed2"
          :customStyle="customStyle2"
      /></v-col>
      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h5"> Barometer </v-list-item-title>
          </v-list-item-content> </v-list-item
        ><VueSpeedMeter
          :customCurrentValue="speed3"
          :customStyle="customStyle3"
      /></v-col>
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
      customStyle1: {
        size: 175,
        mainBackgroundColor: 'white',
        scaleColor: 'black',
        scaleValuesColor: 'black',
      },
      speed: 190,
      customStyle2: {
        size: 175,
        mainBackgroundColor: 'green',
        needleColor: 'black',
        scaleValuesColor: 'black',
      },
      speed: 190,
      customStyle3: {
        size: 175,
        mainBackgroundColor: 'black',
        needleColor: 'white',
        scaleColor: 'white',
        scaleValuesColor: 'white',
      },
      speed1: 107,
      speed2: 120,
      speed3: 240,
    }
  },
  mounted() {
    window.setInterval(() => {
      this.changeSpeed()
    }, 100)
  },
  methods: {
    changeSpeed() {
      this.speed1 = Math.floor(Math.random() * (65 - 60) + 60) //The maximum is
      this.speed2 = Math.floor(Math.random() * (120 - 110) + 110) //The maximum is
      this.speed3 = Math.floor(Math.random() * (240 - 235) + 235) //The maximum is
    },
  },
}
</script>
