
import { fetchAPI, API_ENDPOINTS } from "@/constants/api"
import { LoginProps } from "@/lib/types/auth"

export async function login(props: LoginProps) {
  try {
    const response = await fetchAPI(`${API_ENDPOINTS.auth}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: props.username,
        password: props.password
      }),
    })

    const data = await response.json()

    return data
  } catch(error) {
    console.log(error)
  }
}

export async function logout() {
  try {
    const response = await fetchAPI(`${API_ENDPOINTS.auth}/logout`, {
      method: "POST",
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

export async function tokenVerify(token: string) {
  try {
    const response = await fetchAPI(`${API_ENDPOINTS.auth}/token-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        token: token
      }),
    })

    const data = await response.json()

    return data
  } catch(error) {
    console.log(error)
  }
}
