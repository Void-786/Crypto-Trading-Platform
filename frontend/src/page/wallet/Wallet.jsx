import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import { CopyIcon, DollarSign, DownloadIcon, ShuffleIcon, UploadIcon, WalletIcon } from 'lucide-react'
import TopupForm from './TopupForm'
import WithdrawalForm from '../withdrawal/WithdrawalForm'
import TransferForm from './TransferForm'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { depositMoney, getUserWallet, getWalletTransaction } from '@/state/wallet/Action'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {

  const dispatch = useDispatch();
  const {wallet} = useSelector(store => store);
  const query = useQuery();
  const orderId = query.get('order_id');
  const {order_id} = useParams();
  const paymentId = query.get('payment_id');
  const razorPayPayementId = query.get('razorpay_payment_id');
  const navigate = useNavigate();

  useEffect(() => {
    if(orderId || order_id) {
      dispatch(depositMoney({jwt: localStorage.getItem('jwt'), orderId: orderId || order_id, paymentId: paymentId || razorPayPayementId, navigate}))
    }
    // console.log({orderId, paymentId, razorPayPayementId})
  }, [orderId, paymentId, razorPayPayementId])

  useEffect(() => {
    handleFetchUserWallet()
    handleFetchWalletTransaction()
  }, [])

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem('jwt')))
  }

  const handleFetchWalletTransaction = () => {
    dispatch(getWalletTransaction({jwt: localStorage.getItem('jwt')}))
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='pt-10 w-full lg:w-[60%]'>
        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-5'>
                <WalletIcon className="h-8 w-8"/>
                <div>
                  <CardTitle className='text-2xl'>My Wallet</CardTitle>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm'>
                      {wallet.userWallet?.id}
                    </p>
                    <CopyIcon size={14} className='cursor-pointer hover:text-slate-400'/>
                  </div>
                </div>
              </div>
              <div>
                <ReloadIcon onClick={handleFetchUserWallet} className='w-6 h-6 cursor-pointer hover:text-gray-500' />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex items-center'>
              <DollarSign/>
              <span className='text-2xl font-semibold'>{ wallet.userWallet.balance }</span>
            </div>
            
            <div className='flex gap-7 mt-5'>

              <Dialog>
                <DialogTrigger>
                  <div className='h-24 w-24 hover:scale-105 transition-all duration-200 hover:shadow-lg cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md'>
                    <UploadIcon />
                    <span className='text-sm mt-2'>Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className='text-center text-xl'>
                      Top up your wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopupForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className='h-24 w-24 hover:scale-105 transition-all duration-200 hover:shadow-lg cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md'>
                    <DownloadIcon />
                    <span className='text-sm mt-2'>Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className='text-center text-xl'>
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className='h-24 w-24 hover:scale-105 transition-all duration-200 hover:shadow-lg cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md'>
                    <ShuffleIcon />
                    <span className='text-sm mt-2'>Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className='text-center text-xl'>
                      Transfer to Other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>

            </div>
          </CardContent>
        </Card>

        <div className='py-5 pt-5'>
          <div className='flex gap-2 items-center pb-5'>
            <h1 className='text-2xl font-semibold'>Transaction History</h1>
            <UpdateIcon onClick={handleFetchWalletTransaction} className='p-0 h-7 w-7 cursor-pointer hover:text-gray-400'/>
          </div>

          <div className='space-y-5'>
            {wallet.transactions.map((item, i) => <div key={i}>
              <Card className='w-full flex justify-between items-center py-3'>
                <div className="flex justify-between items-center w-full">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-5 px-5">
                    <Avatar>
                      <AvatarFallback>
                        <ShuffleIcon />
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h1>{ item.purpose }</h1>
                      <p className="text-sm text-gray-500">{ item.date }</p>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div>
                    <p className={`px-5 ${item.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>{ item.amount } USD</p>
                  </div>
                </div>
              </Card>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet