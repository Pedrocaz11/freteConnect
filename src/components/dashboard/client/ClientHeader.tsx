"use client";

import { Button } from "@/components/ui/button";
import { Package, Wallet, CreditCard, User, LogOut, Plus } from "lucide-react";
import Link from "next/link";

interface ClientHeaderProps {
  saldoCreditos: number;
}

export function ClientHeader({ saldoCreditos }: ClientHeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Dashboard Cliente
                </h1>
                <p className="text-sm text-gray-500">Gerencie seus fretes com facilidade</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-xl text-white shadow-lg">
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">
                R$ {saldoCreditos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <Link href="/dashboard/client/credits">
              <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                <CreditCard className="mr-2 h-4 w-4" />
                Recarregar
              </Button>
            </Link>
            <Link href="/dashboard/client/new-freight">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                Novo Frete
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}