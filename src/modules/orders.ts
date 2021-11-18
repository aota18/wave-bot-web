
import { createPromiseThunk, handleAsyncActions, reducerUtils} from '../lib/asyncUtils';


import * as OrdersAPI from '../lib/api/orders';


/* Action Types */

const GET_ALL_TRADES = 'order/GET_ALL_TRADES';
const GET_ALL_TRADES_SUCCESS = 'order/GET_ALL_TRADES_SUCCESS';
const GET_ALL_TRADES_ERROR = 'order/GET_ALL_TRADES_ERROR';




/* Action Creator */

export const getAllTrades = createPromiseThunk(GET_ALL_TRADES, OrdersAPI.getAllTrades);




/* Set initial State */ 

const initialState = {
    getAllTrades : reducerUtils.initial(),

};

export default function orders(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_TRADES:
        case GET_ALL_TRADES_SUCCESS:
        case GET_ALL_TRADES_ERROR:
            return handleAsyncActions(GET_ALL_TRADES, 'getAllTrades')(state, action);
       
        default:
            return state;
    }
}