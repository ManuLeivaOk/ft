import { FormData } from '@/app/types/register.user.dto'
import { urls } from '@/config/config'
import axios from 'axios'

const registerUser = async (payload: FormData) => {
  console.log('1')
  try {
    console.log('2')
    const url = urls.apiUrl

    const response = await axios.post(`${url}users/register`, payload)
    return response.data
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    throw error
  }
}

export default registerUser
