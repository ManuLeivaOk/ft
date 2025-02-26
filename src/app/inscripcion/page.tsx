import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

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
  course: yup.string().required("El curso y división son obligatorios"),
});

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Datos enviados:", data);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Formulario de registro</CardTitle>
          <CardDescription>Registro de alumnos.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Juan"
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  placeholder="Perez"
                  type="text"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="juan.perez@email.com"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  placeholder="17"
                  type="number"
                  {...register("age")}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="school">Colegio</Label>
                <Input
                  id="school"
                  placeholder="General José María Paz"
                  {...register("school")}
                />
                {errors.school && (
                  <p className="text-red-500 text-sm">
                    {errors.school.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="course">Curso y división</Label>
                <Input id="course" placeholder="6 C" {...register("course")} />
                {errors.course && (
                  <p className="text-red-500 text-sm">
                    {errors.course.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" variant="neutral">
            Registrarse
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
