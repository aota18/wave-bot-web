import axios from 'axios';

const baseURL = 'http://localhost:4000'
const addr = '/orders';

export const getAllTrades = ({symbol, startTime, endTime}) => axios.get(`${baseURL}${addr}/myTrades?symbol=${symbol}&startTime=${startTime}&endTime=${endTime}`)