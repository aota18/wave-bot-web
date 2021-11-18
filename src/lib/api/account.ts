import axios from 'axios';

const baseURL = 'http://localhost:4000'
const addr = '/accounts';

export const getAccountInfo = ({coin}) => axios.get(`${baseURL}${addr}?coin=${coin}`);