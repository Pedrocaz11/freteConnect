"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus, Package, Clock, DollarSign, Truck, User, LogOut, Eye, Wallet, CreditCard, AlertCircle, CheckCircle, Shield, Info, TrendingUp, BarChart3, PieChart, Calendar, Download, Zap } from "lucide-react";
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
    motoristaVerificado: true,
    dataCriacao: "2024-01-15",
    dataColeta: "2024-01-16",
    telefoneMotorista: "(11) 99999-1234",
    emailMotorista: "joao.silva@email.com"
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
    motoristaVerificado: true,
    dataCriacao: "2024-01-10",
    dataColeta: "2024-01-11",
    telefoneMotorista: "(11) 88888-5678",
    emailMotorista: "maria.santos@email.com"
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
    motoristaVerificado: false,
    dataCriacao: "2024-01-18",
    dataColeta: null,
    telefoneMotorista: null,
    emailMotorista: null
  },
  {
    id: 4,
    origem: "São Paulo, SP",
    destino: "Santos, SP",
    peso: "3.0 toneladas",
    valor: "R$ 450,00",
    valorNumerico: 450.00,
    prazo: "1 dia",
    tipo: "Equipamentos",
    status: "aguardando_confirmacao_cliente",
    motorista: "João Silva",
    motoristaVerificado: true,
    dataCriacao: "2024-01-19",
    dataColeta: "2024-01-20",
    dataEntregaMotorista: "2024-01-20",
    telefoneMotorista: "(11) 99999-1234",
    emailMotorista: "joao.silva@email.com"
  }
];

// Dados financeiros detalhados
const mockDadosFinanceiros = {
  saldoAtual: 5950.00,
  faturamentoMensal: [
    { mes: "Jan", valor: 4200.00, fretes: 8 },
    { mes: "Dez", valor: 3800.00, fretes: 7 },
    { mes: "Nov", valor: 5100.00, fretes: 12 },
    { mes: "Out", valor: 2900.00, fretes: 6 },
    { mes: "Set", valor: 4600.00, fretes: 9 },
    { mes: "Ago", valor: 3200.00, fretes: 5 }
  ],
  transacoesPix: [
    { id: 1, tipo: "recarga", valor: 2000.00, data: "2024-01-20", status: "concluido", metodo: "PIX" },
    { id: 2, tipo: "recarga", valor: 3000.00, data: "2024-01-15", status: "concluido", metodo: "Cartão" },
    { id: 3, tipo: "frete", valor: -1200.00, data: "2024-01-14", status: "concluido", metodo: "PIX" }
  ]
};

// Histórico de transações do cliente
const mockHistoricoTransacoes = [
  {
    id: 1,
    tipo: "recarga",
    descricao: "Recarga de créditos via PIX",
    valor: 5000.00,
    data: "2024-01-20",
    status: "concluido",
    metodo: "PIX"
  },
  {
    id: 2,
    tipo: "frete",
    descricao: "Frete São Paulo → Rio de Janeiro",
    valor: -1200.00,
    data: "2024-01-15",
    status: "concluido",
    metodo: "PIX"
  },
  {
    id: 3,
    tipo: "frete",
    descricao: "Frete São Paulo → Belo Horizonte",
    valor: -850.00,
    data: "2024-01-10",
    status: "concluido",
    metodo: "PIX"
  },
  {
    id: 4,
    tipo: "recarga",
    descricao: "Recarga de créditos via Cartão",
    valor: 3000.00,
    data: "2024-01-05",
    status: "concluido",
    metodo: "Cartão"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "aguardando":
      return <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">Aguardando Motorista</Badge>;
    case "em_andamento":
      return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 border-0">Em Andamento</Badge>;
    case "aguardando_confirmacao_cliente":
      return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0">Confirmar Recebimento</Badge>;
    case "concluido":
      return <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 border-0">Concluído</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function ClientDashboard() {
  const [fretes, setFretes] = useState(mockFretes);
  const [historicoTransacoes] = useState(mockHistoricoTransacoes);
  const [dadosFinanceiros] = useState(mockDadosFinanceiros);
  const [saldoCreditos] = useState(5950.00);

  const fretesAguardando = fretes.filter(f => f.status === "aguardando").length;
  const fretesEmAndamento = fretes.filter(f => f.status === "em_andamento").length;
  const fretesConcluidos = fretes.filter(f => f.status === "concluido").length;
  const fretesAguardandoConfirmacao = fretes.filter(f => f.status === "aguardando_confirmacao_cliente").length;
  const gastoTotal = fretes
    .filter(f => f.status === "concluido")
    .reduce((total, frete) => total + frete.valorNumerico, 0);

  const valorReservado = fretes
    .filter(f => f.status === "aguardando" || f.status === "em_andamento" || f.status === "aguardando_confirmacao_cliente")
    .reduce((total, frete) => total + frete.valorNumerico, 0);

  const saldoDisponivel = saldoCreditos - valorReservado;

  const handleConfirmarRecebimento = (freteId: number) => {
    setFretes(prev => prev.map(frete => 
      frete.id === freteId 
        ? { ...frete, status: "concluido" }
        : frete
    ));
    console.log(`Recebimento do frete ${freteId} confirmado pelo cliente`);
  };

  const handlePixPayment = () => {
    console.log("Iniciando pagamento via PIX");
    // Implementar lógica de PIX
  };

  const handleCardPayment = () => {
    console.log("Iniciando pagamento via Cartão");
    // Implementar lógica de cartão
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Premium */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Dashboard Cliente
                  </h1>
                  <p className="text-sm text-gray-500">Gerencie seus fretes com facilidade</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-xl text-white shadow-lg">
                <Wallet className="h-4 w-4" />
                <span className="text-sm font-medium">
                  R$ {saldoCreditos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <Link href="/dashboard/client/credits">
                <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Recarregar
                </Button>
              </Link>
              <Link href="/dashboard/client/new-freight">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Frete
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Aviso de Responsabilidade Premium */}
        <Alert className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
          <Shield className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-sm text-blue-800">
            <strong>Responsabilidade Compartilhada:</strong> Como embarcador, você compartilha a responsabilidade pela carga com o transportador. 
            Dados de contato são revelados apenas após um motorista aceitar seu frete. Mantenha comunicação direta para garantir transparência e segurança.
          </AlertDescription>
        </Alert>

        {/* Alertas de Ação */}
        {fretesAguardandoConfirmacao > 0 && (
          <Card className="mb-8 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-yellow-800">
                    {fretesAguardandoConfirmacao} entrega(s) aguardando confirmação!
                  </p>
                  <p className="text-sm text-yellow-700">
                    Confirme o recebimento das mercadorias para liberar o pagamento aos motoristas.
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  Ver Entregas
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estatísticas Premium */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Créditos Totais</p>
                  <p className="text-2xl font-bold">
                    R$ {saldoCreditos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Aguardando</p>
                  <p className="text-2xl font-bold">{fretesAguardando}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium">Em Andamento</p>
                  <p className="text-2xl font-bold">{fretesEmAndamento}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Truck className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Concluídos</p>
                  <p className="text-2xl font-bold">{fretesConcluidos}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Gasto Total</p>
                  <p className="text-2xl font-bold">
                    R$ {gastoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Premium */}
        <Tabs defaultValue="fretes" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm p-1 rounded-xl shadow-lg">
            <TabsTrigger value="fretes" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg">
              Meus Fretes
            </TabsTrigger>
            <TabsTrigger value="financeiro" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg">
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="pagamentos" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg">
              Pagamentos
            </TabsTrigger>
          </TabsList>

          {/* Tab Fretes */}
          <TabsContent value="fretes" className="space-y-6">
            {/* Seção de Confirmações Pendentes */}
            {fretesAguardandoConfirmacao > 0 && (
              <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-700">
                    <AlertCircle className="mr-3 h-6 w-6" />
                    Confirmar Recebimento de Entregas
                  </CardTitle>
                  <CardDescription>
                    Confirme o recebimento das mercadorias para liberar o pagamento aos motoristas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fretes
                      .filter(f => f.status === "aguardando_confirmacao_cliente")
                      .map((frete) => (
                        <Card key={frete.id} className="border-yellow-200 bg-white/80 backdrop-blur-sm shadow-md">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-4">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {frete.origem} → {frete.destino}
                                  </h3>
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                                    Aguardando Confirmação
                                  </Badge>
                                  {frete.motoristaVerificado && (
                                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 border-0">
                                      <Shield className="mr-1 h-3 w-3" />
                                      Motorista Verificado
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                                  <div>
                                    <span className="font-medium">Peso:</span> {frete.peso}
                                  </div>
                                  <div>
                                    <span className="font-medium">Valor:</span> {frete.valor}
                                  </div>
                                  <div>
                                    <span className="font-medium">Motorista:</span> {frete.motorista}
                                  </div>
                                  <div>
                                    <span className="font-medium">Tipo:</span> {frete.tipo}
                                  </div>
                                </div>
                                
                                {/* Dados de contato do motorista revelados */}
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-3 border border-blue-200">
                                  <p className="text-sm text-blue-800">
                                    <strong>📞 Contato do motorista:</strong> {frete.telefoneMotorista}
                                  </p>
                                  <p className="text-sm text-blue-800">
                                    <strong>📧 Email:</strong> {frete.emailMotorista}
                                  </p>
                                </div>
                                
                                <p className="text-xs text-gray-500">
                                  Entrega realizada em: {frete.dataEntregaMotorista ? new Date(frete.dataEntregaMotorista).toLocaleDateString('pt-BR') : 'Data não disponível'}
                                </p>
                              </div>
                              
                              <div className="ml-6 space-y-2">
                                <Button 
                                  onClick={() => handleConfirmarRecebimento(frete.id)}
                                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Confirmar Recebimento
                                </Button>
                                <Button variant="outline" size="sm" className="w-full">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver Detalhes
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lista de Fretes Premium */}
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Meus Fretes
                    </CardTitle>
                    <CardDescription>
                      Gerencie todos os seus fretes em um só lugar
                    </CardDescription>
                  </div>
                  <Link href="/dashboard/client/new-freight">
                    <Button 
                      disabled={saldoDisponivel < 100}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Frete
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {fretes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Nenhum frete cadastrado
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Comece criando seu primeiro frete para encontrar motoristas.
                    </p>
                    <Link href="/dashboard/client/new-freight">
                      <Button 
                        disabled={saldoDisponivel < 100}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Criar Primeiro Frete
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fretes.map((frete) => (
                      <Card key={frete.id} className="border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {frete.origem} → {frete.destino}
                                </h3>
                                {getStatusBadge(frete.status)}
                                {frete.motoristaVerificado && frete.motorista && (
                                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 border-0">
                                    <Shield className="mr-1 h-3 w-3" />
                                    Verificado
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
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
                              
                              {frete.motorista ? (
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Motorista:</span> {frete.motorista}
                                  </p>
                                  {frete.telefoneMotorista && (
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200">
                                      <p className="text-xs text-blue-800">
                                        📞 {frete.telefoneMotorista} | 📧 {frete.emailMotorista}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="flex items-center text-xs text-gray-500">
                                  <Info className="mr-1 h-3 w-3" />
                                  Aguardando motorista aceitar
                                </div>
                              )}
                              
                              <p className="text-xs text-gray-500 mt-2">
                                Criado em: {new Date(frete.dataCriacao).toLocaleDateString('pt-BR')}
                                {frete.dataColeta && (
                                  <span> • Coleta: {new Date(frete.dataColeta).toLocaleDateString('pt-BR')}</span>
                                )}
                              </p>
                            </div>
                            
                            <div className="ml-6">
                              {frete.status === "aguardando_confirmacao_cliente" ? (
                                <Button 
                                  onClick={() => handleConfirmarRecebimento(frete.id)}
                                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                                  size="sm"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Confirmar
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Detalhes
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Financeiro Premium */}
          <TabsContent value="financeiro" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Resumo Financeiro */}
              <Card className="lg:col-span-1 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Wallet className="mr-3 h-6 w-6" />
                    Resumo Financeiro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Saldo total:</span>
                    <span className="text-xl font-bold">
                      R$ {saldoCreditos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Valor reservado:</span>
                    <span className="text-lg font-semibold text-orange-200">
                      - R$ {valorReservado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="border-t border-blue-400 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Disponível:</span>
                      <span className="text-2xl font-bold text-green-200">
                        R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <Progress value={(saldoDisponivel / saldoCreditos) * 100} className="bg-blue-400" />
                  <Link href="/dashboard/client/credits">
                    <Button className="w-full mt-4 bg-white text-blue-600 hover:bg-blue-50">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Recarregar Créditos
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Gráfico de Faturamento */}
              <Card className="lg:col-span-2 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-3 h-6 w-6 text-green-600" />
                    Faturamento Mensal
                  </CardTitle>
                  <CardDescription>
                    Acompanhe seu desempenho nos últimos meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dadosFinanceiros.faturamentoMensal.map((mes, index) => (
                      <div key={mes.mes} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {mes.mes}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              R$ {mes.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm text-gray-600">{mes.fretes} fretes</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Progress value={(mes.valor / 6000) * 100} className="w-24" />
                          <p className="text-xs text-gray-500 mt-1">
                            {((mes.valor / 6000) * 100).toFixed(0)}% da meta
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Últimas Transações */}
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-3 h-6 w-6 text-purple-600" />
                    Últimas Transações
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {historicoTransacoes.slice(0, 6).map((transacao) => (
                    <div key={transacao.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transacao.valor > 0 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                            : 'bg-gradient-to-r from-red-500 to-pink-600'
                        }`}>
                          {transacao.valor > 0 ? (
                            <Plus className="h-5 w-5 text-white" />
                          ) : (
                            <DollarSign className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{transacao.descricao}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(transacao.data).toLocaleDateString('pt-BR')}</span>
                            <Badge variant="outline" className="text-xs">
                              {transacao.metodo}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transacao.valor > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transacao.valor > 0 ? '+' : ''}R$ {Math.abs(transacao.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {transacao.status === "concluido" ? "Concluído" : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Pagamentos Premium */}
          <TabsContent value="pagamentos" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* PIX Payment */}
              <Card className="shadow-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Zap className="mr-3 h-6 w-6" />
                    Pagamento via PIX
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Recarga instantânea e segura
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <p className="text-sm text-green-100 mb-2">Vantagens do PIX:</p>
                    <ul className="text-sm space-y-1">
                      <li>✓ Transferência instantânea</li>
                      <li>✓ Disponível 24/7</li>
                      <li>✓ Sem taxas adicionais</li>
                      <li>✓ Máxima segurança</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={handlePixPayment}
                    className="w-full bg-white text-green-600 hover:bg-green-50"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Recarregar via PIX
                  </Button>
                </CardContent>
              </Card>

              {/* Card Payment */}
              <Card className="shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <CreditCard className="mr-3 h-6 w-6" />
                    Cartão de Crédito
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Parcelamento em até 12x
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-100 mb-2">Vantagens do Cartão:</p>
                    <ul className="text-sm space-y-1">
                      <li>✓ Parcelamento sem juros</li>
                      <li>✓ Aceita todos os bandeiras</li>
                      <li>✓ Processamento seguro</li>
                      <li>✓ Comprovante automático</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={handleCardPayment}
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Recarregar via Cartão
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Histórico de Pagamentos PIX */}
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-3 h-6 w-6 text-indigo-600" />
                  Histórico de Pagamentos
                </CardTitle>
                <CardDescription>
                  Todas as suas transações de recarga e pagamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dadosFinanceiros.transacoesPix.map((transacao) => (
                    <div key={transacao.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transacao.metodo === 'PIX' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                        }`}>
                          {transacao.metodo === 'PIX' ? (
                            <Zap className="h-5 w-5 text-white" />
                          ) : (
                            <CreditCard className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transacao.tipo === 'recarga' ? 'Recarga de créditos' : 'Pagamento de frete'}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{new Date(transacao.data).toLocaleDateString('pt-BR')}</span>
                            <Badge variant="outline" className="text-xs">
                              {transacao.metodo}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transacao.valor > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transacao.valor > 0 ? '+' : ''}R$ {Math.abs(transacao.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {transacao.status === "concluido" ? "Concluído" : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}