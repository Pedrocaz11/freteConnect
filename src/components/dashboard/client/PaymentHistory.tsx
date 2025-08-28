"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Zap, CreditCard } from "lucide-react";

interface PaymentTransaction {
  id: number;
  tipo: string;
  valor: number;
  data: string;
  status: string;
  metodo: string;
}

interface PaymentHistoryProps {
  transacoesPix: PaymentTransaction[];
}

export function PaymentHistory({ transacoesPix }: PaymentHistoryProps) {
  return (
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
          {transacoesPix.map((transacao) => (
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
  );
}