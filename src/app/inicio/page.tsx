"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { MessageCircleQuestion } from "lucide-react";

const Page = () => {
  const router = useRouter();
  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl">Stands</h1>
      <div>
        <Card className="my-5">
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
        </Card>

        <Card className="my-5">
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
        </Card>
      </div>
    </div>
  );
};

export default Page;
