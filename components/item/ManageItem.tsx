"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { createItemValidations as validations } from "@/constants/validations"
import { updateItem, deleteItem } from "@/actions/items"
import { ItemProps } from "@/lib/types/items"
import { useParams } from 'next/navigation'

const formSchema = z.object({
  Name: 
    z.string({ message: validations.name.message })
    .min(3, { message: validations.name.min })
    .max(20, { message: validations.name.max }),
  Description:
    z.string({ message: validations.description.message })
    .min(3, { message: validations.description.min })
    .max(200, { message: validations.description.max }),
  Price:
    z.coerce
    .number()
    .min(1, { message: validations.price.min })
    .max(100000, { message: validations.price.max }),
})

const ManageItem = (data: ItemProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = useParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: data.Name,
      Description: data.Description,
      Price: data.Price,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formValues = form.getValues()

    const data = await updateItem(id.toString(), formValues)

    if (data === undefined || data === null) {
      toast({
        variant: "destructive",
        title: data?.message
      })

      return
    }

    if (data?.reason) {
      toast({
        variant: "destructive",
        title: data?.message,
        duration: 3000
      })

      return
    }

    toast({
      title: "Item updated successfully",
      variant: "success",
      duration: 3000
    })
  }

  const onCancelClick = (e: React.MouseEvent) => {
    e.preventDefault()

    form.reset()
    form.clearErrors()

    router.back()
  }

  const onDeleteClick = async (e: React.MouseEvent) => {
    const data = await deleteItem(id.toString())

    if (data === undefined || data === null) {
      toast({
        variant: "destructive",
        title: data?.message
      })

      return
    }

    if (data?.reason) {
      toast({
        variant: "destructive",
        title: data?.message,
        duration: 3000
      })

      return
    }

    // add notif to local storage
    localStorage.setItem('notification', 'Item deleted successfully')
    router.push('/items')
  }

  return (
    <div className="flex flex-col w-full lg:w-[40%] h-fit py-8 my-8 bg-white shadow-lg rounded-lg" data-aos="zoom-in">
      {/* Header */}
      <div className="flex justify-center items-center">
        <h1 className="font-extrabold tracking-tight text-4xl text-center text-BLACK_LABEL_TEXT">
          Manage Item
        </h1>
      </div>

      {/* Inputs */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[85%] mx-auto mt-5 space-y-7">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-BLACK_INFO_TEXT">Name</FormLabel>
                <FormControl>
                  <Input 
                    className="text-BLACK_LABEL_TEXT placeholder:text-BLACK_INFO_TEXT border-neutral-300 focus-visible:ring-neutral-300" 
                    placeholder="Enter item's name.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-BLACK_INFO_TEXT">Description</FormLabel>
                <FormControl>
                  <Input 
                    className="text-BLACK_LABEL_TEXT placeholder:text-BLACK_INFO_TEXT border-neutral-300 focus-visible:ring-neutral-300" 
                    placeholder="Enter item's description.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-BLACK_INFO_TEXT">Price</FormLabel>
                <FormControl>
                  <Input 
                    className="text-BLACK_LABEL_TEXT placeholder:text-BLACK_INFO_TEXT border-neutral-300 focus-visible:ring-neutral-300" 
                    placeholder="Enter item's price.."
                    min={1}
                    step={0.01}
                    type=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center space-x-5">
            <Button className="w-[25%] bg-slate-500 hover:bg-slate-400" onClick={(e) => onCancelClick(e)} type="button">
              Return
            </Button>  

            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="w-full bg-red-500 hover:bg-red-400" type="button">
                  Delete
                </Button> 
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will delete the item permanently.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={(e) => onDeleteClick(e)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
             
            <Button className="w-[25%] bg-OAK_COLOR hover:bg-OAK_COLOR_HOVER" type="submit">
              Update
            </Button>  
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ManageItem