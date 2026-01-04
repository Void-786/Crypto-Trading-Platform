import api from '@/api/api';
import * as types from './ActionType';

export const getUserWatchlist = (jwt) => async (dispatch) => {

    dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });

    try {
        const response = await api.get('/api/watchlist/user', {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        dispatch({type: types.GET_USER_WATCHLIST_SUCCESS, payload: response.data });
        console.log('Watchlist fetched successfully:', response.data);

    } catch (error) {
        dispatch({ type: types.GET_USER_WATCHLIST_FAILURE, payload: error.message });
        console.log('Error fetching watchlist:', error);
    }
};

export const addItemToWatchlist = ({coinId, jwt}) => async (dispatch) => {

    dispatch({ type: types.ADD_COIN_TO_WATCHLIST_REQUEST });

    try {
        const response = await api.patch(`/api/watchlist/add/coin/${coinId}`, {}, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        dispatch({ type: types.ADD_COIN_TO_WATCHLIST_SUCCESS, payload: response.data });
        console.log('Coin added to watchlist successfully:', response.data);

    } catch (error) {
        dispatch({ type: types.ADD_COIN_TO_WATCHLIST_FAILURE, payload: error.message });
        console.log('Error adding coin to watchlist:', error);
    }
}