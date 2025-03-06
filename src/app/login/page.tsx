"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import RetroSpinner from "../../components/ui/loader";
import ErrorAlert from "@/components/ui/errorDialog";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones
    if (!email || !validateEmail(email)) {
      setError("Por favor ingresa un email válido.");
      setShowAlert(true);
      setLoading(false);
      return;
    }

    if (!pass || pass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setShowAlert(true);
      setLoading(false);
      return;
    }

    setError("");
    setShowAlert(false);

    const credentials = { email, pass };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.msg);
        setShowAlert(true);
        setLoading(false);
        return;
      }
      console.log("Login exitoso");
      setLoading(false);
      router.push("/inicio");
    } catch (e) {
      console.log("e", e);
      setError("Problema de conexión. Inténtalo de nuevo.");
      setShowAlert(true);
      setLoading(false);
      router.push("/inicio");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center align-middle items-center">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              ¡Ingresa y gestiona tus finanzas personales!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">Contraseña</Label>
                <Input
                  type="password"
                  id="pass"
                  placeholder="Contraseña"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" variant="neutral" className="w-[90px]">
              {loading ? <RetroSpinner /> : "Ingresar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {showAlert && (
        <ErrorAlert
          message={error}
          onClose={() => setShowAlert(false)}
          color="bg-[#ff6b6b]"
        />
      )}
    </div>
  );
};

export default Page;
