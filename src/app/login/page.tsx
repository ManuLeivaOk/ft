'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import RetroSpinner from '../../components/ui/loader'
import ErrorAlert from '@/components/ui/errorDialog'
import axios from 'axios'
import { useSession } from '../../context/SessionContext'

const Page = () => {
  const { login } = useSession()

  const router = useRouter()
  const [documentNumber, setDocumentNumber] = useState('44444444')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState<string>('')
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Validaciones
    if (!documentNumber) {
      setError('Por favor ingresa un documento válido.')
      setShowAlert(true)
      setLoading(false)
      return
    }

    if (!password || password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      setShowAlert(true)
      setLoading(false)
      return
    }

    setError('')
    setShowAlert(false)

    const credentials = { documentNumber, password }

    try {
      const response = await axios.post(
        'http://45.236.131.22:3000/auth/login',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status !== 201) {
        setError(response.data.msg ?? 'Error desconocido')
        setShowAlert(true)
        setLoading(false)
        return
      }

      login(response.data.user)
      localStorage.setItem('session', JSON.stringify(response.data.user))
      localStorage.setItem('token', JSON.stringify(response.data.access_token))
      setLoading(false)
      router.push('/inicio')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) {
          setError(e.response.data.message ?? 'Error desconocido')
        } else {
          setError('Problema de conexión. Inténtalo de nuevo.')
        }
      } else {
        setError('Error desconocido. Intenta nuevamente.')
      }
      setShowAlert(true)
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex justify-center align-middle items-center">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              ¡Ingresa y gestiona tus finanzas personales!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="documentNumber">Número de documento</Label>
                <Input
                  type="documentNumber"
                  id="documentNumber"
                  placeholder="Número de documento"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" variant="neutral" className="w-[90px]">
              {loading ? <RetroSpinner /> : 'Ingresar'}
            </Button>
          </CardFooter>
        </form>
        <p className="text-center mb-5">
          ¿Necesitas{' '}
          <button
            onClick={() => {
              router.push('/registro')
            }}
            className="font-bold"
          >
            Crear cuenta?
          </button>
        </p>
      </Card>
      {showAlert && (
        <ErrorAlert
          message={error}
          onClose={() => setShowAlert(false)}
          color="bg-[#ff6b6b]"
        />
      )}
    </div>
  )
}

export default Page
