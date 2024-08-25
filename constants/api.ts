export const LOCAL_BACKEND = "http://localhost:8000"
export const PROD_BACKEND = ""

export const API_ENDPOINTS = {
  auth: '/auth',
  items: '/items'
}

export const fetchAPI = async (url: string, options?: any) => {
  const environment = process.env.PROD === '1' ? PROD_BACKEND : LOCAL_BACKEND
  const apiVersion = '/api/v1'

  const response = await fetch(`${environment}${apiVersion}${url}`, options)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response
}