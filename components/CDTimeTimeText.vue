<template>
  <div>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          CDTime_Time_Text
        </v-list-item-title>
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
        .get('http://192.168.0.45:5000/CDTime_Time_Text/value')
        .then((response) => (this.value = response.data.value))
    }, 1000)
  },
}
</script>
