<template>
  <!-- *******************以下为原始课表的卡片********************** -->
  <div class="ka">
    <el-popover
      placement="top-start"
      title="Title"
      :width="200"
      trigger="hover"
      :content="`
          ${rawData.course_name} 
          ${rawData.class_name}
          ${rawData.cycle}
          ${rawData.teacher_name}
          ${rawData.id}
          ${rawData.teacher_rawData}
          ${rawData.population}
          ${rawData.computer_rawData_name}
          ${rawData.lesson}
          `"
    >
      <template #reference>
        {{ rawData.teacher_name }}
        {{ rawData.id }} isok:{{ rawData.is_ok }}
        {{ rawData.id }}
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  // 定义props
  rawData: {
    // type: Array,
    default: null,
  },
  item: {
    // type: String,
    default: "null",
  },
});

onMounted(() => {
  // console.log(props.rawData);
});
</script>
<style>
.ka {
  border: 1px solid #ccc;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  background-color: rgb(174, 255, 0);
  margin: 10px auto;
  padding: 10px; /*10px内边距*/
  box-sizing: border-box; /*盒子模型 加了box-sizing:border-box属性，padding和border的值就不会在影响元素的宽高，相当于把padding和border的值都算在content里，盒子模型会自动根据padding和border的值来调整content的值，就不需要手动调整*/
  cursor: move;
}

.el-button + .el-button {
  margin-left: 8px;
}
</style>
