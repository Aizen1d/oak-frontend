'use client'

import { useEffect, useState } from "react"
import ManageItem from "@/components/item/ManageItem"
import { ItemProps } from "@/lib/types/items"
import { fetchSingleItem } from "@/actions/items"
import { useParams } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

const page = () => {
  const { id } = useParams()
  const router = useRouter()

  const [data, setData] = useState<ItemProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const getData = await fetchSingleItem(id.toString())

      if (!getData) {
        return router.back()
      }
      
      setData(getData)
    }

    fetchData()
  }, [])
  
  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-8rem)] px-5 lg:px-0">
      {data ? (
        <ManageItem
          ItemId={data?.ItemId}
          UserId={data?.UserId}
          Name={data?.Name}
          Description={data?.Description}
          Price={data?.Price}
        />
      ) : (
        <Skeleton className="w-[40%] h-96" />
      )}
    </main>
  )
}

export default page