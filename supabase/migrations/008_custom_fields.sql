-- MedFlow CRM - Custom Fields

CREATE TABLE custom_field_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  module TEXT NOT NULL,
  field_name TEXT NOT NULL,
  field_type custom_field_type NOT NULL DEFAULT 'texto',
  is_required BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  options JSONB DEFAULT '[]',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_custom_fields_clinic ON custom_field_definitions(clinic_id, module);

CREATE TABLE custom_field_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id UUID REFERENCES custom_field_definitions(id) ON DELETE CASCADE NOT NULL,
  entity_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  value JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_custom_values_entity ON custom_field_values(entity_type, entity_id);
CREATE INDEX idx_custom_values_field ON custom_field_values(field_id);

CREATE TRIGGER tr_custom_fields_updated BEFORE UPDATE ON custom_field_definitions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_custom_values_updated BEFORE UPDATE ON custom_field_values FOR EACH ROW EXECUTE FUNCTION update_updated_at();
