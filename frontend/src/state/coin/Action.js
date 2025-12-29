import api from "@/config/api" 
import {FETCH_COIN_BY_ID_FAILURE,
        FETCH_COIN_BY_ID_REQUEST,
        FETCH_COIN_BY_ID_SUCCESS,
        FETCH_COIN_DETAILS_FAILURE,
        FETCH_COIN_DETAILS_REQUEST,
        FETCH_COIN_DETAILS_SUCCESS,
        FETCH_COIN_LIST_FAILURE,
        FETCH_COIN_LIST_REQUEST,
        FETCH_COIN_LIST_SUCCESS,
        FETCH_MARKET_CHART_FAILURE,
        FETCH_MARKET_CHART_REQUEST,
        FETCH_MARKET_CHART_SUCCESS,
        FETCH_TOP_50_COINS_FAILURE,
        FETCH_TOP_50_COINS_REQUEST,
        FETCH_TOP_50_COINS_SUCCESS,
        SEARCH_COIN_FAILURE,
        SEARCH_COIN_REQUEST,
        SEARCH_COIN_SUCCESS} from "./ActionType"

export const getCoinList = (page) => async (dispatch) => {

    dispatch({ type: FETCH_COIN_LIST_REQUEST })

    try {
        const {data} = await api.get(`/coins?page=${page}`)
        console.log("Coin list", data)

        dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const getTop50CoinList = () => async (dispatch) => {

    dispatch({ type: FETCH_TOP_50_COINS_REQUEST })

    try {
        const response = await api.get('/coins/top50')
        dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload: response.data })

        console.log("Top 50 Coins", response.data)

    } catch (error) {
        dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message })
        console.log(error);
    }
}

export const fetchMarketChart = ({coinId, days, jwt}) => async (dispatch) => {

    dispatch({ type: FETCH_MARKET_CHART_REQUEST })

    try {
        const response = await api.get(`/coins/${coinId}/chart?days=${days}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data })

    } catch (error) {
        console.log("error,", error)
        dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message })
    }
}

export const fetchCoinById = (coinId) => async (dispatch) => {

    dispatch({ type: FETCH_COIN_BY_ID_REQUEST })

    try {
        const response = await api.get(`/coins/${coinId}`);
        dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data })
        console.log("Coin by ID", response.data)

    } catch (error) {
        dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message })
        console.log("error,", error)
    }
}

export const fetchCoinDetails = ({coinId, jwt}) => async (dispatch) => {

    dispatch({ type: FETCH_COIN_DETAILS_REQUEST })

    try {
        const response = await api.get(`/coins/details/${coinId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data })
        console.log("Coin Details", response.data)

    } catch (error) {
        dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message })
        console.log("error,", error)
    } 
}

export const searchCoin = (keyword) => async (dispatch) => {

    dispatch({ type: SEARCH_COIN_REQUEST })

    try {
        const response = await api.get(`/coins/search?q=${keyword}`);
        dispatch({ type: SEARCH_COIN_SUCCESS, payload: response.data })
        console.log("Search Coin", response.data)

    } catch (error) {
        dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message })
        console.log("error,", error)
    }
}