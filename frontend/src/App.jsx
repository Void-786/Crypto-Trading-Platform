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
import shouldShowNavbar from './util/shouldShowNavbar.js'
import WithdrawalAdmin from './admin/WithdrawalAdmin.jsx'
import LoginWithGoogle from './page/auth/login/LoginWithGoogle.jsx'
import ResetPasswordForm from './page/auth/password/ResetPasswordForm.jsx'
import PasswordUpdateSuccess from './page/auth/password/PasswordUpdateSuccess.jsx'
import TwoFactorAuth from './page/auth/TwoFactorAuth.jsx'

const routes = [
  { path: "/", role: "ROLE_USER" },
  { path: "/portfolio", role: "ROLE_USER" },
  { path: "/activity", role: "ROLE_USER" },
  { path: "/wallet", role: "ROLE_USER" },
  { path: "/withdrawal", role: "ROLE_USER" },
  { path: "/payment-details", role: "ROLE_USER" },
  { path: "/wallet/success", role: "ROLE_USER" },
  { path: "/market/:id", role: "ROLE_USER" },
  { path: "/watchlist", role: "ROLE_USER" },
  { path: "/profile", role: "ROLE_USER" },
  { path: "/search", role: "ROLE_USER" },
  { path: "/admin/withdrawal", role: "ROLE_ADMIN" }
];

function App() {

  const {auth} = useSelector(store => store)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("jwt")))
  }, [auth.jwt])

  const showNavbar = !auth.user ? false : shouldShowNavbar(location.pathname, routes, auth.user?.role)

  return (
    <>
      {" "}
      {auth.user ? (
        <>
         {showNavbar && <Navbar />}
          <Routes>
            <Route element={<Home />} path="/" />
            
            <Route element={<Portfolio />} path="/portfolio" />
            <Route element={<Activity />} path="/activity" />
            <Route element={<Wallet />} path="/wallet" />
            <Route element={<Withdrawal />} path="/withdrawal" />
            <Route element={<PaymentDetails />} path="/payment-details" />
            <Route element={<Wallet />} path="/wallet/:order_id" />
            <Route element={<StockDetails />} path="/market/:id" />
            <Route element={<Watchlist />} path="/watchlist" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<SearchCoin />} path="/search" />
            {auth.user.role=="ROLE_ADMIN"&&<Route element={<WithdrawalAdmin />} path="/admin/withdrawal" />}
            <Route element={<NotFound />} path="*" />
            
          </Routes>
        </>
      ) : (
          <Routes>
            <Route element={<Auth />} path="/" />
            <Route element={<Auth />} path="/signup" />
            <Route element={<Auth />} path="/signin" />
            <Route element={<Auth />} path="/forgot-password" />
            <Route element={<LoginWithGoogle />} path="/login-with-google" />
            <Route element={<ResetPasswordForm />} path="/reset-password/:session" />
            <Route element={<PasswordUpdateSuccess />} path="/password-update-successfully" />
            <Route element={<TwoFactorAuth />} path="/two-factor-auth/:session" />
            <Route element={<NotFound />} path="*" />
          </Routes>
      )}
    </>
  );
}

export default App
