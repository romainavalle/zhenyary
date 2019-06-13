
import datas from '~/assets/datas/datas.json'
if(process.browser){
  var sniffer = require('sniffer')
}
export const state = () => ({
  datas,
  works: [],
  worksById: {},
  color: 'nude',
  path: process.env.NODE_ENV === 'production' ? '/images/' : '/images/',
  vPath: process.env.NODE_ENV === 'production' ? '/images/' : '/images/'
})
export const mutations = {
  SET_WORKS (state, works) {
    state.works = works
  },
  SET_WORKS_BY_ID (state, worksById) {
    state.worksById = worksById
  },
  SET_COLOR (state, color) {
    state.color = color
  }
}
export const actions = {
  nuxtServerInit({state, commit}) {
    const works = []
    const worksById = {}
    state.datas.works.forEach(screen => {
      screen.forEach(line => {
        line.forEach(work => {
            const json = require(`~/assets/datas/works/${work}.json`)
            works.push(json)
            worksById[work]  = json
        })
      })
    })
    commit('SET_WORKS', works)
    commit('SET_WORKS_BY_ID', worksById)
  },
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
