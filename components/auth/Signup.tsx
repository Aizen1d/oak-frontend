"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
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
import { signupValidations as validations } from "@/constants/validations"
import { signup } from "@/actions/auth"

const formSchema = z.object({
  username: 
    z.string({ message: validations.username.message })
    .min(3, { message: validations.username.min })
    .max(50, { message: validations.username.max }),
  password: 
    z.string({ message: validations.password.message })
    .min(6, { message: validations.password.min })
    .max(50, { message: validations.password.max })
    .regex(new RegExp(validations.password.regex.value), { message: validations.password.regex.message }),
  confirm: 
    z.string()
})
.refine((data) => data.password === data.confirm, {
  message: validations.confirm.message,
  path: validations.confirm.path
})

const Signup = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [submitting, setSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      confirm: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (submitting) return
    setSubmitting(true)

    const { username, password } = form.getValues()

    const data = await signup({ username, password })

    if (data === undefined || data === null) {
      toast({
        variant: "destructive",
        title: "Invalid username or password, please try again.",
      })

      setSubmitting(false)
      return
    }

    if (data?.reason) {
      toast({
        variant: "destructive",
        title: data.message
      })

      setSubmitting(false)
      return
    }

    // add notif to local storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('notification', 'Account created successfully')
    }
    
    router.push('login')
  }

  return (
    <div className="flex flex-col w-full lg:w-[40%] h-fit py-8 my-8 bg-white shadow-lg rounded-lg" data-aos="fade-up">
      {/* Header */}
      <div className="flex justify-center items-center">
        <h1 className="font-extrabold tracking-tight text-4xl text-center text-BLACK_LABEL_TEXT">
          Sign up
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
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-BLACK_INFO_TEXT">Confirm Password</FormLabel>
                <FormControl>
                  <Input 
                    className="text-BLACK_LABEL_TEXT placeholder:text-BLACK_INFO_TEXT border-neutral-300 focus-visible:ring-neutral-300" 
                    placeholder="Re-enter your password.."
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
              {submitting ? 'Signing up...' : 'Sign up'}
            </Button>  
          </div>
        </form>
      </Form>

      {!submitting && 
        <p className="mx-auto mt-3 text-center text-sm text-BLACK_INFO_TEXT">Already have an account?
            <Link className="text-OAK_COLOR font-semibold" href="/login"> Log in</Link>
        </p>
      }
    </div>
  )
}

export default Signup