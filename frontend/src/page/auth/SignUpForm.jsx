import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { register } from '@/state/auth/Action'

const SignUpForm = () => {

  const dispatch = useDispatch();

  const form = useForm({
    resolver: "",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    }
  });
 
  const onSubmit = (data) => {
    dispatch(register(data))
    console.log(data);
  }

  return (
    <div className='px-10 py-2'>
      <h1 className='text-xl font-bold text-center pb-4'>Create New Account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 '>

          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Full Name" {...field} className='border w-full border-gray-700 p-5' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} className='border w-full border-gray-700 p-5' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} className='border w-full border-gray-700 p-5' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
            <Button type='submit' className='w-full py-5'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default SignUpForm;