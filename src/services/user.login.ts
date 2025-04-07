import { FormData } from '@/app/types/login.user.dto'
import { urls } from '@/config/config'
import axios from 'axios'

const registerUser = async (payload: FormData) => {
  try {
    const response = await axios.post(`${urls.apiUrl}auth/login`, payload)
    return response.data
  } catch (error) {
    console.error('Error al realizar el login del usuario:', error)
    throw error
  }
}

export default registerUser
