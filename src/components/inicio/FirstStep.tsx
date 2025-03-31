import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SendHorizonal } from 'lucide-react'
import RetroSpinner from '../ui/loader'
import ErrorAlert from '../ui/errorDialog'
import axios from 'axios'
import { Session } from '../../context/SessionContext'

interface Props {
  login: (user: Session) => void
  session: Session
  setStep: Dispatch<SetStateAction<string>>
}
const FirstStep = ({ login, session, setStep }: Props) => {
  const [code, setCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const handleSubmit = async () => {
    if (!code) {
      setError('El código es requerido.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        `http://localhost:3000/users/changeFirstState/${code}/${session.documentNumber}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (response.data.error) {
        throw new Error(
          response.data.message || 'Hubo un error al registrar el código.'
        )
      }

      login(response.data)
      localStorage.setItem('session', JSON.stringify(response.data))
      setStep('secondStep')
    } catch (error) {
      console.log('e,', error)
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError('Error desconocido')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className="font-bold text-2xl text-center">¡Bienvenido al evento!</h1>
      <Image
        src={'/home.jpg'}
        alt="bienvenida"
        width={500}
        height={350}
        className="w-full rounded-2xl opacity-95 mt-4 mb-8"
      />
      <div>
        <Card className="my-5">
          <CardHeader>
            <CardTitle>Registro de asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Para poder registrar tu asistencia al evento, tenes que ingresar
              el código que te darán en la entrada y enviarlo
            </p>
            <div className="flex flex-col space-y-1.5 mt-8 mb-4">
              <Label htmlFor="code" className="ml-1">
                Código
              </Label>
              <Input
                id="code"
                value={code}
                placeholder="123456"
                type="text"
                onChange={handleChange}
              />
            </div>
            <Button
              variant={'neutral'}
              className="mt-3 w-[100px]"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <RetroSpinner />
              ) : (
                <div className="flex justify-between items-center">
                  <SendHorizonal size={48} />
                  <p className="ml-2">Enviar</p>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      {error && (
        <ErrorAlert
          message={error}
          onClose={() => setError(null)}
          color="bg-[#ff6b6b]"
        />
      )}
    </>
  )
}

export default FirstStep
