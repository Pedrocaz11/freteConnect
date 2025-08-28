"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Wallet, DollarSign, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Valores pré-definidos para recarga
const valoresRecarga = [
  { valor: 500, bonus: 0, label: "R$ 500,00" },
  { valor: 1000, bonus: 50, label: "R$ 1.000,00 + R$ 50 bônus" },
  { valor: 2000, bonus: 150, label: "R$ 2.000,00 + R$ 150 bônus" },
  { valor: 5000, bonus: 500, label: "R$ 5.000,00 + R$ 500 bônus" },
  { valor: 10000, bonus: 1200, label: "R$ 10.000,00 + R$ 1.200 bônus" }
];

// Histórico de recargas
const mockHistoricoRecargas = [
  {
    id: 1,
    valor: 5000.00,
    bonus: 500.00,
    data: "2024-01-20",
    status: "concluido",
    metodo: "Cartão de Crédito"
  },
  {
    id: 2,
    valor: 3000.00,
    bonus: 200.00,
    data: "2024-01-05",
    status: "concluido",
    metodo: "PIX"
  },
  {
    id: 3,
    valor: 1000.00,
    bonus: 50.00,
    data: "2023-12-28",
    status: "concluido",
    metodo: "Cartão de Crédito"
  }
];

export default function CreditsPage() {
  const router = useRouter();
  const [valorSelecionado, setValorSelecionado] = useState<number | null>(null);
  const [valorCustomizado, setValorCustomizado] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [saldoAtual] = useState(5950.00);

  const handleValorClick = (valor: number) => {
    setValorSelecionado(valor);
    setValorCustomizado("");
  };

  const handleValorCustomizado = (valor: string) => {
    setValorCustomizado(valor);
    setValorSelecionado(null);
  };

  const getValorFinal = () => {
    const valor = valorSelecionado || parseFloat(valorCustomizado) || 0;
    const bonus = valorSelecionado ? 
      valoresRecarga.find(v => v.valor === valorSelecionado)?.bonus || 0 : 
      0;
    return { valor, bonus, total: valor + bonus };
  };

  const handleRecarga = () => {
    const { total } = getValorFinal();
    console.log(`Recarga de R$ ${total} processada via ${metodoPagamento}`);
    
    // Simular processamento bem-sucedido
    router.push("/dashboard/client");
  };

  const { valor, bonus, total } = getValorFinal();

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
            <h1 className="text-2xl font-bold text-gray-900">Recarregar Créditos</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário de Recarga */}
            <div className="lg:col-span-2 space-y-6">
              {/* Saldo Atual */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2 h-5 w-5 text-blue-600" />
                    Saldo Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">
                    R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </CardContent>
              </Card>

              {/* Valores Pré-definidos */}
              <Card>
                <CardHeader>
                  <CardTitle>Escolha o Valor</CardTitle>
                  <CardDescription>
                    Selecione um valor pré-definido ou digite um valor personalizado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {valoresRecarga.map((item) => (
                      <Button
                        key={item.valor}
                        variant={valorSelecionado === item.valor ? "default" : "outline"}
                        className="h-auto p-4 text-left justify-start"
                        onClick={() => handleValorClick(item.valor)}
                      >
                        <div>
                          <div className="font-semibold">R$ {item.valor.toLocaleString('pt-BR')}</div>
                          {item.bonus > 0 && (
                            <div className="text-xs text-green-600">
                              + R$ {item.bonus} bônus
                            </div>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <Label htmlFor="valorCustomizado">Valor Personalizado</Label>
                    <Input
                      id="valorCustomizado"
                      type="number"
                      placeholder="Digite o valor (mín. R$ 100)"
                      value={valorCustomizado}
                      onChange={(e) => handleValorCustomizado(e.target.value)}
                      min="100"
                      step="0.01"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Valor mínimo: R$ 100,00 (valores personalizados não recebem bônus)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Método de Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={metodoPagamento} onValueChange={setMetodoPagamento}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">PIX (Instantâneo)</SelectItem>
                      <SelectItem value="cartao-credito">Cartão de Crédito</SelectItem>
                      <SelectItem value="cartao-debito">Cartão de Débito</SelectItem>
                      <SelectItem value="boleto">Boleto Bancário</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Resumo da Recarga */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                    Resumo da Recarga
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {valor > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Valor da recarga:</span>
                        <span className="font-semibold">
                          R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      {bonus > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Bônus:</span>
                          <span className="font-semibold text-green-600">
                            + R$ {bonus.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      )}
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Total a receber:</span>
                          <span className="text-lg font-bold text-green-600">
                            R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Saldo após recarga:</span>
                          <span className="font-semibold text-blue-600">
                            R$ {(saldoAtual + total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={!valor || !metodoPagamento || valor < 100}
                    onClick={handleRecarga}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Confirmar Recarga
                  </Button>
                  
                  {valor > 0 && valor < 100 && (
                    <p className="text-xs text-red-600 text-center">
                      Valor mínimo para recarga: R$ 100,00
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Histórico de Recargas */}
              <Card>
                <CardHeader>
                  <CardTitle>Últimas Recargas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockHistoricoRecargas.map((recarga) => (
                      <div key={recarga.id} className="border-b pb-3 last:border-b-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-green-600">
                            + R$ {(recarga.valor + recarga.bonus).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Concluído
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          <p>{recarga.metodo}</p>
                          <p>{new Date(recarga.data).toLocaleDateString('pt-BR')}</p>
                          {recarga.bonus > 0 && (
                            <p className="text-green-600">
                              Incluindo R$ {recarga.bonus.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de bônus
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}