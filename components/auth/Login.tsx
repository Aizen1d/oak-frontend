"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"


const formSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(50).regex(new RegExp('^(?=.*[A-Z])(?=.*\d).+$')) // One uppercase, One digit
})

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(form.getValues())
  }

  return (
    <div className="flex flex-col w-full lg:w-[40%] h-fit py-8 my-8 bg-white shadow-lg rounded-lg" data-aos="fade-up">
      {/* Header */}
      <div className="flex justify-center items-center">
        <h1 className="font-extrabold tracking-tight text-4xl text-center text-BLACK_LABEL_TEXT">
          Login
        </h1>
      </div>

      {/* Inputs */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[85%] mx-auto mt-5 space-y-7">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-BLACK_INFO_TEXT">Username</FormLabel>
                <FormControl>
                  <Input 
                    className="text-BLACK_LABEL_TEXT placeholder:text-BLACK_INFO_TEXT border-neutral-300 focus-visible:ring-neutral-300" 
                    placeholder="Enter your username.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-BLACK_INFO_TEXT">Password</FormLabel>
                <FormControl>
                  <Input 
                    className="text-BLACK_LABEL_TEXT placeholder:text-BLACK_INFO_TEXT border-neutral-300 focus-visible:ring-neutral-300" 
                    placeholder="Enter your password.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center">
            <Button className="w-[25%] bg-OAK_COLOR hover:bg-OAK_COLOR_HOVER" type="submit">
              Log in
            </Button>  
          </div>
        </form>
      </Form>

      <p className="mx-auto mt-3 text-center text-sm text-BLACK_INFO_TEXT">Don&apos;t have an account?
        <Link className="text-OAK_COLOR font-semibold" href="/signup"> Sign up</Link>
      </p>
    </div>
  )
}

export default Login