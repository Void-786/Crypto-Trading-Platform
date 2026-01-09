import bankLogo from '@/assets/bank-logo.jpg';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { withdrawalRequest } from '@/state/withdrawal/Action';
import maskedAccountNumber from '@/util/maskedAccountNumber';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WithdrawalForm = () => {

    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();
    const {wallet, withdrawal} = useSelector(store => store);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    const handleSubmit = () => {
        const numericAmount = Number(amount);

        if (!numericAmount || numericAmount <= 0) {
            return;
        }

        dispatch(withdrawalRequest({amount: numericAmount, jwt: localStorage.getItem("jwt")}));
    };

    if (!withdrawal.paymentDetails) {
        return (
            <div className="h-[20rem] flex gap-5 flex-col justify-center items-center">
                <p className="text-2xl font-bold">Add payment method</p>
                <Button onClick={() => navigate("/payment-details")}>
                Add Payment Details
                </Button>
            </div>
        );
    }


    return (
        <div className='pt-10 space-y-5'>
            <div className='flex justify-between items-center rounded-md bg-slate-300 text-xl font-bold px-5 py-4'>
                <p>Available Balance</p>
                <p>${ wallet.userWallet?.balance }</p>
            </div>
            <div className='flex flex-col items-center'>
                <h1>Enter Withdrawal Amount</h1>
                <div className='flex items-center justify-center w-72 mt-3'>
                    <Input
                    onChange={handleChange}
                    value={amount}
                    className='withdrawalInput py-7 border-none outline-none focus:online-none px-0 text-2xl text-center'
                    placeholder='$9999'
                    type='number'
                    />
                </div>
            </div>
            <div>
                <p className='pb-2'>Transfer To</p>
                <div className='flex items-center gap-5 border px-5 py-2 rounded-md'>
                    <img className='h-8 w-8' src={bankLogo} alt='Bank Logo' />
                    <div>
                        <p className='text-xl font-bold'>{withdrawal.paymentDetails?.bankName}</p>
                        <p className='text-xs'>{maskedAccountNumber(withdrawal.paymentDetails?.accountNumber)}</p>
                    </div>
                </div>
            </div>
            <Button
                onClick={handleSubmit}
                className="w-full py-7 text-xl flex items-center justify-center gap-3"
                disabled={withdrawal.loading}
                >
                {withdrawal.loading && <Spinner className="h-5 w-5" />}
                {withdrawal.loading ? "Processing..." : "Withdraw"}
            </Button>
        </div>
    )
}

export default WithdrawalForm