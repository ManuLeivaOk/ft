import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { GetQuestions, GetTalks } from "../../app/types/get.talks"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

const SpeakerPage = () => {
  const [talks, setTalks] = React.useState<GetTalks[]>([])
  const [questions, setQuestions] = React.useState<GetQuestions[]>([])
  const [selectedSpeaker, setSelectedSpeaker] = useState<number | null>(null)

  useEffect(() => {
    getTalks()
  }, [])
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
    } catch (error) {
      console.error(error)
    }
  }
  const getQuestionsByTalkId = async (talkId: number) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/talks-and-questions/questionsByTalk/' + talkId,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setQuestions(response.data)
      console.log(response.data);

    } catch (error) {
      console.error(error)
    }
  }
  const handleSelectChange = (value: string) => {
    setSelectedSpeaker(Number(value))
  }
  useEffect(() => {
    if (selectedSpeaker) {
      getQuestionsByTalkId(selectedSpeaker)
    }
  }, [selectedSpeaker])

  return (
    <div className="flex justify-center flex-col">
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Seleccione el orador de la charla</CardTitle>
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
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Preguntas hechas por los alumnos</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {questions && questions.length > 0 ? (
              questions.map((question) => (
                <div key={question.id} className="mt-4">
                  <Card>
                    <div className="bg-white flex text-gray-400 text-xs p-2">
                      {question.user.name} {question.user.lastName}
                    </div>
                    <CardContent className="bg-white flex justify-center content-center">
                      <div className="text-center mt-4">
                        {question.question}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <Label>No hay preguntas para este orador</Label>
            )}
          </div>
        </CardContent>
      </Card>
      <div>

        <Button className='mt-5' onClick={() => getQuestionsByTalkId(selectedSpeaker!)}>Actualizar preguntas</Button>
      </div>

    </div>
  )
}
export default SpeakerPage