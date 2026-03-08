import { cn } from '@/lib/utils'

type BadgeVariant = 'blue' | 'green' | 'red' | 'yellow' | 'teal' | 'purple' | 'gray'

const variantClasses: Record<BadgeVariant, string> = {
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-green-50 text-green-600',
  red: 'bg-red-50 text-red-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  teal: 'bg-teal-50 text-teal-600',
  purple: 'bg-violet-50 text-violet-600',
  gray: 'bg-slate-100 text-slate-600',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'gray', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-[2px] rounded-full text-[11px] font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
