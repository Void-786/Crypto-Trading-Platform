import existInWatchlist from '@/util/ExistInWatchlist';
import * as types from './ActionType';

const initialState = {
    watchlist: [],
    items: [],
    loading: false,
    error: null
}

const watchlistReducer = (state = initialState, action) => {

    switch(action.type) {

        case types.GET_USER_WATCHLIST_REQUEST:
        case types.ADD_COIN_TO_WATCHLIST_REQUEST:
            return { ...state, loading: true, error: null };

        case types.GET_USER_WATCHLIST_SUCCESS:
            return { ...state, watchlist: action.payload, items: action.payload.coins, loading: false };

        case types.ADD_COIN_TO_WATCHLIST_SUCCESS:

            const items = Array.isArray(state.items) ? state.items : [];

            let updatedItems = existInWatchlist(items, action.payload)
                ? items.filter(item => item.id !== action.payload.id)
                : [...items, action.payload];

            return { ...state, items: updatedItems, loading: false, error: null };

        case types.GET_USER_WATCHLIST_FAILURE:
        case types.ADD_COIN_TO_WATCHLIST_FAILURE:
            return { ...state, loading: false, error: action.error };

        default:
            return state;
    }
}

export default watchlistReducer;