-- MedFlow CRM - Tasks & Automations

-- Tarefas
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES team_members(id),
  created_by UUID REFERENCES team_members(id),
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT DEFAULT 'outro',
  status task_status DEFAULT 'aberta',
  priority priority_type DEFAULT 'media',
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  recurrence recurrence_type DEFAULT 'nenhuma',
  recurrence_config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tasks_clinic ON tasks(clinic_id, status);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to, status);
CREATE INDEX idx_tasks_patient ON tasks(patient_id);
CREATE INDEX idx_tasks_due ON tasks(clinic_id, due_date);

-- Automações
CREATE TABLE automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '⚡',
  trigger_type automation_trigger_type NOT NULL,
  trigger_config JSONB DEFAULT '{}',
  action_type automation_action_type NOT NULL,
  action_config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  total_dispatches INT DEFAULT 0,
  response_rate NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_automations_clinic ON automations(clinic_id);

-- Log de automações
CREATE TABLE automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'enviado',
  response TEXT,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_auto_logs_automation ON automation_logs(automation_id, created_at DESC);

-- Triggers
CREATE TRIGGER tr_tasks_updated BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_automations_updated BEFORE UPDATE ON automations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
