'use client'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import ErrorDialog from '../../components/ui/errorDialog'
import RetroSpinner from '@/components/ui/loader'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import registerUser from '@/services/user.register'
import { FormData } from '../types/register.user.dto'
import StepOne from '@/components/registro/StepOne'
import { getColorByTeam } from '../../utils/colors'

const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  lastName: yup.string().required('El apellido es obligatorio'),
  email: yup
    .string()
    .email('Debe ser un email válido')
    .required('El email es obligatorio'),
  age: yup
    .number()
    .typeError('Debe ser un número')
    .min(10, 'Debe ser mayor a 10 años')
    .max(99, 'Debe ser menor a 99 años')
    .required('La edad es obligatoria'),
  school: yup.string().required('El colegio es obligatorio'),
  instagram: yup.string().required('El instagram es obligatorio'),
  birthday: yup.date().required('Fecha de cumpleaños es obligatoria'),
  documentNumber: yup
    .string()
    .required('El número de documento es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

const Page = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      birthday: new Date(),
    },
  })
  const [step, setStep] = useState<number | null>(1)
  const [errorsList, setErrorsList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [viewPopup, setViewPopup] = useState(false)
  const [viewPopupTeamColor, setViewPopupTeamColor] = useState(false)
  const [userTeamColor, setUserTeamColor] = useState('')

  useEffect(() => setStep(1), [])

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true)
    console.log('Datos enviados:', data)

    try {
      const response = await registerUser(data)

      setUserTeamColor(response.colour)
      setLoading(false)
      setViewPopup(true)
    } catch (err) {
      setLoading(false)

      const error = err as AxiosError<{ message?: string | string[] }>

      if (error.response?.data?.message) {
        const firstErrorMessage = Array.isArray(error.response.data.message)
          ? error.response.data.message[0]
          : error.response.data.message

        setErrorsList([firstErrorMessage])
      } else {
        setErrorsList(['Error al registrar usuario'])
      }
    }
  }

  const handleErrors = () => {
    const firstErrorMessage = Object.values(errors)
      .map((error) => error.message)
      .find((message): message is string => message !== undefined)

    if (firstErrorMessage) {
      setErrorsList([firstErrorMessage])

      setTimeout(() => {
        setErrorsList([])
      }, 5000)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center overflow-y-auto">
      {errorsList.length > 0 && (
        <ErrorDialog
          message={errorsList.join(' • ')}
          onClose={() => setErrorsList([])}
          color="bg-[#ff6b6b]"
        />
      )}
      {step === 1 ? (
        <StepOne setStep={setStep} />
      ) : (
        <Card className="w-[350px] my-12 h-auto">
          <CardHeader>
            <CardTitle>Formulario de registro</CardTitle>
            <CardDescription>Registro de alumnos.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Juan"
                    type="text"
                    {...register('name')}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Perez"
                    type="text"
                    {...register('lastName')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="juan.perez@email.com"
                    type="email"
                    {...register('email')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Número de documento</Label>
                  <Input
                    id="documentNumber"
                    placeholder="44444444"
                    type="documentNumber"
                    {...register('documentNumber')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    placeholder="********"
                    type="password"
                    {...register('password')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    placeholder="17"
                    type="number"
                    {...register('age')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="school">Colegio</Label>
                  <Input
                    id="school"
                    placeholder="General José María Paz"
                    {...register('school')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="juanperez"
                    {...register('instagram')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="course">Fecha de cumpleaños</Label>
                  <Input
                    id="course"
                    type="date"
                    placeholder="6 C"
                    {...register('birthday')}
                  />
                </div>
              </div>
              <div className="w-full justify-center mt-10">
                <Button type="submit" variant="neutral">
                  {loading ? <RetroSpinner /> : 'Registrarse'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      {viewPopup && (
        <Dialog open={viewPopup} onOpenChange={setViewPopup}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registro exitoso</DialogTitle>
              <DialogDescription>
                Tu cuenta fue creada con éxito.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-2xl font-bold text-center">
                ¡Información importante!
              </p>
              <p>
                El día del evento, tenés que llevar algún vaso/taza/termo para
                poder tomar bebidas. ¡También está permitido llevar mate!
              </p>
            </div>
            <Button
              onClick={() => {
                setViewPopup(false)
                setViewPopupTeamColor(true)
              }}
              className="w-[100px] mx-auto"
            >
              Aceptar
            </Button>
          </DialogContent>
        </Dialog>
      )}
      {viewPopupTeamColor && (
        <Dialog open={viewPopupTeamColor} onOpenChange={setViewPopupTeamColor}>
          <DialogContent className={getColorByTeam(userTeamColor)}>
            <DialogHeader>
              <DialogTitle>Este es tu equipo</DialogTitle>
              <DialogDescription>
                Tu cuenta fue creada con éxito.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-2xl font-bold text-center">
                ¡Información importante!
              </p>
              <p>Se te asigno el equipo {userTeamColor}</p>
            </div>
            <Button
              onClick={() => router.push('/login')}
              className="w-[100px] mx-auto"
            >
              Okey!
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default Page
