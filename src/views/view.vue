<template>
  <div id="box0">
    <Table id="box1"></Table>
    <Menu id="box2"></Menu>
    <menu_content id="box3"></menu_content>
    <!-- <RouterView></RouterView> -->
  </div>
</template>

<script setup>
import menu_content from "../components/menu_content.vue";
import Table from "../components/table.vue";
import Menu from "../components/menu.vue";
</script>

<style>
#box0 {
  overflow: auto;
}
#box1 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60%;
  background-color: #409eff;
}
#box2 {
  position: absolute;
  /* top: 1000px; */
  top: 60%;
  left: 0;
  height: 40%;
  width: 15%;
  background-color: rgb(195, 255, 0);
}
#box3 {
  position: absolute;
  /* top: 1000px; */
  top: 60%;
  left: 15%;
  width: 85%;
  height: 40%;
  overflow: auto;
  background-color: #edeece;
}
</style>
