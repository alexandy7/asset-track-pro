export interface Phone {
  id: string;
  marca: string;
  modelo: string;
  imei: string;
  estado: 'novo' | 'usado' | 'defeito';
  localizacao: 'estoque' | 'colaborador' | 'manutencao';
  colaboradorId?: string;
  createdAt: Date;
}

export interface Chip {
  id: string;
  operadora: string;
  iccid: string;
  numero?: string;
  status: 'ativo' | 'inativo';
  colaboradorId?: string;
  createdAt: Date;
}

export interface Line {
  id: string;
  numero: string;
  operadora: string;
  tipoPlano: string;
  status: 'ativa' | 'inativa';
  chipAtualId?: string;
  createdAt: Date;
}

export type AllocationType = 'entrega' | 'troca' | 'devolucao';

export interface Allocation {
  id: string;
  colaboradorId: string;
  telefoneId?: string;
  chipId?: string;
  linhaId?: string;
  tipo: AllocationType;
  data: Date;
  observacoes?: string;
}
