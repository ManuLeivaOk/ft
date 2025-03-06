"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

const Page = () => {
  const [loading, setLoading] = React.useState(false);
  console.log("setLoading", setLoading, loading);
  return (
    <div className="p-8">
      <h2 className="font-bold text-2xl mb-4">Preguntas para presentadores</h2>
      <Image
        alt="Preguntas"
        src="/preguntas.jpg"
        width={300}
        height={200}
        className="mx-auto rounded-xl mb-4 shadow w-full opacity-95"
      />
      <p className="mb-4">
        En esta sección podés registrar una pregunta para el stand que
        seleccionaste.
      </p>
      <div className="flex flex-col space-y-1.5">
        <Textarea placeholder="Pregunta" className="h-[100px]"/>
      </div>
      <Button className="mt-4">Preguntar</Button>
    </div>
  );
};

export default Page;
