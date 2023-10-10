import { createStore } from 'vuex';


function decodeUserIdFromToken(token) {
    if (!token) {
        return null;
    }
    try {

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.user.id;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
}

const store = createStore({
    state() {
        return {
            token: '', // Aquí puedes definir las propiedades de estado que necesites
            userId: null,
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            state.userId = decodeUserIdFromToken(token);
        },
        clearToken(state) {
            state.token = null;
        },
    },
    actions: {
        login({ commit }, token) {
            commit('SetToken', token);
        },
        logout({ commit }) {
            commit('clearToken');
        },
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getUserId(state) {
            return state.userId;
        }
    },
    // Agrega más getters según tus necesidades
});

export default store;
