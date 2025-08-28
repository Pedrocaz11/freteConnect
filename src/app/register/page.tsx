"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Truck, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userType, setUserType] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Campos específicos para motoristas
    cnh: "",
    vehicleType: "",
    vehicleCapacity: "",
    vehiclePlate: "",
    // Campos específicos para clientes
    company: "",
    cnpj: "",
    address: ""
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
    console.log("Dados do formulário:", formData);
    console.log("Tipo de usuário:", userType);
    
    // Simular cadastro bem-sucedido
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
            <CardTitle>Escolha o tipo de cadastro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/register?type=driver">
              <Button className="w-full" variant="outline">
                <Truck className="mr-2 h-4 w-4" />
                Motorista
              </Button>
            </Link>
            <Link href="/register?type=client">
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
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
                {userType === "driver" ? "Cadastro de Motorista" : "Cadastro de Cliente"}
              </CardTitle>
              <CardDescription>
                {userType === "driver" 
                  ? "Preencha seus dados para começar a encontrar fretes"
                  : "Preencha seus dados para começar a publicar fretes"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dados Pessoais</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(11) 99999-9999"
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
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Campos específicos para motoristas */}
                {userType === "driver" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Dados do Veículo</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cnh">CNH</Label>
                        <Input
                          id="cnh"
                          value={formData.cnh}
                          onChange={(e) => handleInputChange("cnh", e.target.value)}
                          placeholder="12345678901"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehicleType">Tipo de Veículo</Label>
                        <Select onValueChange={(value) => handleInputChange("vehicleType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="caminhao-pequeno">Caminhão Pequeno</SelectItem>
                            <SelectItem value="caminhao-medio">Caminhão Médio</SelectItem>
                            <SelectItem value="caminhao-grande">Caminhão Grande</SelectItem>
                            <SelectItem value="carreta">Carreta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vehicleCapacity">Capacidade (kg)</Label>
                        <Input
                          id="vehicleCapacity"
                          value={formData.vehicleCapacity}
                          onChange={(e) => handleInputChange("vehicleCapacity", e.target.value)}
                          placeholder="1000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehiclePlate">Placa do Veículo</Label>
                        <Input
                          id="vehiclePlate"
                          value={formData.vehiclePlate}
                          onChange={(e) => handleInputChange("vehiclePlate", e.target.value)}
                          placeholder="ABC-1234"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Campos específicos para clientes */}
                {userType === "client" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Dados da Empresa</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Nome da Empresa</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input
                          id="cnpj"
                          value={formData.cnpj}
                          onChange={(e) => handleInputChange("cnpj", e.target.value)}
                          placeholder="00.000.000/0001-00"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Rua, número, bairro, cidade, estado"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  Criar Conta
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?{" "}
                    <Link href={`/login?type=${userType}`} className="text-blue-600 hover:text-blue-800">
                      Faça login
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}