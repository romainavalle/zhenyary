
import datas from '~/assets/datas/datas.json'
import about from '~/assets/datas/about.json'
if(process.browser){
  var sniffer = require('sniffer')
}
export const state = () => ({
  datas,
  about,
  works: [],
  worksById: {},
  color: 'nude',
  isFirstTime: true,
  navMobile: false,
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
  },
  SET_NAV_MOBILE (state, navMobile) {
    state.navMobile = navMobile
  },
  SET_FIRST_TIME (state) {
    state.isFirstTime = false
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
  },
  setNavMobile ({ commit }, navMobile) {
    commit('SET_NAV_MOBILE', navMobile)
  },
  setFirstTime({commit}) {
    commit('SET_FIRST_TIME')
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
  },
  nextWork: (state)=>{
    const worksSlugs = state.works.map(w => w.slug)
    let id = worksSlugs.indexOf(state.route.params.slug) + 1
    if(id === state.works.length) id = 0
    return state.works[id]
  }
}
