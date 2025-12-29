import React from 'react'
import { ActivityLogIcon, BookmarkIcon, DashboardIcon, ExitIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'
import { CreditCardIcon, LandmarkIcon, WalletIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '@/state/auth/Action'

const menu = [
    { name: "Home", path: "/", Icon: HomeIcon },
    { name: "Portfolio", path: "/portfolio", Icon: DashboardIcon },
    { name: "Watchlist", path: "/watchlist", Icon: BookmarkIcon },
    { name: "Activity", path: "/activity", Icon: ActivityLogIcon },
    { name: "Wallet", path: "/wallet", Icon: WalletIcon },
    { name: "Payment Details", path: "/payment-details", Icon: LandmarkIcon },
    { name: "Withdrawal", path: "/withdrawal", Icon: CreditCardIcon },
    { name: "Profile", path: "/profile", Icon: PersonIcon },
    { name: "Logout", path: "/", Icon: ExitIcon },
];

const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleMenuClick = (item) => {
    if (item.name == "Logout") {
      handleLogout();
      navigate(item.path);
    }
    else {
      navigate(item.path);
    }
  }

  return (
    <nav className="mt-6 space-y-1">
      {menu.map((item) => {
        const Icon = item.Icon;
        return (
          <SheetClose asChild key={item.name} className="w-full">
            <Button
            variant="ghost"
            className=" w-full justify-start gap-3 px-3 py-2.5 rounded-xl text-sm font-medium  text-slate-700  hover:bg-slate-100  hover:text-slate-900 transition-colors"
            onClick={() => handleMenuClick(item)}>
              <span
                className="
                  flex h-9 w-9 items-center justify-center rounded-lg  bg-slate-100  text-slate-600">
                <Icon className="h-4 w-4" />
              </span>
              <span>{item.name}</span>
            </Button>
          </SheetClose>
        );
      })}
    </nav>
  );
};

export default Sidebar;