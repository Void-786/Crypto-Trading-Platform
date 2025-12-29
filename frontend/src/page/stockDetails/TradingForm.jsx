import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input'
import { DotIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWallet } from '@/state/wallet/Action';
import { getAssetDetails, getUserAssets } from '@/state/asset/Action';
import { payOrder } from '@/state/order/Action';

const TradingForm = () => {

    const [orderType, setOrderType] = useState('BUY');
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("0");
    const {coin, wallet, asset} = useSelector(store => store);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getUserWallet(localStorage.getItem('jwt')));
        dispatch(getAssetDetails({coinId: coin.coinDetails?.id, jwt: localStorage.getItem('jwt')}))
    }, [])

    const handleBuyCrypto = () => {
        if(amount > 0 || quantity > 0) {
            dispatch(payOrder({jwt: localStorage.getItem('jwt'), amount, orderData: {
                coinId: coin.coinDetails?.id,
                quantity,
                orderType
            }}))
        }
    }

    const handleChange = (e) => {
        const value = e.target.value
        setAmount(value)
        
        const price = coin?.coinDetails.market_data.current_price.usd;
        if(!price || value === "" || isNaN(value)){
            setQuantity("0");
            return;
        }

        const volume = calculateBuyCost(Number(value), price);
        setQuantity(volume)
    }

    const calculateBuyCost = (amount, price) => {
        if (price <= 0 || amount <= 0) return "0";

        let volume = amount / price;

        let decimalPlaces;
        if (price >= 1000) decimalPlaces = 4;
        else if (price >= 1) decimalPlaces = 6;
        else decimalPlaces = 8;

        return volume.toFixed(decimalPlaces);
    };

    const change24h = coin.coinDetails?.market_data.market_cap_change_24h;

    return (
        <div className='space-y-10 p-5'>
            <div>
                <div className='flex gap-4 items-center justify-between'>
                    <Input className='py-7 focus:outline-none' placeholder='Enter Amount' onChange={handleChange} type='number' name='amount'/>
                    <div>
                        <p className='border text-2xl flex justify-center items-center w-36 h-14 rounded-md'>{quantity}</p>
                    </div>
                </div>
                {false && <h1 className='text-red-600 text-center pt-4'>Insufficient Wallet Balance to Buy</h1>}
            </div>

            <div className='flex gap-5 items-center'>
                <div>
                    <Avatar>
                        <AvatarImage src={coin.coinDetails?.image.large} alt='Avatar' />
                    </Avatar>
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
                        <DotIcon className='text-gray-400'></DotIcon>
                        <p className='text-gray-400'>{coin.coinDetails?.name}</p>
                    </div>
                    <div className='flex items-end gap-2'>
                        <p className='text-xl font-bold'>${coin?.coinDetails.market_data.current_price.usd}</p>
                        <p className={change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                            <span>{change24h} </span>
                            <span>
                            ({coin.coinDetails?.market_data?.market_cap_change_percentage_24h} %)
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <p>Order Type</p>
                <p>Market Order</p>
            </div>

            <div className='flex items-center justify-between'>
                <p>{orderType == "BUY" ? "Available Balance" : "Available Quantity"}</p>
                <p>{orderType == "BUY" ? `$${wallet.userWallet?.balance}` : asset.assetDetails?.quantity || 0}</p>
            </div>

            <div>
                <Button onClick={handleBuyCrypto}
                    className={`w-full py-6 ${orderType == "SELL" ? "bg-red-600 text-white" : ""}`}>
                    {orderType}
                </Button>
                <Button variant='link' className='w-full mt-5 text-xl' onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}>
                    {orderType == "BUY" ? "Or Sell" : "Or Buy"}
                </Button>
            </div>

        </div>
    )
}

export default TradingForm