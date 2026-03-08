'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

interface Campaign {
  name: string
  objective: string
  invested: string
  reach: string
  leads: number
  cpl: string
  roas: string
  status: 'Ativo' | 'Pausado' | 'Finalizado' | 'Em revisão'
}

const campaigns: Campaign[] = [
  { name: 'Captação Cardiologia', objective: 'Geração de leads', invested: 'R$850', reach: '18.400', leads: 72, cpl: 'R$11,80', roas: '5.2x', status: 'Ativo' },
  { name: 'Checkup Executivo', objective: 'Conversão', invested: 'R$620', reach: '12.300', leads: 48, cpl: 'R$12,92', roas: '4.8x', status: 'Ativo' },
  { name: 'Retorno Pacientes', objective: 'Remarketing', invested: 'R$480', reach: '9.100', leads: 38, cpl: 'R$12,63', roas: '4.5x', status: 'Pausado' },
  { name: 'Branding Clínica', objective: 'Alcance', invested: 'R$450', reach: '8.400', leads: 28, cpl: 'R$16,07', roas: '3.8x', status: 'Ativo' },
]

const statusConfig: Record<string, { variant: 'green' | 'yellow' | 'gray' | 'blue' }> = {
  'Ativo': { variant: 'green' },
  'Pausado': { variant: 'yellow' },
  'Finalizado': { variant: 'gray' },
  'Em revisão': { variant: 'blue' },
}

export default function MetaAdsPage() {
  const { toast } = useToast()

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Marketing — Meta Ads" />

      <div className="flex-1 overflow-y-auto">
        {/* Meta branded header */}
        <div className="bg-[#1877f2] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>
            </div>
            <div>
              <h2 className="text-white text-[16px] font-bold">Meta Ads</h2>
              <p className="text-white/70 text-[12px]">Desempenho das campanhas no Facebook e Instagram</p>
            </div>
            <Button
              variant="secondary"
              className="ml-auto text-[12px]"
              onClick={() => window.location.href = '/marketing'}
            >
              Voltar ao resumo
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 5 KPI Cards with blue top border */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#1877f2]">
              <p className="text-[11.5px] text-slate-400 font-medium">Investimento</p>
              <p className="text-[22px] font-extrabold text-slate-900 mt-1">R$2.400</p>
              <p className="text-[11px] text-slate-400 font-medium mt-1">Período atual</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#1877f2]">
              <p className="text-[11.5px] text-slate-400 font-medium">Alcance</p>
              <p className="text-[22px] font-extrabold text-slate-900 mt-1">48.200</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 22% vs anterior</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#1877f2]">
              <p className="text-[11.5px] text-slate-400 font-medium">Leads</p>
              <p className="text-[22px] font-extrabold text-slate-900 mt-1">186</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 14% vs anterior</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#1877f2]">
              <p className="text-[11.5px] text-slate-400 font-medium">CPL</p>
              <p className="text-[22px] font-extrabold text-slate-900 mt-1">R$12,90</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↓ 6% vs anterior</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#1877f2]">
              <p className="text-[11.5px] text-slate-400 font-medium">ROAS</p>
              <p className="text-[22px] font-extrabold text-slate-900 mt-1">4.7x</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 0.5x vs anterior</p>
            </div>
          </div>

          {/* Chart placeholders */}
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Desempenho diário</h2>
              <div className="flex items-center justify-center bg-blue-50/50 rounded-lg border border-dashed border-blue-200 h-[200px]">
                <div className="text-center">
                  <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1877f2" strokeWidth="1.5">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <p className="text-[12px] text-[#1877f2] font-medium">Leads e CPL diário</p>
                  <p className="text-[11px] text-blue-300 mt-1">Integração com chart library</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Distribuição por campanha</h2>
              <div className="flex items-center justify-center bg-blue-50/50 rounded-lg border border-dashed border-blue-200 h-[200px]">
                <div className="text-center">
                  <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1877f2" strokeWidth="1.5">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                    <path d="M22 12A10 10 0 0 0 12 2v10z" />
                  </svg>
                  <p className="text-[12px] text-[#1877f2] font-medium">Investimento por campanha</p>
                  <p className="text-[11px] text-blue-300 mt-1">Integração com chart library</p>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns table */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-[13.5px] font-bold text-slate-800">Campanhas</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Campanha</th>
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Objetivo</th>
                  <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Investido</th>
                  <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Alcance</th>
                  <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Leads</th>
                  <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">CPL</th>
                  <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">ROAS</th>
                  <th className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => toast(`Detalhes: ${c.name}`)}
                  >
                    <td className="px-5 py-3 text-[12.5px] font-semibold text-slate-800">{c.name}</td>
                    <td className="px-5 py-3 text-[12.5px] text-slate-600">{c.objective}</td>
                    <td className="px-5 py-3 text-[12.5px] font-medium text-slate-800 text-right">{c.invested}</td>
                    <td className="px-5 py-3 text-[12.5px] text-slate-600 text-right">{c.reach}</td>
                    <td className="px-5 py-3 text-[12.5px] font-semibold text-slate-800 text-right">{c.leads}</td>
                    <td className="px-5 py-3 text-[12.5px] text-slate-600 text-right">{c.cpl}</td>
                    <td className="px-5 py-3 text-[12.5px] font-semibold text-slate-800 text-right">{c.roas}</td>
                    <td className="px-5 py-3 text-center">
                      <Badge variant={statusConfig[c.status].variant}>{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
