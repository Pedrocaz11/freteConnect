"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, CreditCard } from "lucide-react";

interface PaymentMethodsProps {
  onPixPayment: () => void;
  onCardPayment: () => void;
}

export function PaymentMethods({ onPixPayment, onCardPayment }: PaymentMethodsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* PIX Payment */}
      <Card className="shadow-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Zap className="mr-3 h-6 w-6" />
            Pagamento via PIX
          </CardTitle>
          <CardDescription className="text-green-100">
            Recarga instantânea e segura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="text-sm text-green-100 mb-2">Vantagens do PIX:</p>
            <ul className="text-sm space-y-1">
              <li>✓ Transferência instantânea</li>
              <li>✓ Disponível 24/7</li>
              <li>✓ Sem taxas adicionais</li>
              <li>✓ Máxima segurança</li>
            </ul>
          </div>
          <Button 
            onClick={onPixPayment}
            className="w-full bg-white text-green-600 hover:bg-green-50"
          >
            <Zap className="mr-2 h-4 w-4" />
            Recarregar via PIX
          </Button>
        </CardContent>
      </Card>

      {/* Card Payment */}
      <Card className="shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <CreditCard className="mr-3 h-6 w-6" />
            Cartão de Crédito
          </CardTitle>
          <CardDescription className="text-blue-100">
            Parcelamento em até 12x
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="text-sm text-blue-100 mb-2">Vantagens do Cartão:</p>
            <ul className="text-sm space-y-1">
              <li>✓ Parcelamento sem juros</li>
              <li>✓ Aceita todos os bandeiras</li>
              <li>✓ Processamento seguro</li>
              <li>✓ Comprovante automático</li>
            </ul>
          </div>
          <Button 
            onClick={onCardPayment}
            className="w-full bg-white text-blue-600 hover:bg-blue-50"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Recarregar via Cartão
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}