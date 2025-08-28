"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, Shield, Info } from "lucide-react";
import { Frete } from "@/types/dashboard";

interface FreightCardProps {
  frete: Frete;
  onConfirmarRecebimento?: (freteId: number) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "aguardando":
      return <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">Aguardando Motorista</Badge>;
    case "em_andamento":
      return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 border-0">Em Andamento</Badge>;
    case "aguardando_confirmacao_cliente":
      return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0">Confirmar Recebimento</Badge>;
    case "concluido":
      return <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 border-0">Concluído</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function FreightCard({ frete, onConfirmarRecebimento }: FreightCardProps) {
  return (
    <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {frete.origem} → {frete.destino}
              </h3>
              {getStatusBadge(frete.status)}
              {frete.motoristaVerificado && frete.motorista && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 border-0">
                  <Shield className="mr-1 h-3 w-3" />
                  Verificado
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
              <div>
                <span className="font-medium">Peso:</span> {frete.peso}
              </div>
              <div>
                <span className="font-medium">Valor:</span> {frete.valor}
              </div>
              <div>
                <span className="font-medium">Prazo:</span> {frete.prazo}
              </div>
              <div>
                <span className="font-medium">Tipo:</span> {frete.tipo}
              </div>
            </div>
            
            {frete.motorista ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Motorista:</span> {frete.motorista}
                </p>
                {frete.telefoneMotorista && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800">
                      📞 {frete.telefoneMotorista} | 📧 {frete.emailMotorista}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center text-xs text-gray-500">
                <Info className="mr-1 h-3 w-3" />
                Aguardando motorista aceitar
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              Criado em: {new Date(frete.dataCriacao).toLocaleDateString('pt-BR')}
              {frete.dataColeta && (
                <span> • Coleta: {new Date(frete.dataColeta).toLocaleDateString('pt-BR')}</span>
              )}
            </p>
          </div>
          
          <div className="ml-6">
            {frete.status === "aguardando_confirmacao_cliente" && onConfirmarRecebimento ? (
              <Button 
                onClick={() => onConfirmarRecebimento(frete.id)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                size="sm"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirmar
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                <Eye className="mr-2 h-4 w-4" />
                Detalhes
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}