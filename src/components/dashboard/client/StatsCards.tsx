"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, Truck, CheckCircle, DollarSign, Wallet } from "lucide-react";

interface StatsCardsProps {
  saldoCreditos: number;
  fretesAguardando: number;
  fretesEmAndamento: number;
  fretesConcluidos: number;
  gastoTotal: number;
}

export function StatsCards({
  saldoCreditos,
  fretesAguardando,
  fretesEmAndamento,
  fretesConcluidos,
  gastoTotal
}: StatsCardsProps) {
  return (
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
  );
}