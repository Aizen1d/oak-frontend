import Signup from "@/components/auth/Signup"

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OakTree Innovations | Sign up',
  description: 'This is the sign up page.',
};

const page = () => {
  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-8rem)] px-5 lg:px-0">
      <Signup />
    </main>
  )
}

export default page