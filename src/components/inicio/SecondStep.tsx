import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GetTalks } from '../../app/types/get.talks'
import axios from 'axios'
import RetroSpinner from '../ui/loader'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Session, useSession } from '../../context/SessionContext'
import ErrorDialog from '../../components/ui/errorDialog'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { getColorByTeam } from '../../utils/colors'

interface Props {
  login: (user: Session) => void
}

const SecondStep = ({ login }: Props) => {
  const { session } = useSession()
  const [loading, setLoading] = useState(true)
  const [talks, setTalks] = React.useState<GetTalks[]>([])
  const [selectedSpeaker, setSelectedSpeaker] = useState<number | null>(null)
  const [question, setQuestion] = useState<string>('')
  const [errorsList, setErrorsList] = useState<string[]>([])
  const [questionsByUser, setQuestionByUser] = useState([])

  useEffect(() => {
    getQuestionsByUser()
    getTalks()
  }, [])

  const handleSelectChange = (value: string) => {
    setSelectedSpeaker(Number(value))
    setQuestion('')
  }

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestion(event.target.value)
  }

  const getTalks = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/talks-and-questions',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setTalks(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const getQuestionsByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/talks-and-questions/questionsByUser/${session?.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setQuestionByUser(response.data)
      console.log('r', response)
    } catch (e) {
      console.log('e', e)
    }
  }

  const postQuestion = async () => {
    setLoading(true)
    try {
      const payload = {
        question,
        userId: session?.id,
        talkId: selectedSpeaker,
      }
      const response = await axios.post(
        'http://localhost:3000/talks-and-questions',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log('ok', response)
      getQuestionsByUser()
      setLoading(false)
      setQuestion('')
      setSelectedSpeaker(null)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const update = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/updateSession/${session?.documentNumber}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log('response xxxxx', response.data)
      if (response.data.state === session?.state) {
        setLoading(false)
      } else {
        getQuestionsByUser()
        login(response.data)
        localStorage.setItem('session', JSON.stringify(response.data))
        setSelectedSpeaker(null)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center mt-2">
          <RetroSpinner />
        </div>
      ) : (
        <div>
          {errorsList.length > 0 && (
            <ErrorDialog
              message={'Su pregunta se registró exitosamente'}
              onClose={() => setErrorsList([])}
              color="bg-[#6bff94]"
              textColor="text-black"
            />
          )}

          <h2 className="font-bold text-2xl">Preguntas para expositores</h2>
          <Image
            src={'/preguntas.jpg'}
            alt="preguntas"
            width={500}
            height={500}
            className="w-full rounded-lg my-4 shadow-lg"
          />
          {/* <p className="mt-5 text-center">
            Selecciona un orador y dejale tu pregunta.{' '}
            <span className="font-bold">
              La pregunta se registra a nombre de tu usuario.
            </span>
          </p> */}
          <div className="flex justify-between">
            <div className="w-full flex items-center">
              <p className="mr-2">Equipo: </p>
              <Button
                className={`${getColorByTeam(
                  session?.colour!
                )}, rounded-button`}
                variant={'noShadow'}
              ></Button>
            </div>

            <div className="w-full flex items-center justify-end">
              <p className="mr-2">Preguntas realizadas:</p>
              <Button className="rounded-full" variant={'noShadow'}>
                {questionsByUser.length}
              </Button>
            </div>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Preguntar a un orador</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full mt-4 bg-white">
                    <SelectValue placeholder="Selecciona al orador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-white">
                      <SelectLabel>Oradores</SelectLabel>
                      {talks &&
                        talks.length > 0 &&
                        talks.map((talk) => (
                          <SelectItem
                            key={talk.id}
                            value={JSON.stringify(talk.id)}
                          >
                            {talk.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-5">
                <Label htmlFor="question">Escribe tu pregunta</Label>
                <Textarea
                  id="question"
                  value={question}
                  onChange={handleQuestionChange}
                  placeholder={
                    selectedSpeaker
                      ? 'Escribe tu pregunta aquí...'
                      : 'Selecciona un orador primero'
                  }
                  disabled={!selectedSpeaker}
                />
              </div>

              <div className="w-full flex justify-center">
                <Button
                  type="button"
                  className="w-[90px] mt-5 bg-white"
                  onClick={postQuestion}
                  disabled={!selectedSpeaker || question.length < 5}
                >
                  {loading ? <RetroSpinner /> : 'Enviar'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button className="mt-5" onClick={update}>
            Actualizar sesión
          </Button>
        </div>
      )}
    </>
  )
}

export default SecondStep
