'use client'

import { useState } from 'react'

interface TopbarProps {
  title: string
  subtitle?: string
  onNewAppointment?: () => void
}

export default function Topbar({ title, subtitle, onNewAppointment }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const today = new Date()
  const dateStr = subtitle || today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-[17px] font-extrabold text-slate-900">{title}</h1>
        <p className="text-[11.5px] text-slate-400 mt-[1px] capitalize">{dateStr}</p>
      </div>
      <div className="flex items-center gap-[9px]">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar paciente, exame, CID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[270px] pl-[33px] py-2 px-3 bg-slate-50 text-[12.5px] border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
          />
          <svg
            className="absolute left-[10px] top-[9px]"
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

        <div className="relative cursor-pointer p-[7px] rounded-lg border border-slate-200 hover:bg-slate-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-[5px] right-[5px] w-[7px] h-[7px] bg-red-500 rounded-full border-[1.5px] border-white" />
        </div>

        <button
          onClick={onNewAppointment}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-semibold px-4 py-[7px] flex items-center gap-[6px] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nova Consulta
        </button>
      </div>
    </div>
  )
}
