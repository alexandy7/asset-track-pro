import { useState } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function History() {
  const { movements, allocations, employees, items, phones } = useInventory();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const allHistory = [
    ...movements.map((m) => ({ ...m, category: 'estoque' as const })),
    ...allocations.map((a) => ({ ...a, category: 'telefonia' as const })),
  ].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const filteredHistory = allHistory.filter((entry) => {
    const matchesType = typeFilter === 'all' || entry.tipo === typeFilter;
    const employee = employees.find((e) => e.id === entry.colaboradorId);
    const item =
      entry.category === 'estoque' && 'itemId' in entry
        ? items.find((i) => i.id === entry.itemId)
        : null;
    const phone =
      entry.category === 'telefonia' && 'telefoneId' in entry
        ? phones.find((p) => p.id === entry.telefoneId)
        : null;

    const searchText = search.toLowerCase();
    const matchesSearch =
      employee?.nome.toLowerCase().includes(searchText) ||
      item?.nome.toLowerCase().includes(searchText) ||
      phone?.modelo.toLowerCase().includes(searchText) ||
      entry.tipo.toLowerCase().includes(searchText);

    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Histórico Geral</h2>
        <p className="text-muted-foreground">Visualize todas as movimentações e alocações do sistema</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por colaborador, item, tipo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="entrada">Entrada</SelectItem>
              <SelectItem value="saida">Saída</SelectItem>
              <SelectItem value="alocacao">Alocação</SelectItem>
              <SelectItem value="devolucao">Devolução</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="ajuste">Ajuste</SelectItem>
              <SelectItem value="entrega">Entrega</SelectItem>
              <SelectItem value="troca">Troca</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Recurso</TableHead>
              <TableHead>Colaborador</TableHead>
              <TableHead>Observações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Nenhuma movimentação encontrada
                </TableCell>
              </TableRow>
            ) : (
              filteredHistory.map((entry) => {
                const employee = employees.find((e) => e.id === entry.colaboradorId);
                const item =
                  entry.category === 'estoque' && 'itemId' in entry
                    ? items.find((i) => i.id === entry.itemId)
                    : null;
                const phone =
                  entry.category === 'telefonia' && 'telefoneId' in entry
                    ? phones.find((p) => p.id === entry.telefoneId)
                    : null;

                return (
                  <TableRow key={`${entry.category}-${entry.id}`}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(entry.data), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={entry.tipo} />
                    </TableCell>
                    <TableCell className="capitalize">{entry.category}</TableCell>
                    <TableCell>
                      {item ? (
                        <div>
                          <div className="font-medium">{item.nome}</div>
                          {item.modelo && (
                            <div className="text-xs text-muted-foreground">{item.modelo}</div>
                          )}
                        </div>
                      ) : phone ? (
                        <div className="font-medium">
                          {phone.marca} {phone.modelo}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>{employee?.nome || '-'}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {entry.observacoes || '-'}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
