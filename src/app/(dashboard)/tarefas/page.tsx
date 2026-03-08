'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

interface Task {
  id: number
  text: string
  patient: string
  type: string
  typeEmoji: string
  deadline: string
  assignee: string
  status: 'urgente' | 'pendente' | 'concluída' | 'atrasada'
  done: boolean
}

const tasks: Task[] = [
  { id: 1, text: 'Ligar para paciente — resultado exame', patient: 'Ana Costa', type: 'Ligar', typeEmoji: '📞', deadline: 'Hoje 14h', assignee: 'Dr. Rafael', status: 'urgente', done: false },
  { id: 2, text: 'Enviar orientações pós-consulta', patient: 'Carlos Mendes', type: 'WhatsApp', typeEmoji: '💬', deadline: 'Hoje 16h', assignee: 'Juliana', status: 'pendente', done: false },
  { id: 3, text: 'Agendar retorno — hipertensão', patient: 'Maria Souza', type: 'Agendar', typeEmoji: '📅', deadline: 'Hoje 18h', assignee: 'Juliana', status: 'urgente', done: false },
  { id: 4, text: 'Revisar prontuário para encaminhamento', patient: 'Pedro Leal', type: 'Documento', typeEmoji: '📄', deadline: 'Amanhã 10h', assignee: 'Dr. Rafael', status: 'pendente', done: false },
  { id: 5, text: 'Renovar receita — Losartana', patient: 'José Pereira', type: 'Receita', typeEmoji: '💊', deadline: 'Amanhã 14h', assignee: 'Dra. Mariana', status: 'pendente', done: false },
  { id: 6, text: 'Solicitar hemograma de controle', patient: 'Roberto Silva', type: 'Exame', typeEmoji: '🧪', deadline: '10/03 09h', assignee: 'Dr. Rafael', status: 'pendente', done: false },
  { id: 7, text: 'Cobrar parcela em atraso', patient: 'Thiago Batista', type: 'Financeiro', typeEmoji: '💰', deadline: '10/03 11h', assignee: 'Carlos Eduardo', status: 'atrasada', done: false },
  { id: 8, text: 'Follow-up satisfação pós-cirurgia', patient: 'Sandra Freitas', type: 'Follow-up', typeEmoji: '🔄', deadline: '11/03 10h', assignee: 'Juliana', status: 'pendente', done: false },
]

const typeButtons = [
  { emoji: '📞', label: 'Ligar' },
  { emoji: '💬', label: 'WhatsApp' },
  { emoji: '📅', label: 'Agendar' },
  { emoji: '📄', label: 'Documento' },
  { emoji: '💊', label: 'Receita' },
  { emoji: '🧪', label: 'Exame' },
  { emoji: '💰', label: 'Financeiro' },
  { emoji: '🔄', label: 'Follow-up' },
]

const recurringTasks = [
  { id: 1, label: 'Confirmar consultas do dia seguinte', time: 'Diário · 18h', active: true },
  { id: 2, label: 'Enviar lembretes de retorno', time: 'Semanal · Segunda', active: true },
  { id: 3, label: 'Relatório de inadimplência', time: 'Mensal · Dia 1', active: false },
]

const statusBadgeVariant: Record<string, 'red' | 'yellow' | 'green' | 'gray'> = {
  urgente: 'red',
  pendente: 'yellow',
  concluída: 'green',
  atrasada: 'red',
}

export default function TarefasPage() {
  const [taskList, setTaskList] = useState(tasks)
  const [viewMode, setViewMode] = useState<'lista' | 'kanban'>('lista')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [priorityFilter, setPriorityFilter] = useState('Todas')
  const [selectedType, setSelectedType] = useState('')
  const [recurring, setRecurring] = useState(recurringTasks)
  const { toast } = useToast()

  const toggleTask = (id: number) => {
    setTaskList((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done, status: !t.done ? 'concluída' : 'pendente' } : t
      )
    )
    toast('Tarefa atualizada')
  }

  const toggleRecurring = (id: number) => {
    setRecurring((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    )
  }

  const filtered = taskList.filter((t) => {
    if (statusFilter !== 'Todos' && t.status !== statusFilter.toLowerCase()) return false
    if (priorityFilter === 'Urgentes' && t.status !== 'urgente') return false
    return true
  })

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Tarefas" />

      {/* KPIs */}
      <div className="px-6 py-4 bg-white border-b border-slate-200">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Abertas</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">8</p>
            <p className="text-[11px] text-red-500 font-medium mt-1">2 vencidas</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Concluídas hoje</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">5</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">de 13</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Esta semana</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">23</p>
            <p className="text-[11px] text-orange-500 font-medium mt-1">3 urgentes</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Taxa conclusão</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">78%</p>
            <p className="text-[11px] text-emerald-500 font-medium mt-1">↑12%</p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center gap-3">
        <div className="flex bg-slate-100 rounded-lg p-[3px]">
          <button
            onClick={() => setViewMode('lista')}
            className={`text-[12px] font-semibold px-3 py-[5px] rounded-md transition-colors ${viewMode === 'lista' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`text-[12px] font-semibold px-3 py-[5px] rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            Kanban
          </button>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-[12.5px] border border-slate-200 rounded-lg bg-slate-50 px-3 py-[7px] outline-none focus:border-blue-500 text-slate-700"
        >
          <option>Todos</option>
          <option>Urgente</option>
          <option>Pendente</option>
          <option>Concluída</option>
          <option>Atrasada</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="text-[12.5px] border border-slate-200 rounded-lg bg-slate-50 px-3 py-[7px] outline-none focus:border-blue-500 text-slate-700"
        >
          <option>Todas</option>
          <option>Urgentes</option>
        </select>

        <Button className="ml-auto" onClick={() => toast('Formulário de nova tarefa aberto')}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nova Tarefa
        </Button>
      </div>

      {/* Main content: two columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Task list */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_140px_100px_110px_120px_100px] px-4 py-[10px] bg-slate-50 border-b border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Tarefa</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Paciente</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Tipo</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Prazo</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Responsável</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Status</span>
            </div>

            {/* Rows */}
            {filtered.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[1fr_140px_100px_110px_120px_100px] px-4 py-3 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 flex-shrink-0 cursor-pointer"
                  />
                  <span className={`text-[12.5px] font-medium truncate ${task.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.text}
                  </span>
                </div>
                <span className="text-[12.5px] text-slate-600 truncate">{task.patient}</span>
                <span className="text-[12px] text-slate-500">{task.typeEmoji} {task.type}</span>
                <span className={`text-[12px] font-medium ${task.deadline.startsWith('Hoje') ? 'text-orange-600' : 'text-slate-500'}`}>
                  {task.deadline}
                </span>
                <span className="text-[12.5px] text-slate-600 truncate">{task.assignee}</span>
                <Badge variant={statusBadgeVariant[task.status]}>{task.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[320px] border-l border-slate-200 bg-white overflow-y-auto p-5 flex-shrink-0">
          {/* Quick task form */}
          <h3 className="text-[13px] font-bold text-slate-800 mb-4">Nova Tarefa Rápida</h3>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">Descrição</label>
              <input
                type="text"
                placeholder="Descreva a tarefa..."
                className="w-full py-[7px] px-3 bg-slate-50 text-[12.5px] border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">Paciente</label>
              <input
                type="text"
                placeholder="Buscar paciente..."
                className="w-full py-[7px] px-3 bg-slate-50 text-[12.5px] border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">Tipo</label>
              <div className="grid grid-cols-4 gap-[6px]">
                {typeButtons.map((tb) => (
                  <button
                    key={tb.label}
                    onClick={() => setSelectedType(tb.label)}
                    className={`flex flex-col items-center gap-[2px] py-2 px-1 rounded-lg border text-[10px] font-medium transition-colors cursor-pointer ${
                      selectedType === tb.label
                        ? 'border-blue-300 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[16px]">{tb.emoji}</span>
                    {tb.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">Data</label>
                <input
                  type="date"
                  className="w-full py-[7px] px-3 bg-slate-50 text-[12.5px] border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">Prioridade</label>
                <select className="w-full py-[7px] px-3 bg-slate-50 text-[12.5px] border border-slate-200 rounded-lg focus:border-blue-500 outline-none text-slate-700">
                  <option>Normal</option>
                  <option>Urgente</option>
                  <option>Baixa</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">Responsável</label>
              <select className="w-full py-[7px] px-3 bg-slate-50 text-[12.5px] border border-slate-200 rounded-lg focus:border-blue-500 outline-none text-slate-700">
                <option>Dr. Rafael Alves</option>
                <option>Dra. Mariana Costa</option>
                <option>Juliana Moraes</option>
                <option>Carlos Eduardo</option>
              </select>
            </div>

            <Button className="w-full justify-center" onClick={() => toast('Tarefa criada com sucesso')}>
              Criar Tarefa
            </Button>
          </div>

          {/* Recurring tasks */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <h3 className="text-[13px] font-bold text-slate-800 mb-3">Tarefas Recorrentes</h3>
            <div className="space-y-3">
              {recurring.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-slate-700 truncate">{r.label}</p>
                    <p className="text-[10.5px] text-slate-400">{r.time}</p>
                  </div>
                  <button
                    onClick={() => toggleRecurring(r.id)}
                    className={`w-[36px] h-[20px] rounded-full flex-shrink-0 transition-colors relative cursor-pointer ${r.active ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <span
                      className={`absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${r.active ? 'left-[18px]' : 'left-[2px]'}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
