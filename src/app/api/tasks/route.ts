import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const priority = searchParams.get('priority')
  const assignedTo = searchParams.get('assigned_to')

  let query = supabase
    .from('tasks')
    .select('*, patients(name), team_members!tasks_assigned_to_fkey(name)')
    .order('due_date', { ascending: true })

  if (status) query = query.eq('status', status)
  if (priority) query = query.eq('priority', priority)
  if (assignedTo) query = query.eq('assigned_to', assignedTo)

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

  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...body, clinic_id: member.clinic_id, created_by: member.id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
