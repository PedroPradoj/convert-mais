import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const patientId = searchParams.get('patient_id')

  let query = supabase
    .from('prescriptions')
    .select('*, prescription_items(*), patients(name), team_members!prescriptions_doctor_id_fkey(name)')
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
  const { items, ...prescription } = body

  const { data: member } = await supabase
    .from('team_members')
    .select('clinic_id, id')
    .single()

  if (!member) {
    return NextResponse.json({ error: 'Usuário não vinculado' }, { status: 403 })
  }

  const { data: rx, error: rxError } = await supabase
    .from('prescriptions')
    .insert({
      ...prescription,
      clinic_id: member.clinic_id,
      doctor_id: member.id,
    })
    .select()
    .single()

  if (rxError) {
    return NextResponse.json({ error: rxError.message }, { status: 500 })
  }

  if (items && items.length > 0) {
    const itemsWithRx = items.map((item: Record<string, unknown>, i: number) => ({
      ...item,
      prescription_id: rx.id,
      sort_order: i,
    }))

    const { error: itemsError } = await supabase
      .from('prescription_items')
      .insert(itemsWithRx)

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 500 })
    }
  }

  return NextResponse.json(rx, { status: 201 })
}
