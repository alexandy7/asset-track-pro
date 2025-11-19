import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const getVariant = () => {
    if (variant) return variant;

    const statusLower = status.toLowerCase();
    if (
      statusLower === 'ativo' ||
      statusLower === 'ativa' ||
      statusLower === 'novo' ||
      statusLower === 'disponível' ||
      statusLower === 'estoque'
    ) {
      return 'default';
    }
    if (
      statusLower === 'alocado' ||
      statusLower === 'em uso' ||
      statusLower === 'usado' ||
      statusLower === 'colaborador'
    ) {
      return 'secondary';
    }
    if (
      statusLower === 'inativo' ||
      statusLower === 'inativa' ||
      statusLower === 'defeito' ||
      statusLower === 'avariado' ||
      statusLower === 'baixado'
    ) {
      return 'destructive';
    }
    if (statusLower === 'manutenção' || statusLower === 'manutencao') {
      return 'outline';
    }
    return 'default';
  };

  const getColorClasses = () => {
    const statusLower = status.toLowerCase();
    if (
      statusLower === 'ativo' ||
      statusLower === 'ativa' ||
      statusLower === 'novo' ||
      statusLower === 'disponível' ||
      statusLower === 'estoque'
    ) {
      return 'bg-success/10 text-success border-success/20';
    }
    if (
      statusLower === 'alocado' ||
      statusLower === 'em uso' ||
      statusLower === 'usado' ||
      statusLower === 'colaborador'
    ) {
      return 'bg-info/10 text-info border-info/20';
    }
    if (
      statusLower === 'inativo' ||
      statusLower === 'inativa' ||
      statusLower === 'defeito' ||
      statusLower === 'avariado' ||
      statusLower === 'baixado'
    ) {
      return 'bg-destructive/10 text-destructive border-destructive/20';
    }
    if (statusLower === 'manutenção' || statusLower === 'manutencao') {
      return 'bg-warning/10 text-warning border-warning/20';
    }
    return '';
  };

  return (
    <Badge variant={getVariant()} className={cn('capitalize', getColorClasses())}>
      {status}
    </Badge>
  );
}
