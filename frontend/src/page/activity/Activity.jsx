import { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForUser } from '@/state/order/Action'
import calculateProfitLoss from '@/util/calculateProfitLoss'
import formatDateTime from '@/util/formatDateTime'

const Activity = () => {

  const dispatch = useDispatch();
  const {order} = useSelector(store => store);

  useEffect(() => {
    dispatch(getAllOrdersForUser({jwt: localStorage.getItem("jwt")}));
  }, [])

  return (
    <div className='px-5 py-2'>
      <h1 className='font-bold text-3xl pb-5'>Activity</h1>
      <Table className='border table-fixed w-full'>
        <TableHeader>
            <TableRow>
                <TableHead className='py-5'>Date & Time</TableHead>
                <TableHead>Trading Pair</TableHead>
                <TableHead>Buy Price</TableHead>
                <TableHead>Selling Price</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead className='text-right'>Profit/Loss</TableHead>
                <TableHead className="text-right">Value</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {order.orders.map((item) => {
              
            const {date, time} = formatDateTime(item.timestamp);
              
            return (
              <TableRow key={item.id}> 
                
                <TableCell>
                    <p>{date}</p>
                    <p className="text-sm text-gray-500">{time}</p>
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className='-z-50'>
                        <AvatarImage src={item.orderItem.coin.image} />
                    </Avatar>
                <span>{item.orderItem.coin.symbol.toUpperCase()}</span>
                </TableCell>
                <TableCell className="px-4 py-3">${item.orderItem.buyPrice}</TableCell>
                <TableCell className="px-4 py-3">${item.orderItem.sellPrice}</TableCell>
                <TableCell className="px-4 py-3">{item.orderType}</TableCell>
                <TableCell
                  className={`px-4 py-3 text-right ${calculateProfitLoss(item) < 0 ? "text-red-600" : "text-green-600"}`}>
                    ${calculateProfitLoss(item).toFixed(2)}
                </TableCell>
                <TableCell className="px-4 py-3 text-right">${(item.orderItem.buyPrice * item.orderItem.quantity).toFixed(2)}</TableCell>

              </TableRow>
            ) 
          })}    
        </TableBody>
    </Table>
    </div>
  )
}

export default Activity