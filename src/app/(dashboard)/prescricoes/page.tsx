'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

const MEDS_DB = [
  { n: 'Losartana Potássica 50mg', c: 'Antagonista AT1 — Anti-hipertensivo' },
  { n: 'Anlodipino 5mg', c: 'Bloqueador canal de cálcio' },
  { n: 'Enalapril 10mg', c: 'Inibidor ECA' },
  { n: 'Metoprolol 50mg', c: 'Betabloqueador' },
  { n: 'Furosemida 40mg', c: 'Diurético de alça' },
  { n: 'Atorvastatina 20mg', c: 'Estatina — Hipolipemiante' },
  { n: 'AAS 100mg', c: 'Antiagregante plaquetário' },
  { n: 'Omeprazol 20mg', c: 'Inibidor bomba de prótons' },
  { n: 'Amoxicilina 500mg', c: 'Antibiótico Penicilina' },
  { n: 'Metformina 850mg', c: 'Antidiabético Biguanida' },
]

interface RxItem {
  name: string
  dose: string
  pos: string
  dur: string
  obs: string
}

export default function PrescricoesPage() {
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [selectedMed, setSelectedMed] = useState<typeof MEDS_DB[0] | null>(null)
  const [rxItems, setRxItems] = useState<RxItem[]>([])
  const [dose, setDose] = useState('')
  const [pos, setPos] = useState('1x ao dia')
  const [dur, setDur] = useState('')
  const [obs, setObs] = useState('')

  const filtered = search
    ? MEDS_DB.filter((m) => m.n.toLowerCase().includes(search.toLowerCase()) || m.c.toLowerCase().includes(search.toLowerCase()))
    : MEDS_DB

  const addItem = () => {
    if (!selectedMed) return
    setRxItems([...rxItems, { name: selectedMed.n, dose: dose || '—', pos, dur: dur || 'Conforme orientação', obs }])
    setSelectedMed(null)
    setSearch('')
    setDose('')
    setDur('')
    setObs('')
    toast('Medicamento adicionado!')
  }

  return (
    <>
      <Topbar title="Prescrições" />
      <div className="flex-1 p-5 overflow-y-auto max-h-[calc(100vh-62px)]">
        <div className="grid grid-cols-[1fr_1.6fr] gap-[14px]">
          {/* Search panel */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-5">
            <div className="text-[14px] font-bold mb-[13px]">Buscar medicamento</div>
            <div className="relative mb-[11px]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nome ou princípio ativo..."
                className="w-full pl-[33px] border border-slate-200 rounded-lg p-2 text-[13px] focus:border-blue-500 outline-none"
              />
              <svg className="absolute left-[10px] top-[9px]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div className="max-h-[220px] overflow-y-auto flex flex-col gap-[5px]">
              {filtered.map((m) => (
                <div
                  key={m.n}
                  onClick={() => setSelectedMed(m)}
                  className="flex gap-2 items-start p-[8px_11px] border-[1.5px] border-slate-200 rounded-lg cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="w-[6px] h-[6px] rounded-full bg-blue-600 mt-[5px] flex-shrink-0" />
                  <div>
                    <div className="text-[12.5px] font-semibold text-slate-800">{m.n}</div>
                    <div className="text-[11px] text-slate-400">{m.c}</div>
                  </div>
                </div>
              ))}
            </div>

            {selectedMed && (
              <div className="mt-[13px] pt-[13px] border-t border-slate-100">
                <div className="p-[9px_12px] bg-blue-50 rounded-lg border border-blue-200 mb-[11px]">
                  <div className="text-[13px] font-bold text-blue-700">{selectedMed.n}</div>
                  <div className="text-[11.5px] text-blue-600">{selectedMed.c}</div>
                </div>
                <div className="flex flex-col gap-[9px]">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Dosagem</label>
                    <input value={dose} onChange={(e) => setDose(e.target.value)} placeholder="Ex: 50mg" className="w-full border border-slate-200 rounded-lg p-2 text-[13px] focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Posologia</label>
                    <select value={pos} onChange={(e) => setPos(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2 text-[13px] bg-white focus:border-blue-500 outline-none">
                      <option>1x ao dia</option><option>2x ao dia</option><option>A cada 8h</option><option>A cada 12h</option><option>Se necessário</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Duração</label>
                    <input value={dur} onChange={(e) => setDur(e.target.value)} placeholder="Ex: 30 dias" className="w-full border border-slate-200 rounded-lg p-2 text-[13px] focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Orientações</label>
                    <textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={2} className="w-full border border-slate-200 rounded-lg p-2 text-[13px] resize-none focus:border-blue-500 outline-none" placeholder="Tomar após refeições..." />
                  </div>
                  <Button onClick={addItem} className="w-full justify-center">+ Adicionar à prescrição</Button>
                </div>
              </div>
            )}
          </div>

          {/* Prescription panel */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-5">
            <div className="flex justify-between items-center mb-[13px]">
              <div>
                <div className="text-[14px] font-bold">Prescrição Médica</div>
                <div className="text-[11.5px] text-slate-400">Ana Costa · 06/03/2026</div>
              </div>
              <div className="flex gap-[7px]">
                <Button variant="secondary" className="text-xs">Modelos</Button>
                <Button className="text-xs" onClick={() => toast('Prescrição assinada e enviada!')}>🔒 Assinar e Emitir</Button>
              </div>
            </div>

            {rxItems.length >= 2 && (
              <div className="mb-[11px] p-[9px_12px] bg-red-50 border border-red-300 rounded-[9px] text-[12.5px] text-red-600 font-medium">
                ⚠️ Possível interação medicamentosa detectada.
              </div>
            )}

            {rxItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[110px] text-slate-300">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-[7px]">
                  <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-[13px]">Nenhum medicamento adicionado</span>
              </div>
            ) : (
              rxItems.map((item, i) => (
                <div key={i} className="flex items-start gap-[11px] p-[11px_13px] border-[1.5px] border-slate-200 rounded-[10px] mb-2 bg-slate-50">
                  <div className="w-[25px] h-[25px] rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600 flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold">{item.name} — {item.dose}</div>
                    <div className="text-[11.5px] text-slate-500">{item.pos} · {item.dur}</div>
                    {item.obs && <div className="text-[11.5px] text-slate-400 italic">{item.obs}</div>}
                  </div>
                  <button
                    onClick={() => setRxItems(rxItems.filter((_, j) => j !== i))}
                    className="bg-transparent border-none cursor-pointer text-slate-300 text-[15px] hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}

            <div className="mt-[13px] pt-[11px] border-t border-slate-100">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Observações gerais</label>
              <textarea rows={2} className="w-full border border-slate-200 rounded-lg p-2 text-[13px] resize-none bg-slate-50 focus:border-blue-500 outline-none" placeholder="Orientações ao paciente..." />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
