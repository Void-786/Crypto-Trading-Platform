import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";

import authReducer from "./auth/Reducer";
import coinReducer from "./coin/Reducer";
import walletReducer from "./wallet/Reducer";
import withdrawalReducer from "./withdrawal/Reducer";
import orderReducer from "./order/Reducer";
import assetReducer from "./asset/Reducer";
import watchlistReducer from "./watchlist/Reducer";
import chatBotReducer from "./chatBot/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    coin: coinReducer,
    wallet: walletReducer,
    withdrawal: withdrawalReducer,
    order: orderReducer,
    asset: assetReducer,
    watchlist: watchlistReducer,
    chatBot: chatBotReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))