// your-project/store/index.js

export const state = () => ({
  socketFDs: [],
  socketReq: {},
  socketData: {},
  imgurl:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
})

export const mutations = {
  SET_FDs(state, value) {
    // console.log('SET_FDs', value)
    state.socketFDs = value
  },
  SET_Req(state, value) {
    // console.log('SET_Req', value)
    state.socketReq = value
  },
  SET_Data(state, value) {
    // console.log('SET_Data', value)
    state.socketData = value
  },
}
