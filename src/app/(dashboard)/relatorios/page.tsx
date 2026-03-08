'use client'

import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'

const cids = [
  { code: 'I10', label: 'Hipertensão essencial', count: 142, pct: 38, color: '#3b82f6' },
  { code: 'E11', label: 'Diabetes tipo 2', count: 89, pct: 24, color: '#8b5cf6' },
  { code: 'I50', label: 'Insuficiência cardíaca', count: 67, pct: 18, color: '#06b6d4' },
  { code: 'Z00.0', label: 'Exame geral', count: 52, pct: 14, color: '#10b981' },
  { code: 'I49', label: 'Arritmia cardíaca', count: 22, pct: 6, color: '#f59e0b' },
]

export default function RelatoriosPage() {
  return (
    <div className="flex flex-col h-full">
      <Topbar title="Relatórios" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">Taxa de retorno</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-[22px] font-extrabold text-slate-900">74%</p>
              <span className="text-[11px] text-emerald-600 font-semibold">↑ 5%</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Pacientes que retornaram</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">NPS</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-[22px] font-extrabold text-slate-900">72</p>
              <Badge variant="green">Zona de excelência</Badge>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Net Promoter Score</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">Taxa de ocupação</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-[22px] font-extrabold text-slate-900">87%</p>
              <Badge variant="gray">Estável</Badge>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Agenda utilizada</p>
          </div>
        </div>

        {/* 2x2 Grid of Charts */}
        <div className="grid grid-cols-2 gap-5">
          {/* Consultas por mês */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Consultas por mês</h2>
            <div className="flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200 h-[220px]">
              <div className="text-center">
                <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                <p className="text-[12px] text-slate-400 font-medium">Consultas por mês</p>
                <p className="text-[11px] text-slate-300 mt-1">Integração com chart library</p>
              </div>
            </div>
          </div>

          {/* Faturamento por mês */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Faturamento por mês</h2>
            <div className="flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200 h-[220px]">
              <div className="text-center">
                <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <p className="text-[12px] text-slate-400 font-medium">Faturamento por mês</p>
                <p className="text-[11px] text-slate-300 mt-1">Integração com chart library</p>
              </div>
            </div>
          </div>

          {/* Top CIDs */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Top CIDs</h2>
            <div className="space-y-4">
              {cids.map((cid) => (
                <div key={cid.code}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-slate-700">{cid.code}</span>
                      <span className="text-[11.5px] text-slate-500">{cid.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold text-slate-700">{cid.count}</span>
                      <span className="text-[11px] text-slate-400">{cid.pct}%</span>
                    </div>
                  </div>
                  <ProgressBar value={cid.pct} color={cid.color} />
                </div>
              ))}
            </div>
          </div>

          {/* Retenção de pacientes */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Retenção de pacientes</h2>
            <div className="flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200 h-[220px]">
              <div className="text-center">
                <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <p className="text-[12px] text-slate-400 font-medium">Retenção de pacientes</p>
                <p className="text-[11px] text-slate-300 mt-1">Integração com chart library</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
