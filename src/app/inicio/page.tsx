"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { SendHorizonal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Page = () => {
  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl text-center">¡Bienvenido al evento!</h1>
      <Image
          src={"/home.jpg"}
          alt="bienvenida"
          width={200}
          height={100}
          className="w-full rounded-2xl opacity-95 mt-4 mb-8"
        />
      <div>
        <Card className="my-5">
          <CardHeader>
            <CardTitle>Registro de asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Para poder registrar tu asistencia al evento, tenes que ingresar
              el código que te darán en la entrada y enviarlo
            </p>
            <div className="flex flex-col space-y-1.5 mt-8 mb-4">
              <Label htmlFor="name" className="ml-1">
                Código
              </Label>
              <Input id="name" placeholder="123456" type="text" />
            </div>
            <Button variant={"neutral"} className="mt-3">
              <SendHorizonal size={48} />
              Enviar
            </Button>
          </CardContent>
        </Card>

        

        {/*         <Card className="my-5">
          <CardHeader>
            <CardTitle>Stand 1</CardTitle>
            <CardDescription>Slogan del stand</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
              laboriosam modi eos sapiente sint aut consectetur consequuntur
              ipsa id numquam, tempore atque officia nobis inventore ex! Quidem
              accusamus cumque animi!
            </p>
            <Button
              variant={"neutral"}
              className="mt-3"
              onClick={() => {
                router.push("/pregunta");
              }}
            >
              <MessageCircleQuestion size={48} />
              Hacer pregunta
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Page;
