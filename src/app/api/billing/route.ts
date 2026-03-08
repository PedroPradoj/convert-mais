import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const month = searchParams.get('month')
  const status = searchParams.get('status')

  let query = supabase
    .from('billing_entries')
    .select('*, patients(name), insurances(name)')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('payment_status', status)
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
    .select('clinic_id')
    .single()

  if (!member) return NextResponse.json({ error: 'Usuário não vinculado' }, { status: 403 })

  const { data, error } = await supabase
    .from('billing_entries')
    .insert({ ...body, clinic_id: member.clinic_id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
