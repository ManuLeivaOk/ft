import React from 'react'
import { Session } from '../../context/SessionContext'
import Image from 'next/image'

interface Props {
  session: Session
}

const FourthState = ({ session }: Props) => {
  return (
    <div className="">
      <h2 className="text-center font-bold text-2xl">
        ¡Muchas gracias por participar!
      </h2>
      <Image
        src={'/goodbye.jpg'}
        alt="goodbye"
        width={500}
        height={500}
        className="rounded-lg mt-6 shadow-lg w-full"
      />
      <p className="mt-8 text-center">
        {session.lastName}, ha sido un encuentro maravilloso y esperamos que te
        haya sido de utilidad. Nos sentimos muy contentos con tu presencia y
        seguiremos en contacto durante el resto del año para ayudarte a elegir
        sobre tu futuro.
      </p>
    </div>
  )
}

export default FourthState
