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
        login({ commit }, userData) {
            // Aquí puedes realizar la llamada de inicio de sesión y, cuando tengas el token, llamar a la mutación para almacenar el token en el estado
            // Ejemplo:
            // AuthService.login(userData).then(response => {
            //   commit('setToken', response.data.token);
            // });
        },
        logout({ commit }) {
            // Llamar a esta acción cuando el usuario cierre sesión para limpiar el token
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
