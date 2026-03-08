'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { avatarColor, avatarInitials } from '@/lib/utils'

type Channel = 'WhatsApp' | 'E-mail' | 'Instagram'

interface Conversation {
  name: string
  channel: Channel
  time: string
  unread?: boolean
}

const conversations: Conversation[] = [
  { name: 'Ana Costa', channel: 'WhatsApp', time: '10:24', unread: true },
  { name: 'Carlos Mendes', channel: 'WhatsApp', time: '09:42', unread: true },
  { name: 'Fernanda Lira', channel: 'E-mail', time: '09:15' },
  { name: 'Joana Ramos', channel: 'WhatsApp', time: 'ontem' },
  { name: 'Roberto Silva', channel: 'WhatsApp', time: 'ontem' },
  { name: 'Maria Souza', channel: 'Instagram', time: 'ontem' },
  { name: 'Pedro Leal', channel: 'WhatsApp', time: 'seg' },
  { name: 'Débora Pinto', channel: 'E-mail', time: 'sex' },
]

interface Message {
  from: 'patient' | 'doctor'
  text: string
  time: string
}

const messages: Message[] = [
  { from: 'patient', text: 'Dr. Rafael, bom dia! Queria confirmar minha consulta de hoje às 10h 😊', time: '09:45' },
  { from: 'doctor', text: 'Bom dia, Ana! Sim, confirmada. Por favor chegue 10 minutos antes.', time: '09:52' },
  { from: 'patient', text: 'Perfeito! Estava com dúvida sobre minha pressão — estava em 140/90 esta semana 😟', time: '09:54' },
  { from: 'doctor', text: 'Entendo sua preocupação. Vamos avaliar tudo hoje. Traga o monitor de pressão se tiver.', time: '09:58' },
  { from: 'patient', text: 'Ótimo, obrigada! Até logo! 🙏', time: '10:02' },
  { from: 'doctor', text: 'Até logo! ✅', time: '10:03' },
]

const templateButtons = [
  { icon: '🗓', label: 'Confirmar consulta' },
  { icon: '📋', label: 'Resultado de exame' },
  { icon: '💊', label: 'Renovação de receita' },
  { icon: '🔄', label: 'Retorno pendente' },
  { icon: '⭐', label: 'Avaliar atendimento' },
]

const channelBadgeVariant: Record<Channel, 'green' | 'blue' | 'purple'> = {
  WhatsApp: 'green',
  'E-mail': 'blue',
  Instagram: 'purple',
}

type FilterChannel = 'Todos' | Channel

const pendingTasks = [
  { label: 'Verificar resultado de hemograma', done: false },
  { label: 'Enviar prescrição atualizada', done: false },
  { label: 'Agendar retorno em 30 dias', done: true },
  { label: 'Solicitar autorização convênio', done: false },
]

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [search, setSearch] = useState('')
  const [channelFilter, setChannelFilter] = useState<FilterChannel>('Todos')
  const [messageInput, setMessageInput] = useState('')
  const [tasks, setTasks] = useState(pendingTasks)
  const { toast } = useToast()

  const selected = conversations[selectedConversation]

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchesChannel = channelFilter === 'Todos' || c.channel === channelFilter
    return matchesSearch && matchesChannel
  })

  const channelCounts: Record<FilterChannel, number> = {
    Todos: conversations.length,
    WhatsApp: conversations.filter((c) => c.channel === 'WhatsApp').length,
    'E-mail': conversations.filter((c) => c.channel === 'E-mail').length,
    Instagram: conversations.filter((c) => c.channel === 'Instagram').length,
  }

  const handleSend = () => {
    if (messageInput.trim()) {
      toast('Mensagem enviada')
      setMessageInput('')
    }
  }

  const toggleTask = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    )
  }

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Inbox Unificado" />

      <div className="flex-1 overflow-hidden p-5">
        <div
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden h-full"
          style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px' }}
        >
          {/* Left - Channel Filters & Conversation List */}
          <div className="border-r border-slate-200 flex flex-col overflow-hidden">
            {/* Channel Filters */}
            <div className="p-3 border-b border-slate-200 flex flex-wrap gap-[6px]">
              {(['Todos', 'WhatsApp', 'E-mail', 'Instagram'] as FilterChannel[]).map((ch) => {
                const isActive = channelFilter === ch
                const variant =
                  ch === 'Todos'
                    ? 'gray'
                    : ch === 'WhatsApp'
                      ? 'green'
                      : ch === 'E-mail'
                        ? 'blue'
                        : 'purple'
                return (
                  <button
                    key={ch}
                    onClick={() => setChannelFilter(ch)}
                    className={`inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[11px] font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {ch}
                    {ch === 'Todos' && (
                      <span className={`text-[10px] ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                        {channelCounts[ch]}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Search */}
            <div className="p-3 border-b border-slate-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar conversa..."
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
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => {
                const originalIdx = conversations.indexOf(conv)
                return (
                  <div
                    key={conv.name}
                    onClick={() => setSelectedConversation(originalIdx)}
                    className={`flex items-center gap-[10px] px-3 py-[10px] cursor-pointer transition-colors border-b border-slate-100 ${
                      originalIdx === selectedConversation
                        ? 'bg-blue-50 border-r-2 border-r-blue-500'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                      style={{ backgroundColor: avatarColor(conv.name) }}
                    >
                      {avatarInitials(conv.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[12.5px] font-semibold text-slate-800 truncate">
                          {conv.name}
                        </span>
                        <span className="text-[10.5px] text-slate-400 flex-shrink-0 ml-2">
                          {conv.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-[6px] mt-[2px]">
                        <Badge variant={channelBadgeVariant[conv.channel]} className="text-[9.5px] px-[5px] py-0">
                          {conv.channel}
                        </Badge>
                        {conv.unread && (
                          <span className="w-[7px] h-[7px] rounded-full bg-blue-500 flex-shrink-0 ml-auto" />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Center - Chat Area */}
          <div className="flex flex-col overflow-hidden border-r border-slate-200">
            {/* Chat Header */}
            <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                  style={{ backgroundColor: avatarColor(selected.name) }}
                >
                  {avatarInitials(selected.name)}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">{selected.name}</p>
                  <div className="flex items-center gap-[6px]">
                    <Badge variant={channelBadgeVariant[selected.channel]} className="text-[9.5px] px-[5px] py-0">
                      {selected.channel}
                    </Badge>
                    <span className="text-[11px] text-green-500 flex items-center gap-1">
                      <span className="w-[5px] h-[5px] rounded-full bg-green-500 inline-block" />
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => toast('Abrindo prontuário...')}>
                  Ver Prontuário
                </Button>
                <Button variant="secondary" onClick={() => toast('Agendando retorno...')}>
                  Agendar Retorno
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.from === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[65%] px-3 py-2 ${
                      msg.from === 'patient'
                        ? 'bg-white border border-slate-200 rounded-[0_12px_12px_12px]'
                        : 'bg-green-100 rounded-[12px_0_12px_12px]'
                    }`}
                  >
                    <p className="text-[13px] text-slate-800 leading-relaxed">{msg.text}</p>
                    <p className="text-[10px] text-slate-400 mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Template Buttons */}
            <div className="bg-white border-t border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
              {templateButtons.map((tpl) => (
                <button
                  key={tpl.label}
                  onClick={() => toast(`Template "${tpl.label}" inserido`)}
                  className="flex items-center gap-[5px] px-3 py-[5px] rounded-full border border-slate-200 bg-slate-50 text-[11.5px] font-medium text-slate-600 hover:bg-slate-100 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <span>{tpl.icon}</span>
                  {tpl.label}
                </button>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Digite uma mensagem..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 py-[9px] px-4 bg-slate-50 text-[13px] border border-slate-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
                />
                <Button onClick={handleSend}>Enviar</Button>
              </div>
            </div>
          </div>

          {/* Right - Patient Info Sidebar */}
          <div className="flex flex-col overflow-y-auto bg-white">
            {/* Patient Header */}
            <div className="p-4 border-b border-slate-200 text-center">
              <div
                className="w-[56px] h-[56px] rounded-full flex items-center justify-center text-white text-[18px] font-bold mx-auto"
                style={{ backgroundColor: avatarColor(selected.name) }}
              >
                {avatarInitials(selected.name)}
              </div>
              <p className="text-[14px] font-bold text-slate-800 mt-2">{selected.name}</p>
              <p className="text-[11.5px] text-slate-400 mt-[2px]">Paciente desde 2023</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="green">Ativa</Badge>
                <Badge variant="blue">{selected.channel}</Badge>
              </div>
            </div>

            {/* Clinical Summary */}
            <div className="p-4 border-b border-slate-200">
              <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mb-2">Resumo Clínico</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-[12.5px]">
                  <span className="text-slate-500">Idade</span>
                  <span className="text-slate-800 font-medium">42 anos</span>
                </div>
                <div className="flex justify-between text-[12.5px]">
                  <span className="text-slate-500">Convênio</span>
                  <span className="text-slate-800 font-medium">Unimed</span>
                </div>
                <div className="flex justify-between text-[12.5px]">
                  <span className="text-slate-500">Última consulta</span>
                  <span className="text-slate-800 font-medium">28/02/2026</span>
                </div>
                <div className="flex justify-between text-[12.5px]">
                  <span className="text-slate-500">Pressão arterial</span>
                  <span className="text-slate-800 font-medium">140/90 mmHg</span>
                </div>
                <div className="flex justify-between text-[12.5px]">
                  <span className="text-slate-500">Medicação</span>
                  <span className="text-slate-800 font-medium">Losartana 50mg</span>
                </div>
                <div className="flex justify-between text-[12.5px]">
                  <span className="text-slate-500">Próximo retorno</span>
                  <span className="text-slate-800 font-medium">10/03/2026</span>
                </div>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="p-4 border-b border-slate-200">
              <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mb-2">Tarefas Pendentes</h4>
              <div className="space-y-[8px]">
                {tasks.map((task, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(idx)}
                      className="mt-[2px] w-[14px] h-[14px] rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                    />
                    <span
                      className={`text-[12.5px] leading-snug ${
                        task.done ? 'text-slate-400 line-through' : 'text-slate-700'
                      }`}
                    >
                      {task.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact History */}
            <div className="p-4">
              <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mb-2">Histórico de Contato</h4>
              <div className="space-y-[10px]">
                <div className="flex items-start gap-2">
                  <span className="w-[6px] h-[6px] rounded-full bg-green-500 mt-[5px] flex-shrink-0" />
                  <div>
                    <p className="text-[12px] text-slate-700 font-medium">WhatsApp - Confirmação</p>
                    <p className="text-[11px] text-slate-400">Hoje, 10:24</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-[6px] h-[6px] rounded-full bg-green-500 mt-[5px] flex-shrink-0" />
                  <div>
                    <p className="text-[12px] text-slate-700 font-medium">WhatsApp - Consulta</p>
                    <p className="text-[11px] text-slate-400">28/02, 14:30</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-[6px] h-[6px] rounded-full bg-blue-500 mt-[5px] flex-shrink-0" />
                  <div>
                    <p className="text-[12px] text-slate-700 font-medium">E-mail - Resultado exame</p>
                    <p className="text-[11px] text-slate-400">25/02, 09:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-[6px] h-[6px] rounded-full bg-green-500 mt-[5px] flex-shrink-0" />
                  <div>
                    <p className="text-[12px] text-slate-700 font-medium">WhatsApp - Lembrete retorno</p>
                    <p className="text-[11px] text-slate-400">20/02, 08:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-[6px] h-[6px] rounded-full bg-violet-500 mt-[5px] flex-shrink-0" />
                  <div>
                    <p className="text-[12px] text-slate-700 font-medium">Instagram - Mensagem direta</p>
                    <p className="text-[11px] text-slate-400">15/02, 16:45</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
