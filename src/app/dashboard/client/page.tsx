"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Clock, DollarSign, Truck, User, LogOut, Eye } from "lucide-react";
import Link from "next/link";

// Dados mockados de fretes do cliente
const mockFretes = [
  {
    id: 1,
    origem: "São Paulo, SP",
    destino: "Rio de Janeiro, RJ",
    peso: "2.5 toneladas",
    valor: "R$ 1.200,00",
    prazo: "2 dias",
    tipo: "Eletrônicos",
    status: "em_andamento",
    motorista: "João Silva",
    dataCriacao: "2024-01-15",
    dataColeta: "2024-01-16"
  },
  {
    id: 2,
    origem: "São Paulo, SP",
    destino: "Belo Horizonte, MG",
    peso: "1.8 toneladas",
    valor: "R$ 850,00",
    prazo: "1 dia",
    tipo: "Documentos",
    status: "concluido",
    motorista: "Maria Santos",
    dataCriacao: "2024-01-10",
    dataColeta: "2024-01-11"
  },
  {
    id: 3,
    origem: "São Paulo, SP",
    destino: "Curitiba, PR",
    peso: "3.2 toneladas",
    valor: "R$ 1.500,00",
    prazo: "2 dias",
    tipo: "Móveis",
    status: "aguardando",
    motorista: null,
    dataCriacao: "2024-01-18",
    dataColeta: null
  },
  {
    id: 4,
    origem: "São Paulo, SP",
    destino: "Salvador, BA",
    peso: "4.0 toneladas",
    valor: "R$ 2.200,00",
    prazo: "3 dias",
    tipo: "Equipamentos",
    status: "aguardando",
    motorista: null,
    dataCriacao: "2024-01-19",
    dataColeta: null
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "aguardando":
      return <Badge variant="secondary">Aguardando Motorista</Badge>;
    case "em_andamento":
      return <Badge className="bg-blue-600">Em Andamento</Badge>;
    case "concluido":
      return <Badge className="bg-green-600">Concluído</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function ClientDashboard() {
  const [fretes] = useState(mockFretes);

  const fretesAguardando = fretes.filter(f => f.status === "aguardando").length;
  const fretesEmAndamento = fretes.filter(f => f.status === "em_andamento").length;
  const fretesConcluidos = fretes.filter(f => f.status === "concluido").length;
  const gastoTotal = fretes
    .filter(f => f.status === "concluido")
    .reduce((total, frete) => total + parseFloat(frete.valor.replace("R$ ", "").replace(".", "").replace(",", ".")), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Cliente</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/client/new-freight">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Frete
                </Button>
              </Link>
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
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aguardando</p>
                  <p className="text-2xl font-bold text-gray-900">{fretesAguardando}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                  <p className="text-2xl font-bold text-gray-900">{fretesEmAndamento}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Concluídos</p>
                  <p className="text-2xl font-bold text-gray-900">{fretesConcluidos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Gasto Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {gastoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Fretes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Meus Fretes</CardTitle>
                <CardDescription>
                  Gerencie todos os seus fretes em um só lugar
                </CardDescription>
              </div>
              <Link href="/dashboard/client/new-freight">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Frete
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {fretes.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum frete cadastrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Comece criando seu primeiro frete para encontrar motoristas.
                </p>
                <Link href="/dashboard/client/new-freight">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Frete
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {fretes.map((frete) => (
                  <div key={frete.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {frete.origem} → {frete.destino}
                          </h3>
                          {getStatusBadge(frete.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                          <div>
                            <span className="font-medium">Peso:</span> {frete.peso}
                          </div>
                          <div>
                            <span className="font-medium">Valor:</span> {frete.valor}
                          </div>
                          <div>
                            <span className="font-medium">Prazo:</span> {frete.prazo}
                          </div>
                          <div>
                            <span className="font-medium">Tipo:</span> {frete.tipo}
                          </div>
                        </div>
                        
                        {frete.motorista && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Motorista:</span> {frete.motorista}
                          </p>
                        )}
                        
                        <p className="text-xs text-gray-500 mt-1">
                          Criado em: {new Date(frete.dataCriacao).toLocaleDateString('pt-BR')}
                          {frete.dataColeta && (
                            <span> • Coleta: {new Date(frete.dataColeta).toLocaleDateString('pt-BR')}</span>
                          )}
                        </p>
                      </div>
                      
                      <div className="ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}