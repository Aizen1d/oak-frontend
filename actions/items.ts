"use server"

import { fetchAPI, API_ENDPOINTS } from "@/constants/api"
import { cookies } from 'next/headers'
import { ItemProps } from "@/lib/types/items"

export async function fetchItems() {
  const cookieStore = cookies()
  const cookie = cookieStore.get("access_token")?.value

  try {
    const response = await fetchAPI(`${API_ENDPOINTS.items}?token=${cookie}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    const data = await response.json()

    return data
  } catch(error) {
    console.log(error)
  }
}

export async function fetchSingleItem(id: string) {
  const cookieStore = cookies()
  const cookie = cookieStore.get("access_token")?.value

  try {
    const response = await fetchAPI(`${API_ENDPOINTS.items}/${id}?token=${cookie}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    const data = await response.json()

    return data
  } catch(error) {
    console.log(error)
  }
}

export async function createItem(data: Pick<ItemProps, "Name" | "Description" | "Price">) {
  const { Name, Description, Price } = data

  const cookieStore = cookies()
  const cookie = cookieStore.get("access_token")?.value

  try {
    const response = await fetchAPI(`${API_ENDPOINTS.items}?token=${cookie}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        Name,
        Description,
        Price
      })
    })

    const data = await response.json()

    return data
  } catch(error) {
    console.log(error)
  }
}

export async function updateItem(id: string, data: Pick<ItemProps, "Name" | "Description" | "Price">) {
  const { Name, Description, Price } = data

  const cookieStore = cookies()
  const cookie = cookieStore.get("access_token")?.value

  try {
    const response = await fetchAPI(`${API_ENDPOINTS.items}?token=${cookie}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ItemId: id,
        Name,
        Description,
        Price
      })
    })

    const data = await response.json()

    return data
  } catch(error) {
    console.log(error)
  }
}

export async function deleteItem(id: string) {
  const cookieStore = cookies()
  const cookie = cookieStore.get("access_token")?.value

  try {
    const response = await fetchAPI(`${API_ENDPOINTS.items}?token=${cookie}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ItemId: id
      })
    })

    const data = await response.json()

    return data
  } catch(error) {
    console.log(error)
  }
}