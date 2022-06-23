<template>
  <div>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          Total Process Count
        </v-list-item-title>
        <v-list-item-subtitle>SysRes Port</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-row align="center" justify="center">
      <h1>{{ value }}</h1>
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
      axios
        .get(
          'http://192.168.0.45:5000/SysRes%20Port%20-%20Process%20Count%20-%20Total/value'
        )
        .then((response) => (this.value = response.data.value))
    }, 1000)
  },
}
</script>
