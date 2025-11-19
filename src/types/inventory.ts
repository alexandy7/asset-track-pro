export interface Category {
  id: string;
  nome: string;
}

export interface UnitOfMeasure {
  id: string;
  nome: string;
  abreviacao: string;
}

export interface InventoryItem {
  id: string;
  nome: string;
  categoriaId?: string;
  unidadeMedidaId: string;
  controleSerial: boolean;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
  quantidadeAlocada: number;
  modelo?: string;
  descricao?: string;
  estado: 'novo' | 'usado' | 'avariado' | 'baixado';
  createdAt: Date;
}

export interface SerializedItem {
  id: string;
  itemId: string;
  numeroSerie: string;
  estado: 'novo' | 'usado' | 'defeito';
  localizacao: 'estoque' | 'colaborador' | 'manutencao';
  colaboradorId?: string;
  createdAt: Date;
}
