interface ProgressBarProps {
  value: number
  color?: string
  className?: string
}

export default function ProgressBar({ value, color = '#3b82f6', className }: ProgressBarProps) {
  return (
    <div className={`h-[6px] bg-slate-100 rounded-full overflow-hidden mt-[5px] ${className || ''}`}>
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  )
}
