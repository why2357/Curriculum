<template>
  <form action="">
    <input type="text" v-model="a" /><br />
    <button @click="check_software()">查软件</button><br />
    <button @click="check_floor">查楼层</button>
  </form>
  {{ reception }}
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
var a = ref("");
let reception = ref("");

function check_software() {
  axios({
    method: "get",
    url: `http://49.235.107.169:5000/api/v1/get_computer_room_software?computerRoomName=${a.value}`,
  }).then((ret) => {
    reception.value = ret.data;
    console.log(reception.value);
  });
}

function check_floor() {
  axios({
    method: "get",
    url: `http://49.235.107.169:5000/api/v1/get_computer_room_floor?computerRoom=${a.value}`,
  }).then((ret) => {
    console.log(ret.data);
    reception.value = ret.data;
    console.log(reception.value);
  });
}
</script>

<style></style>
