<template>
  <div v-if="$store.state.socketData[title]">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{ title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <!-- <v-row align="center" justify="center">
      <h1>{{ $store.state.socketData[title].value }}</h1>
    </v-row> -->
    <div v-if="typeof $store.state.socketData[title].value === 'number'">
      <radial-gauge
        :value="$store.state.socketData[title].value"
        :options="options"
      ></radial-gauge>
    </div>
  </div>
  <div v-else>
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import LinearGauge from 'vue2-gauges/src/LinearGauge'
import RadialGauge from 'vue2-gauges/src/RadialGauge'

export default {
  components: {
    LinearGauge,
    RadialGauge,
  },
  props: ['title'],
  data() {
    return {
      interval: {},
      options: {
        default: () => ({
          minValue: 0,
          maxValue: 300,
          width: 80,
          height: 200,
        }),
      },
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {},
}
</script>
