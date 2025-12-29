import api from "@/config/api"
import { REGISTER_SUCCESS,
         REGISTER_REQUEST,
         REGISTER_FAILURE,
         LOGIN_SUCCESS,
         LOGIN_REQUEST,
         LOGIN_FAILURE,
         GET_USER_REQUEST,
         GET_USER_SUCCESS,
         GET_USER_FAILURE,
         LOGOUT } from "./ActionType"

export const register = (userData) => async (dispatch) => {

    dispatch({ type: REGISTER_REQUEST})

    try {
        const response = await api.post('/auth/signup', userData)
        const user = response.data
        console.log(user)

        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt })
        localStorage.setItem("jwt", user.jwt)
        
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const login = (userData) => async (dispatch) => {

    dispatch({ type: LOGIN_REQUEST})

    try {
        const response = await api.post('/auth/signin', userData)
        const user = response.data
        console.log(user)

        dispatch({ type: LOGIN_SUCCESS, payload: user.jwt })
        localStorage.setItem("jwt", user.jwt);
        userData.navigate('/');
        
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const getUser = (jwt) => async (dispatch) => {

    dispatch({ type: GET_USER_REQUEST})

    try {
        const response = await api.get('/api/users/profile', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        const user = response.data
        console.log(user)

        dispatch({ type: GET_USER_SUCCESS, payload: user })
        
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message })
        console.log(error)
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: LOGOUT });
        localStorage.clear();
    };
}