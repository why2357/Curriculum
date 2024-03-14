import { defineStore } from "pinia";
export const useMain_classStore = defineStore('main_class', {//定义store，main_class是store的名字
   state: () => ({//定义store的状态
      data: 0,
   }),

})
