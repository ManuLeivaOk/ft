import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import RetroSpinner from '../ui/loader'
import axios from 'axios'
import { Session } from '../../context/SessionContext'

interface Props {
  session: Session
  login: (user: Session) => void
}

const ThirdStep = ({ session, login }: Props) => {
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<
    { id: string; name: string; description: string }[]
  >([])
  const [selectedGroup, setSelectedGroup] = useState(0)

  useEffect(() => {
    getGroups()
  }, [])

  const handleSelectChange = (value: string) => {
    setSelectedGroup(Number(value))
  }

  const getGroups = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/talks-and-questions/groups',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      setGroups(response.data)
      setLoading(false)
    } catch (e) {
      console.log('e', e)
      setLoading(false)
    }
  }

  const sendGroup = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/selectGroup/${session.documentNumber}/${selectedGroup}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log('response', response)
      login(response.data)
      localStorage.setItem('session', JSON.stringify(response.data))
    } catch (e) {
      console.log('e', e)
    }
  }

  return (
    <div>
      {loading ? (
        <div className="w-full mt-4 flex justify-center">
          <RetroSpinner />
        </div>
      ) : (
        <>
          {' '}
          <div>
            <h2 className="text-2xl text-center font-bold">
              ¡Llegando al final!
            </h2>
            <Image
              src={'/choose.jpg'}
              alt="elección"
              width={500}
              height={500}
              className="w-full rounded-lg shadow-lg mt-4"
            />
          </div>
          <div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="leading-6">
                  ¿Con qué grupo te sentís mas indentificado?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-full mt-4 bg-white">
                      <SelectValue placeholder="Selecciona un grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="bg-white">
                        <SelectLabel>Grupos</SelectLabel>
                        {groups &&
                          groups.length > 0 &&
                          groups.map((g) => (
                            <SelectItem key={g.id} value={g.id}>
                              {g.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {selectedGroup === 1 && (
                  <p className="mt-4 text-justify">{groups[0].description}</p>
                )}
                {selectedGroup === 2 && (
                  <p className="mt-4 text-justify">{groups[1].description}</p>
                )}
                {selectedGroup === 3 && (
                  <p className="mt-4 text-justify">{groups[2].description}</p>
                )}
                {selectedGroup === 4 && (
                  <p className="mt-4 text-justify">{groups[3].description}</p>
                )}
                {selectedGroup === 5 && (
                  <p className="mt-4 text-justify">{groups[4].description}</p>
                )}

                <div className="w-full flex justify-center">
                  <Button
                    onClick={sendGroup}
                    type="button"
                    className="w-[90px] mt-5 bg-white"
                  >
                    {loading ? <RetroSpinner /> : 'Enviar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

export default ThirdStep
