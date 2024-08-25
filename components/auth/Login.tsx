"use client"

import { login } from "@/actions/auth"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useAuthStore from "@/stores/AuthStore"

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
  username: 
    z.string()
    .nonempty({ message: 'Username is required' })
    .trim(),
  password: 
    z.string()
    .nonempty({ message: 'Password is required' })
    .trim()
});

const Login = () => {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem("notification")) {
      const notification = localStorage.getItem("notification") as string
      toast({
        title: notification,
        variant: "success",
        duration: 3000
      })
      localStorage.removeItem("notification")
    }
  }, [])
  
  const setLogin = useAuthStore(state => state.login)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (submitting) return
    setSubmitting(true)

    const formValues = form.getValues()

    const data = await login(formValues)
    if (data === undefined || data === null) {
      toast({
        variant: "destructive",
        title: "Invalid username or password, please try again.",
      })

      setSubmitting(false)
      return
    }

    console.log(data)

    //window.location.href = "/items"
    setLogin()
  }

  return (
    <div className="flex flex-col w-full lg:w-[40%] h-fit py-8 my-8 bg-white shadow-lg rounded-lg" data-aos="fade-up">
      {/* Header */}
      <div className="flex justify-center items-center">
        <h1 className="font-extrabold tracking-tight text-4xl text-center text-BLACK_LABEL_TEXT">
          Log in
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
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center">
            <Button className="w-[25%] bg-OAK_COLOR hover:bg-OAK_COLOR_HOVER disabled:bg-gray-500" type="submit" disabled={submitting}>
              {submitting ? "Logging in..." : "Log in"}
            </Button>  
          </div>
        </form>
      </Form>
        
      {!submitting && (
        <p className="mx-auto mt-3 text-center text-sm text-BLACK_INFO_TEXT">Don&apos;t have an account?
          <Link className="text-OAK_COLOR font-semibold" href="/signup"> Sign up</Link>
        </p>
      )}
    </div>
  )
}

export default Login