import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const patientId = searchParams.get('patient_id')
  const catalog = searchParams.get('catalog')

  if (catalog === 'true') {
    const { data, error } = await supabase
      .from('exam_catalog')
      .select('*')
      .order('name')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  let query = supabase
    .from('exam_requests')
    .select('*, patients(name), team_members!exam_requests_doctor_id_fkey(name)')
    .order('created_at', { ascending: false })

  if (patientId) {
    query = query.eq('patient_id', patientId)
  }

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data: member } = await supabase
    .from('team_members')
    .select('clinic_id, id')
    .single()

  if (!member) return NextResponse.json({ error: 'Usuário não vinculado' }, { status: 403 })

  const exams = Array.isArray(body) ? body : [body]
  const inserts = exams.map((exam: Record<string, unknown>) => ({
    ...exam,
    clinic_id: member.clinic_id,
    doctor_id: member.id,
  }))

  const { data, error } = await supabase
    .from('exam_requests')
    .insert(inserts)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
