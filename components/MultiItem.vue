<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="fd in item.multiVal" :key="fd" cols="12" sm="4">
        <div v-if="$store.state.socketData[fd]">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ fd }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <div v-if="typeof $store.state.socketData[fd].value === 'number'">
            <radial-gauge
              :value="$store.state.socketData[fd].value"
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
      </v-col>
    </v-row>
  </v-container>
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
