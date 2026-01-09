import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentDetails } from '@/state/withdrawal/Action'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Spinner } from '@/components/ui/spinner'


const formSchema = yup.object().shape({
  accountHolderName: yup.string().required("Account Holder Name is required"),
  ifscCode: yup.string().length(11, "IFSC Code must be exactly 11 characters").required("IFSC Code is required"),
  accountNumber: yup.string().required("Account Number is required"),
  confirmAccountNumber: yup.string().test({
    name: "match",
    message: "Account Numbers do not match",
    test: function(value) {
      return value === this.parent.accountNumber;
    }
  }),
  bankName: yup.string().required("Bank Name is required"),
});

const PaymentDetailsForm = () => {

  const dispatch = useDispatch();
  const { auth, withdrawal } = useSelector(store => store);

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      accountHolderName: "",
      ifscCode: "",
      accountNumber: "",
      bankName: "",
    }
  });

  const onSubmit = (data) => {
    dispatch(addPaymentDetails({ paymentDetails: data, jwt: localStorage.getItem("jwt") }));
    console.log(data);
  }

  return (
    <div className='px-10 py-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 '>

          <FormField control={form.control} name="accountHolderName" render={({ field }) => (
            <FormItem>
              <FormLabel className='pb-1'>Account Holder Name</FormLabel>
              <FormControl>
                <Input placeholder="Faiz Ullah Khan" {...field} className='border w-full border-gray-700 p-5' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          <FormField control={form.control} name="ifscCode" render={({ field }) => (
            <FormItem>
              <FormLabel className='pb-1'>IFSC Code</FormLabel>
              <FormControl>
                <Input placeholder="ABCD0123456" {...field} className='border w-full border-gray-700 p-5' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          <FormField control={form.control} name="accountNumber" render={({ field }) => (
            <FormItem>
              <FormLabel className='pb-1'>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="********5604" {...field} className='border w-full border-gray-700 p-5' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          <FormField control={form.control} name="confirmAccountNumber" render={({ field }) => (
            <FormItem>
              <FormLabel className='pb-1'>Confirm Account Number</FormLabel>
              <FormControl>
                <Input placeholder="********5604" {...field} className='border w-full border-gray-700 p-5' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          <FormField control={form.control} name="bankName" render={({ field }) => (
            <FormItem>
              <FormLabel className='pb-1'>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Yes Bank" {...field} className='border w-full border-gray-700 p-5' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          {/* <DialogClose className='w-full'>
            <Button type='submit' className='w-full py-5'>Submit</Button>
          </DialogClose> */}
          <Button
            type="submit"
            className="w-full py-5 flex items-center gap-2"
            disabled={withdrawal.loading}
          >
            {withdrawal.loading && <Spinner />}
            {withdrawal.loading ? "Submitting..." : "SUBMIT"}
          </Button>

        </form>
      </Form>
    </div>
  )
}

export default PaymentDetailsForm