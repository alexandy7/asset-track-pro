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

export default function ChipsList() {
  const { chips, employees, lines } = useInventory();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredChips = chips.filter((chip) =>
    chip.operadora.toLowerCase().includes(search.toLowerCase()) ||
    chip.iccid.toLowerCase().includes(search.toLowerCase()) ||
    chip.numero?.toLowerCase().includes(search.toLowerCase())
  );

  const getEmployeeName = (id?: string) => {
    if (!id) return '-';
    return employees.find((e) => e.id === id)?.nome || '-';
  };

  const getLinkedLine = (chipId: string) => {
    const line = lines.find((l) => l.chipAtualId === chipId);
    return line?.numero || '-';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Chips</h2>
          <p className="text-muted-foreground">Gerencie os chips corporativos</p>
        </div>
        <Button onClick={() => navigate('/telefonia/chips/novo')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Chip
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por operadora, ICCID ou número..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Operadora</TableHead>
              <TableHead>ICCID</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Linha Vinculada</TableHead>
              <TableHead>Colaborador</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Nenhum chip encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredChips.map((chip) => (
                <TableRow key={chip.id}>
                  <TableCell className="font-medium">{chip.operadora}</TableCell>
                  <TableCell className="font-mono text-sm">{chip.iccid}</TableCell>
                  <TableCell>{chip.numero || '-'}</TableCell>
                  <TableCell>
                    <StatusBadge status={chip.status} />
                  </TableCell>
                  <TableCell>{getLinkedLine(chip.id)}</TableCell>
                  <TableCell>{getEmployeeName(chip.colaboradorId)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/telefonia/chips/${chip.id}`)}
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
