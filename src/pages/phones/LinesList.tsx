import { useState } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Plus, Search, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { useNavigate } from 'react-router-dom';

export default function LinesList() {
  const { lines, chips, employees } = useInventory();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredLines = lines.filter((line) =>
    line.numero.toLowerCase().includes(search.toLowerCase()) ||
    line.operadora.toLowerCase().includes(search.toLowerCase()) ||
    line.tipoPlano.toLowerCase().includes(search.toLowerCase())
  );

  const getChipInfo = (chipId?: string) => {
    if (!chipId) return '-';
    const chip = chips.find((c) => c.id === chipId);
    return chip ? chip.iccid.slice(-8) : '-';
  };

  const getEmployeeFromChip = (chipId?: string) => {
    if (!chipId) return '-';
    const chip = chips.find((c) => c.id === chipId);
    if (!chip?.colaboradorId) return '-';
    return employees.find((e) => e.id === chip.colaboradorId)?.nome || '-';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Linhas Telefônicas</h2>
          <p className="text-muted-foreground">Gerencie as linhas telefônicas corporativas</p>
        </div>
        <Button onClick={() => navigate('/telefonia/linhas/novo')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Linha
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número, operadora ou plano..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Operadora</TableHead>
              <TableHead>Tipo de Plano</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Chip Vinculado</TableHead>
              <TableHead>Colaborador</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Nenhuma linha encontrada
                </TableCell>
              </TableRow>
            ) : (
              filteredLines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell className="font-medium">{line.numero}</TableCell>
                  <TableCell>{line.operadora}</TableCell>
                  <TableCell>{line.tipoPlano}</TableCell>
                  <TableCell>
                    <StatusBadge status={line.status} />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{getChipInfo(line.chipAtualId)}</TableCell>
                  <TableCell>{getEmployeeFromChip(line.chipAtualId)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/telefonia/linhas/${line.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
