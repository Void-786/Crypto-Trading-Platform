import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserAssets } from "@/state/asset/Action";
import { getAllOrdersForUser } from "@/state/order/Action";
import calculateProfitLoss from "@/util/calculateProfitLoss";
import readableDate from "@/util/readableDate";
import { Table } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TradingHistory = () => {

    const dispatch = useDispatch();
    const { order } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getUserAssets(localStorage.getItem("jwt")));
        dispatch(getAllOrdersForUser(localStorage.getItem("jwt")));
    }, [])

    return (
        <div>
            <Table className="px-5  relative">
                <TableHeader className="py-9">
                <TableRow className="sticky top-0 left-0 right-0 bg-background ">
                    <TableHead className="py-3">Date & Time</TableHead>
                    <TableHead>Trading Pair</TableHead>
                    <TableHead>Buy Price</TableHead>
                    <TableHead>Selling Price</TableHead>
                    <TableHead>Order Type</TableHead>
                    <TableHead>Profit/Loss</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                </TableRow>
                </TableHeader>

                <TableBody className="">
                {order.orders?.map((item) => (
                    <TableRow key={item.id} className={undefined}>
                    <TableCell>
                        <p>{readableDate(item.timestamp).date}</p>
                        <p className="text-gray-400">
                        {readableDate(item.timestamp).time}
                        </p>
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                        <Avatar className="-z-50">
                        <AvatarImage
                            src={item.orderItem.coin.image}
                            alt={item.orderItem.coin.symbol}
                        />
                        </Avatar>
                        <span> {item.orderItem.coin.name}</span>
                    </TableCell>

                    <TableCell>${item.orderItem.buyPrice}</TableCell>
                    <TableCell>{"$" + item.orderItem.sellPrice || "-"}</TableCell>
                    <TableCell>{item.orderType}</TableCell>
                    <TableCell
                        className={`${
                        calculateProfitLoss(item) < 0 ? "text-red-600" : ""
                        }`}
                    >
                        {item.orderType == "SELL" ? calculateProfitLoss(item) : "-"}
                    </TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                    {/*  */}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TradingHistory