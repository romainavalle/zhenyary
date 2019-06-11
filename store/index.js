
if(process.browser){
  var sniffer = require('sniffer')
}
export const state = () => ({
  path: process.env.NODE_ENV === 'production' ? 'https://res.cloudinary.com/dqeh75j4f/image/upload/f_auto/romainavalle.dev/' : '/images/',
  vPath: process.env.NODE_ENV === 'production' ? 'https://romainavalle.s3.us-east-2.amazonaws.com/images/' : '/images/'
})
export const mutations = {
  SET_CURRENT_WORK (state, currentWork) {
    state.currentWork = currentWork
  }
}
export const actions = {
  setCurrentWork ({ commit },currentWork) {
    commit('SET_CURRENT_WORK',currentWork)
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
