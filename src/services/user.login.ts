import { FormData } from '@/app/types/login.user.dto'
import { urls } from '@/config/config'
import axios from 'axios'

const registerUser = async (payload: FormData) => {
  try {
    const url = urls.apiUrl
    const response = await axios.post(`${url}auth/login`, payload)
    return response.data
  } catch (error) {
    console.error('Error al realizar el login del usuario:', error)
    throw error
  }
}

export default registerUser
