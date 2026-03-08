import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const platform = searchParams.get('platform')
  const daily = searchParams.get('daily')

  if (daily === 'true') {
    let query = supabase
      .from('marketing_daily_stats')
      .select('*')
      .order('stat_date', { ascending: true })

    if (platform) query = query.eq('platform', platform)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  let query = supabase
    .from('marketing_campaigns')
    .select('*, marketing_keywords(*)')
    .order('created_at', { ascending: false })

  if (platform) {
    query = query.eq('platform', platform)
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
    .from('marketing_campaigns')
    .insert({ ...body, clinic_id: member.clinic_id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
