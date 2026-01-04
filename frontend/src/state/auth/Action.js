import api from "@/api/api"
import * as types from "./ActionType"
import { success } from "zod"

export const register = (userData) => async (dispatch) => {

    dispatch({ type: types.REGISTER_REQUEST})

    try {
        const response = await api.post('/auth/signup', userData)
        const user = response.data
        console.log("User Registered:", user)
        
        dispatch({ type: types.REGISTER_SUCCESS, payload: user.jwt })
        localStorage.setItem("jwt", user.jwt);
        
        return {success: true};
    } catch (error) {
        dispatch({ type: types.REGISTER_FAILURE, payload: error.response?.data ? error.response.data : error })
        console.log(error);

        return {success: false}
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

export const twoStepVerification = ({ otp, session, navigate }) => async (dispatch) => {

    dispatch({ type: types.LOGIN_TWO_STEP_REQUEST})

    try {
        const response = await api.post(`/auth/2fa/otp/${otp}`, {}, {
            params: {id: session}
        })
        
        const user = response.data

        if(user.jwt) {
            localStorage.setItem("jwt", user.jwt);
            navigate('/');
        }

        dispatch({ type: types.LOGIN_TWO_STEP_SUCCESS, payload: user.jwt })

    } catch (error) {
        dispatch({ type: types.LOGIN_TWO_STEP_FAILURE, payload: error.response?.data ? error.response.data : error })
        console.log(error);
    }
}

export const sendVerificationOtp = ({ jwt, verificationType}) => async (dispatch) => {

    dispatch({ type: types.SEND_VERIFICATION_OTP_REQUEST})

    try {
        const response = await api.post(`/api/users/verification/${verificationType}/send-otp`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        dispatch({ type: types.SEND_VERIFICATION_OTP_SUCCESS, payload: response.data })

    } catch (error) {
        dispatch({ type: types.SEND_VERIFICATION_OTP_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const verifyOtp = ({ jwt, otp }) => async (dispatch) => {

    dispatch({ type: types.VERIFY_OTP_REQUEST})

    try {
        const response = await api.patch(`/api/users/verification/verify-otp${otp}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        dispatch({ type: types.VERIFY_OTP_SUCCESS, payload: response.data })

    } catch (error) {
        dispatch({ type: types.VERIFY_OTP_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const enableTwoStepVerification = (jwt, otp) => async (dispatch) => {

    dispatch({ type: types.ENABLE_TWO_STEP_AUTHENTICATION_REQUEST})

    try {
        const response = await api.patch(`/api/users/enable-2fa/verify-otp/${otp}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        dispatch({ type: types.ENABLE_TWO_STEP_AUTHENTICATION_SUCCESS, payload: response.data })

    } catch (error) {
        dispatch({ type: types.ENABLE_TWO_STEP_AUTHENTICATION_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const sendResetPasswordOtp = ({ sendTo, verificationType, navigate}) => async (dispatch) => {

    dispatch({ type: types.SEND_RESET_PASSWORD_REQUEST})

    try {
        const response = await api.post(`/auth/users/reset-password/send-otp`, {
            sendTo,
            verificationType
        })

        navigate(`/reset-password/${response.data.session}`);
        dispatch({ type: types.SEND_RESET_PASSWORD_SUCCESS, payload: response.data })

    } catch (error) {
        dispatch({ type: types.SEND_RESET_PASSWORD_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const verifyResetPasswordOtp = ({ otp, password, session, navigate}) => async (dispatch) => {

    dispatch({ type: types.VERIFY_RESET_PASSWORD_REQUEST})

    try {
        const response = await api.patch(`/auth/users/reset-password/verify-otp`,
            {
                otp,
                password
            },
            {
                params: {
                    id: session
                }
            }
        )

        dispatch({ type: types.VERIFY_RESET_PASSWORD_SUCCESS, payload: response.data })

        navigate('/password-update-successfully');

    } catch (error) {
        dispatch({ type: types.VERIFY_RESET_PASSWORD_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const clearAuthError = () => ({
    type: types.CLEAR_AUTH_ERROR
})