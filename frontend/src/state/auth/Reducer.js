import * as types from "./ActionType"

const initialState = {
    loading: false,
    user: null,
    error: null,
    jwt: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.REGISTER_REQUEST:
        case types.LOGIN_REQUEST:
        case types.GET_USER_REQUEST:
            return {...state, loading: true, error: null}

        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            return {...state, loading: false, error:null, jwt: action.payload}

        case types.GET_USER_SUCCESS:
            return {...state, loading: false, error:null, user: action.payload, fetchingUser: false}

        case types.REGISTER_FAILURE:
        case types.LOGIN_FAILURE:
        case types.GET_USER_FAILURE:
        case types.LOGIN_TWO_STEP_FAILURE:
            return {...state, loading: false, error: action.payload}

        case types.LOGOUT:
            localStorage.removeItem("jwt");
            return { ...state, jwt: null, user: null };

        case types.CLEAR_AUTH_ERROR:
            return {...state, error: null}

        case types.LOGIN_TWO_STEP_SUCCESS:
            return {...state, loading: false, jwt: action.payload}

        default:
            return state;
    }
}

export default authReducer