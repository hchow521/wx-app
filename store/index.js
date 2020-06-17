import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false, // 是否登录
		userName: "", // 用户名或手机号
		manager: false,
		managerStyle: false
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
			state.manager = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
			state.manager = false,
			state.managerStyle = false
		},
		SET_STYLE(state, value) {
			state.managerStyle = value
		}
	}
})

export default store
