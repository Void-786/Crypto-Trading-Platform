import api from '@/api/api';
import * as types from './ActionType';

export const withdrawalRequest = ({amount, jwt}) => async (dispatch) => {

    dispatch({ type: types.WITHDRAWAL_REQUEST });

    try {
        const response = await api.post(`/api/withdrawal/${amount}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("withdrawal", response.data);
        dispatch({ type: types.WITHDRAWAL_SUCCESS, payload: response.data });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.WITHDRAWAL_FAILURE, error: error.message } );
    }
}

export const proceedWithdrawal = ({ id, jwt, accept }) => async (dispatch) => {

    dispatch({ type: types.WITHDRAWAL_PROCEED_REQUEST });

    try {
        const response = await api.patch(`/api/admin/withdrawal/${id}/proceed/${accept}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("proceed Withdrawal", response.data);
        dispatch({ type: types.WITHDRAWAL_PROCEED_SUCCESS, payload: response.data });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.WITHDRAWAL_PROCEED_FAILURE, error: error.message } );
    }
}

export const getWithdrawalHistory = ({ jwt }) => async (dispatch) => {

    dispatch({ type: types.GET_WITHDRAWAL_HISTORY_REQUEST });

    try {
        const response = await api.get(`/api/withdrawal`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("get Withdrawal History", response.data);
        dispatch({ type: types.GET_WITHDRAWAL_HISTORY_SUCCESS, payload: response.data });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_WITHDRAWAL_HISTORY_FAILURE, error: error.message } );
    }
}

export const getAllWithdrawalRequest = ({ jwt }) => async (dispatch) => {

    dispatch({ type: types.GET_WITHDRAWAL_REQUEST_REQUEST });

    try {
        const response = await api.get(`/api/admin/withdrawal`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("get All Withdrawal History", response.data);
        dispatch({ type: types.GET_WITHDRAWAL_REQUEST_SUCCESS, payload: response.data });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_WITHDRAWAL_REQUEST_FAILURE, error: error.message } );
    }
}

export const addPaymentDetails = ({ paymentDetails, jwt }) => async (dispatch) => {

    dispatch({ type: types.ADD_PAYMENT_DETAILS_REQUEST });

    try {
        const response = await api.post(`/api/payment-details`, paymentDetails, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("add Payment Details", response.data);
        dispatch({ type: types.ADD_PAYMENT_DETAILS_SUCCESS, payload: response.data });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.ADD_PAYMENT_DETAILS_FAILURE, error: error.message } );
    }
}

export const getPaymentDetails = ({ jwt }) => async (dispatch) => {

    dispatch({ type: types.GET_PAYMENT_DETAILS_REQUEST });

    try {
        const response = await api.get(`/api/payment-details`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("get Payment Details", response.data);
        dispatch({ type: types.GET_PAYMENT_DETAILS_SUCCESS, payload: response.data });

    } catch (error) {
        console.log(error);
        dispatch({ type: types.GET_PAYMENT_DETAILS_FAILURE, error: error.message } );
    }
}