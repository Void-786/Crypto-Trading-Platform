import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { searchCoin } from '@/state/coin/Action';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchCoin = () => {
  
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);
  const [keyword, setKeyword] = useState("keyword");
  const navigate = useNavigate();

  const handleSearchCoin = () => {
    dispatch(searchCoin(keyword));
  }
  
  if(coin.loading) {
    return (
      <div className='h-[77.3vh] flex items-center justify-center'>
        <Spinner />
        <span>Loading Data...</span>
      </div>
    )
  }

  return (
    <div className="p-10 lg:p=[50%]">
      <div className="flex items-center justify-center pb-16">
        <Input
          className="p-5 w-[90%] lg:w-[50%] rounded-r-none"
          placeholder="explore market..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleSearchCoin} className="p-5 rounded-l-none">
          <SearchIcon />
        </Button>
      </div>
      <Table className="px-5  relative">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background ">
            <TableHead className="py-3">Market Cap Rank</TableHead>
            <TableHead>Trading Pair</TableHead>
         
            <TableHead className="text-right">SYMBOL</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {coin.searchCoinList?.map((item) => (
            <TableRow onClick={()=>navigate(`/market/${item.id}`)} key={item.id}>
              <TableCell>
               
                <p className="">
                  {item.market_cap_rank}
                </p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src={item.large}
                    alt={""}
                  />
                </Avatar>
                <span> {item.name}</span>
              </TableCell>

              <TableCell className="text-right">${item.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SearchCoin