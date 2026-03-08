'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/layout/Modal'
import { useToast } from '@/components/ui/Toast'

const SLOTS = [
  { h: '08:00', n: 'Carlos Mendes', t: 'Retorno', s: 'confirmado', d: 'HAS + Dislipidemia' },
  { h: '08:30', n: 'Fernanda Lira', t: 'Consulta', s: 'confirmado', d: 'Check-up anual' },
  { h: '09:00', n: 'Roberto Silva', t: 'Urgência', s: 'aguardando', d: 'Dor precordial' },
  { h: '09:30', n: '— vaga livre —', t: '', s: 'livre', d: '' },
  { h: '10:00', n: 'Ana Costa', t: 'Retorno', s: 'confirmado', d: 'Revisão cardiológica' },
  { h: '10:30', n: 'Marcos Oliveira', t: 'Teleconsulta', s: 'confirmado', d: 'Resultado de exame' },
  { h: '11:00', n: 'Patrícia Nunes', t: 'Consulta', s: 'falta', d: '' },
  { h: '14:00', n: 'Joana Ramos', t: 'Consulta', s: 'confirmado', d: 'Arritmia' },
  { h: '14:30', n: 'Thiago Batista', t: 'Retorno', s: 'aguardando', d: 'Pós-cirúrgico' },
  { h: '15:00', n: '— vaga livre —', t: '', s: 'livre', d: '' },
  { h: '15:30', n: 'Sandra Freitas', t: 'Consulta', s: 'confirmado', d: 'HAS' },
  { h: '16:00', n: 'Lucas Faria', t: 'Retorno', s: 'confirmado', d: 'Valvulopatia' },
]

const statusStyles: Record<string, { bg: string; badge: 'green' | 'yellow' | 'red' | 'gray' }> = {
  confirmado: { bg: 'bg-green-50 border-green-200', badge: 'green' },
  aguardando: { bg: 'bg-yellow-50 border-yellow-200', badge: 'yellow' },
  falta: { bg: 'bg-red-50 border-red-200', badge: 'red' },
  livre: { bg: 'bg-slate-50 border-slate-200', badge: 'gray' },
}

export default function AgendaPage() {
  const { toast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const busyDays = [3, 6, 9, 10, 13, 17, 20, 24]
  const today = 6

  return (
    <>
      <Topbar title="Agenda" onNewAppointment={() => setShowModal(true)} />
      <div className="flex-1 p-5 overflow-y-auto max-h-[calc(100vh-62px)]">
        <div className="grid grid-cols-[248px_1fr] gap-[14px]">
          {/* Calendar sidebar */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-[18px] h-fit">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[13.5px] font-bold">Março 2026</span>
              <div className="flex gap-[3px]">
                <button className="bg-transparent text-slate-500 hover:bg-slate-100 px-2 py-[3px] rounded-[7px] text-sm">‹</button>
                <button className="bg-transparent text-slate-500 hover:bg-slate-100 px-2 py-[3px] rounded-[7px] text-sm">›</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-[2px] text-center text-[10.5px] text-slate-400 mb-1">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-[2px] text-center text-[11.5px]">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <div
                  key={d}
                  className={`rounded-[7px] py-[5px] px-[1px] cursor-pointer ${
                    d === today
                      ? 'bg-blue-600 text-white font-bold'
                      : busyDays.includes(d)
                      ? 'text-slate-700 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {d}
                  {busyDays.includes(d) && d !== today && (
                    <div className="w-1 h-1 bg-blue-600 rounded-full mx-auto mt-[1px]" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 pt-[11px] border-t border-slate-100">
              <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-slate-400 mb-2">Status</div>
              <div className="flex flex-col gap-[5px]">
                {[
                  { color: '#22c55e', label: 'Confirmado' },
                  { color: '#f59e0b', label: 'Aguardando' },
                  { color: '#ef4444', label: 'Falta' },
                  { color: '#3b82f6', label: 'Teleconsulta' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-[7px] text-[11.5px] text-slate-600">
                    <div className="w-[9px] h-[9px] rounded-[2px]" style={{ background: s.color }} />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Day view */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-[14px] font-bold">Sexta-feira, 06 de março</div>
                <div className="text-[11.5px] text-slate-400">12 consultas · 2 vagas livres</div>
              </div>
              <div className="flex gap-[6px]">
                <Button variant="secondary" className="text-xs">← Anterior</Button>
                <Button variant="secondary" className="text-xs">Próximo →</Button>
              </div>
            </div>
            <div className="flex flex-col gap-[7px]">
              {SLOTS.map((slot, i) => {
                const style = statusStyles[slot.s] || statusStyles.livre
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-[11px] p-[11px_14px] rounded-[10px] border-[1.5px] ${style.bg} cursor-pointer transition-transform hover:translate-x-[3px]`}
                  >
                    <span className="text-[11.5px] font-bold text-slate-400 w-10 flex-shrink-0">{slot.h}</span>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-slate-800">{slot.n}</div>
                      {slot.d && <div className="text-[11px] text-slate-400 mt-[1px]">{slot.d}</div>}
                    </div>
                    {slot.t && (
                      <Badge variant="blue">
                        {slot.t === 'Teleconsulta' ? '📹 ' : ''}{slot.t}
                      </Badge>
                    )}
                    <Badge variant={style.badge}>{slot.s}</Badge>
                    {slot.s !== 'livre' && slot.s !== 'falta' && (
                      <Button
                        variant="secondary"
                        className="text-[11px] py-[5px] px-[10px]"
                        onClick={(e) => { e.stopPropagation(); toast('Atendimento iniciado!') }}
                      >
                        Atender
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nova Consulta */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Consulta" subtitle="Agende uma consulta ou retorno">
        <div className="flex flex-col gap-[11px]">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Paciente</label>
            <input className="w-full border border-slate-200 rounded-lg p-2 text-[13px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Buscar paciente..." />
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Data</label>
              <input type="date" defaultValue="2026-03-06" className="w-full border border-slate-200 rounded-lg p-2 text-[13px] focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Horário</label>
              <select className="w-full border border-slate-200 rounded-lg p-2 text-[13px] bg-white focus:border-blue-500 outline-none">
                <option>08:00</option><option>08:30</option><option>09:00</option>
                <option>10:00</option><option>14:00</option><option>15:00</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Tipo</label>
              <select className="w-full border border-slate-200 rounded-lg p-2 text-[13px] bg-white focus:border-blue-500 outline-none">
                <option>Consulta</option><option>Retorno</option><option>Teleconsulta</option><option>Urgência</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Convênio</label>
              <select className="w-full border border-slate-200 rounded-lg p-2 text-[13px] bg-white focus:border-blue-500 outline-none">
                <option>Particular</option><option>Unimed</option><option>Amil</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Observações</label>
            <textarea rows={2} className="w-full border border-slate-200 rounded-lg p-2 text-[13px] resize-none focus:border-blue-500 outline-none" placeholder="Motivo..." />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button className="flex-1" onClick={() => { setShowModal(false); toast('Consulta agendada com sucesso!') }}>Agendar</Button>
        </div>
      </Modal>
    </>
  )
}
