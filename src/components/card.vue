<template>
  <!-- *******************以下为详细课表的卡片********************** -->

  <div
    class="ka"
    :data-key="cardKey"
    v-if="determine_place()"
    draggable="true"
    @dragstart="handleDragstart(room)"
    @dragover.prevent="$event.preventDefault()"
    @drop="handleDrop(room)"
    @dragend="dragend(room)"
  >
    <el-popover
      placement="top-start"
      title="Title"
      :width="200"
      trigger="hover"
      :content="`
          ${room.course_name} 
          `"
    >
      <template #reference>
        {{ room.computer_room_name }}
        {{ room.day }}
        {{ room.lesson }}
      </template>
    </el-popover>
  </div>
</template>

<script setup>
const props = defineProps({
  cardName: {
    type: Object,
    default: "null",
  },
  cardKey: {
    type: String,
    default: "null",
  },
  Vue_row: {
    type: Array,
    default: () => [], //懒加载
  },
  tableData: {
    // type: Array,
    default: "null",
  },
  room: {
    type: Object,
    // default: "null",
  },
  weekDay: {
    // type: String,
    default: "null",
  },
  item: {
    //即该单元格代表的时间，如1-2节
    // type: String,
    default: "null",
  },
  computer_room_name: {
    // type: String,
    default: "null",
  },
}); // 定义props

import axios from "axios";
import { useDragDataStore } from "../store/dragData.js";
// import { element } from "element-plus/es/locale";
import { ref, onMounted } from "vue";

const DragDataStore = useDragDataStore(); //使用pinia
const room = ref(props.room); //props.room是只读的，不能修改需要转换为ref类型
// 因为后端返回的星期是day:2这种，
// 而我设定为props.weekDay是星期一这种格式，所以需要转换一下格式
const day = {
  星期一: "1",
  星期二: "2",
  星期三: "3",
  星期四: "4",
  星期五: "5",
  星期六: "6",
  星期七: "7",
};

// 在 setup 函数中使用组件的生命周期钩子
onMounted(() => {});

/****************************************************************************
 *利用表格中的机房，星期，时间判断该数据是否处于这一格
 *如果后端的机房，星期，时间和前端一样则通过
 *
 */
function determine_place() {
  // console.log(props.rawData);
  // console.log(props.weekDay);
  let weekDayNumber = day[props.weekDay];
  if (props.room.computer_room_name == props.computer_room_name) {
    if (props.room.day == weekDayNumber) {
      //使用back_lesson，my_lesson 用于存储后端和前端的课程时间如1-2节，3-4节 0-6节，7-0节
      //提取12，06，70来判断是否属于这一格，如果俩数组有相同的元素则返回true，显示卡片
      var back_lesson = new Array();
      var my_lesson = new Array();
      back_lesson[0] = props.room.lesson.charAt(0);
      back_lesson[1] = props.room.lesson.charAt(2);
      my_lesson[0] = props.item.time.charAt(0);
      my_lesson[1] = props.item.time.charAt(2);
      if (back_lesson[0] === my_lesson[0] || back_lesson[1] === my_lesson[1]) {
        return true; // 如果找到相同的元素，则返回 true
      } else {
        return false;
      }
    }
  }
}

/*************************************************************************
 * 判断是否为整节课，或者上半节，下半节
 */
function judgment() {
  //判断是否为整节课，或者上半节，下半节
  let my_lesson = eval(props.item.time);
  let back_lesson = eval(props.room.lesson);
  if (my_lesson == back_lesson) {
    console.log("全节");
    return true;
  }
  if (my_lesson > back_lesson) {
    console.log("下半节");
    return true;
  }
  if (my_lesson < back_lesson) {
    console.log("上半节");
    return true;
  } else {
    return false;
  }
  // 返回 false 表示当前卡片不需要显示
}

/*********************************************************************************
 * 以下为拖拽相关代码
 **
 */

const handleDragstart = (data) => {
  DragDataStore.dragData = data; //将本卡片的数据存储在store中
  const tempday_target = data.day;
  const templesson_target = data.lesson;
};

const handleDrop = (data) => {
  const templesson = DragDataStore.dragData.lesson;
  const tempday = DragDataStore.dragData.day;

  console.log(tempday, templesson);

  data.lesson = templesson;
  data.day = tempday;
  DragDataStore.target = data;

  room.value = DragDataStore.dragData; //将拖拽的数据显示到room中
};

const dragend = (room) => {
  // DragDataStore.target.lesson = templesson_target;
  // DragDataStore.target.day = tempday_target;
  room.value = DragDataStore.target; //将目标数据显示到卡片中
};
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
