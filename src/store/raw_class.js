import { defineStore } from "pinia";
export const useRaw_classStore = defineStore('raw_class', {//定义store，raw_class是store的名字
   state: () => ({//定义store的状态
      data: 0,
   }),
})
