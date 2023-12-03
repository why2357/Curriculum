<template>
  <div
    class="ka"
    draggable="true"
    @dragstart="handleDragstart"
    @dragend="handleDragend"
    :data-key="cardKey"
  >
    <p>{{ tableData[0].id }}</p>
<!-- <button @click="test">test</button> -->
<span class="remove-btn">del</span>
  </div>
</template>

<script setup>
// const props = defineProps(["course"]); // 定义props
const props = defineProps({
  cardName: {
    type: Object,
    default: 'null',
  },
  cardKey: {
    type: String,
    default: 'null',
  },
  rawData: {
    type: Object,
    default: 'null',
  },
  tableData: {
    // type: Array,
    default: 'null',
  },
  msg: {
    type: String,
    default: 'null',
  },
}); // 定义props
// console.log(rawData);
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
function test() {
  console.log(props.tableData);
} 
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

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #eb7c7c;
}
</style>
