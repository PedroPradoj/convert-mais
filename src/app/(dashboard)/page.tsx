'use client'

import Link from 'next/link'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import { useToast } from '@/components/ui/Toast'

const kpis = [
  {
    label: 'Consultas hoje',
    value: '24',
    change: '↑12%',
    changeColor: 'text-emerald-500',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    iconBg: 'bg-blue-50',
  },
  {
    label: 'Pacientes ativos',
    value: '1.248',
    change: '+5 novos',
    changeColor: 'text-teal-500',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    iconBg: 'bg-teal-50',
  },
  {
    label: 'Faturamento do mês',
    value: 'R$18.4k',
    change: '↑8%',
    changeColor: 'text-emerald-500',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    iconBg: 'bg-green-50',
  },
  {
    label: 'CAC médio',
    value: 'R$12,40',
    change: '47 leads',
    changeColor: 'text-violet-500',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    iconBg: 'bg-violet-50',
  },
]

const appointments = [
  { time: '08:00', patient: 'Maria Silva', type: 'Retorno', status: 'Confirmada', statusVariant: 'green' as const },
  { time: '09:00', patient: 'João Santos', type: 'Primeira consulta', status: 'Aguardando', statusVariant: 'yellow' as const },
  { time: '10:30', patient: 'Ana Oliveira', type: 'Exames', status: 'Confirmada', statusVariant: 'green' as const },
  { time: '11:00', patient: 'Carlos Mendes', type: 'Retorno', status: 'Encaixe', statusVariant: 'purple' as const },
  { time: '14:00', patient: 'Beatriz Lima', type: 'Procedimento', status: 'Confirmada', statusVariant: 'green' as const },
]

const pipelineStages = [
  { label: 'Novo Lead', count: 18, color: '#2563eb' },
  { label: 'Agendamento', count: 12, color: '#0d9488' },
  { label: 'Consulta Realizada', count: 8, color: '#16a34a' },
  { label: 'Proposta Enviada', count: 5, color: '#f59e0b' },
  { label: 'Convertido', count: 3, color: '#7c3aed' },
]

const pendingActions = [
  { text: 'Retorno de Maria Silva pendente', bg: 'bg-red-50', textColor: 'text-red-700', border: 'border-red-100' },
  { text: 'Laudos de exames para revisar (3)', bg: 'bg-yellow-50', textColor: 'text-yellow-700', border: 'border-yellow-100' },
  { text: 'Confirmações de amanhã (6 pacientes)', bg: 'bg-blue-50', textColor: 'text-blue-700', border: 'border-blue-100' },
  { text: 'Mensagem de follow-up pendente', bg: 'bg-teal-50', textColor: 'text-teal-700', border: 'border-teal-100' },
]

const patientSources = [
  { label: 'Google Ads', value: 38, color: '#2563eb' },
  { label: 'Indicação', value: 29, color: '#0d9488' },
  { label: 'Meta Ads', value: 22, color: '#7c3aed' },
  { label: 'Orgânico', value: 11, color: '#16a34a' },
]

export default function DashboardPage() {
  const { toast } = useToast()

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <Topbar
        title="Dashboard"
        onNewAppointment={() => toast('Abrindo agendamento...')}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-[14px]">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-[13px] border border-slate-200 p-[18px] flex items-center gap-[14px]"
            >
              <div className={`w-[42px] h-[42px] rounded-xl ${kpi.iconBg} flex items-center justify-center`}>
                {kpi.icon}
              </div>
              <div>
                <p className="text-[11.5px] text-slate-400 font-medium">{kpi.label}</p>
                <div className="flex items-baseline gap-[7px]">
                  <span className="text-[21px] font-extrabold text-slate-900">{kpi.value}</span>
                  <span className={`text-[11px] font-semibold ${kpi.changeColor}`}>{kpi.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column: Agenda + Pipeline */}
        <div className="grid grid-cols-[2fr_1fr] gap-[14px]">
          {/* Agenda de Hoje */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-[18px]">
            <div className="flex items-center justify-between mb-[14px]">
              <h2 className="text-[14px] font-bold text-slate-900">Agenda de hoje</h2>
              <Link href="/agenda">
                <Button variant="ghost" className="text-[12px] px-2 py-1">
                  Ver agenda completa
                </Button>
              </Link>
            </div>
            <div className="space-y-[8px]">
              {appointments.map((apt) => (
                <div
                  key={apt.time}
                  className="flex items-center gap-[12px] p-[10px] rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span className="text-[13px] font-bold text-slate-700 w-[48px]">{apt.time}</span>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-slate-800">{apt.patient}</p>
                    <p className="text-[11px] text-slate-400">{apt.type}</p>
                  </div>
                  <Badge variant={apt.statusVariant}>{apt.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline CRM */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-[18px]">
            <div className="flex items-center justify-between mb-[14px]">
              <h2 className="text-[14px] font-bold text-slate-900">Pipeline CRM</h2>
              <Link href="/crm">
                <Button variant="ghost" className="text-[12px] px-2 py-1">
                  Ver CRM
                </Button>
              </Link>
            </div>
            <div className="space-y-[10px]">
              {pipelineStages.map((stage) => (
                <div key={stage.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-[8px]">
                    <div
                      className="w-[8px] h-[8px] rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="text-[13px] text-slate-600">{stage.label}</span>
                  </div>
                  <span className="text-[14px] font-bold text-slate-800">{stage.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-[14px] pt-[14px] border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-slate-400">Total no funil</span>
                <span className="text-[15px] font-extrabold text-slate-900">
                  {pipelineStages.reduce((sum, s) => sum + s.count, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Three-column section */}
        <div className="grid grid-cols-3 gap-[14px]">
          {/* Ações Pendentes */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-[18px]">
            <h2 className="text-[14px] font-bold text-slate-900 mb-[14px]">Ações Pendentes</h2>
            <div className="space-y-[8px]">
              {pendingActions.map((action) => (
                <div
                  key={action.text}
                  className={`${action.bg} ${action.textColor} ${action.border} border rounded-lg p-[10px] text-[12.5px] font-medium`}
                >
                  {action.text}
                </div>
              ))}
            </div>
          </div>

          {/* Origem dos Pacientes */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-[18px]">
            <h2 className="text-[14px] font-bold text-slate-900 mb-[14px]">Origem dos Pacientes</h2>
            <div className="space-y-[12px]">
              {patientSources.map((source) => (
                <div key={source.label}>
                  <div className="flex items-center justify-between mb-[2px]">
                    <span className="text-[12.5px] text-slate-600">{source.label}</span>
                    <span className="text-[12.5px] font-bold text-slate-700">{source.value}%</span>
                  </div>
                  <ProgressBar value={source.value} color={source.color} />
                </div>
              ))}
            </div>
          </div>

          {/* Consultas 7 dias */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-[18px]">
            <h2 className="text-[14px] font-bold text-slate-900 mb-[14px]">Consultas 7 dias</h2>
            <div className="flex-1 flex items-center justify-center h-[180px] bg-slate-50 rounded-lg border border-dashed border-slate-200 text-[13px] text-slate-400">
              Gráfico de consultas
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
