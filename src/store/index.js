//该文件用于创建vuex最为核心的store
import Vuex from 'vuex'

//准备actions--用于响应组件的动作
const actions={}

//准备mutations--用于操作数据（state）
const mutations={}

//准备state--用于存储数据
const state={}

//创建store
const store = new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
})

//导出（暴露）store
export default store;