import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const search = searchParams.get('search')
  const stage = searchParams.get('stage')
  const insurance = searchParams.get('insurance')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '50')

  let query = supabase
    .from('patients')
    .select('*, insurances(name), patient_clinical_alerts(*)', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }
  if (stage) {
    query = query.eq('crm_stage', stage)
  }
  if (insurance) {
    query = query.eq('insurance_id', insurance)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, total: count })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data: member } = await supabase
    .from('team_members')
    .select('clinic_id')
    .single()

  if (!member) {
    return NextResponse.json({ error: 'Usuário não vinculado a uma clínica' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('patients')
    .insert({ ...body, clinic_id: member.clinic_id })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
