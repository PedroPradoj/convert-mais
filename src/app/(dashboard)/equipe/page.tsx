'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

interface TeamMember {
  id: number
  name: string
  role: string
  initials: string
  color: string
  consultas: number
  tarefas: number
  permission: string
  permissionVariant: 'blue' | 'teal' | 'purple' | 'yellow'
  status: 'Online' | 'Ausente'
}

const members: TeamMember[] = [
  { id: 1, name: 'Dr. Rafael Alves', role: 'Médico Titular', initials: 'RA', color: '#2563eb', consultas: 24, tarefas: 3, permission: 'Admin', permissionVariant: 'blue', status: 'Online' },
  { id: 2, name: 'Dra. Mariana Costa', role: 'Médica Associada', initials: 'MC', color: '#0d9488', consultas: 18, tarefas: 5, permission: 'Médico', permissionVariant: 'teal', status: 'Online' },
  { id: 3, name: 'Juliana Moraes', role: 'Recepcionista', initials: 'JM', color: '#7c3aed', consultas: 0, tarefas: 12, permission: 'Recepção', permissionVariant: 'purple', status: 'Online' },
  { id: 4, name: 'Carlos Eduardo', role: 'Assistente Financeiro', initials: 'CE', color: '#ea580c', consultas: 0, tarefas: 8, permission: 'Financeiro', permissionVariant: 'yellow', status: 'Ausente' },
]

interface PermissionRow {
  module: string
  admin: boolean
  medico: boolean
  recepcao: boolean
  financeiro: boolean
}

const permissionsData: PermissionRow[] = [
  { module: 'Dashboard', admin: true, medico: true, recepcao: true, financeiro: true },
  { module: 'CRM', admin: true, medico: true, recepcao: true, financeiro: false },
  { module: 'Prontuário', admin: true, medico: true, recepcao: false, financeiro: false },
  { module: 'Prescrições', admin: true, medico: true, recepcao: false, financeiro: false },
  { module: 'Faturamento', admin: true, medico: false, recepcao: false, financeiro: true },
  { module: 'WhatsApp', admin: true, medico: true, recepcao: true, financeiro: false },
  { module: 'Automações', admin: true, medico: false, recepcao: false, financeiro: false },
  { module: 'Equipe', admin: true, medico: false, recepcao: false, financeiro: false },
  { module: 'Campos custom', admin: true, medico: false, recepcao: false, financeiro: false },
]

export default function EquipePage() {
  const [teamMembers] = useState(members)
  const { toast } = useToast()

  const totalConsultas = teamMembers.reduce((s, m) => s + m.consultas, 0)
  const totalTarefas = teamMembers.reduce((s, m) => s + m.tarefas, 0)

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Equipe" />

      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-slate-900">Gestão de Equipe</h2>
        <Button onClick={() => toast('Convite enviado')}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Convidar Membro
        </Button>
      </div>

      {/* KPIs */}
      <div className="px-6 py-4 bg-white border-b border-slate-200">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-blue-500">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Membros ativos</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">{teamMembers.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-emerald-500">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Consultas hoje</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">{totalConsultas}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-orange-500">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Tarefas abertas</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">{totalTarefas}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-[3px] border-t-violet-500">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Ocupação</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-1">87%</p>
          </div>
        </div>
      </div>

      {/* Main: two columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Team list */}
        <div className="flex-1 overflow-y-auto p-5">
          <h3 className="text-[13px] font-bold text-slate-800 mb-3">Membros</h3>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-white text-[13px] font-bold"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.initials}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full border-2 border-white ${member.status === 'Online' ? 'bg-emerald-400' : 'bg-slate-300'}`}
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-slate-800">{member.name}</p>
                    <p className="text-[11px] text-slate-400">{member.role}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-5">
                    <div className="text-center">
                      <p className="text-[14px] font-bold text-slate-800">{member.consultas}</p>
                      <p className="text-[10px] text-slate-400">consultas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[14px] font-bold text-slate-800">{member.tarefas}</p>
                      <p className="text-[10px] text-slate-400">tarefas</p>
                    </div>
                  </div>

                  {/* Permission badge */}
                  <Badge variant={member.permissionVariant}>{member.permission}</Badge>

                  {/* Status */}
                  <span className={`text-[11px] font-medium ${member.status === 'Online' ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {member.status}
                  </span>

                  {/* Edit button */}
                  <Button variant="secondary" className="text-[11px] px-3 py-[5px]" onClick={() => toast(`Editando: ${member.name}`)}>
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions table */}
        <div className="w-[420px] border-l border-slate-200 bg-white overflow-y-auto p-5 flex-shrink-0">
          <h3 className="text-[13px] font-bold text-slate-800 mb-3">Matriz de Permissões</h3>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_60px_60px_60px_60px] px-4 py-[10px] bg-slate-50 border-b border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Módulo</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide text-center">Admin</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide text-center">Médico</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide text-center">Recep.</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide text-center">Fin.</span>
            </div>

            {/* Rows */}
            {permissionsData.map((row) => (
              <div
                key={row.module}
                className="grid grid-cols-[1fr_60px_60px_60px_60px] px-4 py-[10px] border-b border-slate-100 last:border-b-0"
              >
                <span className="text-[12px] font-medium text-slate-700">{row.module}</span>
                <span className="text-center text-[12px]">{row.admin ? '✅' : '—'}</span>
                <span className="text-center text-[12px]">{row.medico ? '✅' : '—'}</span>
                <span className="text-center text-[12px]">{row.recepcao ? '✅' : '—'}</span>
                <span className="text-center text-[12px]">{row.financeiro ? '✅' : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
