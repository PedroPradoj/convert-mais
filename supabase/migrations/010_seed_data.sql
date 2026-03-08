-- MedFlow CRM - Seed Data
-- Execute APÓS criar um usuário no Supabase Auth

-- 1. Clínica
INSERT INTO clinics (id, name, cnpj, phone, email) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Clínica Cardiológica Dr. Rafael', '12.345.678/0001-90', '(11) 3456-7890', 'contato@clinicadrrafael.com.br');

-- 2. Convênios
INSERT INTO insurances (id, clinic_id, name, ans_code) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Particular', NULL),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Unimed', '302147'),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Amil', '326305'),
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Bradesco Saúde', '005711'),
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'SulAmérica', '006246');

-- 3. Medicamentos
INSERT INTO medications_catalog (name, active_ingredient, concentration, form, therapeutic_class, interaction_groups) VALUES
  ('Losartana Potássica 50mg', 'Losartana', '50mg', 'Comprimido', 'Antagonista AT1 — Anti-hipertensivo', ARRAY['anti_hipertensivo', 'bra']),
  ('Anlodipino 5mg', 'Anlodipino', '5mg', 'Comprimido', 'Bloqueador canal de cálcio', ARRAY['anti_hipertensivo', 'bcc']),
  ('Enalapril 10mg', 'Enalapril', '10mg', 'Comprimido', 'Inibidor ECA', ARRAY['anti_hipertensivo', 'ieca']),
  ('Metoprolol 50mg', 'Metoprolol', '50mg', 'Comprimido', 'Betabloqueador', ARRAY['anti_hipertensivo', 'betabloqueador']),
  ('Furosemida 40mg', 'Furosemida', '40mg', 'Comprimido', 'Diurético de alça', ARRAY['diuretico']),
  ('Atorvastatina 20mg', 'Atorvastatina', '20mg', 'Comprimido', 'Estatina — Hipolipemiante', ARRAY['estatina']),
  ('AAS 100mg', 'Ácido Acetilsalicílico', '100mg', 'Comprimido', 'Antiagregante plaquetário', ARRAY['antiagregante']),
  ('Omeprazol 20mg', 'Omeprazol', '20mg', 'Cápsula', 'Inibidor bomba de prótons', ARRAY['ibp']),
  ('Amoxicilina 500mg', 'Amoxicilina', '500mg', 'Cápsula', 'Antibiótico Penicilina', ARRAY['antibiotico']),
  ('Metformina 850mg', 'Metformina', '850mg', 'Comprimido', 'Antidiabético Biguanida', ARRAY['antidiabetico']);

-- 4. Catálogo de exames
INSERT INTO exam_catalog (name, category) VALUES
  ('Hemograma completo', 'Sangue'),
  ('Glicemia em jejum', 'Sangue'),
  ('Creatinina', 'Sangue'),
  ('Colesterol total e frações', 'Sangue'),
  ('TSH', 'Sangue'),
  ('Urina rotina', 'Urina'),
  ('ECG', 'Cardiológico'),
  ('Microalbuminúria', 'Urina'),
  ('Ecocardiograma', 'Cardiológico'),
  ('Holter 24h', 'Cardiológico'),
  ('MAPA 24h', 'Cardiológico'),
  ('Teste Ergométrico', 'Cardiológico'),
  ('HbA1c', 'Sangue'),
  ('Lipidograma', 'Sangue');

-- 5. Interações medicamentosas
INSERT INTO drug_interactions (drug_a_group, drug_b_group, severity, description) VALUES
  ('ieca', 'bra', 'grave', 'IECA + BRA: risco de hipercalemia e insuficiência renal. Não usar juntos.'),
  ('ieca', 'diuretico', 'moderada', 'IECA + Diurético: monitorar potássio e função renal.'),
  ('betabloqueador', 'bcc', 'moderada', 'Betabloqueador + BCC: risco de bradicardia excessiva.'),
  ('antiagregante', 'antibiotico', 'leve', 'AAS + Antibióticos: monitorar sangramento.');

-- NOTA: Para vincular o team_member ao auth.users, execute após criar o usuário:
-- INSERT INTO team_members (user_id, clinic_id, name, email, role, crm_number, specialty)
-- VALUES ('<USER_UUID_DO_AUTH>', 'a0000000-0000-0000-0000-000000000001', 'Dr. Rafael Alves', 'rafael@clinica.com', 'admin', '12345', 'Cardiologia');
