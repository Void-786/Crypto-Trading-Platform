import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VerifiedIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import AccountVerificationForm from './AccountVerificationForm'
import { useSelector } from 'react-redux'

const Profile = () => {

  const {auth} = useSelector(store => store)

  const handleEnableTwoStepVerification = (data) => {
    console.log('Two-Step Verification Data:', data)
  }

  return (
    <div className='flex flex-col items-center mb-5'>
      <div className='pt-10 w-full lg:w-[60%]'>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='lg:flex gap-32'>

              <div className='space-y-7'>

                <div className='flex'>
                  <p className='w-[9rem]'>Email :</p>
                  <p className='text-gray-500'>{auth.user?.email}</p>
                </div>

                <div className='flex'>
                  <p className='w-[9rem]'>Full Name :</p>
                  <p className='text-gray-500'>{auth.user?.fullName}</p>
                </div>

                <div className='flex'>
                  <p className='w-[9rem]'>Date of Birth :</p>
                  <p className='text-gray-500'>22/09/2003</p>
                </div>

                <div className='flex'>
                  <p className='w-[9rem]'>Nationality :</p>
                  <p className='text-gray-500'>Indian</p>
                </div>

              </div>

              <div className='space-y-7'>

                <div className='flex'>
                  <p className='w-[9rem]'>Address :</p>
                  <p className='text-gray-500'>Aliganj</p>
                </div>

                <div className='flex'>
                  <p className='w-[9rem]'>City :</p>
                  <p className='text-gray-500'>Etah</p>
                </div>

                <div className='flex'>
                  <p className='w-[9rem]'>Post Code</p>
                  <p className='text-gray-500'>207247</p>
                </div>

                <div className='flex'>
                  <p className='w-[9rem]'>Country</p>
                  <p className='text-gray-500'>India</p>
                </div>

              </div>

            </div>
          </CardContent>
        </Card>

        <div className='mt-6'>
          <Card className='w-full'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <CardTitle>Two-Step Verification</CardTitle>
                {true ? <Badge className=' text-white bg-green-600'>
                  <VerifiedIcon />
                  <span>Enabled</span>
                </Badge>
                :
                <Badge className='bg-orange-500'>Disabled</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Enable Two-Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verify Your Account</DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Profile