'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

interface Automation {
  id: number
  emoji: string
  title: string
  description: string
  trigger: string
  action: string
  dispatches: number
  responseRate: string
  active: boolean
}

const automationsData: Automation[] = [
  { id: 1, emoji: '📅', title: 'Confirmação de consulta', description: 'Envia confirmação automática ao paciente quando consulta é agendada', trigger: 'Agendamento', action: 'WhatsApp', dispatches: 148, responseRate: '94%', active: true },
  { id: 2, emoji: '🔄', title: 'Retorno em atraso', description: 'Notifica pacientes que não retornam há mais de 60 dias', trigger: '60 dias sem consulta', action: 'WhatsApp + Tarefa', dispatches: 38, responseRate: '43%', active: true },
  { id: 3, emoji: '💊', title: 'Renovação de receita', description: 'Cria tarefa para o médico renovar receita antes do vencimento', trigger: '7 dias antes', action: 'Tarefa para médico', dispatches: 22, responseRate: '88%', active: true },
  { id: 4, emoji: '🧪', title: 'Resultado de exame', description: 'Avisa o paciente quando o laudo do exame é adicionado ao prontuário', trigger: 'Laudo adicionado', action: 'WhatsApp', dispatches: 31, responseRate: '97%', active: true },
  { id: 5, emoji: '⭐', title: 'NPS', description: 'Envia pesquisa de satisfação após a consulta para medir a experiência', trigger: '2h pós consulta', action: 'WhatsApp com link', dispatches: 24, responseRate: '61%', active: true },
  { id: 6, emoji: '🎂', title: 'Aniversário', description: 'Envia mensagem personalizada de felicitação no aniversário do paciente', trigger: 'Data aniversário', action: 'WhatsApp personalizado', dispatches: 7, responseRate: '72%', active: false },
  { id: 7, emoji: '😴', title: 'Reengajamento', description: 'Sequência de mensagens para reativar pacientes inativos há 90+ dias', trigger: '90 dias sem interação', action: 'Sequência 3 msgs', dispatches: 14, responseRate: '29%', active: true },
  { id: 8, emoji: '📋', title: 'Pós-consulta HAS', description: 'Envia orientações de hipertensão arterial após consulta com CID I10', trigger: 'CID I10', action: 'WhatsApp + PDF', dispatches: 0, responseRate: '—', active: false },
  { id: 9, emoji: '🩺', title: 'Exame periódico diabéticos', description: 'Lembra pacientes diabéticos de realizar exames periódicos de controle', trigger: '90 dias após exame', action: 'WhatsApp', dispatches: 0, responseRate: '—', active: false },
]

export default function AutomacoesPage() {
  const [automations, setAutomations] = useState(automationsData)
  const { toast } = useToast()

  const toggleAutomation = (id: number) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    )
    toast('Automação atualizada')
  }

  const activeCount = automations.filter((a) => a.active).length
  const totalDispatches = automations.reduce((s, a) => s + a.dispatches, 0)

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Automações" />

      {/* KPIs */}
      <div className="px-6 py-4 bg-white border-b border-slate-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Ativas</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">{activeCount}</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">de {automations.length}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Disparos</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">{totalDispatches}</p>
            <p className="text-[11px] text-emerald-500 font-medium mt-1">↑31%</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Taxa resposta</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">67%</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Média geral</p>
          </div>
        </div>
      </div>

      {/* Automations grid */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-2 gap-4">
          {automations.map((auto) => (
            <div
              key={auto.id}
              className={`bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all ${!auto.active ? 'opacity-60' : ''}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-[24px]">{auto.emoji}</span>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-800">{auto.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-[2px] leading-relaxed">{auto.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleAutomation(auto.id)}
                  className={`w-[40px] h-[22px] rounded-full flex-shrink-0 transition-colors relative cursor-pointer ${auto.active ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <span
                    className={`absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform ${auto.active ? 'left-[20px]' : 'left-[2px]'}`}
                  />
                </button>
              </div>

              {/* Trigger & Action */}
              <div className="flex gap-4 mb-3">
                <div className="flex items-center gap-[6px]">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Gatilho:</span>
                  <Badge variant="blue">{auto.trigger}</Badge>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Ação:</span>
                  <Badge variant="teal">{auto.action}</Badge>
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400">Disparos</span>
                    <p className="text-[14px] font-bold text-slate-800">{auto.dispatches}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400">Taxa resposta</span>
                    <p className="text-[14px] font-bold text-slate-800">{auto.responseRate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" className="text-[11px] px-3 py-[5px]" onClick={() => toast(`Editando: ${auto.title}`)}>
                    Editar
                  </Button>
                  <Button variant="ghost" className="text-[11px] px-3 py-[5px]" onClick={() => toast(`Relatório: ${auto.title}`)}>
                    Relatório
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
