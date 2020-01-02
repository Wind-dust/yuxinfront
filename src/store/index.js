import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    text: [],
    imageUrl:[]
  },
  getter:{
    getText(val){
      console.log(val)
      return val
    }
  }
})
export default store
