<template>
  <div>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5"> San Francisco </v-list-item-title>
        <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <vue-thermometer :value="5" :min="-20" :max="25" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
      time: 0,
    }
  },
}
</script>
