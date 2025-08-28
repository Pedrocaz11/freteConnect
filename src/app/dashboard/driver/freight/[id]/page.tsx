"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Package, Clock, DollarSign, Phone, User, Navigation, CheckCircle, Truck, Wallet } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Dados mockados do frete específico
const mockFreteDetalhes = {
  id: 4,
  origem: "São Paulo, SP",
  destino: "Santos, SP",
  distancia: "80 km",
  peso: "3.0 toneladas",
  dimensoes: "2m x 1.5m x 1.8m",
  valor: "R$ 450,00",
  valorNumerico: 450.00,
  prazo: "1 dia",
  tipo: "Equipamentos",
  tipoEmbalagem: "Engradados",
  cliente: "Industrial Corp",
  status: "aceito",
  urgente: false,
  dataAceite: "2024-01-20",
  prazoColeta: "2024-01-21T08:00",
  prazoEntrega: "2024-01-21T18:00",
  
  // Endereços completos
  enderecoColeta: "Rua das Indústrias, 123 - Vila Industrial",
  cidadeColeta: "São Paulo - SP",
  cepColeta: "01234-567",
  
  enderecoEntrega: "Porto de Santos, Armazém 15",
  cidadeEntrega: "Santos - SP", 
  cepEntrega: "11013-560",
  
  // Contatos
  contatoColeta: "João Silva",
  telefoneColeta: "(11) 99999-1234",
  contatoEntrega: "Maria Santos",
  telefoneEntrega: "(13) 88888-5678",
  
  // Observações
  observacoes: "Equipamentos industriais pesados. Necessário empilhadeira para carga e descarga. Horário de funcionamento: 8h às 17h. Apresentar documento de identidade na portaria.",
  
  // Dados do cliente
  clienteInfo: {
    nome: "Industrial Corp Ltda",
    cnpj: "12.345.678/0001-90",
    telefone: "(11) 3333-4444"
  }
};

export default function FreightDetailsPage() {
  const params = useParams();
  const [frete, setFrete] = useState(mockFreteDetalhes);
  const [statusFrete, setStatusFrete] = useState("aceito");
  const [pagamentoProcessado, setPagamentoProcessado] = useState(false);

  const handleIniciarColeta = () => {
    setStatusFrete("em_coleta");
    console.log("Iniciando coleta do frete");
  };

  const handleConfirmarColeta = () => {
    setStatusFrete("em_transito");
    console.log("Coleta confirmada, em trânsito");
  };

  const handleConfirmarEntrega = () => {
    setStatusFrete("entregue");
    
    // Simular processamento de pagamento automático
    setTimeout(() => {
      setPagamentoProcessado(true);
      console.log(`Pagamento de R$ ${frete.valorNumerico} processado automaticamente`);
    }, 2000);
    
    console.log("Entrega confirmada");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aceito":
        return <Badge className="bg-blue-600">Aceito - Aguardando Coleta</Badge>;
      case "em_coleta":
        return <Badge className="bg-orange-600">Em Coleta</Badge>;
      case "em_transito":
        return <Badge className="bg-purple-600">Em Trânsito</Badge>;
      case "entregue":
        return <Badge className="bg-green-600">Entregue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getNextAction = () => {
    switch (statusFrete) {
      case "aceito":
        return (
          <Button onClick={handleIniciarColeta} className="w-full" size="lg">
            <Truck className="mr-2 h-4 w-4" />
            Iniciar Coleta
          </Button>
        );
      case "em_coleta":
        return (
          <Button onClick={handleConfirmarColeta} className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirmar Coleta
          </Button>
        );
      case "em_transito":
        return (
          <Button onClick={handleConfirmarEntrega} className="w-full bg-green-600 hover:bg-green-700" size="lg">
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirmar Entrega
          </Button>
        );
      case "entregue":
        return (
          <div className="space-y-3">
            <Button disabled className="w-full bg-gray-400" size="lg">
              <CheckCircle className="mr-2 h-4 w-4" />
              Frete Concluído
            </Button>
            
            {pagamentoProcessado && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Pagamento Processado!
                      </p>
                      <p className="text-xs text-green-700">
                        R$ {frete.valorNumerico.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} foi creditado na sua conta.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/driver">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Detalhes do Frete #{frete.id}</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status e Informações Principais */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {frete.origem} → {frete.destino}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Cliente: {frete.cliente}
                  </CardDescription>
                </div>
                {getStatusBadge(statusFrete)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Peso</p>
                    <p className="font-semibold">{frete.peso}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Valor</p>
                    <p className="font-semibold text-green-600">{frete.valor}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Prazo</p>
                    <p className="font-semibold">{frete.prazo}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Distância</p>
                    <p className="font-semibold">{frete.distancia}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações de Pagamento */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Wallet className="mr-2 h-5 w-5" />
                Informações de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-blue-700">
                  <strong>Valor do frete:</strong> R$ {frete.valorNumerico.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Forma de pagamento:</strong> Automático após confirmação de entrega
                </p>
                <p className="text-xs text-blue-600">
                  O pagamento será creditado automaticamente na sua conta assim que você confirmar a entrega.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detalhes da Carga */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Detalhes da Carga
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tipo de Mercadoria</p>
                  <p className="font-semibold">{frete.tipo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo de Embalagem</p>
                  <p className="font-semibold">{frete.tipoEmbalagem}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dimensões</p>
                  <p className="font-semibold">{frete.dimensoes}</p>
                </div>
              </div>
              
              {frete.observacoes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Observações e Instruções Especiais</p>
                    <p className="text-sm bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      {frete.observacoes}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Endereços e Contatos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coleta */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <MapPin className="mr-2 h-5 w-5" />
                  Coleta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Endereço</p>
                  <p className="font-semibold">{frete.enderecoColeta}</p>
                  <p className="text-sm text-gray-600">{frete.cidadeColeta}</p>
                  <p className="text-sm text-gray-600">CEP: {frete.cepColeta}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-600">Contato</p>
                  <div className="flex items-center mt-1">
                    <User className="h-4 w-4 text-gray-600 mr-2" />
                    <p className="font-semibold">{frete.contatoColeta}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <Phone className="h-4 w-4 text-gray-600 mr-2" />
                    <a href={`tel:${frete.telefoneColeta}`} className="text-blue-600 hover:underline">
                      {frete.telefoneColeta}
                    </a>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-600">Data/Hora de Coleta</p>
                  <p className="font-semibold">
                    {new Date(frete.prazoColeta).toLocaleDateString('pt-BR')} às{' '}
                    {new Date(frete.prazoColeta).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Navigation className="mr-2 h-4 w-4" />
                  Abrir no Maps
                </Button>
              </CardContent>
            </Card>

            {/* Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <MapPin className="mr-2 h-5 w-5" />
                  Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Endereço</p>
                  <p className="font-semibold">{frete.enderecoEntrega}</p>
                  <p className="text-sm text-gray-600">{frete.cidadeEntrega}</p>
                  <p className="text-sm text-gray-600">CEP: {frete.cepEntrega}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-600">Contato</p>
                  <div className="flex items-center mt-1">
                    <User className="h-4 w-4 text-gray-600 mr-2" />
                    <p className="font-semibold">{frete.contatoEntrega}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <Phone className="h-4 w-4 text-gray-600 mr-2" />
                    <a href={`tel:${frete.telefoneEntrega}`} className="text-blue-600 hover:underline">
                      {frete.telefoneEntrega}
                    </a>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-gray-600">Prazo de Entrega</p>
                  <p className="font-semibold">
                    {new Date(frete.prazoEntrega).toLocaleDateString('pt-BR')} até{' '}
                    {new Date(frete.prazoEntrega).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Navigation className="mr-2 h-4 w-4" />
                  Abrir no Maps
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Informações do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informações do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Empresa</p>
                  <p className="font-semibold">{frete.clienteInfo.nome}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CNPJ</p>
                  <p className="font-semibold">{frete.clienteInfo.cnpj}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <a href={`tel:${frete.clienteInfo.telefone}`} className="font-semibold text-blue-600 hover:underline">
                    {frete.clienteInfo.telefone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ação Principal */}
          <Card>
            <CardContent className="p-6">
              {getNextAction()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}