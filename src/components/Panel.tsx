import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountInfo } from '../modules/account';
import { setCoin } from '../modules/market';
import { getAllTrades } from '../modules/orders';
import moment from 'moment'

const Panel = () => {
    const dispatch = useDispatch();
    const getAccountInfoRes = useSelector((state:any) => state.account.getAccountInfo);
    const coinReducer = useSelector((state: any) => state.market);
    const {register} = useForm();

    useEffect(() => {
        dispatch(getAccountInfo({coin: "USDT"}))
    }, [])

    const handleCoinChange = (e) => {
        dispatch(setCoin(e.target.value))

        const getAllTradesInput = {
            symbol: `${e.target.value}${coinReducer.market}`,
            startTime: moment().utc().subtract(3, 'hours').unix()*1000,
            endTime: moment().utc().unix()*1000
          }
        dispatch(getAllTrades(getAllTradesInput))
    }

    const coins = [
        {name: "ADA"},
        {name: "USDT"},
        {name: "GLM"},
        {name: "BNB"},
        {name: "FTT"}
    ]

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Binance Account</dt>
            <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">Connected</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Socket Connection</dt>
            <dd className="mt-1 text-sm text-green-500 sm:mt-0 sm:col-span-2">Good</dd>
          </div>
        <form className="space-y-8 divide-y divide-gray-200 px-4 py-4">
       
            <fieldset className="mt-6 bg-white">
           
                <legend className="block text-sm font-medium text-gray-700">Coin</legend>
                    <div className="mt-1 rounded-md shadow-sm -space-y-px">
                        <div>
                            <select
                                {...register("coin", {
                                    onChange:handleCoinChange
                                })}
                                id="coin"
                                name="coin"
                                className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                            >
                                {coins.map(coin => (
                                    <option key={coin.name} id={coin.name} value={coin.name}>{coin.name}</option>
                                ))}
                            </select>
                        </div>
                        
                    </div>
                
                {/* =======BALANCES====== */}
                <div className=" my-4 rounded-md  -space-y-px">
                <legend className="block text-sm font-medium text-gray-700"> USDT Balances </legend>
                    <div className="flex flex-col items-end text-xl text-blue-500">
                        {getAccountInfoRes.loading ?  (<div>Loading...</div>) : (`${parseFloat(getAccountInfoRes.data?.user.balances[0].free).toFixed(4)} $`) }
                    </div>
                </div>
                {/* =======PRICES====== */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        aria-describedby="price-currency"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                        USD
                    </span>
                    </div>
                </div>
                </div>
                   {/* =======BUTTONS====== */}
                <div className="flex flex-row justify-evenly my-2">
                    <button
                    type="submit"
                    className="w-full flex justify-center py-2 mr-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                    Stop
                    </button>
                    <button
                    type="submit"
                    className="w-full flex justify-center py-2 ml-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                    Start
                    </button>
              </div>
            </fieldset>
  
        </form>
        </div>
      )
}

export default Panel;