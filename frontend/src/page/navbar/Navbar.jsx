import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import crypto from '../../assets/crypto.jpg'
import Sidebar from '../sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate();
    const {auth} = useSelector(store => store)

    const handleProfileClick = () => {
        if(auth.user) {
            auth.user.role === 'ROLE_ADMIN' ? navigate('/admin/withdrawal') : navigate('/profile')
        }
    }

    return (
        <div className='px-2 py-3 border-b z-50 bg-backround bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <Sheet>
                    <SheetTrigger>
                        <Button variant='ghost' size='icon' className='rounded-full h-11 w-11'>
                            <DragHandleHorizontalIcon className='h-7 w-7'/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className='w-72 border-r-0 flex-col justify-center'>
                        <SheetHeader>
                            <SheetTitle className='text-3xl flex justify-center items-corner gap-1'>
                                <Avatar>
                                    <AvatarImage src = {crypto} />
                                </Avatar>
                                <div>
                                    <span className='font-bold text-orange-700'>Crypto-</span>
                                    <span>Trading</span>
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
                <p onClick = {() => navigate('/')} className='text-sm lg:text-base cursor-pointer'>
                    Crypto-Trading
                </p>
                <div className='p-0 ml-9'>
                    <Button onClick = {() => navigate('/search')} variant='outline' className='flex items-center gap-3'>
                        {" "}
                        <MagnifyingGlassIcon />
                        <span>Search</span>
                    </Button>
                </div>
            </div>
            <div>
                <Avatar onClick={handleProfileClick} className='cursor-pointer'>
                    {!auth.user ? (
                        <AvatarIcon className=" h-8 w-8" />
                        ) : (
                        <AvatarFallback>{auth.user?.fullName[0].toUpperCase()}</AvatarFallback>
                    )}     
                </Avatar>
            </div>
        </div>
    )
}

export default Navbar