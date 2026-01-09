import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { addItemToWatchlist, getUserWatchlist } from '@/state/watchlist/Action'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Watchlist = () => {
  
  const dispatch = useDispatch();
  const { watchlist } = useSelector(store => store);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem('jwt')));
  }, [page])

  const handleRemoveFromWatchlist = (value) => {
      dispatch(addItemToWatchlist({coinId: value, jwt: localStorage.getItem('jwt')}));
  }
  
  return (
      <div className='px-5 py-2'>
      <h1 className='font-bold text-3xl pb-5'>Watchlist</h1>
      <Table className='border'>
        <TableHeader>
            <TableRow>
                <TableHead className='py-5'>Coin</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>24h</TableHead>
                <TableHead className='text-right'>Price</TableHead>
                <TableHead className="text-right text-red-600">Remove</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {(Array.isArray(watchlist.items) ?watchlist.items : []).map((item) => 
            <TableRow onClick={() => navigate(`/market/${item.id}`)} key={item.id}>
              <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className='-z-50'>
                      <AvatarImage src={item.image} />
                  </Avatar>
              <span>{item.name}</span>
              </TableCell>
              <TableCell>{item.symbol.toUpperCase()}</TableCell>
              <TableCell>{item.total_volume}</TableCell>
              <TableCell>{item.market_cap}</TableCell>
              <TableCell
                className={`${
                  item.market_cap_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {item.market_cap_change_percentage_24h}%
              </TableCell>
              <TableCell className="text-right">${item.current_price}</TableCell>

              <TableCell className="text-right">
                <Button
                  variant='outline' size = 'icon' className='h-10 w-10 cursor-pointer'
                  onClick={(e) => {e.stopPropagation(); handleRemoveFromWatchlist(item.id)}}
                >
                  <BookmarkFilledIcon className='w-6 h-6' />
                </Button>
              </TableCell>

            </TableRow>)}
        </TableBody>
    </Table>
    </div>
  )
}

export default Watchlist