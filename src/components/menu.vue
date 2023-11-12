<template>
  <div id="menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <router-link to="/view/arrange_room">
        <el-menu-item index="1">
          <template #title>
            <el-icon><Sort /></el-icon>
            排列机房
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/view/search">
        <el-menu-item index="2">
          <el-icon><Search /></el-icon>机房
        </el-menu-item>
      </router-link>

      <router-link to="/view/upload">
        <el-menu-item index="4">
          <el-icon><Plus /></el-icon>
          增加
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script setup>
import { Menu as IconMenu, Search, Sort, Plus } from "@element-plus/icons-vue";
</script>

<style>
#menu {
  width: 15%;
  height: 40%;
  background: rgb(255, 255, 255);
  position: absolute;
  left: 0;
  /* top: 60%; */
  border-radius: 8px;
}
.el-menu-vertical-demo {
  width: 100%;
  height: 60%;
  position: absolute;
  left: 0px;
}
</style>
