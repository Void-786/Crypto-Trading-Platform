import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { fetchCoinDetails } from '@/state/coin/Action'
import { addItemToWatchlist, getUserWatchlist } from '@/state/watchlist/Action'
import ExistInWatchlist from '@/util/ExistInWatchlist'
import { BookmarkFilledIcon, BookmarkIcon, DotIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StockChart from '../home/StockChart'
import TradingForm from './TradingForm'
import { Spinner } from '@/components/ui/spinner'

const StockDetails = () => {

  const { coin, watchlist, auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchCoinDetails({ coinId: id, jwt: localStorage.getItem('jwt') }));
    dispatch(getUserWatchlist(localStorage.getItem('jwt')));
  }, [id])

  const handleAddToWatchlist = () => {
    dispatch(addItemToWatchlist({coinId: coin.coinDetails.id, jwt: localStorage.getItem('jwt')}));
  }

  const change24h = coin.coinDetails?.market_data.market_cap_change_24h;

  if(coin.loading) {
    return (
      <div className="flex justify-center items-center h-[483px]">
        <Button disabled className="flex gap-2">
          <Spinner />
          <span>Loading chart...</span>
        </Button>
      </div>
    )
  }

  return (
    <div className='p-5'>
      <div className='flex justify-between'>
        <div className='flex gap-5 items-center'>

          <div>
            <Avatar>
              <AvatarImage src={coin.coinDetails?.image.large} alt='Avatar' />
            </Avatar>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='uppercase'>{coin.coinDetails?.symbol}</p>
              <DotIcon className='text-gray-400'></DotIcon>
              <p className='text-gray-400'>{coin.coinDetails?.name}</p>
            </div>
            <div className='flex items-end gap-2'>
              <p className='text-xl font-bold'>${coin.coinDetails?.market_data.current_price.usd}</p>
              <p className={change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                <span>{change24h} </span>
                <span>
                  ({coin.coinDetails?.market_data?.market_cap_change_percentage_24h} %)
                </span>
              </p>
            </div>
          </div>

        </div>
        <div className='flex items-center gap-5'>
          <Button onClick={handleAddToWatchlist}>
            {ExistInWatchlist(watchlist?.items, coin?.coinDetails)
              ? <BookmarkFilledIcon className='h-6 w-6'/>
            :
            <BookmarkIcon className='h-6 w-6'/>}
          </Button>

          <Dialog>
            <DialogTrigger>
              <Button size='lg'>Trade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How much do you want to spend?</DialogTitle>
              </DialogHeader>
              <TradingForm/>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className='mt-10'>
        <StockChart coinId={id}/>
      </div>

    </div>
  )
}

export default StockDetails