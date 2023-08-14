import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAdminStore = defineStore('admin', {
  // 其他配置...
  state: ()=> ({userInfo : {},currentCompany:''}),
  getters:{
    getUserInfo:(state)=>state.userInfo,
    getCurrentCompany:(state)=>state.currentCompany
  },
  actions:{
    setUserInfo(userInfo){
      this.userInfo = userInfo
    },
    setCurrentCompany(company){
      this.currentCompany = company
    }
  },
  persist: {
    enabled: true , // 这个配置代表存储生效，而且是整个store都存储
  }
})