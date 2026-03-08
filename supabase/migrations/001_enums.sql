-- MedFlow CRM - Enums
-- Execute no SQL Editor do Supabase

CREATE TYPE user_role AS ENUM ('admin', 'medico', 'secretaria', 'enfermeiro', 'financeiro');
CREATE TYPE crm_stage AS ENUM ('novo_lead', 'agendado', 'em_tratamento', 'retorno_pendente', 'inativo');
CREATE TYPE patient_origin AS ENUM ('google_ads', 'meta_ads', 'indicacao', 'organico', 'whatsapp', 'instagram', 'outro');
CREATE TYPE appointment_type AS ENUM ('consulta', 'retorno', 'teleconsulta', 'urgencia');
CREATE TYPE appointment_status AS ENUM ('livre', 'aguardando', 'confirmado', 'em_atendimento', 'finalizado', 'falta', 'cancelado');
CREATE TYPE gender_type AS ENUM ('masculino', 'feminino', 'outro');
CREATE TYPE exam_status AS ENUM ('solicitado', 'coletado', 'resultado_disponivel', 'analisado');
CREATE TYPE prescription_status AS ENUM ('rascunho', 'assinada', 'emitida', 'cancelada');
CREATE TYPE channel_type AS ENUM ('whatsapp', 'email', 'instagram', 'sms');
CREATE TYPE task_status AS ENUM ('aberta', 'em_andamento', 'concluida', 'cancelada');
CREATE TYPE priority_type AS ENUM ('baixa', 'media', 'alta', 'urgente');
CREATE TYPE payment_status AS ENUM ('pendente', 'pago', 'cancelado', 'glosado');
CREATE TYPE custom_field_type AS ENUM ('texto', 'texto_longo', 'numero', 'data', 'selecao', 'multipla_selecao', 'booleano', 'link');
CREATE TYPE automation_trigger_type AS ENUM (
  'agendamento_criado', 'agendamento_24h_antes', 'consulta_finalizada',
  'retorno_vencido', 'receita_vencendo', 'exame_resultado_disponivel',
  'paciente_inativo_60d', 'paciente_inativo_90d', 'aniversario'
);
CREATE TYPE automation_action_type AS ENUM (
  'enviar_whatsapp', 'enviar_email', 'criar_tarefa', 'mover_pipeline'
);
CREATE TYPE recurrence_type AS ENUM ('diaria', 'semanal', 'mensal', 'nenhuma');

-- Habilitar extensão para busca fuzzy
CREATE EXTENSION IF NOT EXISTS pg_trgm;
