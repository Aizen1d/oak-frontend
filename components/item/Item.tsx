"use client"

import { ItemProps } from "@/lib/types/items"

const Item = (data: ItemProps) => {
  return (
    <div className="flex flex-col w-full h-40 py-4 px-5 bg-white shadow-md rounded-xl hover:cursor-pointer hover:scale-105 transition-all duration-300">
      {/* Name */}
      <div className="flex justify-center text-center">
        <h1 className="text-3xl font-bold line-clamp-3">
          {data.Name}
        </h1>
      </div>

      {/* Description */}
      <div className="flex flex-col items-center mt-1">
        <p className="text-sm text-center text-BLACK_INFO_TEXT line-clamp-2">
          {data.Description}
        </p>
      </div>

      {/* Price */}
      <div className="flex justify-center h-full items-end">
        <p className="text-md">
          ${data.Price.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default Item