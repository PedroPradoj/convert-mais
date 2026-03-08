-- MedFlow CRM - Communication Tables

-- Conversas
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  channel channel_type NOT NULL DEFAULT 'whatsapp',
  external_id TEXT,
  is_active BOOLEAN DEFAULT true,
  last_message_at TIMESTAMPTZ,
  unread_count INT DEFAULT 0,
  assigned_to UUID REFERENCES team_members(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_conversations_clinic ON conversations(clinic_id, last_message_at DESC);
CREATE INDEX idx_conversations_patient ON conversations(patient_id);

-- Mensagens
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_type TEXT NOT NULL DEFAULT 'patient',
  sender_id UUID,
  content TEXT NOT NULL,
  media_url TEXT,
  media_type TEXT,
  is_read BOOLEAN DEFAULT false,
  is_from_automation BOOLEAN DEFAULT false,
  template_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at);

-- Templates de mensagem
CREATE TABLE message_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  content TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Triggers
CREATE TRIGGER tr_conversations_updated BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
