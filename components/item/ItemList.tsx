"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchItems } from "@/actions/items"
import { ItemProps } from "@/lib/types/items"
import Item from "./Item"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ItemList = () => {
  const [items, setItems] = useState<ItemProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

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

    setLoading(true)

    const getItems = async () => {
      const data = await fetchItems()

      console.log(data)
      
      if (data) {
        setLoading(false)
        setItems(data)
      }
      else {
        setLoading(false)
        setHasError(true)
      }
    }

    getItems()
  }, [])

  const onCreateClick = () => {
    router.push('create-item')
  }

  const onItemClick = (id: number) => {
    router.push(`items/${id}`)
  }

  return (
    <>
      <div className="flex justify-center lg:justify-end w-full mt-7">
        <Button
          className="px-7 py-5 lg:mr-10 bg-white hover:bg-white text-BLACK_LABEL_TEXT"
          onClick={onCreateClick}
        >
          Create Item
        </Button>      
      </div>
      {items.length > 0 && !loading && !hasError && (
      <div className="grid grid-cols-1 lg:grid-cols-4 p-10 gap-x-8 gap-y-8 w-full">
        {items?.sort((a, b) => a.ItemId - b.ItemId).map((item: ItemProps) => (
          <TooltipProvider key={item.ItemId} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger onClick={() => onItemClick(item.ItemId)}>
                <Item
                  ItemId={item.ItemId}
                  UserId={item.UserId}
                  Name={item.Name}
                  Description={item.Description}
                  Price={item.Price}
                />
              </TooltipTrigger>
              <TooltipContent className="text-white bg-OAK_COLOR">
                <p className="text-xs">Click to open</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>)}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-4 p-10 gap-x-8 gap-y-8 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton className="w-full h-40" key={i} />
          ))}
        </div>
      )}
      {items.length <= 0 && !loading && !hasError && (
        <div className="flex justify-center items-center w-full mt-5">
          <h1 className="text-3xl">
            No items found
          </h1>
        </div>
      )}
      {hasError && (
        <div className="flex justify-center items-center w-full mt-5">
          <h1 className="text-3xl">
            An error occurred, please try again later.
          </h1>
        </div>
      )}
    </>
  )
}

export default ItemList