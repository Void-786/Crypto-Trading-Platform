import { useEffect } from 'react'
import Navbar from './page/navbar/Navbar.jsx'
import Home from './page/home/Home'
import { Routes, Route } from 'react-router-dom'
import Portfolio from './page/portfolio/Portfolio.jsx'
import Activity from './page/activity/Activity.jsx'
import Wallet from './page/wallet/Wallet.jsx'
import Withdrawal from './page/withdrawal/Withdrawal.jsx'
import PaymentDetails from './page/paymentDetails/PaymentDetails.jsx'
import StockDetails from './page/stockDetails/StockDetails.jsx'
import Watchlist from './page/watchlist/Watchlist.jsx'
import Profile from './page/profile/Profile.jsx'
import SearchCoin from './page/search/SearchCoin.jsx'
import NotFound from './page/notfound/NotFound.jsx'
import Auth from './page/auth/Auth.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from './state/auth/Action.js'

function App() {

  const {auth} = useSelector(store => store)
  const dispatch = useDispatch();

  console.log("auth ---", auth);

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("jwt")))
  }, [auth.jwt])

  return (
    <>
    {auth.user ? <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/watchlist' element={<Watchlist />} />
        <Route path='/activity' element={<Activity/>} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/payment-details' element={<PaymentDetails />} />
        <Route path='/withdrawal' element={<Withdrawal />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/market/:id' element={<StockDetails />} />
        <Route path='/search' element={<SearchCoin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div> : <Auth />}
    </>
  )
}

export default App
