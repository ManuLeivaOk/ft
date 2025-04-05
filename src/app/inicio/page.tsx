'use client'
import React, { useEffect } from 'react'
import { useSession } from '../../context/SessionContext'
import FirstStep from '../../components/inicio/FirstStep'
import RetroSpinner from '../../components/ui/loader'
import SecondStep from '../../components/inicio/SecondStep'
import ThirdStep from '../../components/inicio/ThirdStep'
import FourthState from '../../components/inicio/FourthState'
import SpeakerPage from '../../components/inicio/SpeakerPage'

const Page = () => {
  const { session, login } = useSession()
  const [step, setStep] = React.useState<string>('firstStep')
  const [type, setType] = React.useState<string>()

  useEffect(() => {
    if (session) {
      setStep(session.state)
      setType(session.type)
    }
  }, [session])

  if (!session) {
    return (
      <div className="w-full flex justify-center mt-10">
        <RetroSpinner />
      </div>
    )
  }

  return (
    <div className="p-8">
      {step === 'firstStep' && type === '1' && (
        <FirstStep login={login} session={session} setStep={setStep} />
      )}
      {type === '2' && (
        <SpeakerPage />
      )}
      {step === 'secondStep' && <SecondStep login={login} />}
      {step === 'thirdStep' && <ThirdStep session={session} login={login} />}
      {step === 'fourthStep' && <FourthState session={session} />}
    </div>
  )
}

export default Page
