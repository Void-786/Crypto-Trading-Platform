import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { getPaymentDetails } from '@/state/withdrawal/Action'
import MaskedAccountNumber from '@/util/MaskedAccountNumber'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentDetailsForm from './PaymentDetailsForm'

const PaymentDetails = () => {

  const dispatch = useDispatch();
  const {withdrawal} = useSelector(store => store);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  return (
    <div className='px-20'>

      <h1 className='text-3xl font-bold py-10'>Payment Details</h1>

      {withdrawal.paymentDetails ? 
      <Card>
        <CardHeader>
          <CardTitle>
            {withdrawal.paymentDetails?.bankName.toUpperCase()}
          </CardTitle>
          <CardDescription>
            A/C No : {" "}
            {MaskedAccountNumber(withdrawal.paymentDetails?.accountNumber)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center'>

            <p className='w-32'>A/C Holder :</p>
            <p className=''>{ withdrawal.paymentDetails?.accountHolderName}</p>

          </div>
          <div className='flex items-center'>
            <p className='w-32'>IFSC Code :</p>
            <p className=''>{ withdrawal.paymentDetails?.ifscCode}</p>
          </div>
        </CardContent>
      </Card>
      :
      <Dialog>
        <DialogTrigger className='mt-3'>
          <Button className='py-6'>Add Payment Details</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          <PaymentDetailsForm />
        </DialogContent>
      </Dialog>
      }
    </div>
  )
}

export default PaymentDetails