import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendVerificationOtp } from '@/state/auth/Action'

const AccountVerificationForm = ({handleSubmit}) => {

    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store)

    const handleSendOtp = (verificationType) => {
        dispatch(sendVerificationOtp({jwt: localStorage.getItem('jwt'), verificationType}))
    }

    return (
        <div className='flex justify-center'>
            <div className='space-y-5 mt-5 w-full'>
                <div className='flex justify-between items-center'>

                    <p>Email :</p>
                    <p>{ auth.user?.email }</p>
                    
                    <Dialog>
                        <DialogTrigger>
                            <Button onClick = {() => handleSendOtp("EMAIL")} >Send OTP</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter OTP</DialogTitle>
                            </DialogHeader>
                            <div className='py-5 flex gap-10 justify-center items-center'>
                                <InputOTP value = {value} onChange={(value) => setValue(value)} maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <DialogClose>
                                    <Button disabled = {value.length !== 6} onClick={() => handleSubmit(value)} className='w-[10rem]'>Submit</Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default AccountVerificationForm