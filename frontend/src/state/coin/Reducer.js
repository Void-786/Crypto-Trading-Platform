import * as types from "./ActionType"

const initialState = {
    coinList: [],
    top50: [],
    searchCoinList: [],
    marketChart: { data: [], loading: false},
    coinById: null,
    coinDetails: null,
    loading: false,
    error: null
}

const coinReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_COIN_LIST_REQUEST:
        case types.FETCH_COIN_BY_ID_REQUEST:
        case types.FETCH_COIN_DETAILS_REQUEST:
        case types.SEARCH_COIN_REQUEST:
        case types.FETCH_TOP_50_COINS_REQUEST:
            return {...initialState, loading: true, error: null}

        case types.FETCH_MARKET_CHART_REQUEST:
            return {...state, marketChart: { loading: true, data: [] }, error: null}

        case types.FETCH_COIN_LIST_SUCCESS:
            return {...state, coinList: action.payload, loading: false, error: null}

        case types.FETCH_TOP_50_COINS_SUCCESS:
            return {...state, top50: action.payload, loading: false, error: null}

        case types.FETCH_MARKET_CHART_SUCCESS:
            return {...state, marketChart: { data: action.payload.prices, loading: false }, error: null}

        case types.FETCH_COIN_BY_ID_SUCCESS:
            return {...state, coinById: action.payload, loading: false, error: null}

        case types.SEARCH_COIN_SUCCESS:
            return {...state, searchCoinList: action.payload.coins, loading: false, error: null}

        case types.FETCH_COIN_DETAILS_SUCCESS:
            return {...state, coinDetails: action.payload, loading: false, error: null}

        case types.FETCH_MARKET_CHART_FAILURE:
            return {...state, marketChart: { data: [], loading: false }, error: null}

        case types.FETCH_COIN_LIST_FAILURE:
        case types.FETCH_COIN_BY_ID_FAILURE:
        case types.FETCH_COIN_DETAILS_FAILURE:
        case types.SEARCH_COIN_FAILURE:
        case types.FETCH_TOP_50_COINS_FAILURE:
            return {...state, loading: false, error: action.payload}

        default:
            return state
    }
}

export default coinReducer