import { Button } from '@/components/ui/button'
import {useEffect, useRef, useState} from 'react'
import AssetTable from './AssetTable';
import StockChart from './StockChart';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeftIcon, ChevronRightIcon, Cross1Icon, DotIcon } from '@radix-ui/react-icons';
import { MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinDetails, getCoinList, getTop50CoinList } from '@/state/coin/Action';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { sendMessage } from '@/state/chatBot/Action';
import SpinnerBackdrop from '@/components/custom/SpinnerBackdrop';
import { Spinner } from '@/components/ui/spinner';

const Home = () => {
    
    const [category, setCategory] = useState('all');
    const [inputValue, setInputValue] = useState('');
    const [isBotRelease, setIsBotRelease] = useState(false);
    const {coin, chatBot, auth} = useSelector(store => store);
    const[page, setPage] = useState(1);
    const dispatch = useDispatch();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        dispatch(getCoinList(page))
    }, [page])

    useEffect(() => {
        dispatch(fetchCoinDetails({ coinId: "bitcoin",jwt: localStorage.getItem("jwt")}))
    }, []);

    useEffect(() => {
        dispatch(getTop50CoinList())
    }, [category])

    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: "auto" });
    }, [chatBot.messages.length]);

    const handlePageChange = (page) => {
        setPage(page)
    } 
    
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('User Input:', inputValue);
            dispatch(sendMessage({prompt: inputValue, jwt: localStorage.getItem("jwt")}));
            setInputValue('');
        }
    }

    const handleBotRelease = () => {
        setIsBotRelease(!isBotRelease);
    }

    if (coin.loading) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <Button disabled size="sm" className="flex items-center gap-2">
                    <Spinner />
                    Loading...
                </Button>
            </div>
        );
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
                {category == 'all' && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button className='cursor-pointer' disabled = {page == 1} onClick = {() => handlePageChange(page - 1)}>
                                    <ChevronLeftIcon />
                                    Previous
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink className='cursor-pointer' onClick = {() => handlePageChange(1)} isActive={page == 1}>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink className='cursor-pointer' onClick = {() => handlePageChange(2)} isActive={page == 2}>2</PaginationLink>
                            </PaginationItem>
                            {page > 3 && ( 
                                <PaginationItem>
                                    <PaginationLink className='cursor-pointer' onClick = {() => handlePageChange(3)} isActive>{page}</PaginationLink>
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <Button className='cursor-pointer' onClick = {() => handlePageChange(page + 1)}>
                                    <ChevronRightIcon />
                                    Next
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>    
                )}
            </div>
            <div className='hidden lg:block lg:w-[50%] p-5'>
                <StockChart  coinId={"bitcoin"}/>
                <div className='flex gap-5 items-center'>
                    <div>
                        <Avatar>
                            <AvatarImage src = {coin.coinDetails?.image.large} />
                        </Avatar>
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
                            <DotIcon className='text-gray-400' />
                            <p className='text-gray-400'>{coin.coinDetails?.name}</p>
                        </div>
                        <div className='flex items-end gap-2'>
                            <p className='text-xl font-bold'>${coin.coinDetails?.market_data.current_price.usd}</p>
                            <p
                                className={`${
                                coin.coinDetails?.market_data.market_cap_change_24h < 0
                                ? "text-red-600" : "text-green-600"
                                }`}
                            >
                                <span className="">{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                                <span>({ coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className='absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2'>
            {isBotRelease && (
                <div className='rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-neutral-500'>
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
                                {`Hi, ${auth.user?.fullName}`}
                                <p>You can ask crypto related any question</p>
                                <p>like, price, market cap extra....</p>
                            </div>
                        </div>

                        {chatBot.messages.map((item, index) => (
                            <div
                                key = {index}
                                className={`${item.role == 'user' ? 'self-end' : 'self-start'} pb-5 w-auto`}>

                                {item.role == 'user' ? (
                                    <div className='justify-end self-end px-5 py-2 rounded-md bg-amber-50 w-auto'>
                                    <p>{item.prompt}</p>
                                </div>
                                ) : (
                                <div className='justify-end self-end px-5 py-2 rounded-md bg-amber-50 w-auto'>
                                    <p>{item.message}</p>
                                </div>)}
                            </div>
                            ))
                        }
                        <div ref={chatContainerRef} />
                    </div>
                    <div className='h-[12%] border-t'>
                        <Input
                            className='w-full h-full border-none outline-none disabled:opacity-60'
                            placeholder='Write your prompt...'
                            onChange = {handleChange}
                            value = {inputValue}
                            onKeyDown = {handleKeyPress}
                            disabled={chatBot.loading}
                        />
                    </div>
                </div>)}

                <div onClick={handleBotRelease} className='relative w-[10rem] cursor-pointer group'>
                    <Button
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