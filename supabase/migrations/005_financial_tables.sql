-- MedFlow CRM - Financial Tables

CREATE TABLE billing_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id),
  insurance_id UUID REFERENCES insurances(id),
  description TEXT NOT NULL,
  procedure_code TEXT,
  amount NUMERIC(10,2) NOT NULL,
  payer_type TEXT DEFAULT 'particular',
  payment_status payment_status DEFAULT 'pendente',
  payment_date DATE,
  payment_method TEXT,
  guide_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_billing_clinic ON billing_entries(clinic_id, created_at DESC);
CREATE INDEX idx_billing_patient ON billing_entries(patient_id);
CREATE INDEX idx_billing_status ON billing_entries(clinic_id, payment_status);

CREATE TRIGGER tr_billing_updated BEFORE UPDATE ON billing_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
