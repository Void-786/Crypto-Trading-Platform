import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getWithdrawalHistory } from '@/state/withdrawal/Action';
import readableTimeStamp from '@/util/readableTimeStamp';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Withdrawal = () => {

  const dispatch = useDispatch();
  const { withdrawal } = useSelector(store => store);

  useEffect(() => {
    dispatch(getWithdrawalHistory({ jwt: localStorage.getItem("jwt") }));
  }, [])

  return (
    <div>
      <div className='px-5 py-2'>
      <h1 className='font-bold text-3xl pb-5'>Withdrawal</h1>
      <Table className='border table-fixed w-full'>
        <TableHeader>
            <TableRow>
                <TableHead className='py-5'>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {withdrawal.history.map((item) => (<TableRow key={item.id}>
                <TableCell><p>{readableTimeStamp(item.date)}</p></TableCell>
                <TableCell className="px-4 py-3">{"Bank Account"}</TableCell>
                <TableCell className="px-4 py-3 text-right">${item.amount}</TableCell>
                <TableCell className="px-4 py-3 text-right">{item.withdrawalStatus}</TableCell>
            </TableRow>))}
        </TableBody>
    </Table>
    </div>
    </div>
  )
}

export default Withdrawal