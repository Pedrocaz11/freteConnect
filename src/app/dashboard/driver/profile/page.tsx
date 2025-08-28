"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Truck, FileText, Plus, Edit, Trash2, Upload, CheckCircle, Clock, AlertCircle, Eye, Save } from "lucide-react";
import Link from "next/link";

// Dados mockados do motorista
const mockMotorista = {
  id: 1,
  nome: "João Silva Santos",
  email: "joao.silva@email.com",
  telefone: "(11) 99999-1234",
  cnh: "12345678901",
  categoriaCNH: "D",
  validadeCNH: "2026-12-15",
  endereco: "Rua das Flores, 123 - Vila Nova, São Paulo - SP",
  cep: "01234-567",
  dataNascimento: "1985-03-15",
  cpf: "123.456.789-01",
  statusVerificacao: "aprovado", // pendente, em_analise, aprovado, rejeitado
  dataUltimaAtualizacao: "2024-01-15"
};

// Dados mockados dos veículos
const mockVeiculos = [
  {
    id: 1,
    placa: "ABC-1234",
    modelo: "Mercedes-Benz Sprinter",
    ano: 2020,
    capacidade: "3.5 toneladas",
    tipo: "van",
    tipoLabel: "Van",
    status: "aprovado",
    principal: true
  },
  {
    id: 2,
    placa: "DEF-5678",
    modelo: "Iveco Daily",
    ano: 2019,
    capacidade: "5.0 toneladas",
    tipo: "caminhao-pequeno",
    tipoLabel: "Caminhão Pequeno",
    status: "em_analise",
    principal: false
  }
];

// Dados mockados dos documentos
const mockDocumentos = [
  {
    id: 1,
    tipo: "cnh",
    nome: "CNH - Carteira Nacional de Habilitação",
    arquivo: "cnh_joao_silva.pdf",
    dataEnvio: "2024-01-10",
    status: "aprovado"
  },
  {
    id: 2,
    tipo: "cpf",
    nome: "CPF - Cadastro de Pessoa Física",
    arquivo: "cpf_joao_silva.pdf",
    dataEnvio: "2024-01-10",
    status: "aprovado"
  },
  {
    id: 3,
    tipo: "comprovante_residencia",
    nome: "Comprovante de Residência",
    arquivo: "comprovante_residencia.pdf",
    dataEnvio: "2024-01-12",
    status: "em_analise"
  },
  {
    id: 4,
    tipo: "crlv_abc1234",
    nome: "CRLV - ABC-1234",
    arquivo: "crlv_abc1234.pdf",
    dataEnvio: "2024-01-10",
    status: "aprovado"
  },
  {
    id: 5,
    tipo: "crlv_def5678",
    nome: "CRLV - DEF-5678",
    arquivo: "crlv_def5678.pdf",
    dataEnvio: "2024-01-15",
    status: "pendente"
  }
];

export default function DriverProfilePage() {
  const [motorista, setMotorista] = useState(mockMotorista);
  const [veiculos, setVeiculos] = useState(mockVeiculos);
  const [documentos, setDocumentos] = useState(mockDocumentos);
  const [editandoDados, setEditandoDados] = useState(false);
  const [novoVeiculo, setNovoVeiculo] = useState({
    placa: "",
    modelo: "",
    ano: "",
    capacidade: "",
    tipo: ""
  });
  const [mostrandoFormVeiculo, setMostrandoFormVeiculo] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-green-600"><CheckCircle className="mr-1 h-3 w-3" />Aprovado</Badge>;
      case "em_analise":
        return <Badge className="bg-blue-600"><Clock className="mr-1 h-3 w-3" />Em Análise</Badge>;
      case "pendente":
        return <Badge className="bg-orange-600"><Clock className="mr-1 h-3 w-3" />Pendente</Badge>;
      case "rejeitado":
        return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Rejeitado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSalvarDados = () => {
    console.log("Salvando dados do motorista:", motorista);
    setEditandoDados(false);
    // Simular salvamento
  };

  const handleAdicionarVeiculo = () => {
    if (novoVeiculo.placa && novoVeiculo.modelo) {
      const veiculo = {
        id: Date.now(),
        ...novoVeiculo,
        ano: parseInt(novoVeiculo.ano),
        status: "pendente",
        principal: veiculos.length === 0,
        tipoLabel: getTipoLabel(novoVeiculo.tipo)
      };
      setVeiculos(prev => [...prev, veiculo]);
      setNovoVeiculo({ placa: "", modelo: "", ano: "", capacidade: "", tipo: "" });
      setMostrandoFormVeiculo(false);
      console.log("Novo veículo adicionado:", veiculo);
    }
  };

  const handleRemoverVeiculo = (id: number) => {
    setVeiculos(prev => prev.filter(v => v.id !== id));
    console.log("Veículo removido:", id);
  };

  const handleDefinirPrincipal = (id: number) => {
    setVeiculos(prev => prev.map(v => ({
      ...v,
      principal: v.id === id
    })));
    console.log("Veículo principal definido:", id);
  };

  const getTipoLabel = (tipo: string) => {
    const tipos = {
      "van": "Van",
      "caminhao-pequeno": "Caminhão Pequeno",
      "caminhao-medio": "Caminhão Médio",
      "caminhao-grande": "Caminhão Grande",
      "carreta": "Carreta"
    };
    return tipos[tipo as keyof typeof tipos] || tipo;
  };

  const handleUploadDocumento = (tipo: string) => {
    // Simular upload de documento
    const novoDoc = {
      id: Date.now(),
      tipo,
      nome: `Documento ${tipo}`,
      arquivo: `${tipo}_${Date.now()}.pdf`,
      dataEnvio: new Date().toISOString().split('T')[0],
      status: "pendente"
    };
    setDocumentos(prev => [...prev, novoDoc]);
    console.log("Documento enviado:", novoDoc);
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
            <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Status de Verificação */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="h-8 w-8 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{motorista.nome}</h2>
                    <p className="text-sm text-gray-600">Motorista desde janeiro de 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Status da Conta</p>
                  {getStatusBadge(motorista.statusVerificacao)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="dados" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="veiculos">Veículos</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>

            {/* Tab Dados Pessoais */}
            <TabsContent value="dados">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <User className="mr-2 h-5 w-5" />
                        Dados Pessoais
                      </CardTitle>
                      <CardDescription>
                        Mantenha suas informações sempre atualizadas
                      </CardDescription>
                    </div>
                    {!editandoDados ? (
                      <Button onClick={() => setEditandoDados(true)} variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                    ) : (
                      <div className="space-x-2">
                        <Button onClick={handleSalvarDados}>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar
                        </Button>
                        <Button onClick={() => setEditandoDados(false)} variant="outline">
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        value={motorista.nome}
                        onChange={(e) => setMotorista(prev => ({ ...prev, nome: e.target.value }))}
                        disabled={!editandoDados}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={motorista.email}
                        onChange={(e) => setMotorista(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!editandoDados}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={motorista.telefone}
                        onChange={(e) => setMotorista(prev => ({ ...prev, telefone: e.target.value }))}
                        disabled={!editandoDados}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        value={motorista.cpf}
                        disabled
                        className="bg-gray-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">CPF não pode ser alterado</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                      <Input
                        id="dataNascimento"
                        type="date"
                        value={motorista.dataNascimento}
                        onChange={(e) => setMotorista(prev => ({ ...prev, dataNascimento: e.target.value }))}
                        disabled={!editandoDados}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={motorista.cep}
                        onChange={(e) => setMotorista(prev => ({ ...prev, cep: e.target.value }))}
                        disabled={!editandoDados}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="endereco">Endereço Completo</Label>
                    <Textarea
                      id="endereco"
                      value={motorista.endereco}
                      onChange={(e) => setMotorista(prev => ({ ...prev, endereco: e.target.value }))}
                      disabled={!editandoDados}
                      rows={2}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informações da CNH</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="cnh">Número da CNH</Label>
                        <Input
                          id="cnh"
                          value={motorista.cnh}
                          onChange={(e) => setMotorista(prev => ({ ...prev, cnh: e.target.value }))}
                          disabled={!editandoDados}
                        />
                      </div>
                      <div>
                        <Label htmlFor="categoriaCNH">Categoria</Label>
                        <Select 
                          value={motorista.categoriaCNH} 
                          onValueChange={(value) => setMotorista(prev => ({ ...prev, categoriaCNH: value }))}
                          disabled={!editandoDados}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                            <SelectItem value="E">E</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="validadeCNH">Validade</Label>
                        <Input
                          id="validadeCNH"
                          type="date"
                          value={motorista.validadeCNH}
                          onChange={(e) => setMotorista(prev => ({ ...prev, validadeCNH: e.target.value }))}
                          disabled={!editandoDados}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Veículos */}
            <TabsContent value="veiculos">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Truck className="mr-2 h-5 w-5" />
                        Meus Veículos
                      </CardTitle>
                      <CardDescription>
                        Gerencie os veículos cadastrados na sua conta
                      </CardDescription>
                    </div>
                    <Button onClick={() => setMostrandoFormVeiculo(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Veículo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Formulário de Novo Veículo */}
                  {mostrandoFormVeiculo && (
                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-lg">Adicionar Novo Veículo</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="novaPlaca">Placa</Label>
                            <Input
                              id="novaPlaca"
                              value={novoVeiculo.placa}
                              onChange={(e) => setNovoVeiculo(prev => ({ ...prev, placa: e.target.value }))}
                              placeholder="ABC-1234"
                            />
                          </div>
                          <div>
                            <Label htmlFor="novoModelo">Modelo</Label>
                            <Input
                              id="novoModelo"
                              value={novoVeiculo.modelo}
                              onChange={(e) => setNovoVeiculo(prev => ({ ...prev, modelo: e.target.value }))}
                              placeholder="Ex: Mercedes-Benz Sprinter"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="novoAno">Ano</Label>
                            <Input
                              id="novoAno"
                              value={novoVeiculo.ano}
                              onChange={(e) => setNovoVeiculo(prev => ({ ...prev, ano: e.target.value }))}
                              placeholder="2020"
                            />
                          </div>
                          <div>
                            <Label htmlFor="novaCapacidade">Capacidade</Label>
                            <Input
                              id="novaCapacidade"
                              value={novoVeiculo.capacidade}
                              onChange={(e) => setNovoVeiculo(prev => ({ ...prev, capacidade: e.target.value }))}
                              placeholder="3.5 toneladas"
                            />
                          </div>
                          <div>
                            <Label htmlFor="novoTipo">Tipo</Label>
                            <Select value={novoVeiculo.tipo} onValueChange={(value) => setNovoVeiculo(prev => ({ ...prev, tipo: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
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
                        <div className="flex space-x-2">
                          <Button onClick={handleAdicionarVeiculo}>
                            Adicionar Veículo
                          </Button>
                          <Button onClick={() => setMostrandoFormVeiculo(false)} variant="outline">
                            Cancelar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Lista de Veículos */}
                  <div className="space-y-4">
                    {veiculos.map((veiculo) => (
                      <Card key={veiculo.id} className={`${veiculo.principal ? 'border-green-200 bg-green-50' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-lg">{veiculo.placa}</h3>
                                {veiculo.principal && (
                                  <Badge className="bg-green-600">Principal</Badge>
                                )}
                                {getStatusBadge(veiculo.status)}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Modelo:</span> {veiculo.modelo}
                                </div>
                                <div>
                                  <span className="font-medium">Ano:</span> {veiculo.ano}
                                </div>
                                <div>
                                  <span className="font-medium">Capacidade:</span> {veiculo.capacidade}
                                </div>
                                <div>
                                  <span className="font-medium">Tipo:</span> {veiculo.tipoLabel}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              {!veiculo.principal && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleDefinirPrincipal(veiculo.id)}
                                >
                                  Definir como Principal
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRemoverVeiculo(veiculo.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Documentos */}
            <TabsContent value="documentos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Documentos
                  </CardTitle>
                  <CardDescription>
                    Envie e gerencie seus documentos para verificação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Botões de Upload */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => handleUploadDocumento("cnh")}
                    >
                      <Upload className="h-6 w-6 mb-2" />
                      Enviar CNH
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => handleUploadDocumento("cpf")}
                    >
                      <Upload className="h-6 w-6 mb-2" />
                      Enviar CPF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => handleUploadDocumento("comprovante_residencia")}
                    >
                      <Upload className="h-6 w-6 mb-2" />
                      Comprovante de Residência
                    </Button>
                  </div>

                  <Separator />

                  {/* Lista de Documentos */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Documentos Enviados</h3>
                    {documentos.map((doc) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium">{doc.nome}</h4>
                                {getStatusBadge(doc.status)}
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>Arquivo: {doc.arquivo}</p>
                                <p>Enviado em: {new Date(doc.dataEnvio).toLocaleDateString('pt-BR')}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                Visualizar
                              </Button>
                              <Button size="sm" variant="outline">
                                <Upload className="mr-2 h-4 w-4" />
                                Reenviar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}