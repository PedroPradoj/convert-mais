'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'

const comparisonRows = [
  { metric: 'Investimento', meta: 'R$2.400', google: 'R$1.800' },
  { metric: 'Leads', meta: '186', google: '126' },
  { metric: 'CPL', meta: 'R$12,90', google: 'R$14,28' },
  { metric: 'Pacientes conv.', meta: '28', google: '19' },
  { metric: 'ROAS', meta: '4.7x', google: '3.9x' },
  { metric: 'CTR', meta: '3.82%', google: '4.66%' },
]

const funnelSteps = [
  { label: 'Impressões', value: '130.600', pct: 100, color: '#3b82f6' },
  { label: 'Cliques', value: '7.240', pct: 55, color: '#6366f1' },
  { label: 'Leads', value: '312', pct: 25, color: '#8b5cf6' },
  { label: 'Consultas', value: '89', pct: 7, color: '#a855f7' },
  { label: 'Pacientes', value: '47', pct: 4, color: '#c026d3' },
]

export default function MarketingPage() {
  const [period, setPeriod] = useState('Últimos 30 dias')

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Marketing — Visão Geral" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Period selector + platform buttons */}
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-[12.5px] border border-slate-200 rounded-lg bg-white px-3 py-[7px] outline-none focus:border-blue-500 text-slate-700"
          >
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Últimos 90 dias</option>
            <option>Este mês</option>
          </select>
          <Button variant="meta" onClick={() => window.location.href = '/marketing/meta'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>
            Meta Ads
          </Button>
          <Button variant="google" onClick={() => window.location.href = '/marketing/google'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google Ads
          </Button>
        </div>

        {/* 5 KPI Cards */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">Total Investido</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">R$4.200</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Meta + Google</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">Leads</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">312</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 18% vs mês anterior</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">CPL</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">R$13,46</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">↓ 8% vs mês anterior</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">Conv. em Paciente</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">47</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">15.1% dos leads</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[11.5px] text-slate-400 font-medium">ROAS</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">4.38x</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 0.4x vs mês anterior</p>
          </div>
        </div>

        {/* Chart + Distribution placeholders */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Evolução de leads</h2>
            <div className="flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200 h-[200px]">
              <div className="text-center">
                <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <p className="text-[12px] text-slate-400 font-medium">Evolução de leads</p>
                <p className="text-[11px] text-slate-300 mt-1">Integração com chart library</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[13.5px] font-bold text-slate-800 mb-4">Distribuição por plataforma</h2>
            <div className="flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200 h-[200px]">
              <div className="text-center">
                <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
                <p className="text-[12px] text-slate-400 font-medium">Distribuição por plataforma</p>
                <p className="text-[11px] text-slate-300 mt-1">Integração com chart library</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison table Meta vs Google */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-[13.5px] font-bold text-slate-800">Comparativo Meta vs Google</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Métrica</th>
                <th className="text-center text-[11px] font-semibold text-[#1877f2] uppercase tracking-wider px-5 py-3">
                  <span className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#1877f2]" />
                    Meta Ads
                  </span>
                </th>
                <th className="text-center text-[11px] font-semibold text-[#ea4335] uppercase tracking-wider px-5 py-3">
                  <span className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#ea4335]" />
                    Google Ads
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  <td className="px-5 py-3 text-[12.5px] font-semibold text-slate-700">{row.metric}</td>
                  <td className="px-5 py-3 text-[12.5px] text-slate-800 text-center font-medium">{row.meta}</td>
                  <td className="px-5 py-3 text-[12.5px] text-slate-800 text-center font-medium">{row.google}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-[13.5px] font-bold text-slate-800 mb-5">Funil de conversão</h2>
          <div className="space-y-4">
            {funnelSteps.map((step) => (
              <div key={step.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12.5px] font-semibold text-slate-700">{step.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-bold text-slate-800">{step.value}</span>
                    <Badge variant="blue">{step.pct}%</Badge>
                  </div>
                </div>
                <ProgressBar value={step.pct} color={step.color} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
