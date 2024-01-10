import { createStore } from 'vuex';

export const store = createStore({
  state: {
    userInfo:{},
    userList:[]
  },
  mutations: {
    //Manage user information
    setUserInfo(state:any,userInfo:any){
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      //Randomly generate tokens
      let token = Math.random().toString(16).slice(2);
      localStorage.setItem("token",token)
    },
    //Clear user information
    clearUserInfo(state:any){
      state.userInfo = {};
      localStorage.removeItem("userInfo")
      localStorage.removeItem("token")
      
    },
    //Manage user list
  },
  //controller
  actions: {
 // context object as parameter
    login(context,userInfo){
      context.commit('setUserInfo',userInfo)
    }
  },

  getters: {
    //Get user information
    getUserInfo(state){
      return state.userInfo;
    }
  }
});
