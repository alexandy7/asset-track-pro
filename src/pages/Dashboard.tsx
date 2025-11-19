import { useInventory } from '@/contexts/InventoryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, Smartphone, AlertTriangle, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';

export default function Dashboard() {
  const { items, employees, phones, chips, lines, movements, allocations } = useInventory();

  const totalItems = items.reduce((sum, item) => sum + item.quantidadeTotal, 0);
  const allocatedItems = items.reduce((sum, item) => sum + item.quantidadeAlocada, 0);
  const availableItems = items.reduce((sum, item) => sum + item.quantidadeDisponivel, 0);
  const defectiveItems = items.filter((item) => item.estado === 'avariado' || item.estado === 'baixado').length;

  const activeEmployees = employees.filter((e) => e.status === 'ativo').length;
  const phonesInUse = phones.filter((p) => p.colaboradorId).length;
  const phonesAvailable = phones.filter((p) => p.localizacao === 'estoque').length;

  const recentMovements = [...movements, ...allocations]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 10);

  const alerts = [
    ...items
      .filter((item) => item.quantidadeDisponivel < 5 && !item.controleSerial)
      .map((item) => ({ type: 'Estoque Baixo', message: `${item.nome} - apenas ${item.quantidadeDisponivel} disponíveis` })),
    ...items
      .filter((item) => item.estado === 'avariado')
      .map((item) => ({ type: 'Item Avariado', message: `${item.nome} precisa de atenção` })),
    ...phones
      .filter((phone) => phone.estado === 'defeito')
      .map((phone) => ({ type: 'Telefone Defeituoso', message: `${phone.marca} ${phone.modelo} em manutenção` })),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral do sistema de estoque</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              {availableItems} disponíveis, {allocatedItems} alocados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colaboradores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees}</div>
            <p className="text-xs text-muted-foreground">de {employees.length} cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Telefones em Uso</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{phonesInUse}</div>
            <p className="text-xs text-muted-foreground">{phonesAvailable} disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {defectiveItems} itens com problema
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Movimentações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.map((movement) => {
                const isMovement = 'itemId' in movement;
                const item = isMovement ? items.find((i) => i.id === movement.itemId) : null;
                const employee = employees.find((e) => e.id === movement.colaboradorId);
                const phone = !isMovement && 'telefoneId' in movement ? phones.find((p) => p.id === movement.telefoneId) : null;

                return (
                  <div key={movement.id} className="flex items-center gap-4 border-b pb-3 last:border-0">
                    {isMovement ? (
                      movement.tipo === 'entrada' ? (
                        <ArrowDownCircle className="h-5 w-5 text-success" />
                      ) : (
                        <ArrowUpCircle className="h-5 w-5 text-info" />
                      )
                    ) : (
                      <Smartphone className="h-5 w-5 text-primary" />
                    )}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {isMovement ? item?.nome : phone ? `${phone.marca} ${phone.modelo}` : 'Equipamento'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {employee?.nome || 'Sistema'} • {format(new Date(movement.data), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                    </div>
                    <StatusBadge status={movement.tipo} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum alerta no momento</p>
              ) : (
                alerts.slice(0, 8).map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{alert.type}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
