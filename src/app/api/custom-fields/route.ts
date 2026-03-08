import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const module = searchParams.get('module')

  let query = supabase
    .from('custom_field_definitions')
    .select('*')
    .order('sort_order', { ascending: true })

  if (module) {
    query = query.eq('module', module)
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
    .from('custom_field_definitions')
    .insert({ ...body, clinic_id: member.clinic_id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
