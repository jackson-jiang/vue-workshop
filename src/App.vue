<template>
  <div id="app">
    <!-- element-ui -->
    <div class="menu">
      <ul>
        <li><router-link to="/day1">day1</router-link></li>
        <li><router-link to="/day2">day2</router-link></li>
        <li><router-link to="/404">404</router-link></li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'App',
  components: {},
  mounted() {  },
}
</script>

<style scoped>
/* scss loader */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  height: calc(100vh - 16px);

  display: flex;
}
.menu {
  border: 1px solid #b6b6b6;
  flex: 0 0 20%;
}
.content {
  border: 1px solid #b6b6b6;
  flex: 1 1 auto;
  padding: 16px;
}

</style>
