import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import AssetTable from './AssetTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ChevronLeftIcon, ChevronRightIcon, Cross1Icon, DotIcon } from '@radix-ui/react-icons'
import { MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoinDetails, getCoinList } from '@/state/coin/Action'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'
import { sendMessage } from '@/state/chatBot/Action'
import BotThinking from './BotThinking'

const Home = () => {
  const [inputValue, setInputValue] = useState('')
  const [isBotRelease, setIsBotRelease] = useState(false)
  const [page, setPage] = useState(1)

  const { coin, chatBot, auth } = useSelector(store => store)
  const dispatch = useDispatch()
  const chatContainerRef = useRef(null)

  useEffect(() => {
    dispatch(getCoinList(page))
  }, [page, dispatch])

  useEffect(() => {
    dispatch(fetchCoinDetails({ coinId: 'bitcoin', jwt: localStorage.getItem('jwt') }))
  }, [dispatch])

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatBot.messages, chatBot.loading])

  const handlePageChange = page => setPage(page)

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      dispatch(sendMessage({ prompt: inputValue, jwt: localStorage.getItem('jwt') }))
      setInputValue('')
    }
  }

    return (
        <div className="relative">
        <div className="lg:flex">

            <div className="lg:w-[50%] lg:border flex flex-col h-[90.6vh]">

            <div className="flex-1 overflow-hidden">
                <AssetTable coin={coin.coinList} loading={coin.loading} />
            </div>

                <div className="border-t py-3 flex justify-center">
                <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <Button
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        <ChevronLeftIcon />
                        Previous
                    </Button>
                    </PaginationItem>

                    <PaginationItem>
                    <PaginationLink
                        isActive={page === 1}
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                    <PaginationLink
                        isActive={page === 2}
                        onClick={() => handlePageChange(2)}
                    >
                        2
                    </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                    <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                    <Button onClick={() => handlePageChange(page + 1)}>
                        Next
                        <ChevronRightIcon />
                    </Button>
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
            </div>
            </div>

            <div className="hidden lg:block lg:w-[50%] p-5">
            <StockChart coinId="bitcoin" />

            <div className="flex gap-5 items-center mt-4">
                <Avatar>
                <AvatarImage src={coin.coinDetails?.image.large} />
                </Avatar>

                <div>
                <div className="flex items-center gap-2">
                    <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
                    <DotIcon className="text-gray-400" />
                    <p className="text-gray-400">{coin.coinDetails?.name}</p>
                </div>

                <div className="flex items-end gap-2">
                    <p className="text-xl font-bold">
                    ${coin.coinDetails?.market_data.current_price.usd}
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>

        <section className="absolute bottom-5 right-5 z-40 flex flex-col items-end gap-2">
            {isBotRelease && (
            <div className="rounded-md w-[25rem] h-[70vh] bg-neutral-500">
                <div className="flex justify-between items-center border-b px-6 h-[12%]">
                <p>Chat Bot</p>
                <Button variant="ghost" size="icon" onClick={() => setIsBotRelease(false)}>
                    <Cross1Icon />
                </Button>
                </div>

                <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2">
                {chatBot.messages.map(item => (
                    <div key={item.id} className={item.role === 'user' ? 'self-end' : 'self-start'}>
                    <div className="px-4 py-2 rounded-md bg-amber-50">
                        {item.role === 'user' ? item.prompt : item.message}
                    </div>
                    </div>
                ))}
                {chatBot.loading && <BotThinking />}
                <div ref={chatContainerRef} />
                </div>

                <div className="h-[12%] border-t">
                <Input
                    className="w-full h-full border-none"
                    placeholder="Write your prompt..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={chatBot.loading}
                />
                </div>
            </div>
            )}

            {!isBotRelease && (
                <Button
                    onClick={() => setIsBotRelease(true)}
                    className="
                    fixed bottom-6 right-6 z-50
                    flex items-center gap-3
                    h-16 px-7
                    text-lg font-medium
                    rounded-full
                    bg-black text-white
                    shadow-2xl
                    transition-all duration-300 ease-out
                    hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
                    active:scale-95
                    animate-float
                    "
                >
                    <MessageCircle size={30} className="animate-pulse-soft" />
                    Chat Bot
                </Button>
            )}
        </section>
        </div>
    )
}

export default Home