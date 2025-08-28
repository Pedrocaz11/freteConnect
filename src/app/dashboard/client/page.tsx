"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Clock, DollarSign, Truck, User, LogOut, Eye, Wallet, CreditCard, AlertCircle } from "lucide-react";
import Link from "next/link";

// Dados mockados de fretes do cliente
const mockFretes = [
  {
    id: 1,
    origem: "São Paulo, SP",
    destino: "Rio de Janeiro, RJ",
    peso: "2.5 toneladas",
    valor: "R$ 1.200,00",
    valorNumerico: 1200.00,
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
    valorNumerico: 850.00,
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
    valorNumerico: 1500.00,
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
    valorNumerico: 2200.00,
    prazo: "3 dias",
    tipo: "Equipamentos",
    status: "aguardando",
    motorista: null,
    dataCriacao: "2024-01-19",
    dataColeta: null
  }
];

// Histórico de transações do cliente
const mockHistoricoTransacoes = [
  {
    id: 1,
    tipo: "recarga",
    descricao: "Recarga de créditos",
    valor: 5000.00,
    data: "2024-01-20",
    status: "concluido"
  },
  {
    id: 2,
    tipo: "frete",
    descricao: "Frete São Paulo → Rio de Janeiro",
    valor: -1200.00,
    data: "2024-01-15",
    status: "concluido"
  },
  {
    id: 3,
    tipo: "frete",
    descricao: "Frete São Paulo → Belo Horizonte",
    valor: -850.00,
    data: "2024-01-10",
    status: "concluido"
  },
  {
    id: 4,
    tipo: "recarga",
    descricao: "Recarga de créditos",
    valor: 3000.00,
    data: "2024-01-05",
    status: "concluido"
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
  const [historicoTransacoes] = useState(mockHistoricoTransacoes);
  const [saldoCreditos] = useState(5950.00); // Saldo atual de créditos

  const fretesAguardando = fretes.filter(f => f.status === "aguardando").length;
  const fretesEmAndamento = fretes.filter(f => f.status === "em_andamento").length;
  const fretesConcluidos = fretes.filter(f => f.status === "concluido").length;
  const gastoTotal = fretes
    .filter(f => f.status === "concluido")
    .reduce((total, frete) => total + frete.valorNumerico, 0);

  // Valor reservado para fretes aguardando e em andamento
  const valorReservado = fretes
    .filter(f => f.status === "aguardando" || f.status === "em_andamento")
    .reduce((total, frete) => total + frete.valorNumerico, 0);

  const saldoDisponivel = saldoCreditos - valorReservado;

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
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Wallet className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Créditos: R$ {saldoCreditos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <Link href="/dashboard/client/credits">
                <Button variant="outline" size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Recarregar
                </Button>
              </Link>
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
        {/* Alerta de saldo baixo */}
        {saldoDisponivel < 1000 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    Saldo baixo! Você tem apenas R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} disponível.
                  </p>
                  <p className="text-xs text-orange-700">
                    Recarregue seus créditos para continuar publicando fretes.
                  </p>
                </div>
                <Link href="/dashboard/client/credits">
                  <Button size="sm" className="ml-auto">
                    Recarregar Agora
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wallet className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Créditos Totais</p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {saldoCreditos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-blue-600" />
                Resumo de Créditos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Saldo total:</span>
                <span className="font-semibold">
                  R$ {saldoCreditos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Valor reservado:</span>
                <span className="font-semibold text-orange-600">
                  - R$ {valorReservado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900">Disponível:</span>
                  <span className="font-bold text-green-600">
                    R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <Link href="/dashboard/client/credits">
                <Button className="w-full mt-4">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Recarregar Créditos
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {historicoTransacoes.slice(0, 4).map((transacao) => (
                  <div key={transacao.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{transacao.descricao}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(transacao.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${
                        transacao.valor > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transacao.valor > 0 ? '+' : ''}R$ {Math.abs(transacao.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
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
                <Button disabled={saldoDisponivel < 100}>
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
                  <Button disabled={saldoDisponivel < 100}>
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