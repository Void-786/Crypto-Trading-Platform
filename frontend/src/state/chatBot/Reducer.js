import * as type from './ActionType';

const initialState = {
    message: null,
    messages: [],
    loading: false,
    error: null
};

const chatBotReducer = (state = initialState, action) => {

    switch(action.type) {

        case type.CHAT_BOT_REQUEST:
            return { ...state, messages: [...state.messages, action.payload], loading: true, error: null };

        case type.CHAT_BOT_SUCCESS:
            return { ...state, messages: [...state.messages, action.payload], loading: false, error: null };

        case type.CHAT_BOT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default chatBotReducer;