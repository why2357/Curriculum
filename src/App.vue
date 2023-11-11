<script setup>
import Login from "./components/Login.vue";
import table from "./components/table.vue";
import view from "./views/view.vue";

// compoents: {
//   main;
// }
</script>

<template>
  <!-- <Login /> -->
  <!-- <table></table> -->
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
