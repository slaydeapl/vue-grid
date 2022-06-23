<template>
  <div>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5"> CPU Percentage </v-list-item-title>
        <v-list-item-subtitle>Total CPU</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-row align="center" justify="center">
      <v-progress-circular
        :rotate="-90"
        :size="140"
        :width="20"
        :value="value"
        color="black"
      >
        {{ value }}
      </v-progress-circular>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      interval: {},
      value: 0,
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.interval = setInterval(() => {
      try {
        axios
          .get(
            'http://192.168.0.45:5000/SysRes%20Port%20-%20CPU%20Usage%20-%20Total/value'
          )
          .then((response) => (this.value = response.data.value.toFixed(1)))
      } catch (error) {
        this.value = 0
      }
    }, 1000)
  },
}
</script>
