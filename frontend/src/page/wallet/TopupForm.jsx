import {useState} from 'react'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import razorPayLogo from '@/assets/Razorpay-Logo.jpg'
import stripeLogo from '@/assets/stripe-logo.png'
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { paymentHandler } from '@/state/wallet/Action';


const TopupForm = () => {

    const [amount, setAmount] = useState();
    const [paymentMethod, setPaymentMethod] = useState('RAZORPAY');
    const dispatch = useDispatch();

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    }

    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    const handleSubmit = () => {
        console.log('Amount:', amount);
        console.log('Payment Method:', paymentMethod);
        dispatch(paymentHandler({jwt: localStorage.getItem('jwt'), paymentMethod, amount}));
    }

  return (
    <div className='pt-10 space-y-5'>
        <div>
            <h1 className='pb-1'>Enter Amount</h1>
            <Input onChange={handleChange} value={amount} className='py-7 text-lg' placeholder='$9999' />
        </div>

        <div>
            <h1 className='pb-1'>Select Payment Method</h1>
            <RadioGroup onValueChange={(value) => handlePaymentMethodChange(value)} className='flex' defaultValue='RAZORPAY'>

                <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
                    <RadioGroupItem icon={DotFilledIcon} className='h-9 w-9' value='RAZORPAY' id='r1'/>
                    <Label htmlFor='r1'>
                        <div className='bg-white rounded-md  w-32'>
                            <img src={razorPayLogo} alt='Razorpay' className='w-32 h-auto'/>
                        </div>
                    </Label>
                </div>

                <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
                    <RadioGroupItem icon={DotFilledIcon} className='h-9 w-9' value='STRIPE' id='r2'/>
                    <Label htmlFor='r2'>
                        <div className='bg-white rounded-md  w-32'>
                            <img src={stripeLogo} alt='Stripe' className='w-32 h-auto'/>
                        </div>
                    </Label>
                </div>
                
            </RadioGroup>
        </div>

        <Button onClick={handleSubmit} className='w-full py-7 '>Submit</Button>
    </div>
  )
}

export default TopupForm