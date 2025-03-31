'use client'
import React, { useEffect, useState } from 'react'
import { CircleAlert } from 'lucide-react'

interface Props {
  message: string
  onClose: () => void
  color: string
  textColor?: string
}

const ErrorAlert = ({
  message,
  onClose,
  color,
  textColor = 'white',
}: Props) => {
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const timerShow = setTimeout(() => {
      setIsFadingOut(true)
    }, 4000)

    const timerHide = setTimeout(() => {
      onClose()
    }, 5000)

    return () => {
      clearTimeout(timerShow)
      clearTimeout(timerHide)
    }
  }, [onClose])

  return (
    <div
      className={`fixed bottom-0 left-0 w-full p-4 ${color} border border-black border-t-4 text-white text-center transition-all transform ${
        isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'
      }`}
    >
      <div className="flex justify-center">
        <CircleAlert className={`mr-2 ${textColor}`} />
        <p className={`${textColor}`}>{message}</p>
      </div>
    </div>
  )
}

export default ErrorAlert
