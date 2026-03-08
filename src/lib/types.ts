// MedFlow CRM - Types matching the Supabase database schema

// ─── Enums ───────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'medico' | 'secretaria' | 'enfermeiro' | 'financeiro'
export type CrmStage = 'novo_lead' | 'agendado' | 'em_tratamento' | 'retorno_pendente' | 'inativo'
export type PatientOrigin = 'google_ads' | 'meta_ads' | 'indicacao' | 'organico' | 'whatsapp' | 'instagram' | 'outro'
export type AppointmentType = 'consulta' | 'retorno' | 'teleconsulta' | 'urgencia'
export type AppointmentStatus = 'livre' | 'aguardando' | 'confirmado' | 'em_atendimento' | 'finalizado' | 'falta' | 'cancelado'
export type GenderType = 'masculino' | 'feminino' | 'outro'
export type ExamStatus = 'solicitado' | 'coletado' | 'resultado_disponivel' | 'analisado'
export type PrescriptionStatus = 'rascunho' | 'assinada' | 'emitida' | 'cancelada'
export type ChannelType = 'whatsapp' | 'email' | 'instagram' | 'sms'
export type TaskStatus = 'aberta' | 'em_andamento' | 'concluida' | 'cancelada'
export type PriorityType = 'baixa' | 'media' | 'alta' | 'urgente'
export type PaymentStatus = 'pendente' | 'pago' | 'cancelado' | 'glosado'
export type CustomFieldType = 'texto' | 'texto_longo' | 'numero' | 'data' | 'selecao' | 'multipla_selecao' | 'booleano' | 'link'
export type AutomationTriggerType =
  | 'agendamento_criado'
  | 'agendamento_24h_antes'
  | 'consulta_finalizada'
  | 'retorno_vencido'
  | 'receita_vencendo'
  | 'exame_resultado_disponivel'
  | 'paciente_inativo_60d'
  | 'paciente_inativo_90d'
  | 'aniversario'
export type AutomationActionType = 'enviar_whatsapp' | 'enviar_email' | 'criar_tarefa' | 'mover_pipeline'
export type RecurrenceType = 'diaria' | 'semanal' | 'mensal' | 'nenhuma'

// ─── JSONB typed objects ─────────────────────────────────────────────────────

export interface Address {
  cep?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
}

export interface VitalSigns {
  blood_pressure?: string
  heart_rate?: number
  temperature?: number
  respiratory_rate?: number
  oxygen_saturation?: number
  weight?: number
  height?: number
}

// ─── Table interfaces ────────────────────────────────────────────────────────

export interface Clinic {
  id: string
  name: string
  cnpj: string | null
  phone: string | null
  email: string | null
  address: Address
  logo_url: string | null
  settings: Record<string, any>
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  user_id: string | null
  clinic_id: string
  name: string
  email: string
  role: UserRole
  crm_number: string | null
  specialty: string | null
  phone: string | null
  avatar_url: string | null
  is_active: boolean
  permissions: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Insurance {
  id: string
  clinic_id: string
  name: string
  ans_code: string | null
  contact_phone: string | null
  is_active: boolean
  created_at: string
}

export interface Patient {
  id: string
  clinic_id: string
  name: string
  cpf: string | null
  birth_date: string | null
  gender: GenderType | null
  phone: string | null
  email: string | null
  address: Address
  origin: PatientOrigin
  origin_detail: string | null
  crm_stage: CrmStage
  insurance_id: string | null
  insurance_number: string | null
  satisfaction_score: number | null
  notes: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PatientClinicalAlert {
  id: string
  patient_id: string
  alert_type: string
  description: string
  severity: string
  is_active: boolean
  created_at: string
}

export interface Appointment {
  id: string
  clinic_id: string
  patient_id: string | null
  doctor_id: string
  appointment_date: string
  start_time: string
  end_time: string
  type: AppointmentType
  status: AppointmentStatus
  notes: string | null
  is_first_visit: boolean
  created_by: string | null
  confirmed_at: string | null
  cancelled_at: string | null
  cancellation_reason: string | null
  created_at: string
  updated_at: string
}

export interface MedicalRecord {
  id: string
  clinic_id: string
  patient_id: string
  appointment_id: string | null
  doctor_id: string
  vital_signs: VitalSigns
  chief_complaint: string | null
  anamnesis: string | null
  physical_exam: string | null
  hypothesis: string | null
  cid_codes: string[]
  conduct: string | null
  notes: string | null
  is_signed: boolean
  signed_at: string | null
  created_at: string
  updated_at: string
}

export interface MedicationCatalog {
  id: string
  name: string
  active_ingredient: string | null
  concentration: string | null
  form: string | null
  therapeutic_class: string | null
  interaction_groups: string[]
  created_at: string
}

export interface DrugInteraction {
  id: string
  drug_a_group: string
  drug_b_group: string
  severity: string
  description: string
}

export interface Prescription {
  id: string
  clinic_id: string
  patient_id: string
  doctor_id: string
  medical_record_id: string | null
  status: PrescriptionStatus
  signed_at: string | null
  valid_until: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface PrescriptionItem {
  id: string
  prescription_id: string
  medication_id: string | null
  medication_name: string
  dosage: string
  posology: string
  duration: string | null
  instructions: string | null
  sort_order: number
  created_at: string
}

export interface ExamCatalog {
  id: string
  name: string
  category: string | null
  description: string | null
  created_at: string
}

export interface ExamRequest {
  id: string
  clinic_id: string
  patient_id: string
  doctor_id: string
  medical_record_id: string | null
  exam_catalog_id: string | null
  exam_name: string
  clinical_indication: string | null
  status: ExamStatus
  result: string | null
  result_date: string | null
  result_file_url: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  clinic_id: string
  patient_id: string | null
  channel: ChannelType
  external_id: string | null
  is_active: boolean
  last_message_at: string | null
  unread_count: number
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  sender_type: string
  sender_id: string | null
  content: string
  media_url: string | null
  media_type: string | null
  is_read: boolean
  is_from_automation: boolean
  template_id: string | null
  created_at: string
}

export interface MessageTemplate {
  id: string
  clinic_id: string
  name: string
  category: string | null
  content: string
  variables: string[]
  is_active: boolean
  created_at: string
}

export interface BillingEntry {
  id: string
  clinic_id: string
  patient_id: string | null
  appointment_id: string | null
  insurance_id: string | null
  description: string
  procedure_code: string | null
  amount: number
  payer_type: string
  payment_status: PaymentStatus
  payment_date: string | null
  payment_method: string | null
  guide_number: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface MarketingCampaign {
  id: string
  clinic_id: string
  platform: string
  name: string
  objective: string | null
  campaign_type: string | null
  budget: number | null
  spent: number
  impressions: number
  reach: number
  clicks: number
  leads: number
  conversions: number
  cpl: number | null
  ctr: number | null
  roas: number | null
  status: string
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
}

export interface MarketingKeyword {
  id: string
  campaign_id: string
  keyword: string
  clicks: number
  impressions: number
  ctr: number | null
  cpc: number | null
  leads: number
  created_at: string
}

export interface MarketingDailyStat {
  id: string
  clinic_id: string
  campaign_id: string | null
  stat_date: string
  platform: string
  impressions: number
  clicks: number
  leads: number
  spent: number
  created_at: string
}

export interface Task {
  id: string
  clinic_id: string
  patient_id: string | null
  assigned_to: string | null
  created_by: string | null
  title: string
  description: string | null
  task_type: string
  status: TaskStatus
  priority: PriorityType
  due_date: string | null
  completed_at: string | null
  recurrence: RecurrenceType
  recurrence_config: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Automation {
  id: string
  clinic_id: string
  name: string
  description: string | null
  icon: string
  trigger_type: AutomationTriggerType
  trigger_config: Record<string, any>
  action_type: AutomationActionType
  action_config: Record<string, any>
  is_active: boolean
  total_dispatches: number
  response_rate: number
  created_at: string
  updated_at: string
}

export interface AutomationLog {
  id: string
  automation_id: string
  patient_id: string | null
  status: string
  response: string | null
  error: string | null
  created_at: string
}

export interface CustomFieldDefinition {
  id: string
  clinic_id: string
  module: string
  field_name: string
  field_type: CustomFieldType
  is_required: boolean
  is_visible: boolean
  options: any[]
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CustomFieldValue {
  id: string
  field_id: string
  entity_id: string
  entity_type: string
  value: any
  created_at: string
  updated_at: string
}

// ─── Database type map (for Supabase client usage) ───────────────────────────

export interface Database {
  public: {
    Tables: {
      clinics: { Row: Clinic; Insert: Partial<Clinic> & Pick<Clinic, 'name'>; Update: Partial<Clinic> }
      team_members: { Row: TeamMember; Insert: Partial<TeamMember> & Pick<TeamMember, 'clinic_id' | 'name' | 'email'>; Update: Partial<TeamMember> }
      insurances: { Row: Insurance; Insert: Partial<Insurance> & Pick<Insurance, 'clinic_id' | 'name'>; Update: Partial<Insurance> }
      patients: { Row: Patient; Insert: Partial<Patient> & Pick<Patient, 'clinic_id' | 'name'>; Update: Partial<Patient> }
      patient_clinical_alerts: { Row: PatientClinicalAlert; Insert: Partial<PatientClinicalAlert> & Pick<PatientClinicalAlert, 'patient_id' | 'alert_type' | 'description'>; Update: Partial<PatientClinicalAlert> }
      appointments: { Row: Appointment; Insert: Partial<Appointment> & Pick<Appointment, 'clinic_id' | 'doctor_id' | 'appointment_date' | 'start_time' | 'end_time'>; Update: Partial<Appointment> }
      medical_records: { Row: MedicalRecord; Insert: Partial<MedicalRecord> & Pick<MedicalRecord, 'clinic_id' | 'patient_id' | 'doctor_id'>; Update: Partial<MedicalRecord> }
      medications_catalog: { Row: MedicationCatalog; Insert: Partial<MedicationCatalog> & Pick<MedicationCatalog, 'name'>; Update: Partial<MedicationCatalog> }
      drug_interactions: { Row: DrugInteraction; Insert: Partial<DrugInteraction> & Pick<DrugInteraction, 'drug_a_group' | 'drug_b_group' | 'severity' | 'description'>; Update: Partial<DrugInteraction> }
      prescriptions: { Row: Prescription; Insert: Partial<Prescription> & Pick<Prescription, 'clinic_id' | 'patient_id' | 'doctor_id'>; Update: Partial<Prescription> }
      prescription_items: { Row: PrescriptionItem; Insert: Partial<PrescriptionItem> & Pick<PrescriptionItem, 'prescription_id' | 'medication_name' | 'dosage' | 'posology'>; Update: Partial<PrescriptionItem> }
      exam_catalog: { Row: ExamCatalog; Insert: Partial<ExamCatalog> & Pick<ExamCatalog, 'name'>; Update: Partial<ExamCatalog> }
      exam_requests: { Row: ExamRequest; Insert: Partial<ExamRequest> & Pick<ExamRequest, 'clinic_id' | 'patient_id' | 'doctor_id' | 'exam_name'>; Update: Partial<ExamRequest> }
      conversations: { Row: Conversation; Insert: Partial<Conversation> & Pick<Conversation, 'clinic_id'>; Update: Partial<Conversation> }
      messages: { Row: Message; Insert: Partial<Message> & Pick<Message, 'conversation_id' | 'content'>; Update: Partial<Message> }
      message_templates: { Row: MessageTemplate; Insert: Partial<MessageTemplate> & Pick<MessageTemplate, 'clinic_id' | 'name' | 'content'>; Update: Partial<MessageTemplate> }
      billing_entries: { Row: BillingEntry; Insert: Partial<BillingEntry> & Pick<BillingEntry, 'clinic_id' | 'description' | 'amount'>; Update: Partial<BillingEntry> }
      marketing_campaigns: { Row: MarketingCampaign; Insert: Partial<MarketingCampaign> & Pick<MarketingCampaign, 'clinic_id' | 'platform' | 'name'>; Update: Partial<MarketingCampaign> }
      marketing_keywords: { Row: MarketingKeyword; Insert: Partial<MarketingKeyword> & Pick<MarketingKeyword, 'campaign_id' | 'keyword'>; Update: Partial<MarketingKeyword> }
      marketing_daily_stats: { Row: MarketingDailyStat; Insert: Partial<MarketingDailyStat> & Pick<MarketingDailyStat, 'clinic_id' | 'stat_date' | 'platform'>; Update: Partial<MarketingDailyStat> }
      tasks: { Row: Task; Insert: Partial<Task> & Pick<Task, 'clinic_id' | 'title'>; Update: Partial<Task> }
      automations: { Row: Automation; Insert: Partial<Automation> & Pick<Automation, 'clinic_id' | 'name' | 'trigger_type' | 'action_type'>; Update: Partial<Automation> }
      automation_logs: { Row: AutomationLog; Insert: Partial<AutomationLog> & Pick<AutomationLog, 'automation_id'>; Update: Partial<AutomationLog> }
      custom_field_definitions: { Row: CustomFieldDefinition; Insert: Partial<CustomFieldDefinition> & Pick<CustomFieldDefinition, 'clinic_id' | 'module' | 'field_name'>; Update: Partial<CustomFieldDefinition> }
      custom_field_values: { Row: CustomFieldValue; Insert: Partial<CustomFieldValue> & Pick<CustomFieldValue, 'field_id' | 'entity_id' | 'entity_type'>; Update: Partial<CustomFieldValue> }
    }
    Enums: {
      user_role: UserRole
      crm_stage: CrmStage
      patient_origin: PatientOrigin
      appointment_type: AppointmentType
      appointment_status: AppointmentStatus
      gender_type: GenderType
      exam_status: ExamStatus
      prescription_status: PrescriptionStatus
      channel_type: ChannelType
      task_status: TaskStatus
      priority_type: PriorityType
      payment_status: PaymentStatus
      custom_field_type: CustomFieldType
      automation_trigger_type: AutomationTriggerType
      automation_action_type: AutomationActionType
      recurrence_type: RecurrenceType
    }
  }
}
