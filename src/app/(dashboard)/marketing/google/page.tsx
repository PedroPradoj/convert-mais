'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import { useToast } from '@/components/ui/Toast'

interface Campaign {
  name: string
  type: string
  invested: string
  impressions: string
  clicks: number
  leads: number
  ctr: string
  cpl: string
  status: 'Ativo' | 'Pausado' | 'Finalizado' | 'Em revisão'
}

interface Keyword {
  keyword: string
  ctr: string
  leads: number
}

const campaigns: Campaign[] = [
  { name: 'Cardiologista São Paulo', type: 'Search', invested: 'R$620', impressions: '28.400', clicks: 1420, leads: 48, ctr: '5.0%', cpl: 'R$12,92', status: 'Ativo' },
  { name: 'Checkup Cardiológico', type: 'Search', invested: 'R$480', impressions: '22.100', clicks: 980, leads: 34, ctr: '4.43%', cpl: 'R$14,12', status: 'Ativo' },
  { name: 'Exames Cardíacos', type: 'Display', invested: 'R$380', impressions: '18.600', clicks: 820, leads: 26, ctr: '4.41%', cpl: 'R$14,62', status: 'Pausado' },
  { name: 'Urgência Cardiológica', type: 'Search', invested: 'R$320', impressions: '13.300', clicks: 620, leads: 18, ctr: '4.66%', cpl: 'R$17,78', status: 'Ativo' },
]

const topKeywords: Keyword[] = [
  { keyword: 'cardiologista perto de mim', ctr: '6.2%', leads: 38 },
  { keyword: 'checkup cardiológico preço', ctr: '5.8%', leads: 29 },
  { keyword: 'exame coração são paulo', ctr: '5.1%', leads: 24 },
  { keyword: 'consulta cardiologista particular', ctr: '4.9%', leads: 20 },
  { keyword: 'eletrocardiograma agendar', ctr: '4.3%', leads: 15 },
]

const statusConfig: Record<string, { variant: 'green' | 'yellow' | 'gray' | 'blue' }> = {
  'Ativo': { variant: 'green' },
  'Pausado': { variant: 'yellow' },
  'Finalizado': { variant: 'gray' },
  'Em revisão': { variant: 'blue' },
}

export default function GoogleAdsPage() {
  const { toast } = useToast()

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Marketing — Google Ads" />

      <div className="flex-1 overflow-y-auto">
        {/* Google branded header */}
        <div className="px-6 py-5" style={{ background: 'linear-gradient(135deg, #ea4335 0%, #fbbc04 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" fillOpacity="0.8"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white" fillOpacity="0.6"/></svg>
            </div>
            <div>
              <h2 className="text-white text-[16px] font-bold">Google Ads</h2>
              <p className="text-white/80 text-[12px]">Desempenho das campanhas no Google Search e Display</p>
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
          {/* 6 KPI Cards */}
          <div className="grid grid-cols-6 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#ea4335]">
              <p className="text-[11.5px] text-slate-400 font-medium">Investimento</p>
              <p className="text-[20px] font-extrabold text-slate-900 mt-1">R$1.800</p>
              <p className="text-[11px] text-slate-400 font-medium mt-1">Período atual</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#ea4335]">
              <p className="text-[11.5px] text-slate-400 font-medium">Impressões</p>
              <p className="text-[20px] font-extrabold text-slate-900 mt-1">82.4k</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 11% vs anterior</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#ea4335]">
              <p className="text-[11.5px] text-slate-400 font-medium">Cliques</p>
              <p className="text-[20px] font-extrabold text-slate-900 mt-1">3.840</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 9% vs anterior</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#ea4335]">
              <p className="text-[11.5px] text-slate-400 font-medium">Leads</p>
              <p className="text-[20px] font-extrabold text-slate-900 mt-1">126</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 24% vs anterior</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#ea4335]">
              <p className="text-[11.5px] text-slate-400 font-medium">CTR</p>
              <p className="text-[20px] font-extrabold text-slate-900 mt-1">4.66%</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 0.3pp vs anterior</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-[#ea4335]">
              <p className="text-[11.5px] text-slate-400 font-medium">CPL</p>
              <p className="text-[20px] font-extrabold text-slate-900 mt-1">R$14,28</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">↓ 5% vs anterior</p>
            </div>
          </div>

          {/* Chart placeholders */}
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Cliques e impressões</h2>
              <div className="flex items-center justify-center bg-red-50/50 rounded-lg border border-dashed border-red-200 h-[200px]">
                <div className="text-center">
                  <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="1.5">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <p className="text-[12px] text-[#ea4335] font-medium">Cliques e impressões diários</p>
                  <p className="text-[11px] text-red-300 mt-1">Integração com chart library</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Conversão por campanha</h2>
              <div className="flex items-center justify-center bg-red-50/50 rounded-lg border border-dashed border-red-200 h-[200px]">
                <div className="text-center">
                  <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="1.5">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <p className="text-[12px] text-[#ea4335] font-medium">Taxa de conversão por campanha</p>
                  <p className="text-[11px] text-red-300 mt-1">Integração com chart library</p>
                </div>
              </div>
            </div>
          </div>

          {/* Two columns: Campaigns table + Top Keywords */}
          <div className="grid grid-cols-3 gap-5">
            {/* Campaigns Table */}
            <div className="col-span-2 bg-white rounded-xl border border-slate-200">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="text-[13.5px] font-bold text-slate-800">Campanhas</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Campanha</th>
                    <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Tipo</th>
                    <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Investido</th>
                    <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Impressões</th>
                    <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Cliques</th>
                    <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Leads</th>
                    <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">CTR</th>
                    <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">CPL</th>
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
                      <td className="px-5 py-3 text-[12.5px] text-slate-600">{c.type}</td>
                      <td className="px-5 py-3 text-[12.5px] font-medium text-slate-800 text-right">{c.invested}</td>
                      <td className="px-5 py-3 text-[12.5px] text-slate-600 text-right">{c.impressions}</td>
                      <td className="px-5 py-3 text-[12.5px] text-slate-600 text-right">{c.clicks.toLocaleString('pt-BR')}</td>
                      <td className="px-5 py-3 text-[12.5px] font-semibold text-slate-800 text-right">{c.leads}</td>
                      <td className="px-5 py-3 text-[12.5px] text-slate-600 text-right">{c.ctr}</td>
                      <td className="px-5 py-3 text-[12.5px] text-slate-600 text-right">{c.cpl}</td>
                      <td className="px-5 py-3 text-center">
                        <Badge variant={statusConfig[c.status].variant}>{c.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Keywords */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Top Keywords</h2>
              <div className="space-y-4">
                {topKeywords.map((kw, i) => (
                  <div key={i} className="pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                    <p className="text-[12.5px] font-semibold text-slate-800 mb-1">{kw.keyword}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400">CTR</span>
                        <span className="text-[11.5px] font-semibold text-slate-700">{kw.ctr}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">Leads</span>
                        <Badge variant="blue">{kw.leads}</Badge>
                      </div>
                    </div>
                    <ProgressBar value={(kw.leads / 38) * 100} color="#ea4335" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
