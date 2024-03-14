<template>
  <!-- *******************以下为详细课表的卡片********************** -->
  <div class="ka" draggable="true" :data-key="cardKey" v-if="determine_place()">
    <el-popover
      placement="top-start"
      title="Title"
      :width="200"
      trigger="hover"
      :content="`
          ${room.course_name} 
          ${room.class_name}
          ${room.cycle}
          ${room.teacher_name}
          ${room.id}
          ${room.teacher_room}
          ${room.population}
          ${room.computer_room_name}
          ${room.lesson}
          `"
    >
      <template #reference>
        {{ room.computer_room_name }}
      </template>
    </el-popover>
  </div>
  <!-- *********以下为原始课表的卡片********************************** -->
  <div v-if="raw_display()"></div>
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
  rawData: {
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
// import { element } from "element-plus/es/locale";
import { ref, onMounted, watch } from "vue";
const localRawData = ref([]);
console.log(props.computer_room_name);
// console.log(rawData);
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

/**
 * 以下为获得处理原始课表相关代码
 * 使用props.rawData接收父组件传递的数据,使用watch 监听rawData变化
 * rawData初始为[],当rawData变化时，将其赋值给localRawData, 从而实现数据的传递
 */
// 使用 watch 监听 rawData 变化

// watch(
//   () => props.rawData,
//   (newRawData) => {
//     console.log(newRawData);
//     localRawData.value = newRawData;
//   }
// );
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
      for (let i = 0; i < back_lesson.length; i++) {
        for (let j = 0; j < my_lesson.length; j++) {
          if (back_lesson[i] === my_lesson[j]) {
            return true; // 如果找到相同的元素，则返回 true
          }
        }
      }
    }
  }
  // 返回 false asx/aZ表示当前卡片不需要显示
}

function raw_display() {}
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
}

/******************************************************
 * 以下为拖拽相关代码
 *
 */
const emit = defineEmits(["handleDragEnd"]); // emit 用于向父组件触发事件。defineEmits 是为了明确声明组件可以触发的事件

function handleDragstart(e) {
  /**
   * 这行代码的作用是设置一个HTML元素的透明度。
   * tar 变量是一个 DOM 元素，通过 e.target 获取到，
   * 然后使用 style 属性来访问元素的 CSS 样式。
   */
  const tar = e.target;
  tar.style.opacity = 0.4;
}

function handleDragend(e) {
  const tar = e.target;
  tar.style.opacity = 1;
  /**
   * handleDragEndHandler 函数会在子组件触发 handleDragEnd 事件时被调用，
   * 并且会接收到传递过来的目标元素 tar
   * tar 是传递给事件处理函数的参数，这里是拖拽结束时的目标元素。
   */
  emit("handleDragEnd", tar);
}
// function mouse_down(e) {
//   console.log("mouse_enter");
//   console.log(e.target);
// }
/****************************************************************************
0
 * 以下为双击显示代码
 */
// var isShow = ref(false);
// function Complete_information() {
//   console.log(isShow);
//   isShow = true;
//   console.log(isShow);
// }
// function test() {
//   console.log(isShow);
//   isShow = false;
//   console.log(isShow);
// }
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
