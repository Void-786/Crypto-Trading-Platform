import api from "@/config/api"
import * as types from "./ActionType"

export const register = (userData) => async (dispatch) => {

    dispatch({ type: types.REGISTER_REQUEST})

    try {
        const response = await api.post('/auth/signup', userData)
        const user = response.data
        console.log(user)

        dispatch({ type: types.REGISTER_SUCCESS, payload: user.jwt })
        localStorage.setItem("jwt", user.jwt)
        
    } catch (error) {
        dispatch({ type: types.REGISTER_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const login = (userData) => async (dispatch) => {

    dispatch({ type: types.LOGIN_REQUEST})

    try {
        const response = await api.post('/auth/signin', userData)
        const user = response.data
        console.log(user)

        dispatch({ type: types.LOGIN_SUCCESS, payload: user.jwt })
        localStorage.setItem("jwt", user.jwt);
        userData.navigate('/');
        
    } catch (error) {
        dispatch({ type: types.LOGIN_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const getUser = (jwt) => async (dispatch) => {

    dispatch({ type: types.GET_USER_REQUEST})

    try {
        const response = await api.get('/api/users/profile', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        const user = response.data
        console.log(user)

        dispatch({ type: types.GET_USER_SUCCESS, payload: user })
        
    } catch (error) {
        dispatch({ type: types.GET_USER_FAILURE, payload: error.message })
        console.log(error)
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: types.LOGOUT });
        localStorage.clear();
    };
}