import Login from "@/components/auth/Login"

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OakTree Innovations | Log in',
  description: 'This is the log in page.',
};

const page = () => {
  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-8rem)] px-5 lg:px-0">
      <Login />
    </main>
  )
}

export default page