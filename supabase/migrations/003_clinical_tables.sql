-- MedFlow CRM - Clinical Tables

-- Prontuários (registros médicos)
CREATE TABLE medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  appointment_id UUID REFERENCES appointments(id),
  doctor_id UUID REFERENCES team_members(id) NOT NULL,
  vital_signs JSONB DEFAULT '{}',
  chief_complaint TEXT,
  anamnesis TEXT,
  physical_exam TEXT,
  hypothesis TEXT,
  cid_codes TEXT[] DEFAULT '{}',
  conduct TEXT,
  notes TEXT,
  is_signed BOOLEAN DEFAULT false,
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_medical_records_patient ON medical_records(patient_id, created_at DESC);
CREATE INDEX idx_medical_records_clinic ON medical_records(clinic_id);

-- Catálogo de medicamentos
CREATE TABLE medications_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  active_ingredient TEXT,
  concentration TEXT,
  form TEXT,
  therapeutic_class TEXT,
  interaction_groups TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_medications_name ON medications_catalog USING gin(name gin_trgm_ops);

-- Interações medicamentosas
CREATE TABLE drug_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drug_a_group TEXT NOT NULL,
  drug_b_group TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  UNIQUE(drug_a_group, drug_b_group)
);

-- Prescrições
CREATE TABLE prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES team_members(id) NOT NULL,
  medical_record_id UUID REFERENCES medical_records(id),
  status prescription_status DEFAULT 'rascunho',
  signed_at TIMESTAMPTZ,
  valid_until DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_prescriptions_patient ON prescriptions(patient_id);

-- Itens da prescrição
CREATE TABLE prescription_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID REFERENCES prescriptions(id) ON DELETE CASCADE NOT NULL,
  medication_id UUID REFERENCES medications_catalog(id),
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  posology TEXT NOT NULL,
  duration TEXT,
  instructions TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Catálogo de exames disponíveis
CREATE TABLE exam_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Solicitações de exame
CREATE TABLE exam_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES team_members(id) NOT NULL,
  medical_record_id UUID REFERENCES medical_records(id),
  exam_catalog_id UUID REFERENCES exam_catalog(id),
  exam_name TEXT NOT NULL,
  clinical_indication TEXT,
  status exam_status DEFAULT 'solicitado',
  result TEXT,
  result_date DATE,
  result_file_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_exam_requests_patient ON exam_requests(patient_id);

-- Triggers
CREATE TRIGGER tr_medical_records_updated BEFORE UPDATE ON medical_records FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_prescriptions_updated BEFORE UPDATE ON prescriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_exam_requests_updated BEFORE UPDATE ON exam_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
