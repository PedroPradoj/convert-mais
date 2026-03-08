import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const [
    appointmentsToday,
    activePatients,
    billingMonth,
    pipelineCounts,
  ] = await Promise.all([
    supabase
      .from('appointments')
      .select('*', { count: 'exact' })
      .eq('appointment_date', today),
    supabase
      .from('patients')
      .select('*', { count: 'exact' })
      .eq('is_active', true),
    supabase
      .from('billing_entries')
      .select('amount, payment_status')
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase
      .from('patients')
      .select('crm_stage'),
  ])

  const totalBilled = billingMonth.data?.reduce((sum, b) => sum + Number(b.amount), 0) || 0
  const pipeline = (pipelineCounts.data || []).reduce((acc: Record<string, number>, p) => {
    acc[p.crm_stage] = (acc[p.crm_stage] || 0) + 1
    return acc
  }, {})

  return NextResponse.json({
    consultasHoje: appointmentsToday.count || 0,
    pacientesAtivos: activePatients.count || 0,
    faturamentoMes: totalBilled,
    pipeline,
  })
}
