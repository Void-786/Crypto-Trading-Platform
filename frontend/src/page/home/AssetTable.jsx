import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useNavigate } from 'react-router-dom'

const AssetTable = ({coin, category}) => {

    const navigate = useNavigate();

    return (
        <Table>
            <ScrollArea className={`${category == 'all' ? 'h-[77.3vh]' : 'h-[82vh]'} pr-4`}>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[220px] text-left">Coin</TableHead>
                    <TableHead className="w-[80px] text-left">Symbol</TableHead>
                    <TableHead className="w-[160px] text-right">Volume</TableHead>
                    <TableHead className="w-[180px] text-right">Market Cap</TableHead>
                    <TableHead className="w-[90px] text-right">24h</TableHead>
                    <TableHead className="w-[120px] text-right">Price</TableHead>
                </TableRow>
            </TableHeader>


            <TableBody>
                {coin.map((item) => {
                const change = item.price_change_percentage_24h;
                const nameParts = item.name.split(' ');

                return (
                    <TableRow
                        key={item.id}
                        onClick={() => navigate(`/market/${item.id}`)}
                        className="cursor-pointer hover:bg-muted/50 h-[72px]"
                        >
                        {/* Coin */}
                        <TableCell className="w-[220px] text-left">
                            <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarImage src={item.image} />
                            </Avatar>

                            <div className="flex flex-col leading-snug">
                                {item.name.split(' ').slice(0, 3).map((word, idx) => (
                                <span key={idx} className="font-medium text-sm">
                                    {word}
                                </span>
                                ))}
                            </div>
                            </div>
                        </TableCell>

                        {/* Symbol */}
                        <TableCell className="w-[80px] text-left uppercase text-muted-foreground">
                            {item.symbol}
                        </TableCell>

                        {/* Volume */}
                        <TableCell className="w-[160px] text-right tabular-nums whitespace-nowrap">
                            {item.total_volume.toLocaleString()}
                        </TableCell>

                        {/* Market Cap */}
                        <TableCell className="w-[180px] text-right tabular-nums whitespace-nowrap">
                            {item.market_cap.toLocaleString()}
                        </TableCell>

                        {/* 24h */}
                        <TableCell
                            className={`w-[90px] text-right tabular-nums whitespace-nowrap ${
                            item.price_change_percentage_24h >= 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                        >
                            {item.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        {/* Price */}
                        <TableCell className="w-[120px] text-right tabular-nums whitespace-nowrap font-medium">
                            ${item.current_price.toLocaleString()}
                        </TableCell>
                    </TableRow>
                    );})}
                </TableBody>
            </ScrollArea>
        </Table>

    )
}

export default AssetTable