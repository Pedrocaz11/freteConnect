"use client";

import { useState, useMemo } from "react";
import { Frete, Transaction, FinancialData, DashboardStats } from "@/types/dashboard";

// Dados mockados
const mockFretes: Frete[] = [
  {
    id: 1,
    origem: "São Paulo, SP",
    destino: "Rio de Janeiro, RJ",
    peso: "2.5 toneladas",
    valor: "R$ 1.200,00",
    valorNumerico: 1200.00,
    prazo: "2 dias",
    tipo: "Eletrônicos",
    status: "em_andamento",
    motorista: "João Silva",
    motoristaVerificado: true,
    dataCriacao: "2024-01-15",
    dataColeta: "2024-01-16",
    telefoneMotorista: "(11) 99999-1234",
    emailMotorista: "joao.silva@email.com"
  },
  {
    id: 2,
    origem: "São Paulo, SP",
    destino: "Belo Horizonte, MG",
    peso: "1.8 toneladas",
    valor: "R$ 850,00",
    valorNumerico: 850.00,
    prazo: "1 dia",
    tipo: "Documentos",
    status: "concluido",
    motorista: "Maria Santos",
    motoristaVerificado: true,
    dataCriacao: "2024-01-10",
    dataColeta: "2024-01-11",
    telefoneMotorista: "(11) 88888-5678",
    emailMotorista: "maria.santos@email.com"
  },
  {
    id: 3,
    origem: "São Paulo, SP",
    destino: "Curitiba, PR",
    peso: "3.2 toneladas",
    valor: "R$ 1.500,00",
    valorNumerico: 1500.00,
    prazo: "2 dias",
    tipo: "Móveis",
    status: "aguardando",
    motorista: null,
    motoristaVerificado: false,
    dataCriacao: "2024-01-18",
    dataColeta: null,
    telefoneMotorista: null,
    emailMotorista: null
  },
  {
    id: 4,
    origem: "São Paulo, SP",
    destino: "Santos, SP",
    peso: "3.0 toneladas",
    valor: "R$ 450,00",
    valorNumerico: 450.00,
    prazo: "1 dia",
    tipo: "Equipamentos",
    status: "aguardando_confirmacao_cliente",
    motorista: "João Silva",
    motoristaVerificado: true,
    dataCriacao: "2024-01-19",
    dataColeta: "2024-01-20",
    dataEntregaMotorista: "2024-01-20",
    telefoneMotorista: "(11) 99999-1234",
    emailMotorista: "joao.silva@email.com"
  }
];

const mockDadosFinanceiros: FinancialData = {
  saldoAtual: 5950.00,
  faturamentoMensal: [
    { mes: "Jan", valor: 4200.00, fretes: 8 },
    { mes: "Dez", valor: 3800.00, fretes: 7 },
    { mes: "Nov", valor: 5100.00, fretes: 12 },
    { mes: "Out", valor: 2900.00, fretes: 6 },
    { mes: "Set", valor: 4600.00, fretes: 9 },
    { mes: "Ago", valor: 3200.00, fretes: 5 }
  ],
  transacoesPix: [
    { id: 1, tipo: "recarga", valor: 2000.00, data: "2024-01-20", status: "concluido", metodo: "PIX" },
    { id: 2, tipo: "recarga", valor: 3000.00, data: "2024-01-15", status: "concluido", metodo: "Cartão" },
    { id: 3, tipo: "frete", valor: -1200.00, data: "2024-01-14", status: "concluido", metodo: "PIX" }
  ]
};

const mockHistoricoTransacoes: Transaction[] = [
  {
    id: 1,
    tipo: "recarga",
    descricao: "Recarga de créditos via PIX",
    valor: 5000.00,
    data: "2024-01-20",
    status: "concluido",
    metodo: "PIX"
  },
  {
    id: 2,
    tipo: "frete",
    descricao: "Frete São Paulo → Rio de Janeiro",
    valor: -1200.00,
    data: "2024-01-15",
    status: "concluido",
    metodo: "PIX"
  },
  {
    id: 3,
    tipo: "frete",
    descricao: "Frete São Paulo → Belo Horizonte",
    valor: -850.00,
    data: "2024-01-10",
    status: "concluido",
    metodo: "PIX"
  },
  {
    id: 4,
    tipo: "recarga",
    descricao: "Recarga de créditos via Cartão",
    valor: 3000.00,
    data: "2024-01-05",
    status: "concluido",
    metodo: "Cartão"
  }
];

export function useClientDashboard() {
  const [fretes, setFretes] = useState<Frete[]>(mockFretes);
  const [historicoTransacoes] = useState<Transaction[]>(mockHistoricoTransacoes);
  const [dadosFinanceiros] = useState<FinancialData>(mockDadosFinanceiros);
  const [saldoCreditos] = useState<number>(5950.00);

  // Cálculos derivados usando useMemo para otimização
  const stats: DashboardStats = useMemo(() => {
    const fretesAguardando = fretes.filter(f => f.status === "aguardando").length;
    const fretesEmAndamento = fretes.filter(f => f.status === "em_andamento").length;
    const fretesConcluidos = fretes.filter(f => f.status === "concluido").length;
    const gastoTotal = fretes
      .filter(f => f.status === "concluido")
      .reduce((total, frete) => total + frete.valorNumerico, 0);

    const valorReservado = fretes
      .filter(f => f.status === "aguardando" || f.status === "em_andamento" || f.status === "aguardando_confirmacao_cliente")
      .reduce((total, frete) => total + frete.valorNumerico, 0);

    const saldoDisponivel = saldoCreditos - valorReservado;

    return {
      saldoCreditos,
      fretesAguardando,
      fretesEmAndamento,
      fretesConcluidos,
      gastoTotal,
      valorReservado,
      saldoDisponivel
    };
  }, [fretes, saldoCreditos]);

  // Handlers
  const handleConfirmarRecebimento = (freteId: number) => {
    setFretes(prev => prev.map(frete => 
      frete.id === freteId 
        ? { ...frete, status: "concluido" }
        : frete
    ));
    console.log(`Recebimento do frete ${freteId} confirmado pelo cliente`);
  };

  const handlePixPayment = () => {
    console.log("Iniciando pagamento via PIX");
    // Implementar lógica de PIX
  };

  const handleCardPayment = () => {
    console.log("Iniciando pagamento via Cartão");
    // Implementar lógica de cartão
  };

  return {
    // Estado
    fretes,
    historicoTransacoes,
    dadosFinanceiros,
    stats,
    
    // Handlers
    handleConfirmarRecebimento,
    handlePixPayment,
    handleCardPayment
  };
}