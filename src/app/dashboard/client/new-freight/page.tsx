"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Package, MapPin, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewFreightPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    origem: "",
    destino: "",
    peso: "",
    dimensoes: "",
    tipoMercadoria: "",
    valor: "",
    prazoColeta: "",
    prazoEntrega: "",
    observacoes: "",
    contatoColeta: "",
    contatoEntrega: "",
    enderecoColeta: "",
    enderecoEntrega: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo frete criado:", formData);
    
    // Simular criação bem-sucedida
    router.push("/dashboard/client");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/client">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Novo Frete</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Criar Novo Frete</CardTitle>
                  <CardDescription>
                    Preencha as informações do seu frete para encontrar motoristas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informações da Carga */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Package className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Informações da Carga</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tipoMercadoria">Tipo de Mercadoria</Label>
                      <Select onValueChange={(value) => handleInputChange("tipoMercadoria", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                          <SelectItem value="moveis">Móveis</SelectItem>
                          <SelectItem value="alimentos">Alimentos</SelectItem>
                          <SelectItem value="medicamentos">Medicamentos</SelectItem>
                          <SelectItem value="documentos">Documentos</SelectItem>
                          <SelectItem value="equipamentos">Equipamentos</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="peso">Peso (kg)</Label>
                      <Input
                        id="peso"
                        value={formData.peso}
                        onChange={(e) => handleInputChange("peso", e.target.value)}
                        placeholder="Ex: 1500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dimensoes">Dimensões (Comprimento x Largura x Altura)</Label>
                    <Input
                      id="dimensoes"
                      value={formData.dimensoes}
                      onChange={(e) => handleInputChange("dimensoes", e.target.value)}
                      placeholder="Ex: 2m x 1m x 1.5m"
                    />
                  </div>
                </div>

                {/* Origem e Destino */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Origem e Destino</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="origem">Cidade de Origem</Label>
                      <Input
                        id="origem"
                        value={formData.origem}
                        onChange={(e) => handleInputChange("origem", e.target.value)}
                        placeholder="Ex: São Paulo, SP"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="destino">Cidade de Destino</Label>
                      <Input
                        id="destino"
                        value={formData.destino}
                        onChange={(e) => handleInputChange("destino", e.target.value)}
                        placeholder="Ex: Rio de Janeiro, RJ"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="enderecoColeta">Endereço de Coleta</Label>
                      <Textarea
                        id="enderecoColeta"
                        value={formData.enderecoColeta}
                        onChange={(e) => handleInputChange("enderecoColeta", e.target.value)}
                        placeholder="Rua, número, bairro, CEP"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="enderecoEntrega">Endereço de Entrega</Label>
                      <Textarea
                        id="enderecoEntrega"
                        value={formData.enderecoEntrega}
                        onChange={(e) => handleInputChange("enderecoEntrega", e.target.value)}
                        placeholder="Rua, número, bairro, CEP"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Prazos e Contatos */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Prazos e Contatos</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prazoColeta">Data/Hora de Coleta</Label>
                      <Input
                        id="prazoColeta"
                        type="datetime-local"
                        value={formData.prazoColeta}
                        onChange={(e) => handleInputChange("prazoColeta", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
                      <Input
                        id="prazoEntrega"
                        type="datetime-local"
                        value={formData.prazoEntrega}
                        onChange={(e) => handleInputChange("prazoEntrega", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contatoColeta">Contato para Coleta</Label>
                      <Input
                        id="contatoColeta"
                        value={formData.contatoColeta}
                        onChange={(e) => handleInputChange("contatoColeta", e.target.value)}
                        placeholder="Nome e telefone"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contatoEntrega">Contato para Entrega</Label>
                      <Input
                        id="contatoEntrega"
                        value={formData.contatoEntrega}
                        onChange={(e) => handleInputChange("contatoEntrega", e.target.value)}
                        placeholder="Nome e telefone"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Valor e Observações */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Valor e Observações</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="valor">Valor do Frete (R$)</Label>
                    <Input
                      id="valor"
                      value={formData.valor}
                      onChange={(e) => handleInputChange("valor", e.target.value)}
                      placeholder="Ex: 1200.00"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="observacoes">Observações Adicionais</Label>
                    <Textarea
                      id="observacoes"
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange("observacoes", e.target.value)}
                      placeholder="Informações importantes sobre a carga, cuidados especiais, etc."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Botões */}
                <div className="flex space-x-4 pt-6">
                  <Button type="submit" className="flex-1" size="lg">
                    Publicar Frete
                  </Button>
                  <Link href="/dashboard/client" className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}