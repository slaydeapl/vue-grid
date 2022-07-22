<template>
  <div>
    <v-list-item two-line link>
      <v-list-item-avatar>
        <img :src="$store.state.imgurl" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Jane Smith</v-list-item-title>
        <v-list-item-subtitle>Logged In</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :input-value="item.value"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Administration', icon: 'mdi-home-city', value: true },
        { title: 'Dashboards', icon: 'mdi-view-dashboard', value: false },
        {
          title: 'Preset Views',
          icon: 'mdi-view-dashboard-outline',
          value: false,
        },
        { title: 'My Views', icon: 'mdi-database', value: false },
      ],
    }
  },
}
</script>
