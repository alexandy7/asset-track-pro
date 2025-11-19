export type MovementType = 'entrada' | 'saida' | 'alocacao' | 'devolucao' | 'baixa' | 'ajuste';

export interface Movement {
  id: string;
  itemId: string;
  itemSerialId?: string;
  colaboradorId?: string;
  tipo: MovementType;
  quantidade?: number;
  data: Date;
  observacoes: string;
}
