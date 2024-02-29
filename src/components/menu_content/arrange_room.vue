<template>
  <p>
    1、获得本card的内容 。<br />
    2、拖拽获得途径和终点的内容。<br />
    3、交换两div内容。或删除交换后的
  </p>
  <!-- <div class="left">
          <card
          v-for="(kapian, index) of data.courses"
          :cardName="kapian"
          :card-key="cardKey"
          @handle-Drag-End="handleDragEnd"
          >
    
          </card>
      </div> -->
  <!-- <div class="paike">
        <card v-for="(item,id) in  rawData" :key="item.id">
          {{ item.name  }}
      
        </card> 
        <card 
        msg="666" 
        
        v-for="(item) of rawData"
        :key="item"
        :tableData="item"
        ></card>
      </div> -->
  <!-- <pre>{{ tableData }}</pre> -->
</template>

<script setup>
import { onMounted } from "vue";
import card from "../card.vue";
import axios from "axios";
import { ref } from "vue";

let rawData = ref([]);

const props = defineProps({
  tableData: {
    type: Array,
    default: "null1",
  },
}); // 定义props
console.log(props.tableData);

onMounted(() => {
  console.log("mounted!");
  axios({
    method: "get",
    url: `http://49.235.107.169:5000/api/v1/get_origin_course`,
  }).then((res) => {
    rawData.value = res.data;
  });
});
</script>

<!-- ************************************************************************************** -->
<!-- <template>
  <p>541265165</p>
  <el-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="m-2">Hover to activate</el-button>
    </template>
  </el-popover>
  <h1>利用vuex把数据集中管理，随取随用</h1>
</template> -->

<!-- <script >
import { InfoFilled } from '@element-plus/icons-vue'

const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}
  </script> -->
