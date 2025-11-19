export interface Employee {
  id: string;
  nome: string;
  setor: string;
  cargo: string;
  matricula: string;
  status: 'ativo' | 'inativo';
  createdAt: Date;
}
