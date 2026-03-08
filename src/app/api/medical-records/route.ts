import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const patientId = searchParams.get('patient_id')

  let query = supabase
    .from('medical_records')
    .select('*, team_members!medical_records_doctor_id_fkey(name)')
    .order('created_at', { ascending: false })

  if (patientId) {
    query = query.eq('patient_id', patientId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data: member } = await supabase
    .from('team_members')
    .select('clinic_id, id')
    .single()

  if (!member) {
    return NextResponse.json({ error: 'Usuário não vinculado' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('medical_records')
    .insert({
      ...body,
      clinic_id: member.clinic_id,
      doctor_id: member.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
