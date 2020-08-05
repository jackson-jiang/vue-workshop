<template>
  <div>
    <h2>day2-2020/08/03 Vue全家桶</h2>
    <router-link to="/">返回首页</router-link>
    <div>{{ $store.state.counter }}</div>
    <div>double is: {{ $store.getters.double }}</div>
    <button @click="$store.commit('add', 1)">Add one</button>
    <button @click="$store.dispatch('addAsync', 1)">Add one async</button>
  </div>
</template>

<script>
export default {
mounted() {
},
}
</script>
