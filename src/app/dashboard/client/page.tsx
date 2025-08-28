"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";

// Componentes modulares
import { ClientHeader } from "@/components/dashboard/client/ClientHeader";
import { StatsCards } from "@/components/dashboard/client/StatsCards";
import { ConfirmationAlert } from "@/components/dashboard/client/ConfirmationAlert";
import { FreightsList } from "@/components/dashboard/client/FreightsList";
import { FinancialSummary } from "@/components/dashboard/client/FinancialSummary";
import { MonthlyChart } from "@/components/dashboard/client/MonthlyChart";
import { TransactionHistory } from "@/components/dashboard/client/TransactionHistory";
import { PaymentMethods } from "@/components/dashboard/client/PaymentMethods";
import { PaymentHistory } from "@/components/dashboard/client/PaymentHistory";

// Hook customizado
import { useClientDashboard } from "@/hooks/useClientDashboard";

export default function ClientDashboard() {
  const {
    fretes,
    historicoTransacoes,
    dadosFinanceiros,
    stats,
    handleConfirmarRecebimento,
    handlePixPayment,
    handleCardPayment
  } = useClientDashboard();

  const fretesAguardandoConfirmacao = fretes.filter(f => f.status === "aguardando_confirmacao_cliente").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Premium */}
      <ClientHeader saldoCreditos={stats.saldoCreditos} />

      <div className="container mx-auto px-4 py-8">
        {/* Aviso de Responsabilidade Premium */}
        <Alert className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
          <Shield className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-sm text-blue-800">
            <strong>Responsabilidade Compartilhada:</strong> Como embarcador, você compartilha a responsabilidade pela carga com o transportador. 
            Dados de contato são revelados apenas após um motorista aceitar seu frete. Mantenha comunicação direta para garantir transparência e segurança.
          </AlertDescription>
        </Alert>

        {/* Alertas de Ação */}
        {fretesAguardandoConfirmacao > 0 && (
          <div className="mb-8">
            <ConfirmationAlert 
              fretes={fretes}
              onConfirmarRecebimento={handleConfirmarRecebimento}
            />
          </div>
        )}

        {/* Estatísticas Premium */}
        <StatsCards
          saldoCreditos={stats.saldoCreditos}
          fretesAguardando={stats.fretesAguardando}
          fretesEmAndamento={stats.fretesEmAndamento}
          fretesConcluidos={stats.fretesConcluidos}
          gastoTotal={stats.gastoTotal}
        />

        {/* Tabs Premium */}
        <Tabs defaultValue="fretes" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm p-1 rounded-xl shadow-lg">
            <TabsTrigger value="fretes" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg">
              Meus Fretes
            </TabsTrigger>
            <TabsTrigger value="financeiro" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg">
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="pagamentos" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg">
              Pagamentos
            </TabsTrigger>
          </TabsList>

          {/* Tab Fretes */}
          <TabsContent value="fretes" className="space-y-6">
            <FreightsList
              fretes={fretes}
              saldoDisponivel={stats.saldoDisponivel}
              onConfirmarRecebimento={handleConfirmarRecebimento}
            />
          </TabsContent>

          {/* Tab Financeiro Premium */}
          <TabsContent value="financeiro" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FinancialSummary
                saldoCreditos={stats.saldoCreditos}
                valorReservado={stats.valorReservado}
                saldoDisponivel={stats.saldoDisponivel}
              />
              <MonthlyChart dadosFinanceiros={dadosFinanceiros} />
            </div>

            <TransactionHistory historicoTransacoes={historicoTransacoes} />
          </TabsContent>

          {/* Tab Pagamentos Premium */}
          <TabsContent value="pagamentos" className="space-y-6">
            <PaymentMethods
              onPixPayment={handlePixPayment}
              onCardPayment={handleCardPayment}
            />
            <PaymentHistory transacoesPix={dadosFinanceiros.transacoesPix} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}