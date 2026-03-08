import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'meta' | 'google'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
  ghost: 'bg-transparent text-slate-500 hover:bg-slate-100',
  meta: 'bg-[#1877f2] text-white hover:bg-[#166fe5]',
  google: 'bg-[#ea4335] text-white hover:bg-[#d33426]',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export default function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg text-[13px] font-semibold cursor-pointer border-none inline-flex items-center gap-[6px] transition-all px-4 py-[7px]',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
