import { combineReducers} from 'redux';

import account from './account';
import toasts from './toasts';
import market from './market';
import orders from './orders';

export default combineReducers({
    account,
    toasts,
    market,
    orders,
})
