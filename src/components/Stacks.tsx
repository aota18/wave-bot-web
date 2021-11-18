import moment from 'moment'
import { useEffect } from 'react';
import { useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTrades } from '../modules/orders';

const Stack = () => {

  const coinReducer = useSelector((state: any) => state.market);
  const getAllTradesRes = useSelector((state:any) => state.orders.getAllTrades)
  const dispatch = useDispatch();
  const {register} = useForm();

  useEffect(() => {}, [getAllTradesRes])

  const handleDateChange = (e) => {
    const dateSplits = e.target.value.split('|');

    const getAllTradesInput = {
      symbol: `${coinReducer.coin}${coinReducer.market}`,
      startTime: dateSplits[0],
      endTime: dateSplits[1]
    }

    dispatch(getAllTrades(getAllTradesInput))
  }

  const dates = [
    {
      name: "1 hour",
      value: `${moment().utc().subtract(1, 'hours').unix()*1000}|${moment().utc().unix()*1000}`
    },
    {
      name: "3 hours",
      value: `${moment().utc().subtract(3, 'hours').unix()*1000}|${moment().utc().unix()*1000}`
    },
    {
      name: "6 hours",
      value: `${moment().utc().subtract(6, 'hours').unix()*1000}|${moment().utc().unix()*1000}`

    },
    {
      name: "12 Hours",
      value: `${moment().utc().subtract(12, 'hours').unix()*1000}|${moment().utc().unix()*1000}`
    },
    {
      name: "24 hours",
      value: `${moment().utc().subtract(24, 'hours').unix()*1000}|${moment().utc().unix()*1000}`
    },
]

const people = [
  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
  { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
  // More people...
]

    
    return (
        <div>
          <div className="flex flex-row">
            {/* {JSON.stringify(getAllTradesRes)} */}
            <select
              {...register("date", {
                onChange: handleDateChange
              })}
              id="date"
              name="date"
              className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300">
              {
                dates.map(date => 
                  <option key={date.name} value={date.value} selected={date.name==='3 hours' ? true : false}>
                    {date.name}
                  </option>
                )
              }
            </select>
          </div>
          {
            getAllTradesRes.loading ? (<div>Loading...</div>): (
              <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Time
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                       
                        </tr>
                      </thead>
                      <tbody>
                        {getAllTradesRes.data?.trades && getAllTradesRes.data.trades.map((trade, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{moment(trade.time).format('YYYY-MM-DD-HH:MM:SS')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.origQty}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${trade.status==='CANCELED' ? 'text-red-400' : 'text-green-400'}`}>{trade.status}</td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            )
          }
         
      </div>
    )
}

export default Stack