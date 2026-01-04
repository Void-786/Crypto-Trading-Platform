import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '@/state/auth/Action'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

const formSchema = z.object ({
  fullName: z.string().nonempty("Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

const SignUpForm = () => {

  const {auth} = useSelector(store => store)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = auth.loading;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    }
  });
 
  const onSubmit = async (data) => {
    const result = await dispatch(register(data))

    if (result?.success) {
      navigate("/");
    }
    
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
          <Button
            type="submit"
            disabled={loading}
            className="
              w-full py-6 relative overflow-hidden
              cursor-pointer transition-all duration-200 ease-out
              hover:scale-[1.02] hover:shadow-lg
              active:scale-[0.98] active:shadow-md
            "
          >
            {/* Button text (hidden during loading) */}
            <span className={loading ? "opacity-0" : "opacity-100"}>
              Register
            </span>

            {/* Centered spinner overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin block" />
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignUpForm;