"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Package, Clock, DollarSign, Filter, Search, User, LogOut, Eye, CheckCircle, AlertTriangle, Box, Wallet, TrendingUp, CreditCard, Shield, Info } from "lucide-react";
import Link from "next/link";

// Dados mockados de fretes disponíveis (sem dados pessoais expostos)
const mockFretesDisponiveis = [
  {
    id: 1,
    origem: "São Paulo, SP",
    destino: "Rio de Janeiro, RJ",
    distancia: "430 km",
    peso: "2.5 toneladas",
    valor: "R$ 1.200,00",
    valorNumerico: 1200.00,
    prazo: "2 dias",
    tipo: "Eletrônicos",
    tipoEmbalagem: "pallet-pbr",
    tipoEmbalagemLabel: "Pallet (PBR)",
    cliente: "TechCorp Ltda", // Nome da empresa pode ser mostrado
    clienteVerificado: true,
    status: "disponivel",
    urgente: false,
    cargaIMO: false,
    numeroONU: "",
    // Dados pessoais ocultos até aceite
    dadosPessoaisOcultos: true
  },
  {
    id: 2,
    origem: "Belo Horizonte, MG",
    destino: "Brasília, DF",
    distancia: "740 km",
    peso: "5.0 toneladas",
    valor: "R$ 2.800,00",
    valorNumerico: 2800.00,
    prazo: "3 dias",
    tipo: "Móveis",
    tipoEmbalagem: "solto",
    tipoEmbalagemLabel: "Carga Solta",
    cliente: "MoveMax",
    clienteVerificado: true,
    status: "disponivel",
    urgente: true,
    cargaIMO: false,
    numeroONU: "",
    dadosPessoaisOcultos: true
  },
  {
    id: 3,
    origem: "Curitiba, PR",
    destino: "Florianópolis, SC",
    distancia: "300 km",
    peso: "1.8 toneladas",
    valor: "R$ 950,00",
    valorNumerico: 950.00,
    prazo: "1 dia",
    tipo: "Alimentos",
    tipoEmbalagem: "caixas",
    tipoEmbalagemLabel: "Caixas de Papelão",
    cliente: "FreshFood",
    clienteVerificado: true,
    status: "disponivel",
    urgente: false,
    cargaIMO: false,
    numeroONU: "",
    dadosPessoaisOcultos: true
  }
];

// Dados mockados de fretes aceitos pelo motorista (com dados pessoais revelados)
const mockFretesAceitos = [
  {
    id: 4,
    origem: "São Paulo, SP",
    destino: "Santos, SP",
    distancia: "80 km",
    peso: "3.0 toneladas",
    valor: "R$ 450,00",
    valorNumerico: 450.00,
    prazo: "1 dia",
    tipo: "Equipamentos",
    tipoEmbalagem: "engradados",
    tipoEmbalagemLabel: "Engradados",
    cliente: "Industrial Corp",
    clienteVerificado: true,
    status: "aceito",
    urgente: false,
    cargaIMO: false,
    numeroONU: "",
    dataAceite: "2024-01-20",
    // Dados pessoais revelados após aceite
    dadosPessoaisOcultos: false,
    enderecoColeta: "Rua das Indústrias, 123 - Vila Industrial, São Paulo - SP",
    enderecoEntrega: "Porto de Santos, Armazém 15 - Santos - SP",
    contatoColeta: "João Silva - (11) 99999-1234",
    contatoEntrega: "Maria Santos - (13) 88888-5678",
    emailCliente: "contato@industrialcorp.com.br"
  }
];

// Histórico de ganhos do motorista
const mockHistoricoGanhos = [
  {
    id: 1,
    frete: "São Paulo → Rio de Janeiro",
    valor: 1200.00,
    data: "2024-01-15",
    status: "recebido",
    cliente: "TechCorp Ltda"
  },
  {
    id: 2,
    frete: "Campinas → Santos",
    valor: 380.00,
    data: "2024-01-12",
    status: "recebido",
    cliente: "LogiCorp"
  },
  {
    id: 3,
    frete: "São Paulo → Belo Horizonte",
    valor: 850.00,
    data: "2024-01-08",
    status: "recebido",
    cliente: "MoveMax"
  },
  {
    id: 4,
    frete: "Santos → Guarulhos",
    valor: 320.00,
    data: "2024-01-05",
    status: "recebido",
    cliente: "FastCargo"
  }
];

export default function DriverDashboard() {
  const [fretesDisponiveis, setFretesDisponiveis] = useState(mockFretesDisponiveis);
  const [fretesAceitos, setFretesAceitos] = useState(mockFretesAceitos);
  const [historicoGanhos] = useState(mockHistoricoGanhos);
  const [filtroOrigem, setFiltroOrigem] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroEmbalagem, setFiltroEmbalagem] = useState("");
  const [filtroIMO, setFiltroIMO] = useState("");

  // Cálculos financeiros
  const saldoAtual = 3250.75;
  const ganhosEsteMes = historicoGanhos.reduce((total, ganho) => total + ganho.valor, 0);
  const fretesEntregues = historicoGanhos.length;

  const handleAceitarFrete = (freteId: number) => {
    const frete = fretesDisponiveis.find(f => f.id === freteId);
    if (frete) {
      // Remove da lista de disponíveis
      setFretesDisponiveis(prev => prev.filter(f => f.id !== freteId));
      
      // Adiciona na lista de aceitos com dados completos revelados
      const freteAceito = {
        ...frete,
        status: "aceito",
        dataAceite: new Date().toISOString().split('T')[0],
        dadosPessoaisOcultos: false,
        // Dados pessoais são revelados após aceite
        enderecoColeta: "Endereço completo será fornecido após confirmação",
        enderecoEntrega: "Endereço completo será fornecido após confirmação",
        contatoColeta: "Contato será fornecido",
        contatoEntrega: "Contato será fornecido",
        emailCliente: "Email do cliente será fornecido"
      };
      
      setFretesAceitos(prev => [...prev, freteAceito]);
      console.log(`Frete ${freteId} aceito! Dados pessoais agora disponíveis.`);
    }
  };

  const fretesFiltrados = fretesDisponiveis.filter(frete => {
    const matchOrigem = !filtroOrigem || frete.origem.toLowerCase().includes(filtroOrigem.toLowerCase());
    const matchTipo = !filtroTipo || frete.tipo === filtroTipo;
    const matchEmbalagem = !filtroEmbalagem || frete.tipoEmbalagem === filtroEmbalagem;
    const matchIMO = !filtroIMO || (filtroIMO === "sim" ? frete.cargaIMO : !frete.cargaIMO);
    return matchOrigem && matchTipo && matchEmbalagem && matchIMO && frete.status === "disponivel";
  });

  const limparFiltros = () => {
    setFiltroOrigem("");
    setFiltroTipo("");
    setFiltroEmbalagem("");
    setFiltroIMO("");
  };

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
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                <Wallet className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Saldo: R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <Link href="/dashboard/driver/profile">
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </Button>
              </Link>
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
        {/* Aviso de Responsabilidade */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Importante:</strong> A responsabilidade pela carga é compartilhada entre embarcador e transportador. 
            Dados pessoais de contato são revelados apenas após aceite do frete para proteção de ambas as partes. 
            Mantenha comunicação direta para garantir segurança e transparência no transporte.
          </AlertDescription>
        </Alert>

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
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Fretes Entregues</p>
                  <p className="text-2xl font-bold text-gray-900">{fretesEntregues}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ganhos Este Mês</p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {ganhosEsteMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wallet className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Saldo Disponível</p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para Fretes Disponíveis, Aceitos e Financeiro */}
        <Tabs defaultValue="disponiveis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="disponiveis">Fretes Disponíveis</TabsTrigger>
            <TabsTrigger value="aceitos">Meus Fretes</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          </TabsList>

          {/* Tab de Fretes Disponíveis */}
          <TabsContent value="disponiveis" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Buscar por origem
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Digite a cidade..."
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
                        <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                        <SelectItem value="Móveis">Móveis</SelectItem>
                        <SelectItem value="Alimentos">Alimentos</SelectItem>
                        <SelectItem value="Medicamentos">Medicamentos</SelectItem>
                        <SelectItem value="Químicos">Químicos</SelectItem>
                        <SelectItem value="Combustíveis">Combustíveis</SelectItem>
                        <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Tipo de embalagem
                    </label>
                    <Select value={filtroEmbalagem} onValueChange={setFiltroEmbalagem}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pallet-pbr">Pallet (PBR)</SelectItem>
                        <SelectItem value="pallet-europeu">Pallet Europeu</SelectItem>
                        <SelectItem value="container-20">Container 20 pés</SelectItem>
                        <SelectItem value="container-40">Container 40 pés</SelectItem>
                        <SelectItem value="caixas">Caixas</SelectItem>
                        <SelectItem value="sacas">Sacas/Big Bags</SelectItem>
                        <SelectItem value="tambores">Tambores</SelectItem>
                        <SelectItem value="solto">Carga Solta</SelectItem>
                        <SelectItem value="engradados">Engradados</SelectItem>
                        <SelectItem value="refrigerada">Refrigerada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Carga IMO
                    </label>
                    <Select value={filtroIMO} onValueChange={setFiltroIMO}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Apenas IMO</SelectItem>
                        <SelectItem value="nao">Sem IMO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      onClick={limparFiltros}
                      className="w-full"
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Fretes Disponíveis */}
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
                            {frete.cargaIMO && (
                              <Badge className="bg-orange-600">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                IMO
                              </Badge>
                            )}
                            {frete.clienteVerificado && (
                              <Badge className="bg-green-600">
                                <Shield className="mr-1 h-3 w-3" />
                                Verificado
                              </Badge>
                            )}
                            <Badge variant="secondary">{frete.tipo}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
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
                            <div className="flex items-center text-sm text-green-600 font-semibold">
                              <DollarSign className="mr-1 h-4 w-4" />
                              {frete.valor}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Box className="mr-1 h-4 w-4" />
                              {frete.tipoEmbalagemLabel}
                            </div>
                            {frete.cargaIMO && (
                              <div className="text-sm text-orange-600 font-medium">
                                {frete.numeroONU}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                              Cliente: {frete.cliente}
                            </p>
                            <div className="flex items-center text-xs text-blue-600">
                              <Info className="mr-1 h-3 w-3" />
                              Dados de contato revelados após aceite
                            </div>
                          </div>
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
          </TabsContent>

          {/* Tab de Fretes Aceitos */}
          <TabsContent value="aceitos" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Meus Fretes ({fretesAceitos.length})
              </h2>
              
              {fretesAceitos.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum frete aceito ainda
                    </h3>
                    <p className="text-gray-600">
                      Aceite fretes disponíveis para vê-los aqui com todos os detalhes.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                fretesAceitos.map((frete) => (
                  <Card key={frete.id} className="border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {frete.origem} → {frete.destino}
                            </h3>
                            <Badge className="bg-green-600">Aceito</Badge>
                            {frete.cargaIMO && (
                              <Badge className="bg-orange-600">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                IMO
                              </Badge>
                            )}
                            <Badge className="bg-blue-600">
                              <Shield className="mr-1 h-3 w-3" />
                              Dados Liberados
                            </Badge>
                            <Badge variant="secondary">{frete.tipo}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Package className="mr-1 h-4 w-4" />
                              {frete.peso}
                            </div>
                            <div className="flex items-center text-sm text-green-600 font-semibold">
                              <DollarSign className="mr-1 h-4 w-4" />
                              {frete.valor}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="mr-1 h-4 w-4" />
                              {frete.prazo}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Box className="mr-1 h-4 w-4" />
                              {frete.tipoEmbalagemLabel}
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-6">
                          <Link href={`/dashboard/driver/freight/${frete.id}`}>
                            <Button variant="outline">
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Informações de Contato e Endereços - Agora Reveladas */}
                      <div className="border-t pt-4 space-y-3">
                        <Alert className="border-green-200 bg-green-50">
                          <Shield className="h-4 w-4" />
                          <AlertDescription className="text-sm text-green-800">
                            <strong>Dados de contato liberados:</strong> Você agora tem acesso aos dados completos para comunicação direta com o embarcador.
                          </AlertDescription>
                        </Alert>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">📍 Endereço de Coleta</h4>
                            <p className="text-sm text-gray-600">{frete.enderecoColeta}</p>
                            <p className="text-sm text-blue-600 mt-1">👤 {frete.contatoColeta}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">🎯 Endereço de Entrega</h4>
                            <p className="text-sm text-gray-600">{frete.enderecoEntrega}</p>
                            <p className="text-sm text-blue-600 mt-1">👤 {frete.contatoEntrega}</p>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>📧 Email do cliente:</strong> {frete.emailCliente}
                          </p>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Aceito em: {new Date(frete.dataAceite).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Tab Financeiro */}
          <TabsContent value="financeiro" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2 h-5 w-5 text-green-600" />
                    Saldo Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Disponível para saque
                  </p>
                  <Button className="mt-4 w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Solicitar Saque
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                    Resumo do Mês
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Fretes entregues:</span>
                      <span className="font-semibold">{fretesEntregues}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total ganho:</span>
                      <span className="font-semibold text-green-600">
                        R$ {ganhosEsteMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Média por frete:</span>
                      <span className="font-semibold">
                        R$ {(ganhosEsteMes / fretesEntregues).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Ganhos</CardTitle>
                <CardDescription>
                  Seus últimos recebimentos de fretes entregues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicoGanhos.map((ganho) => (
                    <div key={ganho.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{ganho.frete}</h4>
                        <p className="text-sm text-gray-600">Cliente: {ganho.cliente}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(ganho.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">
                          + R$ {ganho.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <Badge className="bg-green-100 text-green-800">
                          {ganho.status === "recebido" ? "Recebido" : "Pendente"}
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