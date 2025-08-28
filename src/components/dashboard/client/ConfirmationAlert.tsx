"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Shield } from "lucide-react";
import { Frete } from "@/types/dashboard";

interface ConfirmationAlertProps {
  fretes: Frete[];
  onConfirmarRecebimento: (freteId: number) => void;
}

export function ConfirmationAlert({ fretes, onConfirmarRecebimento }: ConfirmationAlertProps) {
  const fretesAguardandoConfirmacao = fretes.filter(f => f.status === "aguardando_confirmacao_cliente");
  
  if (fretesAguardandoConfirmacao.length === 0) {
    return null;
  }

  return (
    <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-yellow-700">
          <AlertCircle className="mr-3 h-6 w-6" />
          Confirmar Recebimento de Entregas
        </CardTitle>
        <CardDescription>
          Confirme o recebimento das mercadorias para liberar o pagamento aos motoristas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fretesAguardandoConfirmacao.map((frete) => (
            <Card key={frete.id} className="border-yellow-200 bg-white/80 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {frete.origem} → {frete.destino}
                      </h3>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                        Aguardando Confirmação
                      </Badge>
                      {frete.motoristaVerificado && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 border-0">
                          <Shield className="mr-1 h-3 w-3" />
                          Motorista Verificado
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Peso:</span> {frete.peso}
                      </div>
                      <div>
                        <span className="font-medium">Valor:</span> {frete.valor}
                      </div>
                      <div>
                        <span className="font-medium">Motorista:</span> {frete.motorista}
                      </div>
                      <div>
                        <span className="font-medium">Tipo:</span> {frete.tipo}
                      </div>
                    </div>
                    
                    {/* Dados de contato do motorista revelados */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-3 border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>📞 Contato do motorista:</strong> {frete.telefoneMotorista}
                      </p>
                      <p className="text-sm text-blue-800">
                        <strong>📧 Email:</strong> {frete.emailMotorista}
                      </p>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Entrega realizada em: {frete.dataEntregaMotorista ? new Date(frete.dataEntregaMotorista).toLocaleDateString('pt-BR') : 'Data não disponível'}
                    </p>
                  </div>
                  
                  <div className="ml-6 space-y-2">
                    <Button 
                      onClick={() => onConfirmarRecebimento(frete.id)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirmar Recebimento
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}