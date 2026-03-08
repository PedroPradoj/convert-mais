'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { avatarColor, avatarInitials } from '@/lib/utils'

interface Conversation {
  name: string
  lastMessage: string
  time: string
  unread?: boolean
}

const conversations: Conversation[] = [
  { name: 'Ana Costa', lastMessage: 'Confirmado ✓', time: '10:24', unread: true },
  { name: 'Carlos Mendes', lastMessage: 'Recebi! Obrigado', time: '09:15' },
  { name: 'Fernanda Lira', lastMessage: '[Prescrição enviada]', time: '08:30' },
  { name: 'Joana Ramos', lastMessage: 'Ok, até amanhã', time: 'ontem' },
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

interface Automation {
  icon: string
  label: string
  enabled: boolean
}

const defaultAutomations: Automation[] = [
  { icon: '📅', label: 'Confirmação 24h', enabled: true },
  { icon: '🔄', label: 'Retorno em atraso', enabled: true },
  { icon: '💊', label: 'Renovação de receita', enabled: true },
  { icon: '🧪', label: 'Resultado de exame', enabled: false },
]

export default function WhatsAppPage() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [search, setSearch] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [automations, setAutomations] = useState(defaultAutomations)
  const { toast } = useToast()

  const selected = conversations[selectedConversation]

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const toggleAutomation = (index: number) => {
    setAutomations((prev) =>
      prev.map((a, i) =>
        i === index ? { ...a, enabled: !a.enabled } : a
      )
    )
    const auto = automations[index]
    toast(`${auto.label} ${auto.enabled ? 'desativada' : 'ativada'}`)
  }

  const handleSend = () => {
    if (messageInput.trim()) {
      toast('Mensagem enviada')
      setMessageInput('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Topbar title="WhatsApp" />

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Chat Section */}
        <div
          className="flex-1 flex overflow-hidden"
          style={{ display: 'grid', gridTemplateColumns: '275px 1fr' }}
        >
          {/* Conversation List */}
          <div className="border-r border-slate-200 bg-white flex flex-col overflow-hidden">
            <div className="p-3 border-b border-slate-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar conversa..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-[33px] py-[7px] px-3 bg-slate-50 text-[12.5px] border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none"
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

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv, idx) => {
                const originalIdx = conversations.indexOf(conv)
                return (
                  <div
                    key={conv.name}
                    onClick={() => setSelectedConversation(originalIdx)}
                    className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors ${
                      originalIdx === selectedConversation
                        ? 'bg-green-50 border-r-2 border-green-500'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
                      style={{ backgroundColor: avatarColor(conv.name) }}
                    >
                      {avatarInitials(conv.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-slate-800 truncate">
                          {conv.name}
                        </span>
                        <span className="text-[11px] text-slate-400 flex-shrink-0 ml-2">
                          {conv.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-[2px]">
                        <span className="text-[12px] text-slate-500 truncate">
                          {conv.lastMessage}
                        </span>
                        {conv.unread && (
                          <span className="w-[8px] h-[8px] rounded-full bg-green-500 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col bg-slate-50 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                  style={{ backgroundColor: avatarColor(selected.name) }}
                >
                  {avatarInitials(selected.name)}
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-slate-800">{selected.name}</p>
                  <p className="text-[11.5px] text-green-500 flex items-center gap-1">
                    <span className="w-[6px] h-[6px] rounded-full bg-green-500 inline-block" />
                    Online
                  </p>
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
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
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

            {/* Message Input */}
            <div className="bg-white border-t border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Digite uma mensagem..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 py-[9px] px-4 bg-slate-50 text-[13px] border border-slate-200 rounded-full focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none"
                />
                <Button
                  variant="secondary"
                  onClick={() => toast('Templates abertos')}
                >
                  Templates
                </Button>
                <Button
                  onClick={handleSend}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Automations Section */}
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <h3 className="text-[13.5px] font-bold text-slate-800 mb-3">Automações WhatsApp</h3>
          <div className="grid grid-cols-4 gap-3">
            {automations.map((auto, idx) => (
              <div
                key={auto.label}
                className="border border-slate-200 rounded-xl p-3 flex items-center justify-between hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[18px]">{auto.icon}</span>
                  <span className="text-[12.5px] font-semibold text-slate-700">{auto.label}</span>
                </div>
                <button
                  onClick={() => toggleAutomation(idx)}
                  className={`relative w-[36px] h-[20px] rounded-full transition-colors ${
                    auto.enabled ? 'bg-green-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow transition-transform ${
                      auto.enabled ? 'left-[18px]' : 'left-[2px]'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
