import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const date = searchParams.get('date')
  const doctorId = searchParams.get('doctor_id')
  const patientId = searchParams.get('patient_id')

  let query = supabase
    .from('appointments')
    .select('*, patients(name, phone), team_members!appointments_doctor_id_fkey(name)')
    .order('start_time', { ascending: true })

  if (date) {
    query = query.eq('appointment_date', date)
  }
  if (doctorId) {
    query = query.eq('doctor_id', doctorId)
  }
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
    .from('appointments')
    .insert({
      ...body,
      clinic_id: member.clinic_id,
      created_by: member.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
