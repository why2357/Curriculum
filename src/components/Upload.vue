<template>
  <div>
    <label for="upload" class="input-file-button">上传</label>
    <input type="file" @change="handleFileUpload" id="upload" />
    <!-- <div v-if="jsonData"> -->
    <!-- <pre>{{ jsonData }}</pre> -->
    <!-- </div> -->
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
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import * as XLSX from "xlsx";

const tableHead = ref(0);
const jsonData = ref(null);

// let data = ref();
function handleFileUpload(event) {
  // function handleFileUpload(event) {
  const files = event.target.files;
  // const files = event;
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
      // jsonData.value = JSON.stringify(jsonData.value); //将json转换为字符串

      console.log(tableHead.value);
    };
    reader.readAsArrayBuffer(file);

    /* reader.readAsArrayBuffer(file);是一个异步操作，它会开始读取文件，但不会阻塞后续代码的执行。
      然后，当文件读取完成时，会触发 reader.onload 事件，执行相应的回调函数。
      使用了FileReader的readAsArrayBuffer方法，用于以二进制数据的形式读取文件内容。
      这是因为XLSX库需要一个二进制数组缓冲区来读取文件
    */
  }

  axios({});
}

//获取上传文件的信息   submitUpload()
//change监听是否上传
//判断数据是否是excel
//将文件转换为表格数据并展示
// 将文件数据整理成json发送给后端
</script>

<style>
.input-file-button {
  padding: 6px 25px;
  background: rgb(73, 152, 252);

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
</style>
