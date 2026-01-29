import type { Role } from "../../constants/roles"

export interface AuthUser {
  id: string
  email: string  
  role: Role
}

export interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
}
