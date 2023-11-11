<template>
  <div class="table">
    <el-table :data="tableData" style="width: 100%" height="250">
      <el-table-column fixed prop="room" label="机房" width="150" />
      <el-table-column label="星期一 ">
        <el-table-column label="上午" prop="Monday"> </el-table-column>
        <el-table-column label="下午"> </el-table-column>
      </el-table-column>
      <el-table-column label="星期二 ">
        <el-table-column label="上午" prop="Tuesday"> </el-table-column>
        <el-table-column label="下午"> </el-table-column>
      </el-table-column>
      <el-table-column label="星期三 ">
        <el-table-column label="上午" prop="Wednesday"> </el-table-column>
        <el-table-column label="下午"> </el-table-column>
      </el-table-column>
      <el-table-column label="星期四 ">
        <el-table-column label="上午" prop="Thursday"> </el-table-column>
        <el-table-column label="下午"> </el-table-column>
      </el-table-column>
      <el-table-column label="星期五 ">
        <el-table-column label="上午" prop="Friday"> </el-table-column>
        <el-table-column label="下午"> </el-table-column>
      </el-table-column>
      <el-table-column label="星期六 ">
        <el-table-column label="上午" prop="Saturday"> </el-table-column>
        <el-table-column label="下午"> </el-table-column>
      </el-table-column>
      <el-table-column label="星期日 ">
        <el-table-column label="上午" prop="Sunday"> </el-table-column>
        <el-table-column label="下午"> </el-table-column>
      </el-table-column>
    </el-table>

    <div id="check_btn">
      <el-dropdown>
        <el-button type="primary">
          选择楼层<el-icon class="el-icon--right"
            ><arrow-down
          /></el-icon> </el-button
        >内容
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="p in floor" @click="selectRoom(p)">
              {{ p }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import axios from "axios";
import { ref, onMounted } from "vue";

let floor = ref();
let room = ref();
let tableData = ref();

onMounted(() => {
  axios({
    methods: "get",
    url: `http://127.0.0.1:4523/m1/3490940-0-default/api/v1/computer_room/floor?computer_room_floor=B5`,
    // url: `http://49.235.107.169:5000/api/v1/get_computer_room_floor`,
  }).then((res) => {
    if (res.data.code == 200) {
      floor.value = Object.keys(res.data.floor);
      room.value = res.data.floor;
      console.log(floor.value); //楼层
      console.log(room.value); //楼层对应的机房
      tableData.value = room.value[floor.value[0]]; //默认显示第一个楼层的数据
    } else {
      console.log("后端楼层返回错误");
    }
  });
});

const selectRoom = (selectedRoom) => {
  // 更新tableData，显示所选楼层的数据
  tableData.value = room.value[selectedRoom];
};
</script>

<style>
.table {
  margin: 0 auto;
  /* width: 100%;
  height: 55%; */
  background-color: #ffffff;
  border-radius: 10px;
  /* box-shadow: 0 0 10px #999999; */
  /* padding: 5px; */
  margin: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
}

#check_btn {
  position: absolute;
  /* padding: 20px; */
  margin: 0px;
  top: 85%;
  left: 0px;
}
</style>
