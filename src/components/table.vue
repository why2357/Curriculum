<template>
  <div class="table">
    <!-- <el-table :data="tableData" style="width: 100%" height="90%"> -->
    <el-table :data="room" style="width: 100%" height="90%">
      <el-table-column fixed label="机房" width="150" prop="computerRoomName" />

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
              v-if="shouldRenderTimeSlot(amORpm, item)"
              :key="id"
              :label="item.time"
              align="center"
            >
              <card></card>
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
import card from "./card.vue";

let floor = ref();
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

var a = 0;
function shouldRenderTimeSlot(amORpm, item) {
  console.log(amORpm, item);
  a++;
  console.log(a);
  //   return true;
  return item.belong === amORpm;
}

onMounted(() => {
  /**获取所有楼层详细数据，并存储在tableData中
   * ***************************************
   */
  axios({
    method: "get",
    url: `http://49.235.107.169:5000/api/v1/get_main_course`,
  }).then((res) => {
    // console.log(res.data[1].computerRoomName.substring(0, 2));
    tableData.value = res.data; //将所有数据存储在tableData中
    room.value = tableData.value; //将所有数据存储在room中，但room将用于存储所选楼层的数据
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].computerRoomName) {
      }
    }
  });
  // *******************************************************
  // 以下的axios是获取楼层的用于下拉框
  axios({
    method: "get",
    url: `http://49.235.107.169:5000/api/v1/get_computer_room_floor`,
  }).then((res) => {
    // console.log(res.data.floor);
    floor.value = Object.keys(res.data.floor);
    // console.log(floor.value);
  });
  function test() {
    console.log(room);
  }
});

/*
更新tableData，显示所选楼层的数据
提前tableData的数据，遍历tableData，
如果tableData中的computerRoomName的前两位（B501）与selectedRoom（B5）相同，
则
**************************************************** */

const selectRoom = (selectedRoom) => {
  // tableData.value = room.value[selectedRoom];
  let a = 0;
  room.value = []; //每次点击下拉框room都会清0再更新
  for (let i = 0; i < tableData.value.length; i++) {
    if (tableData.value[i].computerRoomName.substring(0, 2) == selectedRoom) {
      room.value[a] = tableData.value[i];
      a++;
      console.log(tableData.value[i].computerRoomName.substring(0, 2));
    } else {
      console.log("此机房无数据");
      // alert('此层无机房');
      // break;//跳出循环
    }
  }
};
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
</style>

<!-- <template>
  <div class="board">
      <div class="left">
          <card
          v-for="(kapian, index) of data.courses"
          :cardName="kapian"
          :card-key="cardKey"
          @handle-Drag-End="handleDragEnd"
          >

          </card>
      </div>
      <div class="right"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter"
      >
          <table border="1">
              <tr> -->
<!-- ****************  th是表头  ****************************** -->
<!-- <th>时间段/星期</th>
                  <th v-for="(weekday, index) of data.weekday" :key="index">
                      {{ weekday }}
                  </th>
              </tr> -->

<!-- ****************  tr是行，th代表给每一行的表头渲染一个time_slot  ****************************** -->
<!-- <tr v-for="(time_slot, index) of data.time_slot" :key="index">
                  <th class="time-slot"> {{ time_slot }}  </th> -->
<!-- ****************  td是列,循环7次，制造7列  ****************************** -->
<!-- <td v-for="weekday in 7"
                      :data-weekday="weekday"
                      :data-time-slot="index"
                  > 
                      <template v-if="cellData[`${weekday}-${index}`]">
                      <card
                       :cardName="data.courses[cellData[`${weekday}-${index}`]]"
                       :card-key="cellData[`${weekday}-${index}`]"
                       @handle-Drag-End="handleDragEnd"
                       >

                      </card>
                      </template>
                  </td>
              </tr>
          </table>
      </div>
  </div>
</template> -->
<!-- <script setup>
import card from "./card.vue";
import { ref } from "vue";
const data = {
  weekday: [
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
      "星期日",
  ],
  time_slot: [
      "8:00-8:50",
      "9:00-9:50",
      "10:00-10:50",
      "11:00-11:50",
      "14:00-14:50",
      "15:00-15:50",
      "16:00-16:50",
      "17:00-17:50",
  ],
  courses: {
      chinses: {
          name: "语文",
          teacherName: [
              "张三",
              "李四",
          ],
      },
      math: {
          name: "数学",
          teacherName: [
              "王五",
              "赵六",
          ],
      },
      english: {
          name: "英语",
          teacherName: [
              "小六",
              "老七",
          ],
      },
  }
}
const cellData = ref({
  '1-1':'chinses',
  '3-4':'math',
  '5-7':'english',
});

let targetCell = null;

function handleDragOver(e) {
//划过的时候
//   console.log(e.target);

e.preventDefault();
}

function handleDragEnter(e) {
//进来的时候
e.preventDefault();
const tar = e.target;
const tagName =tar.tagName.toLowerCase();

targetCell = tagName !== 'td' ? null : tar;
}

function handleDragEnd(target) {
// function handleDragEnd(target) {
//放开鼠标的时候
console.log(target);
//    console.log(targetCell);
if (targetCell) {
  const weekday = targetCell.dataset.weekday;
  const timeSlot = targetCell.dataset.timeSlot;
  const prop = `${weekday}-${timeSlot}`;
  if (!cellData.value[prop]) {
    const key = target.dataset.key;
  //   const key = dragData.key; 
  console.log(key);   
      cellData.value[prop] = key;
  }

}
}



</script> -->
<!-- <style >
.left {
  position: absolute;
  left: 0;
  top: 0;
  width: 20%;
  height: 100%;
  background-color: rgb(113, 113, 217);
}

.right {
  width: 80%;
  height: 100%;
  position: absolute;
  left: 20%;
  top: 0;
  /* box-sizing: border-box; */
  background-color: rgb(115, 192, 0)
}

table {
  width: 100%;
  height: 100%;
}
</style>
  -->

<!-- ***************************************************************************
  *********************************************************************************
******************************************************************************
*******************************************************************************
******************************************************************************* -->
<!-- <template> 
    <div>   -->
<!-- ****************   下拉框    ******************* -->
<!-- <div class="controls"> 
      <el-select
        v-model="selectedRoom"
        placeholder="请选择机房"
        @change="filterData"
      >
        <el-option label="B5" value="B5"></el-option>
        <el-option label="C3" value="C3"></el-option>
        <el-option label="C4" value="C4"></el-option>
        <el-option label="C5" value="C5"></el-option>
        <el-option label="C6" value="C6"></el-option>
      </el-select>
    </div> -->
<!-- ****************       ******************* -->
<!-- <div class="course-table">
      <el-table :data="tableData" border>
        <el-table-column prop="classroom" label="时间/机房" align="center" /> -->

<!-- 遍历星期几 -->
<!-- <el-table-column
          v-for="day in days"
          :key="day.en"
          :label="day.cn"
          align="center"
        > -->
<!-- 上午 -->
<!-- <el-table-column label="上午" align="center"> -->
<!-- 1-2节 -->
<!-- 这段代码是使用 Element-UI 中的 el-table-column 组件创建了一个表格列，
              用于显示星期几的上午第一节（1-2节）的课程信息。以下是代码的关键部分解释：

:prop="${day.en}Morning1"：这里使用了动态属性绑定，将列的 prop 属性绑定到一个动态生成的属性，
该属性由当前循环的 day 对象的英文星期名（如 "monday"）与 "Morning1" 组合而成。这样可以动态地生成每个列的属性，以匹配数据中的字段。

label="1-2节"：这是显示在列头部的文本，表示这一列是上午的第一、第二节课。

align="center"：这是设置列中文本内容的对齐方式，使其居中显示。

width="180"：这是设置列的宽度为 180 像素。

template 标签内部包含了一个插槽（slot），该插槽的名称是 default。在插槽内部，
通过 Vue.js 的模板语法，根据表格中的数据动态渲染了每个单元格的内容。

:draggable="true"：这是设置元素可拖动，用于实现拖放操作。

@dragstart="onDragStart($event, row, column.property)"：这是拖动开始时的事件监听器，
当用户开始拖动课程信息时触发。它调用了 onDragStart 函数，将事件对象、行数据 row 以及列的属性名传递给该函数。

@drop="onDrop($event, row, column.property)"：这是拖动结束时的事件监听器，
当用户释放拖动的课程信息时触发。它调用了 onDrop 函数，将事件对象、目标行数据 targetRow 以及目标列的属性名传递给该函数。

@dragover.prevent：这是阻止浏览器对拖动的默认处理，以便能够执行自定义的拖放操作。

在模板的插槽中，通过条件判断渲染了不同的内容。
如果单元格中有课程信息，显示该课程的名称、班级和教师信息，否则显示一个非断空格作为占位符。
这样在拖动时，可以将课程信息拖放到其他单元格，实现课程的调整。 -->
<!-- <el-table-column
              :prop="`${day.en}Morning1`"
              label="1-2节"
              align="center"
              width="180"
            >
              <template v-slot:default="{ row, column }">
                <div
                  :draggable="true"
                  @dragstart="onDragStart($event, row, column.property)"
                  @drop="onDrop($event, row, column.property)"
                  @dragover.prevent
                >
                  <div v-if="row[column.property]">
                    {{ row[column.property].courseName }}
                    <br />
                    {{ row[column.property].className }}
                    <br />
                    {{ row[column.property].teacherName }}
                  </div>
                  <div v-else> -->
<!-- 非断空格作为占位符 -->
<!-- &nbsp;
                  </div>
                </div>
              </template>
            </el-table-column> -->

<!-- 3-4节 -->
<!-- <el-table-column
              :prop="`${day.en}Morning2`"
              label="3-4节"
              align="center"
              width="180"
            >
              <template v-slot:default="{ row, column }">
                <div
                  :draggable="true"
                  @dragstart="onDragStart($event, row, column.property)"
                  @drop="onDrop($event, row, column.property)"
                  @dragover.prevent
                > -->
<!-- <div v-if="row[column.property]">
                    {{ row[column.property].courseName }}
                    <br />
                    {{ row[column.property].className }}
                    <br />
                    {{ row[column.property].teacherName }}
                  </div>
                  <div v-else> -->
<!-- 非断空格作为占位符 -->
<!-- &nbsp;
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table-column> -->

<!-- 下午 -->
<!-- <el-table-column label="下午" align="center"> -->
<!-- 5-6节 -->
<!-- <el-table-column
              :prop="`${day.en}Afternoon1`"
              label="5-6节"
              align="center"
              width="180"
            >
              <template v-slot:default="{ row, column }">
                <div
                  :draggable="true"
                  @dragstart="onDragStart($event, row, column.property)"
                  @drop="onDrop($event, row, column.property)"
                  @dragover.prevent
                >
                  <div v-if="row[column.property]">
                    {{ row[column.property].courseName }}
                    <br />
                    {{ row[column.property].className }}
                    <br />
                    {{ row[column.property].teacherName }}
                  </div>
                  <div v-else> -->
<!-- 非断空格作为占位符 -->
<!-- &nbsp;
                  </div>
                </div>
              </template>
            </el-table-column> -->
<!-- 7-8节 -->
<!-- <el-table-column
              :prop="`${day.en}Afternoon2`"
              label="7-8节"
              align="center"
              width="180"
            >
              <template v-slot:default="{ row, column }">
                <div
                  :draggable="true"
                  @dragstart="onDragStart($event, row, column.property)"
                  @drop="onDrop($event, row, column.property)"
                  @dragover.prevent
                > -->
<!-- <div v-if="row[column.property]">
                    {{ row[column.property].courseName }}
                    <br />
                    {{ row[column.property].className }}
                    <br />
                    {{ row[column.property].teacherName }}
                  </div>
                  <div v-else> -->
<!-- 非断空格作为占位符 -->
<!-- &nbsp;
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table-column> -->

<!-- 晚上 -->
<!-- <el-table-column label="晚上" align="center"> -->
<!-- 9-10节 -->
<!-- <el-table-column
              :prop="`${day.en}Evening`"
              label="9-10节"
              align="center"
              width="180"
            > -->
<!-- <template v-slot:default="{ row, column }">
                <div
                  :draggable="true"
                  @dragstart="onDragStart($event, row, column.property)"
                  @drop="onDrop($event, row, column.property)"
                  @dragover.prevent
                > -->
<!-- <div v-if="row[column.property]">
                    {{ row[column.property].courseName }}
                    <br />
                    {{ row[column.property].className }}
                    <br />
                    {{ row[column.property].teacherName }}
                  </div>
                  <div v-else> -->
<!-- 非断空格作为占位符 -->
<!-- &nbsp; -->
<!-- </div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div> -->
<!-- </template> -->

<!-- <script setup>  
// import { ref, onMounted, computed } from "vue";
// import axios from "axios";

// const fullTableData = ref([]); // 存储后端获取数据
// const tableData = ref([]); // 展示当前数据

// const days = [
//   { en: "monday", cn: "星期一" },
//   { en: "tuesday", cn: "星期二" },
//   { en: "wednesday", cn: "星期三" },
//   { en: "thursday", cn: "星期四" },
//   { en: "friday", cn: "星期五" },
//   { en: "saturday", cn: "星期六" },
// ];

// let draggedData = null;

// onMounted(() => {
//   getData();
// });

// const getData = async () => {
//   //async定义异步函数，该函数就会返回一个 Promise 对象
//   try {
//     const response = await axios.get(
//       //await使得在函数体内可以使用 await 来等待 axios.get 方法的异步操作完成
//       //使用 await 来等待 fetch 和 response.json() 这两个异步操作完成
//       "http://49.235.107.169:5000/api/v1/get_main_course"
//       // "http://127.0.0.1:4523/m2/3490940-0-default/120696746?computer_room_name=C501"
//     );
//     const rawData = response.data; //将后端数据给参数rawData
//     console.log(rawData)
//     fullTableData.value = formatData(rawData); // 保存完整数据
//     filterData(); // 过滤默认数据
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// const formatData = (rawData) => {
//   // 创建一个 Map 对象用于存储转换后的数据
//   const dataMap = new Map();
//   // 星期映射，将数字表示的星期转换为中文
//   const dayMap = {
//     1: "monday",
//     2: "tuesday",
//     3: "wednesday",
//     4: "thursday",
//     5: "friday",
//     6: "saturday",
//   };

  // 遍历原始数据数组
  // rawData.forEach((item) => {
  //   const key = item.computerRoomName;
  //   // 如果 Map 中不存在当前机房的条目，则创建一个新的条目
  //   if (!dataMap.has(key)) {
  //     dataMap.set(key, { classroom: key });
  //   }
  //   // 获取当前数据的星期和课程节数
  //   const dayKey = dayMap[item.weekDay];
  //   const lessonKey = getLessonKey(item.lesson);
  //   // 构建属性名称，例如 "星期一Morning1"
  //   const prop = `${dayKey}${lessonKey}`;
// 将获取到的每条原始数据（item）复制并分配给 dataMap 中对应键（key）的属性（prop）
// 使用了展开运算符（...），它可以将 item 对象中的所有属性和值复制到新的对象中，
// 然后将这个新对象设置为 dataMap 中 key 对应的 prop 属性的值。
// 这样做可以确保将原始数据项的每个属性和值都保存下来，以便于后续在表格中使用。
  //   dataMap.get(key)[prop] = { ...item }; 
  // });

  // 为每个可能的单元格设置默认值
//   days.forEach((day) => {
//     ["Morning1", "Morning2", "Afternoon1", "Afternoon2", "Evening"].forEach(
//       (part) => {
//         const prop = `${day.en}${part}`;

//         rawData.forEach((item) => {
//           // 如果原始数据中没有对应属性的值，则设置为空的占位符
//           if (!item[prop]) {
//             item[prop] = { isEmpty: true }; // 设置一个标记为空的对象
//           }
//         });
//       }
//     );
//   });
//   // 将 Map 中的值转换为数组并返回
//   return Array.from(dataMap.values());
// };

// const getLessonKey = (lesson) => {
//   // 定义一个映射，将课程节数映射为相应的表格列属性名称
//   const lessonMap = {
//     "1-2": "Morning1",
//     "3-4": "Morning2",
//     "5-6": "Afternoon1",
//     "7-8": "Afternoon2",
//     "9-10": "Evening",
//   };
//   // 返回映射中对应课程节数的值，如果没有对应的映射，则返回空字符串
//   return lessonMap[lesson] || "";
// };

/**
 * 
 *  {onDragStart 函数用于处理拖动开始时的事件。它接受三个参数：
            event: 拖动事件对象
            row: 表格行的数据
            prop: 表格列的属性名称} event 
            
    函数的主要目的是创建一个包含拖动相关数据的对象 draggedData，
    以便在拖动的过程中传递和使用这些数据。这个对象包括：
        value: 表格单元格中的值
        row: 表格行的数据
        prop: 表格列的属性名称
        originalData: 表格行的原始数据（通过 { ...row } 进行浅拷贝）
此外，函数通过 event.dataTransfer.setData 方法设置了拖动时传递的数据，类型为纯文本（"text/plain"）。

最后，函数在控制台上输出了拖动开始的信息，包括 draggedData 对象。
这个信息可以用于调试和验证拖动的过程中的数据。
 */
// const onDragStart = (event, row, prop) => {
//   draggedData = { value: row[prop], row, prop, originalData: { ...row } }; // 保存原始行的数据
//   event.dataTransfer.setData("text/plain", "");
//   console.log("Drag Start:", draggedData);
// };

/**
 * onDrop 函数处理拖放事件。它接受三个参数：

event: 拖放事件对象
targetRow: 目标表格行的数据
targetProp: 目标表格列的属性名称
函数的主要目的是在拖放完成时更新表格数据。
首先，它阻止浏览器默认的处理方式，通过调用 event.preventDefault() 防止浏览器对拖放行为的默认处理。
然后，函数检查是否存在拖动的数据 (draggedData)。
如果存在，它获取目标单元格 (targetValue) 的值，
然后根据情况进行处理：
如果目标单元格为空或为占位符，直接将拖动的值复制到目标单元格，并将原始单元格标记为占位符。
如果目标单元格不为空，交换拖动的值和目标单元格的值。
最后，将 draggedData 设为 null，表示拖动操作已完成。
这个函数的目的是在拖动结束时更新表格数据，确保表格中的数据与用户的拖动操作一致。
 * 
 * 
 * 
 * 
 */
// const onDrop = (event, targetRow, targetProp) => {
//   console.log("Drop:", targetRow, targetProp);
//   event.preventDefault();
//   if (draggedData) {
//     const targetValue = targetRow[targetProp];

//     if (!targetValue || targetValue.isEmpty) {
//       // 检查是否为空或占位符
//       // 如果目标单元格为空，则直接复制内容
//       targetRow[targetProp] = draggedData.value;
//       draggedData.row[draggedData.prop] = { isEmpty: true }; // 设置为占位符
//     } else {
//       // 如果目标单元格不为空，则交换内容
//       const temp = targetValue;
//       targetRow[targetProp] = draggedData.value;
//       draggedData.row[draggedData.prop] = temp;
//     }

//     draggedData = null;
//   }
// };

// 过滤选择机房
/**
 * 这部分代码涉及使用 Vue 3 的 Composition API 中的 ref 和过滤数据的逻辑。

selectedRoom 是一个响应式引用，它的初始值为字符串 "B5"。
filterData 是一个函数，当调用时，它会更新 tableData 的值。
这个函数使用 fullTableData 中的数据，通过过滤的方式获取符合条件的数据。
具体来说，它使用 Array.filter 方法，筛选出那些 classroom 属性以 selectedRoom.value 开头的数据项。
这段代码的作用是根据用户选择的机房 (selectedRoom) 来过滤表格数据，确保只显示符合选择机房条件的数据。
在 Vue 中，当 selectedRoom 的值发生变化时，
由于使用了响应式的 ref，相关的视图会自动更新以反映最新的过滤结果。
 */
// const selectedRoom = ref("B5");

// const filterData = () => {
//   tableData.value = fullTableData.value.filter((item) =>
//     item.classroom.startsWith(selectedRoom.value)
//   );
// };
// </script>

<style scoped>
.course-table {
 
  margin: 5px;
  border: 3px solid #ebebeb;
}
</style> 

 -->
