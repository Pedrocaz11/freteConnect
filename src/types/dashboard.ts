export interface Frete {
  id: number;
  origem: string;
  destino: string;
  peso: string;
  valor: string;
  valorNumerico: number;
  prazo: string;
  tipo: string;
  status: string;
  motorista: string | null;
  motoristaVerificado: boolean;
  dataCriacao: string;
  dataColeta: string | null;
  dataEntregaMotorista?: string;
  telefoneMotorista: string | null;
  emailMotorista: string | null;
}

export interface Transaction {
  id: number;
  tipo: string;
  descricao: string;
  valor: number;
  data: string;
  status: string;
  metodo: string;
}

export interface PaymentTransaction {
  id: number;
  tipo: string;
  valor: number;
  data: string;
  status: string;
  metodo: string;
}

export interface MonthlyData {
  mes: string;
  valor: number;
  fretes: number;
}

export interface FinancialData {
  saldoAtual: number;
  faturamentoMensal: MonthlyData[];
  transacoesPix: PaymentTransaction[];
}

export interface DashboardStats {
  saldoCreditos: number;
  fretesAguardando: number;
  fretesEmAndamento: number;
  fretesConcluidos: number;
  gastoTotal: number;
  valorReservado: number;
  saldoDisponivel: number;
}