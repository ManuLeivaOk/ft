'use client'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'

export interface Session {
  id: number
  name: string
  lastName: string
  email: string
  documentNumber: string
  colour: string
  state: string
  type: string
}

interface SessionContextType {
  session: Session | null
  login: (userData: Session) => void
  logout: () => void
  isAuthenticated: boolean
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession debe ser usado dentro de un SessionProvider')
  }
  return context
}

interface SessionProviderProps {
  children: ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedSession = localStorage.getItem('session')
    if (storedSession) {
      setSession(JSON.parse(storedSession))
    }
  }, [])

  const login = (userData: Session) => {
    setSession(userData)
    localStorage.setItem('session', JSON.stringify(userData))
  }

  const logout = () => {
    setSession(null)
    localStorage.removeItem('session')
    localStorage.removeItem('token')
    router.push('/login')
  }

  const value: SessionContextType = {
    session,
    login,
    logout,
    isAuthenticated: !!session,
  }

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}
