<script setup>
import Login from "./components/Login.vue";
import work from "./components/work.vue";
import view from "./views/view.vue";

// compoents: {
//   main;
// }
</script>

<template>
  <!-- <Login /> -->
  <!-- <work></work> -->
  <div>
    <RouterView></RouterView>
    <!-- <view></view> -->
  </div>
</template>

<style>
.body {
  margin: 0;
}
</style>
