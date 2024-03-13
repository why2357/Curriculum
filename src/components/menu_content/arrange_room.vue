<template>
  <div id="asa" v-for="rawData of rawData">
    <card :rawData="rawData"></card>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import card from "../card.vue";
import axios from "axios";
import { ref } from "vue";
let rawData = ref([]);
onMounted(() => {
  axios({
    method: "get",
    url: `http://49.235.107.169:5000/api/v1/get_origin_class_by_field`,
  }).then((res) => {
    rawData.value = res.data;
    console.log(rawData.value);
  });
});
</script>

<style>
#asa {
  color: red;
  height: 100px;
  width: 100px;
  /* background-color: aqua; */
  float: left;
  border: 2px solid black;
}
</style>
