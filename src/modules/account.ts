
import { createPromiseThunk, handleAsyncActions, reducerUtils} from '../lib/asyncUtils';


import * as AccountAPI from '../lib/api/account';


/* Action Types */

const GET_ACCOUNT_INFO = 'order/GET_ACCOUNT_INFO';
const GET_ACCOUNT_INFO_SUCCESS = 'order/GET_ACCOUNT_INFO_SUCCESS';
const GET_ACCOUNT_INFO_ERROR = 'order/GET_ACCOUNT_INFO_ERROR';




/* Action Creator */

export const getAccountInfo = createPromiseThunk(GET_ACCOUNT_INFO, AccountAPI.getAccountInfo);




/* Set initial State */ 

const initialState = {
    getAccountInfo : reducerUtils.initial(),

};

export default function orders(state = initialState, action) {
    switch(action.type) {
        case GET_ACCOUNT_INFO:
        case GET_ACCOUNT_INFO_SUCCESS:
        case GET_ACCOUNT_INFO_ERROR:
            return handleAsyncActions(GET_ACCOUNT_INFO, 'getAccountInfo')(state, action);
       
        default:
            return state;
    }
}