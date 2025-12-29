import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAssets } from "@/state/asset/Action";

const Portfolio = () => {
    const dispatch = useDispatch();
    const { asset } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getUserAssets(localStorage.getItem("jwt")));
    }, [dispatch]);

    return (
        <div className="px-6 py-4 w-full">
        <h1 className="font-bold text-4xl pb-4">Portfolio</h1>

        <div className="w-full overflow-x-auto">
            <Table className="w-full table-fixed">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[22%] px-4 py-4 text-base">
                        Asset
                    </TableHead>
                    <TableHead className="w-[13%] px-4 py-4 text-base text-right">
                        Price
                    </TableHead>
                    <TableHead className="w-[13%] px-4 py-4 text-base text-right">
                        Unit
                    </TableHead>
                    <TableHead className="w-[16%] px-4 py-4 text-base text-right">
                        Price Change
                    </TableHead>
                    <TableHead className="w-[18%] px-4 py-4 text-base text-right">
                        Price Change (%)
                    </TableHead>
                    <TableHead className="w-[18%] px-4 py-4 text-base text-right">
                        Value
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {asset.userAssets.map((item) => {
                const value = item.coin.current_price * item.quantity;
                const isNegative =
                    item.coin.price_change_percentage_24h < 0;

                return (
                    <TableRow key={item.id} className="h-16">
                    <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={item.coin.image} />
                        </Avatar>
                        <span className="text-base font-medium">
                            {item.coin.name}
                        </span>
                        </div>
                    </TableCell>

                    <TableCell className="px-4 py-4 text-right text-base">
                        ${item.coin.current_price.toFixed(2)}
                    </TableCell>

                    <TableCell className="px-4 py-4 text-right text-base">
                        {item.quantity}
                    </TableCell>

                    <TableCell
                        className={`px-4 py-4 text-right text-base ${
                        isNegative ? "text-red-600" : "text-green-600"
                        }`}
                    >
                        {item.coin.price_change_24h.toFixed(2)}
                    </TableCell>

                    <TableCell
                        className={`px-4 py-4 text-right text-base ${
                        isNegative ? "text-red-600" : "text-green-600"
                        }`}
                    >
                        {item.coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>

                    <TableCell className="px-4 py-4 text-right text-base font-semibold">
                        ${value.toFixed(2)}
                    </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </div>
        </div>
    );
};

export default Portfolio;
