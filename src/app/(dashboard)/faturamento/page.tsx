'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'

interface BillingEntry {
  patient: string
  convenio: string
  procedimento: string
  valor: string
  status: 'Pago' | 'Pendente' | 'Glosado'
}

const billingData: BillingEntry[] = [
  { patient: 'Ana Costa', convenio: 'Unimed', procedimento: 'Consulta cardiológica', valor: 'R$320', status: 'Pago' },
  { patient: 'Carlos Mendes', convenio: 'Amil', procedimento: 'Retorno', valor: 'R$180', status: 'Pago' },
  { patient: 'Roberto Silva', convenio: 'SulAmérica', procedimento: 'Urgência', valor: 'R$450', status: 'Pendente' },
  { patient: 'Fernanda Lira', convenio: 'Bradesco Saúde', procedimento: 'Ecocardiograma', valor: 'R$280', status: 'Pago' },
  { patient: 'Maria Souza', convenio: 'Particular', procedimento: 'Consulta + ECG', valor: 'R$520', status: 'Pendente' },
  { patient: 'Thiago Batista', convenio: 'Unimed', procedimento: 'Holter 24h', valor: 'R$380', status: 'Glosado' },
]

const statusConfig: Record<string, { variant: 'green' | 'yellow' | 'red'; label: string }> = {
  Pago: { variant: 'green', label: 'Pago' },
  Pendente: { variant: 'yellow', label: 'Pendente' },
  Glosado: { variant: 'red', label: 'Glosado' },
}

export default function FaturamentoPage() {
  const { toast } = useToast()
  const [period, setPeriod] = useState('Março 2026')

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Faturamento" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">Faturado</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">R$18.420</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 8% vs mês anterior</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">A receber</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">R$4.280</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Pendente de liberação</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">Ticket médio</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">R$312</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 3% vs mês anterior</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">Particular / Convênio</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">48% / 52%</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Distribuição de receita</p>
          </div>
        </div>

        {/* Two-column: Table + Chart */}
        <div className="grid grid-cols-3 gap-5">
          {/* Billing Table */}
          <div className="col-span-2 bg-white rounded-xl border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-[13.5px] font-bold text-slate-800">Últimos lançamentos</h2>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="text-[12px] border border-slate-200 rounded-lg bg-slate-50 px-3 py-[5px] outline-none focus:border-blue-500 text-slate-600"
              >
                <option>Março 2026</option>
                <option>Fevereiro 2026</option>
                <option>Janeiro 2026</option>
              </select>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Paciente</th>
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Convênio</th>
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Procedimento</th>
                  <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Valor</th>
                  <th className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {billingData.map((entry, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => toast(`Detalhes de ${entry.patient}`)}
                  >
                    <td className="px-5 py-3 text-[12.5px] font-semibold text-slate-800">{entry.patient}</td>
                    <td className="px-5 py-3 text-[12.5px] text-slate-600">{entry.convenio}</td>
                    <td className="px-5 py-3 text-[12.5px] text-slate-600">{entry.procedimento}</td>
                    <td className="px-5 py-3 text-[12.5px] font-semibold text-slate-800 text-right">{entry.valor}</td>
                    <td className="px-5 py-3 text-center">
                      <Badge variant={statusConfig[entry.status].variant}>
                        {statusConfig[entry.status].label}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col">
            <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Gráfico por convênio</h2>
            <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200 min-h-[280px]">
              <div className="text-center">
                <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
                <p className="text-[12px] text-slate-400 font-medium">Gráfico por convênio</p>
                <p className="text-[11px] text-slate-300 mt-1">Integração com chart library</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
