import api from '@/api/api';
import * as types from './ActionType';

export const payOrder = ({jwt, amount, orderData}) => async (dispatch) => {

    dispatch({type: types.PAY_ORDER_REQUEST})

    try {
        const response = await api.post("/api/order/pay", orderData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({type: types.PAY_ORDER_SUCCESS, payload: response.data, amount});
        console.log("PAY ORDER SUCCESS", response.data);

    } catch (error) {
        console.log("PAY ORDER ERROR", error);
        dispatch({type: types.PAY_ORDER_FAILURE, error: error.message});
    }
}

export const getOrderById = (jwt, orderId) => async (dispatch) => {

    dispatch({type: types.GET_ORDER_REQUEST})

    try {
        const response = await api.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({type: types.GET_ORDER_SUCCESS, payload: response.data});

    } catch (error) {
        dispatch({type: types.GET_ORDER_FAILURE, error: error.message});
    }
}

export const getAllOrdersForUser = ({jwt, orderType, assetSymbol}) => async (dispatch) => {

    dispatch({type: types.GET_ALL_ORDERS_REQUEST})

    try {
        const response = await api.get('/api/order', {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            params: {
                order_type: orderType,
                asset_symbol: assetSymbol
            }
        })

        dispatch({type: types.GET_ALL_ORDERS_SUCCESS, payload: response.data});
        console.log("GET ALL ORDERS SUCCESS", response.data);

    } catch (error) {
        console.log("GET ALL ORDERS ERROR", error);
        dispatch({type: types.GET_ALL_ORDERS_FAILURE, error: error.message});
    }
}