<template>
  <div id="uploadView">
    <div>
      <label for="upload" class="input-file-button">上传</label>
      <input type="file" @change="handleFileUpload" id="upload" />
    </div>

    <div>
      <el-table :data="jsonData" style="width: 100%">
        <!-- 获取表头长度，依照长度打印出来，label为表头名称，prop为该名称下对应的值 -->
        <!-- el-table将会根据prop的值,将jsonData中的值打印出来 -->
        <el-table-column
          :prop="`${tableHead[p - 1]}`"
          :label="tableHead[p - 1]"
          v-for="p in tableHead.length"
        />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import * as XLSX from "xlsx";

const tableHead = ref(0);
const jsonData = ref(null);

function handleFileUpload(event) {
  const files = event.target.files;
  // const files = event;
  /****************************************************************************
      reader.readAsArrayBuffer(file);是一个异步操作，它会开始读取文件，但不会阻塞后续代码的执行。
      然后，当文件读取完成时，会触发 reader.onload 事件，执行相应的回调函数。
      使用了FileReader的readAsArrayBuffer方法，用于以二进制数据的形式读取文件内容。
      这是因为XLSX库需要一个二进制数组缓冲区来读取文件
    *************************************************************************/

  if (files.length) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" }); //将文件读取为二进制数组
      const sheetName = workbook.SheetNames[0]; //获取表格名字
      const worksheet = workbook.Sheets[sheetName]; //获取表格
      tableHead.value = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]; //获取表格头部
      jsonData.value = XLSX.utils.sheet_to_json(worksheet); //将表格转换为json
      console.log(tableHead.value.teacherName);
      /********************************************************************************
       * 以下将xlsx整理的数据转换为一个数组，用来方便变为json格式
       ********************************************************************************/
      // let obj = console.log(obj);
      let array = [];
      let string = "string";
      for (let i = 0; i < jsonData.value.length; i++) {
        array.push({
          teacherName: jsonData.value[i].教师,
          teacherRoom: jsonData.value[i].教研室,
          courseName: jsonData.value[i].课程,
          className: jsonData.value[i].班级,
          population: jsonData.value[i].人数,
          software: jsonData.value[i].软件,
          computerRoomName: string, //jsonData.value[i].机房,
          week: 0, //jsonData.value[i].第几周,
          weekDay: 0, // jsonData.value[i].周几,
          lesson: string, //jsonData.value[i].null,
          littleLesson: string, //jsonData.value[i].null,
          cycle: string, //jsonData.value[i].null,
        });
      }
      console.log(array);
      /**********************************************************
       * 以下将整理好的数据发送给后端
       ***********************************************************/
      axios({
        url: `http://49.235.107.169:5000/api/v1/add_origin_class_json`,
        method: "post",
        data: {
          data: array,
          // data: [
          //   {
          //     teacherName: "string",
          //     teacherRoom: "string",
          //     courseName: "string",
          //     className: "string",
          //     population: 0,
          //     software: "string",
          //     computerRoomName: "string",
          //     week: 0,
          //     weekDay: 0,
          //     lesson: "string",
          //     littleLesson: "string",
          //     cycle: "string",
          //   },
          // ],
        },
      }).then((res) => {
        // if (res.data.code == 200) {
        //   console.log("上传成功");
        // } else {
        //   console.log("上传失败");
        //   console.log(res.data.code);
        // }
      });
    };
    reader.readAsArrayBuffer(file);
  }
}

//获取上传文件的信息   submitUpload()
//change监听是否上传
//判断数据是否是excel
//将文件转换为表格数据并展示
// 将文件数据整理成json发送给后端
</script>

<style>
.input-file-button {
  /* top: 100px; */
  padding: 6px 25px;
  background: rgb(73, 152, 252);
  /* position: absolute; */
  border-radius: 4px;
  /* color: white; */
  cursor: pointer;
}
.input-file-button:hover {
  background: rgb(124, 183, 253);
}
#upload {
  display: none;
}
/* #upload {
  position: absolute;
  top: 500px;
} */
</style>
