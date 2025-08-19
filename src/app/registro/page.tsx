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
import StepOne from '@/components/registro/StepOne'

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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña'),
})

const Page = () => {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true)
    console.log('Datos enviados:', data)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = data

    try {
      const response = await registerUser(payload)

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
                    type="text"
                    {...register('name')}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    type="text"
                    {...register('lastName')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Número de documento</Label>
                  <Input
                    id="documentNumber"
                    type="documentNumber"
                    {...register('documentNumber')}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
                    >
                      {showPassword ? '🙊' : '🙈'}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Repetir Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
                    >
                      {showConfirmPassword ? '🙊' : '🙈'}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    type="number"
                    {...register('age')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="school">Colegio</Label>
                  <Input
                    id="school"
                    {...register('school')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    {...register('instagram')}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="course">Fecha de cumpleaños</Label>
                  <Input
                    id="course"
                    type="date"
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
              <p className='text-center '>
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
          <DialogContent>
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
              <p className='text-center'>Se te asigno el equipo {userTeamColor}</p>
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
