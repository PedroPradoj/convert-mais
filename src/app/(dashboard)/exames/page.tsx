'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

const EXAMES_CHECKLIST = ['Hemograma completo', 'Glicemia em jejum', 'Creatinina', 'Colesterol total', 'TSH', 'Urina rotina', 'ECG', 'Microalbuminúria']

const EXAMES_HIST = [
  { n: 'Hemograma completo', d: '10/02/2026', r: 'Normal', s: 'Disponível' },
  { n: 'Ecocardiograma', d: '05/01/2026', r: 'FE 62% — Normal', s: 'Disponível' },
  { n: 'Holter 24h', d: '04/01/2026', r: 'Sem arritmia', s: 'Disponível' },
  { n: 'Lipidograma', d: '10/10/2025', r: 'LDL 130 — Atenção', s: 'Disponível' },
  { n: 'Microalbuminúria', d: '06/03/2026', r: 'Aguardando', s: 'Solicitado' },
]

export default function ExamesPage() {
  const { toast } = useToast()
  const [checked, setChecked] = useState<string[]>([])

  const toggle = (name: string) => {
    setChecked((prev) => prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name])
  }

  return (
    <>
      <Topbar title="Exames" />
      <div className="flex-1 p-5 overflow-y-auto max-h-[calc(100vh-62px)]">
        <div className="grid grid-cols-2 gap-[14px]">
          {/* Solicitar */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-5">
            <div className="text-[14px] font-bold mb-[13px]">Solicitar Exames</div>
            <div className="mb-[11px]">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Paciente</label>
              <input defaultValue="Ana Costa" className="w-full border border-slate-200 rounded-lg p-2 text-[13px] focus:border-blue-500 outline-none" />
            </div>
            <div className="mb-[11px]">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Selecionar exames</label>
              <div className="flex flex-col gap-[5px] mt-[6px]">
                {EXAMES_CHECKLIST.map((exam) => (
                  <label key={exam} className="flex items-center gap-2 cursor-pointer text-[13px] font-normal normal-case tracking-normal">
                    <input
                      type="checkbox"
                      checked={checked.includes(exam)}
                      onChange={() => toggle(exam)}
                      className="w-auto accent-blue-600"
                    />
                    {exam}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-[13px]">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.06em] block mb-1">Indicação clínica</label>
              <textarea rows={2} className="w-full border border-slate-200 rounded-lg p-2 text-[13px] resize-none focus:border-blue-500 outline-none" placeholder="CID, justificativa..." />
            </div>
            <Button className="w-full justify-center" onClick={() => toast('Solicitação gerada!')}>Gerar Solicitação</Button>
          </div>

          {/* Histórico */}
          <div className="bg-white rounded-[13px] border border-slate-200 p-5">
            <div className="flex justify-between items-center mb-[13px]">
              <div className="text-[14px] font-bold">Histórico de Exames</div>
              <Badge variant="blue">Ana Costa</Badge>
            </div>
            {EXAMES_HIST.map((exam, i) => {
              const rc = exam.r.includes('Atenção') ? 'text-yellow-600' : exam.r === 'Aguardando' ? 'text-slate-400' : 'text-green-600'
              return (
                <div key={i} className="flex items-center gap-[10px] p-[10px_12px] border-[1.5px] border-slate-200 rounded-[9px] mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[12.5px] font-semibold">{exam.n}</div>
                    <div className="text-[11px] text-slate-400">{exam.d}</div>
                  </div>
                  <span className={`text-xs font-semibold ${rc}`}>{exam.r}</span>
                  <Badge variant={exam.s === 'Solicitado' ? 'yellow' : 'green'}>{exam.s}</Badge>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
