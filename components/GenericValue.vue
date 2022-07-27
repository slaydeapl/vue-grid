<template>
  <div v-if="!multiVal">
    <SingleItem />
  </div>
  <div v-else>
    <MultiItem />
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
  props: ['title', 'multiVal'],
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
