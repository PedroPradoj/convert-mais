'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

type Tab = 'consulta' | 'historico' | 'exames' | 'medicamentos'

const historicoEntries = [
  {
    date: '22/01/2026',
    title: 'Consulta de rotina',
    cid: 'Z00.0',
    desc: 'Check-up geral. Exames laboratoriais solicitados. Paciente estável.',
  },
  {
    date: '15/11/2025',
    title: 'Hipertensão arterial',
    cid: 'I10',
    desc: 'Ajuste de medicação anti-hipertensiva. Losartana 50mg → 100mg.',
  },
  {
    date: '03/08/2025',
    title: 'Diabetes mellitus tipo 2',
    cid: 'E11',
    desc: 'Controle glicêmico insatisfatório. Adicionado Metformina 850mg 2x/dia.',
  },
  {
    date: '20/04/2025',
    title: 'Lombalgia',
    cid: 'M54.5',
    desc: 'Dor lombar aguda. Prescrito anti-inflamatório e fisioterapia.',
  },
  {
    date: '12/03/2024',
    title: 'Primeira consulta',
    cid: 'Z00.0',
    desc: 'Anamnese completa. Histórico familiar de HAS e DM2. Exames solicitados.',
  },
]

const examesEntries = [
  { name: 'Hemograma completo', date: '25/01/2026', status: 'Resultado disponível', variant: 'green' as const },
  { name: 'Glicemia em jejum', date: '25/01/2026', status: 'Resultado disponível', variant: 'green' as const },
  { name: 'Hemoglobina glicada (HbA1c)', date: '25/01/2026', status: 'Resultado disponível', variant: 'green' as const },
  { name: 'Perfil lipídico', date: '25/01/2026', status: 'Aguardando resultado', variant: 'yellow' as const },
  { name: 'Creatinina sérica', date: '25/01/2026', status: 'Resultado disponível', variant: 'green' as const },
  { name: 'TSH e T4 livre', date: '25/01/2026', status: 'Aguardando coleta', variant: 'gray' as const },
]

const medicamentosEntries = [
  { name: 'Losartana 100mg', posologia: '1x ao dia, manhã', inicio: '15/11/2025', status: 'Ativo' },
  { name: 'Metformina 850mg', posologia: '2x ao dia, café e jantar', inicio: '03/08/2025', status: 'Ativo' },
  { name: 'Atorvastatina 20mg', posologia: '1x ao dia, noite', inicio: '22/01/2026', status: 'Ativo' },
  { name: 'AAS 100mg', posologia: '1x ao dia, almoço', inicio: '12/03/2024', status: 'Ativo' },
]

export default function ProntuarioPage() {
  const [activeTab, setActiveTab] = useState<Tab>('consulta')
  const { toast } = useToast()

  const [motivo, setMotivo] = useState('')
  const [cid, setCid] = useState('')
  const [anamnese, setAnamnese] = useState('')
  const [exameFisico, setExameFisico] = useState('')
  const [conduta, setConduta] = useState('')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'consulta', label: 'Consulta Atual' },
    { key: 'historico', label: 'Histórico' },
    { key: 'exames', label: 'Exames' },
    { key: 'medicamentos', label: 'Medicamentos' },
  ]

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <Topbar title="Prontuário — Ana Costa" />

      {/* Patient Header */}
      <div className="bg-gradient-to-r from-[#0c2340] to-[#1449a0] px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[52px] rounded-full bg-blue-500 border-[2.5px] border-white flex items-center justify-center text-white text-[17px] font-bold">
              AC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white text-[18px] font-bold">Ana Costa</h2>
                <Badge variant="green" className="!bg-green-500/20 !text-green-300">Ativo</Badge>
                <Badge variant="blue" className="!bg-blue-500/20 !text-blue-300">Unimed</Badge>
              </div>
              <p className="text-blue-200 text-[12.5px] mt-[3px]">
                34 anos · Feminino · (11) 98765-4321 · Origem: Google Ads
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
              onClick={() => toast('Abrindo WhatsApp...')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.725-6.313-1.96l-.44-.307-2.647.888.888-2.647-.307-.44A9.953 9.953 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              WhatsApp
            </Button>
            <Button
              variant="secondary"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
              onClick={() => toast('Agendando retorno...')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Retorno
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/15">
          {[
            { value: '12', label: 'Consultas' },
            { value: 'R$2.890', label: 'Valor gerado' },
            { value: '2 anos', label: 'Como paciente' },
            { value: '58 dias', label: 'Última consulta' },
            { value: '⭐ 4.9', label: 'Satisfação' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-white text-[15px] font-bold">{stat.value}</span>
              <span className="text-blue-300 text-[11px]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex-1 p-6" style={{ display: 'grid', gridTemplateColumns: '266px 1fr', gap: '20px' }}>
        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Alertas Clínicos */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-[13px] font-bold text-slate-800 mb-3">Alertas Clínicos</h3>
            <div className="flex flex-col gap-2">
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-[12px] text-red-700 font-medium">
                ⚠ Alérgica a Dipirona
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-[12px] text-yellow-700 font-medium">
                ⚠ HAS em tratamento
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-[12px] text-yellow-700 font-medium">
                ⚠ Diabetes tipo 2
              </div>
            </div>
          </div>

          {/* Sinais Vitais */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-[13px] font-bold text-slate-800 mb-3">Sinais Vitais</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'PA', value: '128/84', unit: 'mmHg' },
                { label: 'FC', value: '78', unit: 'bpm' },
                { label: 'Temp', value: '36.8°', unit: 'C' },
                { label: 'SpO₂', value: '98%', unit: '' },
              ].map((vital) => (
                <div key={vital.label} className="bg-slate-50 rounded-lg p-[10px] text-center">
                  <p className="text-[10px] text-slate-400 font-medium">{vital.label}</p>
                  <p className="text-[16px] font-bold text-slate-800">{vital.value}</p>
                  {vital.unit && <p className="text-[10px] text-slate-400">{vital.unit}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Dados CRM */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-[13px] font-bold text-slate-800 mb-3">Dados CRM</h3>
            <div className="flex flex-col gap-[10px]">
              <div className="flex justify-between items-center">
                <span className="text-[11.5px] text-slate-400">Origem</span>
                <span className="text-[12px] text-slate-700 font-medium">Google Ads</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11.5px] text-slate-400">Etapa</span>
                <Badge variant="teal">Em Tratamento</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11.5px] text-slate-400">1ª consulta</span>
                <span className="text-[12px] text-slate-700 font-medium">12/03/2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11.5px] text-slate-400">LTV</span>
                <span className="text-[12px] text-slate-700 font-bold">R$ 2.890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="bg-white rounded-xl border border-slate-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 px-4 pt-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-[10px] text-[13px] font-semibold cursor-pointer border-b-2 transition-all bg-transparent ${
                  activeTab === tab.key
                    ? 'text-blue-600 border-blue-600'
                    : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5 flex-1">
            {/* Consulta Atual */}
            {activeTab === 'consulta' && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-600 mb-[5px]">Motivo da consulta</label>
                  <input
                    type="text"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    placeholder="Ex: Retorno para avaliação de exames"
                    className="w-full px-3 py-[8px] text-[13px] border border-slate-200 rounded-lg bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-600 mb-[5px]">CID-10</label>
                  <input
                    type="text"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
                    placeholder="Ex: I10 — Hipertensão essencial"
                    className="w-full px-3 py-[8px] text-[13px] border border-slate-200 rounded-lg bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-600 mb-[5px]">Anamnese</label>
                  <textarea
                    value={anamnese}
                    onChange={(e) => setAnamnese(e.target.value)}
                    rows={3}
                    placeholder="Queixa principal, história da doença atual..."
                    className="w-full px-3 py-[8px] text-[13px] border border-slate-200 rounded-lg bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-600 mb-[5px]">Exame físico</label>
                  <textarea
                    value={exameFisico}
                    onChange={(e) => setExameFisico(e.target.value)}
                    rows={3}
                    placeholder="Achados do exame físico..."
                    className="w-full px-3 py-[8px] text-[13px] border border-slate-200 rounded-lg bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-600 mb-[5px]">Conduta</label>
                  <textarea
                    value={conduta}
                    onChange={(e) => setConduta(e.target.value)}
                    rows={3}
                    placeholder="Plano terapêutico, orientações..."
                    className="w-full px-3 py-[8px] text-[13px] border border-slate-200 rounded-lg bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none resize-none"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <Button onClick={() => toast('Consulta salva com sucesso!')}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                      <polyline points="17,21 17,13 7,13 7,21" />
                      <polyline points="7,3 7,8 15,8" />
                    </svg>
                    Salvar
                  </Button>
                  <Button variant="secondary" onClick={() => toast('Gerando prescrição...')}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    Prescrição
                  </Button>
                  <Button variant="secondary" onClick={() => toast('Solicitação de exames aberta.')}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 2h6l3 7H6L9 2z" />
                      <rect x="3" y="9" width="18" height="13" rx="2" />
                      <line x1="12" y1="13" x2="12" y2="17" />
                      <line x1="10" y1="15" x2="14" y2="15" />
                    </svg>
                    Solicitar Exames
                  </Button>
                  <Button variant="secondary" onClick={() => toast('Gerando atestado...')}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="8" y1="9" x2="16" y2="9" />
                      <line x1="8" y1="13" x2="14" y2="13" />
                      <line x1="8" y1="17" x2="12" y2="17" />
                    </svg>
                    Atestado
                  </Button>
                  <Button variant="secondary" onClick={() => toast('Agendando retorno...')}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Agendar Retorno
                  </Button>
                </div>
              </div>
            )}

            {/* Histórico */}
            {activeTab === 'historico' && (
              <div className="flex flex-col">
                {historicoEntries.map((entry, i) => (
                  <div key={i} className="flex gap-4 pb-5 relative">
                    {/* Timeline line */}
                    {i < historicoEntries.length - 1 && (
                      <div className="absolute left-[7px] top-[20px] bottom-0 w-[2px] bg-slate-200" />
                    )}
                    {/* Dot */}
                    <div className="w-[16px] h-[16px] rounded-full bg-blue-100 border-[2.5px] border-blue-500 flex-shrink-0 mt-[2px] z-10" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-[3px]">
                        <span className="text-[12px] font-bold text-slate-700">{entry.date}</span>
                        <span className="text-[12.5px] font-semibold text-slate-800">{entry.title}</span>
                        <Badge variant="blue">{entry.cid}</Badge>
                      </div>
                      <p className="text-[12px] text-slate-500 leading-relaxed">{entry.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Exames */}
            {activeTab === 'exames' && (
              <div className="flex flex-col gap-[6px]">
                {examesEntries.map((exam, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-[10px] px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <p className="text-[13px] font-semibold text-slate-700">{exam.name}</p>
                      <p className="text-[11px] text-slate-400 mt-[1px]">Solicitado em {exam.date}</p>
                    </div>
                    <Badge variant={exam.variant}>{exam.status}</Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Medicamentos */}
            {activeTab === 'medicamentos' && (
              <div className="flex flex-col gap-[6px]">
                {medicamentosEntries.map((med, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-[10px] px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-semibold text-slate-700">{med.name}</p>
                        <Badge variant="green">{med.status}</Badge>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-[1px]">
                        {med.posologia} · Início: {med.inicio}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      className="!py-[5px] !px-3 !text-[11.5px]"
                      onClick={() => toast(`Receita de ${med.name} renovada!`)}
                    >
                      Renovar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
