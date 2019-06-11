
import datas from '~/assets/datas/datas.json'
if(process.browser){
  var sniffer = require('sniffer')
}
export const state = () => ({
  datas,
  color: 'nude',
  path: process.env.NODE_ENV === 'production' ? '/images/' : '/images/',
  vPath: process.env.NODE_ENV === 'production' ? '/images/' : '/images/'
})
export const mutations = {
  SET_COLOR (state, color) {
    state.color = color
  }
}
export const actions = {
  setColor ({ commit }, color) {
    commit('SET_COLOR', color)
  }
}
export const getters = {
  isFF: () =>{
    return sniffer ? sniffer.isFirefox : false
  },
  isDevice: () => {
    return sniffer ? sniffer.isDevice : false
  },
  isPhone: () => {
    return sniffer ? sniffer.isPhone : false
  },
  isTablet:(state) => {
    return sniffer ? sniffer.isTablet : false
  },
  isSafari: ()=>{
    return sniffer ? sniffer.isSafari  : false
  }
}
