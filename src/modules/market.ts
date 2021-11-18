

/* Action Types */

export const SET_MARKET = 'market/SET_MARKET';
export const SET_COIN = 'market/SET_COIN';

/* Action Creator */
export const setMarket = (market) => {
    return {
        payload: market,
        type: SET_MARKET
    }
}

export const setCoin = (coin) => {
    return {
        payload: coin,
        type: SET_COIN
    }
}

/* Set Initial State */

const initialState = {
    market: "USDT",
    coin: "ADA"
}

/* Reducer */
export default function market(state = initialState, action){
    switch(action.type){
        case SET_MARKET:
            return {
                ...state,
                market: action.payload
            }
        case SET_COIN:
            return {
                ...state,
                coin: action.payload
            }
        default:
            return state
    }
}




