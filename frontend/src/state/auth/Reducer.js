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
            return {...state, loading: false, error:null, user: action.payload}

        case types.REGISTER_FAILURE:
        case types.LOGIN_FAILURE:
        case types.GET_USER_FAILURE:
            return {...state, loading: false, error: action.payload}

        case types.LOGOUT:
            return initialState

        default:
            return state;
    }
}

export default authReducer