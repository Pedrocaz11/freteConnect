"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download, Plus, DollarSign, Calendar } from "lucide-react";

interface Transaction {
  id: number;
  tipo: string;
  descricao: string;
  valor: number;
  data: string;
  status: string;
  metodo: string;
}

interface TransactionHistoryProps {
  historicoTransacoes: Transaction[];
}

export function TransactionHistory({ historicoTransacoes }: TransactionHistoryProps) {
  return (
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
  );
}