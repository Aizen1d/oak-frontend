import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isLogged: boolean
  login: () => void
  logout: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogged: false,
      login: () => set({ isLogged: true }),
      logout: () => set({ isLogged: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore
