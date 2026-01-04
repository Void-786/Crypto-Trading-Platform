import './Auth.css'
import SignUpForm from './signup/SignUpForm'
import ForgotPasswordForm from './password/ForgotPasswordForm'
import SignInForm from './login/SignInForm'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { clearAuthError } from '@/state/auth/Action'

const Auth = () => {
  const [animate, setAnimate] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useSelector(store => store)

  useEffect(() => {
    if (auth.error?.error) {
      toast.error(auth.error.error, {
        duration: 3000,
      })
      dispatch(clearAuthError())
    }
  }, [auth.error, dispatch])

  const handleNavigation = (path) => {
    if (location.pathname === path) return
    setAnimate(true)
    setTimeout(() => {
      navigate(path)
      setAnimate(false)
    }, 400)
  }

  let content

  if (location.pathname === '/signup') {
    content = (
      <section className={animate ? 'slide-down' : 'slide-up'}>
        <SignUpForm />
        <div className="flex items-center justify-center">
          <span>Already have an Account?</span>
          <Button variant="ghost" onClick={() => handleNavigation('/signin')}>
            Sign In
          </Button>
        </div>
      </section>
    )
  } else if (location.pathname === '/forgot-password') {
    content = (
      <section>
        <ForgotPasswordForm />
        <div className="flex items-center justify-center mt-2">
          <span>Back to Login?</span>
          <Button variant="ghost" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
        </div>
      </section>
    )
  } else {
    content = (
      <section>
        <SignInForm />
        <div className="flex items-center justify-center mt-2">
          <span>Don't have an Account?</span>
          <Button variant="ghost" onClick={() => handleNavigation('/signup')}>
            Sign Up
          </Button>
        </div>

        <div className="px-10 py-2 mt-10">
          <Button
            className="w-full py-5"
            variant="ghost"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </Button>
        </div>
      </section>
    )
  }

  return (
    <div className="relative h-screen authContainer">
      <Toaster position="top-center" richColors theme="dark" />

      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/50">
        <div
          className="
            bg-blur absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            flex flex-col justify-center items-center
            h-[35rem] w-[30rem]
            rounded-md z-50
            bg-black/50 shadow-2xl shadow-white
          "
        >
          <h1 className="text-6xl font-bold pb-9 text-white text-center">
            <p>Crypto Trading</p>
            <p>Platform</p>
          </h1>

          <section className="text-white w-full">
            {content}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Auth
