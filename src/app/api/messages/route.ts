import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get('conversation_id')
  const templates = searchParams.get('templates')

  if (templates === 'true') {
    const { data, error } = await supabase
      .from('message_templates')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  if (!conversationId) {
    // Return conversations list
    const { data, error } = await supabase
      .from('conversations')
      .select('*, patients(name, phone)')
      .order('last_message_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data: member } = await supabase
    .from('team_members')
    .select('id')
    .single()

  const { data, error } = await supabase
    .from('messages')
    .insert({
      ...body,
      sender_type: 'staff',
      sender_id: member?.id,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Update conversation last_message_at
  if (body.conversation_id) {
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', body.conversation_id)
  }

  return NextResponse.json(data, { status: 201 })
}
