import createToast from "./factories/createToast"


export const ToastColor = {
    OK : '#33cc00',
    ERROR: '#ff4000',
    NOTICE: 'ffff00'
}

/* Action Types */
export const ADD_TOAST = 'toasts/ADD_TOAST'
export const REMOVE_TOAST = 'toasts/REMOVE_TOAST'

/* Action Creators */
export const addToast = (options:any = {}) => {
    return {
        payload: {
            type: options.type,
            title: options.title,
            text: options.text,
            color: ToastColor[options.type]
        },
        type: ADD_TOAST
    }
}
export const removeToast = () => {
    return {
        type: REMOVE_TOAST
    }
}

/* Set Initial State */
const initialState:any = {
    color: '#000000',
    isShow: false,
    title: "",
    text: ""
}

export default function toasts(state = initialState, action){
    switch(action.type){
        case ADD_TOAST:
            return {
                color: action.payload.color,
                title: action.payload.title,
                text: action.payload.text,
                isShow: true
            }
        case REMOVE_TOAST:
            return {
                ...state,
                isShow: false
            };
        default:
            return state;
    }
}