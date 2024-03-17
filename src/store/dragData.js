import { defineStore } from "pinia";
export const useDragDataStore = defineStore('DragData', {//定义store，DragData是store的名字
   state: () => ({//定义store的状态
        dragData: {},
   }),

})
