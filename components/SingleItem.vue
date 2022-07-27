<template>
  <div v-if="$store.state.socketData[item.title]">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <div v-if="typeof $store.state.socketData[item.title].value === 'number'">
      <radial-gauge
        :value="$store.state.socketData[item.title].value"
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
  props: ['item'],
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
