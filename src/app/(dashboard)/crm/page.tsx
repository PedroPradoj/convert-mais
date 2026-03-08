'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { avatarColor, avatarInitials } from '@/lib/utils'

interface PipelineCard {
  name: string
  info: string
  convenio?: string
}

interface PipelineColumn {
  id: string
  label: string
  dotColor: string
  badgeVariant: 'gray' | 'blue' | 'teal' | 'yellow' | 'red'
  cards: PipelineCard[]
  action?: { label: string; toastMsg: string }
}

const columns: PipelineColumn[] = [
  {
    id: 'novos-leads',
    label: 'Novos Leads',
    dotColor: '#94a3b8',
    badgeVariant: 'gray',
    cards: [
      { name: 'Bruno Castro', info: 'Meta Ads · hoje' },
      { name: 'Larissa Viana', info: 'Google · ontem' },
      { name: 'Paulo Melo', info: 'Indicação · 2d' },
      { name: 'Célia Ramos', info: 'Instagram · 3d' },
    ],
  },
  {
    id: 'agendado',
    label: 'Agendado',
    dotColor: '#2563eb',
    badgeVariant: 'blue',
    cards: [
      { name: 'Carlos Mendes', info: 'Retorno · 06/03' },
      { name: 'Fernanda Lira', info: 'Consulta · 06/03' },
      { name: 'Roberto Silva', info: 'Urgência · 06/03' },
      { name: 'Ana Costa', info: 'Retorno · 10/03' },
      { name: 'Joana Ramos', info: 'Consulta · 06/03' },
      { name: 'Lucas Faria', info: 'Retorno · 06/03' },
    ],
  },
  {
    id: 'em-tratamento',
    label: 'Em Tratamento',
    dotColor: '#0d9488',
    badgeVariant: 'teal',
    cards: [
      { name: 'Ana Costa', info: '12 cons · R$2.890' },
      { name: 'Marcos Oliveira', info: '5 cons · R$1.340' },
      { name: 'Thiago Batista', info: '18 cons · R$4.100' },
      { name: 'Sandra Freitas', info: '4 cons · R$980' },
      { name: 'José Pereira', info: '14 cons · R$3.200' },
      { name: 'Rita Almeida', info: '3 cons · R$760' },
      { name: 'Henrique Costa', info: '7 cons · R$1.890' },
      { name: 'Cláudia Nunes', info: '9 cons · R$2.100' },
      { name: 'Fábio Lima', info: '2 cons · R$650' },
    ],
  },
  {
    id: 'retorno-pendente',
    label: 'Retorno Pendente',
    dotColor: '#eab308',
    badgeVariant: 'yellow',
    cards: [
      { name: 'Maria Souza', info: 'Há 58 dias' },
      { name: 'Pedro Leal', info: 'Há 72 dias' },
      { name: 'Débora Pinto', info: 'Há 61 dias' },
      { name: 'Ricardo Faria', info: 'Há 90 dias' },
      { name: 'Aline Santos', info: 'Há 45 dias' },
    ],
    action: { label: 'Agendar retorno', toastMsg: 'Retorno agendado com sucesso' },
  },
  {
    id: 'inativo',
    label: 'Inativo',
    dotColor: '#ef4444',
    badgeVariant: 'red',
    cards: [
      { name: 'Felipe Dias', info: 'Há 120 dias' },
      { name: 'Tânia Rocha', info: 'Há 185 dias' },
      { name: 'Gustavo Alves', info: 'Há 210 dias' },
    ],
    action: { label: 'Reengajar', toastMsg: 'Campanha de reengajamento enviada' },
  },
]

const convenios = ['Todos', 'Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Particular']

export default function CRMPage() {
  const [search, setSearch] = useState('')
  const [convenio, setConvenio] = useState('Todos')
  const { toast } = useToast()

  const filtered = columns.map((col) => ({
    ...col,
    cards: col.cards.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    ),
  }))

  return (
    <div className="flex flex-col h-full">
      <Topbar title="CRM de Pacientes" />

      {/* Toolbar */}
      <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center gap-3">
        <div className="relative flex-1 max-w-[320px]">
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-[33px] py-[7px] px-3 bg-slate-50 text-[12.5px] border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
          />
          <svg
            className="absolute left-[10px] top-[8px]"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <select
          value={convenio}
          onChange={(e) => setConvenio(e.target.value)}
          className="text-[12.5px] border border-slate-200 rounded-lg bg-slate-50 px-3 py-[7px] outline-none focus:border-blue-500 text-slate-700"
        >
          {convenios.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={() => toast('Formulário de novo paciente aberto')}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-semibold px-4 py-[7px] flex items-center gap-[6px] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo Paciente
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 p-5 h-full min-w-max">
          {filtered.map((col) => (
            <div
              key={col.id}
              className="min-w-[210px] max-w-[210px] flex flex-col h-full"
            >
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <span
                  className="w-[9px] h-[9px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: col.dotColor }}
                />
                <span className="text-[12.5px] font-semibold text-slate-700 truncate">
                  {col.label}
                </span>
                <Badge variant={col.badgeVariant} className="ml-auto">
                  {col.cards.length}
                </Badge>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto space-y-[9px] pr-1 pb-4">
                {col.cards.map((card, idx) => (
                  <div
                    key={`${col.id}-${idx}`}
                    className="bg-white border border-slate-200 rounded-[11px] p-3 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-[9px]">
                      <div
                        className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                        style={{ backgroundColor: avatarColor(card.name) }}
                      >
                        {avatarInitials(card.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-semibold text-slate-800 truncate">
                          {card.name}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-[1px] truncate">
                          {card.info}
                        </p>
                      </div>
                    </div>

                    {col.action && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toast(`${col.action!.toastMsg}: ${card.name}`)
                        }}
                        className="mt-2 w-full text-[11px] font-semibold py-[5px] rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        {col.action.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
