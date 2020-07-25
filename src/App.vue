<template>
  <div id="app">
    <div>
      I am the navigation bar
      <router-link to="/home">Go to Home</router-link>
      <router-link to="/test">Go to Home</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
  },
}
</script>
