"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

interface MonthlyData {
  mes: string;
  valor: number;
  fretes: number;
}

interface MonthlyChartProps {
  dadosFinanceiros: {
    faturamentoMensal: MonthlyData[];
  };
}

export function MonthlyChart({ dadosFinanceiros }: MonthlyChartProps) {
  return (
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
  );
}