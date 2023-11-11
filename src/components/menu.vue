<template>
  <div id="menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          检查卫生
        </template>

        <el-sub-menu index="1-4">
          <template #title>1号楼</template>
          <el-menu-item index="1-4-1">
            <router-link to="/work">切换到work</router-link>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="1-4">
          <template #title>2号楼</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="1-4">
          <template #title>3号楼</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        >查看记录
      </el-menu-item>

      <el-menu-item index="4">
        <el-icon>
          <setting />
        </el-icon>
        增加寝室
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
</script>

<style>
#menu {
  width: 15%;
  height: 80%;
  background: rgb(255, 255, 255);
  position: absolute;
  left: 0;
  top: 60%;
  border-radius: 8px;
}
.el-menu-vertical-demo {
  width: 100%;
  height: 60%;
  position: absolute;
  left: 0px;
}
</style>
