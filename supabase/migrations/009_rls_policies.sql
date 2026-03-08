-- MedFlow CRM - Row Level Security Policies

-- Função helper para pegar o clinic_id do usuário logado
CREATE OR REPLACE FUNCTION get_user_clinic_id()
RETURNS UUID AS $$
  SELECT clinic_id FROM team_members WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Função helper para pegar o role do usuário
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM team_members WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Habilitar RLS em todas as tabelas
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurances ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_clinical_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_field_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_field_values ENABLE ROW LEVEL SECURITY;

-- Policies genéricas por clinic_id (SELECT, INSERT, UPDATE, DELETE)
-- Clínicas: membros podem ver sua clínica
CREATE POLICY "clinic_member_select" ON clinics FOR SELECT USING (id = get_user_clinic_id());
CREATE POLICY "clinic_admin_update" ON clinics FOR UPDATE USING (id = get_user_clinic_id() AND get_user_role() = 'admin');

-- Team members: ver colegas da mesma clínica
CREATE POLICY "team_select" ON team_members FOR SELECT USING (clinic_id = get_user_clinic_id());
CREATE POLICY "team_admin_all" ON team_members FOR ALL USING (clinic_id = get_user_clinic_id() AND get_user_role() = 'admin');

-- Macro para tabelas com clinic_id
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT unnest(ARRAY[
      'insurances', 'patients', 'appointments', 'medical_records',
      'prescriptions', 'exam_requests', 'conversations', 'message_templates',
      'billing_entries', 'marketing_campaigns', 'marketing_daily_stats',
      'tasks', 'automations', 'custom_field_definitions'
    ])
  LOOP
    EXECUTE format('CREATE POLICY "%s_select" ON %I FOR SELECT USING (clinic_id = get_user_clinic_id())', tbl, tbl);
    EXECUTE format('CREATE POLICY "%s_insert" ON %I FOR INSERT WITH CHECK (clinic_id = get_user_clinic_id())', tbl, tbl);
    EXECUTE format('CREATE POLICY "%s_update" ON %I FOR UPDATE USING (clinic_id = get_user_clinic_id())', tbl, tbl);
    EXECUTE format('CREATE POLICY "%s_delete" ON %I FOR DELETE USING (clinic_id = get_user_clinic_id())', tbl, tbl);
  END LOOP;
END $$;

-- Tabelas que dependem de parent com clinic_id
CREATE POLICY "alerts_select" ON patient_clinical_alerts FOR SELECT
  USING (EXISTS (SELECT 1 FROM patients WHERE patients.id = patient_id AND patients.clinic_id = get_user_clinic_id()));
CREATE POLICY "alerts_insert" ON patient_clinical_alerts FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM patients WHERE patients.id = patient_id AND patients.clinic_id = get_user_clinic_id()));
CREATE POLICY "alerts_update" ON patient_clinical_alerts FOR UPDATE
  USING (EXISTS (SELECT 1 FROM patients WHERE patients.id = patient_id AND patients.clinic_id = get_user_clinic_id()));
CREATE POLICY "alerts_delete" ON patient_clinical_alerts FOR DELETE
  USING (EXISTS (SELECT 1 FROM patients WHERE patients.id = patient_id AND patients.clinic_id = get_user_clinic_id()));

-- Prescription items
CREATE POLICY "rx_items_select" ON prescription_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM prescriptions WHERE prescriptions.id = prescription_id AND prescriptions.clinic_id = get_user_clinic_id()));
CREATE POLICY "rx_items_insert" ON prescription_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM prescriptions WHERE prescriptions.id = prescription_id AND prescriptions.clinic_id = get_user_clinic_id()));
CREATE POLICY "rx_items_update" ON prescription_items FOR UPDATE
  USING (EXISTS (SELECT 1 FROM prescriptions WHERE prescriptions.id = prescription_id AND prescriptions.clinic_id = get_user_clinic_id()));
CREATE POLICY "rx_items_delete" ON prescription_items FOR DELETE
  USING (EXISTS (SELECT 1 FROM prescriptions WHERE prescriptions.id = prescription_id AND prescriptions.clinic_id = get_user_clinic_id()));

-- Messages
CREATE POLICY "messages_select" ON messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = conversation_id AND conversations.clinic_id = get_user_clinic_id()));
CREATE POLICY "messages_insert" ON messages FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = conversation_id AND conversations.clinic_id = get_user_clinic_id()));

-- Marketing keywords
CREATE POLICY "keywords_select" ON marketing_keywords FOR SELECT
  USING (EXISTS (SELECT 1 FROM marketing_campaigns WHERE marketing_campaigns.id = campaign_id AND marketing_campaigns.clinic_id = get_user_clinic_id()));
CREATE POLICY "keywords_insert" ON marketing_keywords FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM marketing_campaigns WHERE marketing_campaigns.id = campaign_id AND marketing_campaigns.clinic_id = get_user_clinic_id()));

-- Automation logs
CREATE POLICY "auto_logs_select" ON automation_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM automations WHERE automations.id = automation_id AND automations.clinic_id = get_user_clinic_id()));

-- Medications catalog: leitura pública
CREATE POLICY "meds_select" ON medications_catalog FOR SELECT USING (true);

-- Custom field values
CREATE POLICY "cf_values_select" ON custom_field_values FOR SELECT
  USING (EXISTS (SELECT 1 FROM custom_field_definitions WHERE custom_field_definitions.id = field_id AND custom_field_definitions.clinic_id = get_user_clinic_id()));
CREATE POLICY "cf_values_insert" ON custom_field_values FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM custom_field_definitions WHERE custom_field_definitions.id = field_id AND custom_field_definitions.clinic_id = get_user_clinic_id()));
CREATE POLICY "cf_values_update" ON custom_field_values FOR UPDATE
  USING (EXISTS (SELECT 1 FROM custom_field_definitions WHERE custom_field_definitions.id = field_id AND custom_field_definitions.clinic_id = get_user_clinic_id()));

-- Exam catalog: leitura pública
CREATE POLICY "exam_catalog_select" ON exam_catalog FOR SELECT USING (true);
