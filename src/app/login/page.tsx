"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userType, setUserType] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setUserType(type);
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", formData);
    console.log("Tipo de usuário:", userType);
    
    // Simular login bem-sucedido
    if (userType === "driver") {
      router.push("/dashboard/driver");
    } else {
      router.push("/dashboard/client");
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Escolha o tipo de login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/login?type=driver">
              <Button className="w-full" variant="outline">
                <Truck className="mr-2 h-4 w-4" />
                Motorista
              </Button>
            </Link>
            <Link href="/login?type=client">
              <Button className="w-full" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Cliente
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao início
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
              {userType === "driver" ? (
                <Truck className="h-8 w-8 text-blue-600" />
              ) : (
                <Package className="h-8 w-8 text-green-600" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {userType === "driver" ? "Login Motorista" : "Login Cliente"}
            </CardTitle>
            <CardDescription>
              Entre na sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <Link href={`/register?type=${userType}`} className="text-blue-600 hover:text-blue-800">
                    Cadastre-se
                  </Link>
                </p>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 block">
                  Esqueceu a senha?
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}