"use client";
import RetroSpinner from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from "next/image";
import React from "react";

const Page = () => {
  const [loading, setLoading] = React.useState(false);
  console.log('setLoading', setLoading)
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
        En esta sección podés registrar preguntas para hacerle a los
        presentadores de algún stand.
      </p>
      <p>
        Primero, seleccioná el stand al que te gustaría dejarle una consulta acá
        abajo:
      </p>
      <div className="w-full mb-5 mt-4">
        <Select>
          <SelectTrigger className="w-[300px] ">
            <SelectValue placeholder="Seleccione una cateogoría" />
          </SelectTrigger>
          {!loading ? (
            <SelectContent>
              <SelectGroup className="">
                <SelectLabel>Stands</SelectLabel>

                <SelectItem value={"cosa"}>Cosa</SelectItem>
              </SelectGroup>
            </SelectContent>
          ) : (
            <RetroSpinner />
          )}
        </Select>
      </div>
    </div>
  );
};

export default Page;
