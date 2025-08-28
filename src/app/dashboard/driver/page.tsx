"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Package, Clock, DollarSign, Filter, Search, User, LogOut } from "lucide-react";
import Link from "next/link";

// Dados mockados de fretes disponíveis
const mockFretes = [
  {
    id: 1,
    origem: "São Paulo, SP",
    destino: "Rio de Janeiro, RJ",
    distancia: "430 km",
    peso: "2.5 toneladas",
    valor: "R$ 1.200,00",
    prazo: "2 dias",
    tipo: "Eletrônicos",
    cliente: "TechCorp Ltda",
    status: "disponivel",
    urgente: false
  },
  {
    id: 2,
    origem: "Belo Horizonte, MG",
    destino: "Brasília, DF",
    distancia: "740 km",
    peso: "5.0 toneladas",
    valor: "R$ 2.800,00",
    prazo: "3 dias",
    tipo: "Móveis",
    cliente: "MoveMax",
    status: "disponivel",
    urgente: true
  },
  {
    id: 3,
    origem: "Curitiba, PR",
    destino: "Florianópolis, SC",
    distancia: "300 km",
    peso: "1.8 toneladas",
    valor: "R$ 950,00",
    prazo: "1 dia",
    tipo: "Alimentos",
    cliente: "FreshFood",
    status: "disponivel",
    urgente: false
  },
  {
    id: 4,
    origem: "Salvador, BA",
    destino: "Recife, PE",
    distancia: "840 km",
    peso: "3.2 toneladas",
    valor: "R$ 2.100,00",
    prazo: "4 dias",
    tipo: "Medicamentos",
    cliente: "FarmaCorp",
    status: "disponivel",
    urgente: true
  }
];

export default function DriverDashboard() {
  const [fretes, setFretes] = useState(mockFretes);
  const [filtroOrigem, setFiltroOrigem] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  const handleAceitarFrete = (freteId: number) => {
    setFretes(prev => prev.map(frete => 
      frete.id === freteId 
        ? { ...frete, status: "aceito" }
        : frete
    ));
    console.log(`Frete ${freteId} aceito!`);
  };

  const fretesFiltrados = fretes.filter(frete => {
    const matchOrigem = !filtroOrigem || frete.origem.toLowerCase().includes(filtroOrigem.toLowerCase());
    const matchTipo = !filtroTipo || frete.tipo === filtroTipo;
    return matchOrigem && matchTipo && frete.status === "disponivel";
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Motorista</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Fretes Disponíveis</p>
                  <p className="text-2xl font-bold text-gray-900">{fretesFiltrados.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ganhos Este Mês</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 8.450</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Fretes Concluídos</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avaliação</p>
                  <p className="text-2xl font-bold text-gray-900">4.8⭐</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Buscar por origem
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Digite a cidade de origem..."
                    value={filtroOrigem}
                    onChange={(e) => setFiltroOrigem(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tipo de carga
                </label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os tipos</SelectItem>
                    <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                    <SelectItem value="Móveis">Móveis</SelectItem>
                    <SelectItem value="Alimentos">Alimentos</SelectItem>
                    <SelectItem value="Medicamentos">Medicamentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFiltroOrigem("");
                    setFiltroTipo("");
                  }}
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Fretes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Fretes Disponíveis ({fretesFiltrados.length})
          </h2>
          
          {fretesFiltrados.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum frete encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar os filtros ou aguarde novos fretes serem publicados.
                </p>
              </CardContent>
            </Card>
          ) : (
            fretesFiltrados.map((frete) => (
              <Card key={frete.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {frete.origem} → {frete.destino}
                        </h3>
                        {frete.urgente && (
                          <Badge variant="destructive">Urgente</Badge>
                        )}
                        <Badge variant="secondary">{frete.tipo}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-1 h-4 w-4" />
                          {frete.distancia}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="mr-1 h-4 w-4" />
                          {frete.peso}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="mr-1 h-4 w-4" />
                          {frete.prazo}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="mr-1 h-4 w-4" />
                          {frete.valor}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        Cliente: {frete.cliente}
                      </p>
                    </div>
                    
                    <div className="ml-6">
                      <Button 
                        onClick={() => handleAceitarFrete(frete.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Aceitar Frete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}