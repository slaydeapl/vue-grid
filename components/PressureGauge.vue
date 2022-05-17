<template>
  <div>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5"> Pressure Gauge </v-list-item-title>
        <v-list-item-subtitle>Oxygen tank #20</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-slider
      v-model="currentValue"
      :thumb-size="24"
      thumb-label="always"
      min="-30"
      max="30"
    />

    <v-row align="center" justify="center">
      <VueSpeedMeter
        :customCurrentValue="currentValue"
        :customStyle="customStyle"
      />
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
      currentValue: 25,
      customStyle: {
        size: 170,
        mainBackgroundColor: 'white',
        borderColor: 'black',
        scaleColor: 'black',
        scaleValuesColor: 'black',
        scaleStartValue: -30,
        scaleStep: 5,
        needleColor: 'black',
        needleCircleColor: 'black',
        needleCircleBorderColor: 'black',
        animationTime: 1,
      },
      shadowFilterBlackAndWhite: false,
    }
  },
}
</script>
