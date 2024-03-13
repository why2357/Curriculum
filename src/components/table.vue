<template>
  <div class="table">
    <el-table :data="room" style="width: 100%" height="90%">
      <el-table-column
        fixed
        label="机房"
        prop="computer_room_name"
        width="150"
      />

      <el-table-column
        v-for="(weekDay, windex) of weekDay"
        :label="weekDay"
        align="center"
      >
        <el-table-column
          v-for="(amORpm, akey) of amORpm"
          :label="amORpm"
          align="center"
        >
          <template v-for="(item, id) of timeMapping">
            <el-table-column
              v-if="judgment(amORpm, item)"
              :key="id"
              :label="item.time"
              align="center"
            >
              <!-- *********以上都是做的表头循环*********************************** -->

              <template v-slot="{ row }" draggable="true">
                <!-- {{ row.computerRoomName }}   v-for遍历room将数组中的一条数据传过去  -->
                <!-- <div
                  id="aaa"
                  @dragenter="handleDragEnter"
                  @dragend="handleDragEnd"
                > -->
                <card
                  v-for="room of room"
                  :room="room"
                  :weekDay="weekDay"
                  :item="item"
                  :computer_room_name="row.computer_room_name"
                  @dragover="handleDragOver"
                  @dragenter="handleDragEnter"
                  @dragend="handleDragEnd"
                  @drop="handleDrop"
                  @mousedown="mouse_down"
                  @mouseup="mouse_up"
                ></card>
                <!-- </div> -->
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <div id="check_btn">
      <el-dropdown>
        <el-button type="primary">
          选择楼层
          <el-icon class="el-icon--right"><arrow-down /> </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="p in floor" @click="selectRoom(p)">
              {{ p }}楼
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
import { ref, onMounted, computed } from "vue";
import card from "./card.vue";

let floor = ref([]);
let tableData = ref([]);
let room = ref([]); //用于存储所选楼层的数据,
const weekDay = {
  1: "星期一",
  2: "星期二",
  3: "星期三",
  4: "星期四",
  5: "星期五",
  6: "星期六",
  7: "星期日",
};
const amORpm = {
  am: "上午",
  pm: "下午",
  night: "晚上",
};
const timeMapping = [
  { time: "1-2", id: 0, belong: "上午" },
  { time: "3-4", id: 1, belong: "上午" },
  { time: "5-6", id: 2, belong: "下午" },
  { time: "7-8", id: 3, belong: "下午" },
  { time: "9-10", id: 4, belong: "晚上" },
];

function judgment(amORpm, item) {
  //判断7-8等是否属于上下午
  return item.belong === amORpm;
}

onMounted(() => {
  /**获取所有楼层详细数据，并存储在tableData中
   * ***************************************
   */
  axios({
    method: "get",
    url: `http://49.235.107.169:5000/api/v1/get_main_class_by_field`,
  }).then((res) => {
    // console.log(res.data[1].computerRoomName.substring(0, 2));
    // 假设获取的数据为 res.data
    console.log(res);
    const uniqueRooms = removeDuplicateRooms(res.data); // 调用 removeDuplicateRooms 函数处理数据
    tableData.value = uniqueRooms; // 将处理后的数据存储在 tableData 中
    room.value = uniqueRooms; // 将处理后的数据存储在 room 中
    console.log(tableData.value);
  });

  /******************************************************
   * 因为是直接用后端的机房数据做表头，但后端机房有好多个重复的，所以处理数据，确保表头的每个机房只渲染一次
   *  */
  function removeDuplicateRooms(data) {
    const uniqueRooms = [];
    const addedRoomNames = new Set(); //用于存储已经添加的机房名称
    for (const room of data) {
      // 判断机房名称是否已经被添加，若未添加，则添加到 uniqueRooms 数组中
      if (!addedRoomNames.has(room.computer_room_name)) {
        uniqueRooms.push(room);
        addedRoomNames.add(room.computer_room_name);
      }
    }
    return uniqueRooms;
  }
});
// *******************************************************
// 以下的axios是获取楼层的用于下拉框
axios({
  method: "get",
  url: `http://49.235.107.169:5000/api/v1/get_computer_room_by_field`,
}).then((res) => {
  for (let i = 0; i < res.data.length; i++) {
    const newFloorValue = res.data[i].computer_room_name.substring(0, 2); //获得所有楼层，如B6，C5楼
    // 使用 Array.includes 方法检查 newFloorValue 是否已经存在于数组中，
    // 如果不存在，才将其添加到 floor.value中。
    if (!floor.value.includes(newFloorValue)) {
      floor.value.push(newFloorValue);
    }
  }
  // console.log(floor.value);
});
// });

/*
更新tableData，显示所选楼层的数据
提取tableData的数据，遍历tableData，
如果tableData中的computerRoomName的前两位（B501）与selectedRoom（B5）相同，
则只显示本层的机房B5
**************************************************** */

const selectRoom = (selectedRoom) => {
  let a = 0;
  room.value = []; //每次点击下拉框room都会清0再更新

  for (let i = 0; i < tableData.value.length; i++) {
    // console.log(tableData.value[i].computerRoomName.substring(0, 1));
    // console.log(selectedRoom);
    if (tableData.value[i].computer_room_name.substring(0, 1) == selectedRoom) {
      console.log(tableData.value.computer_room_name);
      room.value[a] = tableData.value[i];
      a++;
    } else {
      console.log("此机房无数据");
      // alert('此层无机房');
      // break;//跳出循环
    }
  }
};
const test = computed(() => {
  console.log(room.value.length); //
  for (let i = 0; i < room.value.length; i++) {
    const arr = ref([]);
    arr.value[i] = room.value[i].computer_room_name;
  }
  // return true;
});

/****************************************************************************************
 * 以下为拖拽相关代码
 *
 */

let targetCell = null;
let temp = null;
let aaa = null;
let bbb = null;
let ccc = null;

function handleDrop(e) {
  //被拖放到有效的放置目标上时
  console.log(e.target, "被拖放到有效的放置目标上时");
  aaa = e.target;
}

function handleDragEnter(e) {
  //进来的时候
  const tar = e.target;
  const tagName = tar.tagName.toLowerCase(); //获取鼠标进入的元素的标签名，并将其转换为小写。
  // console.log(tagName);
  targetCell = tagName !== "div" ? null : tar;
  console.log(targetCell, "targetCell");

  // console.log(e.target, "进来的时候");
}

function handleDragEnd(e) {
  //放开鼠标的时候

  // console.log(e.target, "放开鼠标的时候");
  console.log(targetCell, "放开鼠标的时候");
  //创造一个card标签
}
function handleDragOver(e) {
  //划过的时候
  // console.log(e.target);
  // e.target = temp;
  // e.preventDefault();
}

function mouse_down(e) {
  //鼠标按钮在元素内按下
  // console.log(e.target);
  // console.log("mouse_down");
  // console.log(e.target.dataset.key);
  // temp = e.target;
}
function mouse_up(e) {
  //鼠标按钮在元素内释放
  // console.log(e.target);
  // console.log("mouse_up");
  // console.log(temp);
  // e.target = temp;
}
</script>

<style>
.table {
  margin: 0 auto;
  width: 100%;
  height: 55%;
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
#aaa {
  width: 60px;
  height: 100px;
  background-color: red;
}
</style>
