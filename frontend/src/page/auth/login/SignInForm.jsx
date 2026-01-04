import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/state/auth/Action'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

const formScheme = z.object ({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long")
})

const SignInForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector(store => store);
  const loading = auth.loading;

  const form = useForm({
    resolver: zodResolver(formScheme),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(login(data))
    console.log(data);
  }

  return (
    <div className='px-10 py-2'>
      <h1 className='text-xl font-bold text-center pb-4'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 '>

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
              {/* Button text */}
              <span className={loading ? "opacity-0" : "opacity-100"}>
                Login
              </span>

              {/* Centered spinner */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin block" />
                </div>
              )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignInForm;