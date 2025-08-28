"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";
import Link from "next/link";
import { FreightCard } from "./FreightCard";
import { Frete } from "@/types/dashboard";

interface FreightsListProps {
  fretes: Frete[];
  saldoDisponivel: number;
  onConfirmarRecebimento: (freteId: number) => void;
}

export function FreightsList({ fretes, saldoDisponivel, onConfirmarRecebimento }: FreightsListProps) {
  return (
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
              <FreightCard 
                key={frete.id} 
                frete={frete} 
                onConfirmarRecebimento={onConfirmarRecebimento}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}