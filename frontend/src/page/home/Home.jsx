import { Button } from '@/components/ui/button'
import {useEffect, useState} from 'react'
import AssetTable from './AssetTable';
import StockChart from './StockChart';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import crypto from '@/assets/crypto.jpg';
import { Cross1Icon, DotIcon } from '@radix-ui/react-icons';
import { MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinList, getTop50CoinList } from '@/state/coin/Action';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const Home = () => {
    
    const [category, setCategory] = useState('all');
    const [inputValue, setInputValue] = useState('');
    const [isBotRelease, setIsBotRelease] = useState(false);
    const {coin} = useSelector(store => store);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoinList(1))
    }, [])

    useEffect(() => {
        dispatch(getTop50CoinList())
    }, [category])
    
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('User Input:', inputValue);
        }
        setInputValue('');
    }

    const handleBotRelease = () => {
        setIsBotRelease(!isBotRelease);
    }

    return (
    <div className='relative'>
        <div className='lg:flex'>
            <div className='lg:w-[50%] lg:border'>
                <div className='p-3 flex items-center gap-4'>
                    <Button
                    onClick={() => handleCategoryChange('all')}
                    variant={category == 'all' ? 'default' : 'outline'}
                    className='rounded-full'
                    >
                    All
                    </Button>
                    <Button
                    onClick={() => handleCategoryChange('top50')}
                    variant={category == 'top50' ? 'default' : 'outline'}
                    className='rounded-full'
                    >
                    Top 50
                    </Button>
                    <Button
                    onClick={() => handleCategoryChange('topGainers')}
                    variant={category == 'topGainers' ? 'default' : 'outline'}
                    className='rounded-full'
                    >
                    Top Gainers
                    </Button>
                    <Button
                    onClick={() => handleCategoryChange('topLosers')}
                    variant={category == 'topLosers' ? 'default' : 'outline'}
                    className='rounded-full'
                    >
                    Top Losers
                    </Button>
                </div>
                <AssetTable coin={ category == 'all' ? coin.coinList : coin.top50 } category={category} />
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                            <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <div className='hidden lg:block lg:w-[50%] p-5'>
                <StockChart  coinId={"bitcoin"}/>
                <div className='flex gap-5 items-center'>
                    <div>
                        <Avatar>
                            <AvatarImage src = {crypto} />
                        </Avatar>
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <p>ETH</p>
                            <DotIcon className='text-gray-400' />
                            <p className='text-gray-400'>Ethereum</p>
                        </div>
                        <div className='flex items-end gap-2'>
                            <p className='text-xl font-bold'>$1,245.23</p>
                            <p className='text-red-600'>
                                <span>-13190492822.578</span>
                                <span>(-0.29803%)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className='absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2'>
            {isBotRelease && <div className='rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-neutral-500'>
                <div className='flex justify-between items-center border-b px-6 h-[12%]'>
                    <p>Chat Bot</p>
                    <Button
                        onClick={handleBotRelease}
                        variant='ghost' size='icon'>
                        <Cross1Icon />
                    </Button>
                </div>

                <div className='h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container'>
                    <div className='self-start pb-5 w-auto'>
                        <div className='justify-end self-end px-5 py-2 rounded-md bg-amber-50 w-auto'>
                            <p>Hi, Faiz Ullah Khan</p>
                            <p>You can ask crypto related any question</p>
                            <p>like, price, market cap extra....</p>
                        </div>
                    </div>

                    {
                        [1,1,1,1].map((item, i) => (
                        <div key = {i} className={`${i%2 == 0 ? 'self-start' : 'self-end'} pb-5 w-auto`}>
                            {i%2 == 0 ? <div className='justify-end self-end px-5 py-2 rounded-md bg-amber-50 w-auto'>
                                <p>Prompt: Who are you ?</p>
                            </div>
                            :
                            <div className='justify-end self-end px-5 py-2 rounded-md bg-amber-50 w-auto'>
                                <p>Hi, Faiz Ullah Khan</p>
                            </div>}
                        </div>
                        ))
                    }
                </div>
                <div className='h-[12%] border-t'>
                    <Input
                        className='w-full h-full border-none outline-none'
                        placeholder='Write your prompt...'
                        onChange = {handleChange}
                        value = {inputValue}
                        onKeyPress = {handleKeyPress}
                    />
                </div>
            </div>}
            <div className='relative w-[10rem] cursor-pointer group'>
                <Button
                    onClick={handleBotRelease}
                    className='w-full h-[3rem] gap-2 items-center'>
                    <MessageCircle size = {30} className='fill-[#ffffff] -rotate-90 stroke-none group-hover:fill-[#ffffff]'/>
                    <span className='text-2xl'>Chat Bot</span>
                </Button>
            </div>
        </section>
    </div>
  )
}

export default Home