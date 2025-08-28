"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wallet, CreditCard } from "lucide-react";
import Link from "next/link";

interface FinancialSummaryProps {
  saldoCreditos: number;
  valorReservado: number;
  saldoDisponivel: number;
}

export function FinancialSummary({ saldoCreditos, valorReservado, saldoDisponivel }: FinancialSummaryProps) {
  return (
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
  );
}