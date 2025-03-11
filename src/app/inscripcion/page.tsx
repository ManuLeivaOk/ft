"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import ErrorDialog from "../../components/ui/errorDialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import RetroSpinner from "@/components/ui/loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormData = {
  name: string;
  lastName: string;
  email: string;
  age: number;
  school: string;
  instagram: string;
  nacimiento: Date;
};

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("El apellido es obligatorio"),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("El email es obligatorio"),
  age: yup
    .number()
    .typeError("Debe ser un número")
    .min(10, "Debe ser mayor a 10 años")
    .max(99, "Debe ser menor a 99 años")
    .required("La edad es obligatoria"),
  school: yup.string().required("El colegio es obligatorio"),
  instagram: yup.string().required("El instagram es obligatorio"),
  nacimiento: yup.date().required("Fecha de cumpleaños es obligatoria"),
});

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nacimiento: new Date(),
    },
  });
  const [step, setStep] = useState<number | null>(null);
  const [errorsList, setErrorsList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);

  useEffect(() => setStep(1), []);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    console.log("Datos enviados:", data);
    setLoading(false);
    setViewPopup(true);
    /* router.push("/login"); */
  };

  const handleErrors = () => {
    const firstErrorMessage = Object.values(errors)
      .map((error) => error.message)
      .find((message): message is string => message !== undefined); // Tomar solo el primer error

    if (firstErrorMessage) {
      setErrorsList([firstErrorMessage]);

      // Auto ocultar después de 5 segundos
      setTimeout(() => {
        setErrorsList([]);
      }, 5000);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {errorsList.length > 0 && (
        <ErrorDialog
          message={errorsList.join(" • ")}
          onClose={() => setErrorsList([])}
          color="bg-[#ff6b6b]"
        />
      )}
      {step === 1 ? (
        <div className="px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Hola, ¡bienvenido! </h2>
          <Image
            alt="Hello!"
            src="/bienvenida.jpg"
            width={300}
            height={200}
            className="mx-auto rounded-xl mb-4 shadow w-full opacity-95"
          />
          <p className="mb-4">
            Para poder registrarte, por favor completa el siguiente formulario
          </p>
          <Button className="mb-10" onClick={() => setStep(2)}>
            Comenzar
          </Button>

          <div>
            Si ya tenés una cuenta, podés
            <span className=" ml-2 mb-2">
              <Badge
                onClick={() => {
                  router.push("/login");
                }}
              >
                iniciar sesión
              </Badge>
            </span>
          </div>
        </div>
      ) : (
        <Card className="w-[350px]">
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
                    {...register("name")}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Perez"
                    type="text"
                    {...register("lastName")}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="juan.perez@email.com"
                    type="email"
                    {...register("email")}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    placeholder="17"
                    type="number"
                    {...register("age")}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="school">Colegio</Label>
                  <Input
                    id="school"
                    placeholder="General José María Paz"
                    {...register("school")}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="@juanperez"
                    {...register("instagram")}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="course">Fecha de cumpleaños</Label>
                  <Input
                    id="course"
                    type="date"
                    placeholder="6 C"
                    {...register("nacimiento")}
                  />
                </div>
              </div>
              <div className="w-full justify-center mt-10">
                <Button type="submit" variant="neutral">
                  {loading ? <RetroSpinner /> : "Registrarse"}
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
              onClick={() => router.push("/login")}
              className="w-[100px] mx-auto"
            >
              Finalizar
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Page;
