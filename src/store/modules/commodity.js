//import {postFetch} from 'common/js/fetch';
const state = {
  userData: {},
  kk:99
};
const mutations = {
  getUser(state,pl){
    state.userData = JSON.parse(pl);
  }
};
const getters = {
  userData: function (state) {
    return state.userData;
  }
}
const actions = {
  getUser(context,obj1){
    context.commit('getUser',obj1)
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
