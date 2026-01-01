import api from '@/config/api';
import * as types from './ActionType';

export const sendMessage = ({prompt, jwt}) => async (dispatch) => {

    dispatch({type: types.CHAT_BOT_REQUEST, payload: {prompt, role: 'user'}});

    try {
        const {data} = await api.post("/ai/chat", {prompt}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({type: types.CHAT_BOT_SUCCESS, payload: {message: data.message, role: 'model'}});
        console.log("AI Response:", data.message);

    } catch (error) {
        dispatch({type: types.CHAT_BOT_FAILURE, payload: error.message});
        console.log("Error fetching AI response:", error);
    }
}