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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PhonesList() {
  const { phones, employees } = useInventory();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPhones = phones.filter((phone) => {
    const matchesSearch =
      phone.marca.toLowerCase().includes(search.toLowerCase()) ||
      phone.modelo.toLowerCase().includes(search.toLowerCase()) ||
      phone.imei.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || phone.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getEmployeeName = (id?: string) => {
    if (!id) return '-';
    return employees.find((e) => e.id === id)?.nome || '-';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Telefones</h2>
          <p className="text-muted-foreground">Gerencie os telefones corporativos</p>
        </div>
        <Button onClick={() => navigate('/telefonia/telefones/novo')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Telefone
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por marca, modelo ou IMEI..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
              <SelectItem value="novo">Novo</SelectItem>
              <SelectItem value="usado">Usado</SelectItem>
              <SelectItem value="defeito">Defeito</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marca/Modelo</TableHead>
              <TableHead>IMEI</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Colaborador</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPhones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Nenhum telefone encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredPhones.map((phone) => (
                <TableRow key={phone.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{phone.marca}</div>
                      <div className="text-sm text-muted-foreground">{phone.modelo}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{phone.imei}</TableCell>
                  <TableCell>
                    <StatusBadge status={phone.estado} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={phone.localizacao} />
                  </TableCell>
                  <TableCell>{getEmployeeName(phone.colaboradorId)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/telefonia/telefones/${phone.id}`)}
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
