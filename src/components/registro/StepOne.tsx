import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'

interface Props {
  setStep: (step: number) => void
}

const StepOne = ({ setStep }: Props) => {
  const router = useRouter()
  return (
    <div className="px-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Hola, ¡bienvenido! </h2>
      <Image
        alt="Hello!"
        src="/bienvenida.jpg"
        width={500}
        height={350}
        className="mx-auto rounded-xl mb-4 shadow w-full opacity-95"
      />
      <p className="mb-4">
        Para poder registrarte, por favor completa el siguiente formulario
      </p>
      <Button className="mb-10" onClick={() => setStep(2)}>
        Comenzar
      </Button>

      <div>
        Si ya tenés una cuenta, podés{' '}
        <span className="ml-2 mb-2 cursor-pointer">
          <Badge
            onClick={() => {
              router.push('/login')
            }}
          >
            iniciar sesión
          </Badge>
        </span>
      </div>
    </div>
  )
}

export default StepOne
