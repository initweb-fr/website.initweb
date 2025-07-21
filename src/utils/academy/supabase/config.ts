/**
 * 🗄️ Configuration Supabase
 *
 * Configuration de la connexion à la base de données Supabase.
 * Définit les types TypeScript pour toutes les tables de l'académie.
 */

import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

// Vérification de la configuration
if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Variables d'environnement Supabase manquantes. Vérifiez votre fichier .env");
}

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

// Types pour les tables Supabase existantes
export interface Member {
  id: string;
  member_msid: string; // Memberstack ID
  firstname: string;
  email?: string;
  created_at: string;
}

export interface Formation {
  id: string;
  title: string;
  description?: string;
  subject?: string;
  format?: string;
  approach?: string;
  duration?: string;
  level?: string;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  content?: string;
  duration?: string;
  chapter_id: string;
  sub_chapter_id?: string;
  order_index: number;
  created_at: string;
}

export interface Chapter {
  id: string;
  title: string;
  formation_id: string;
  order_index: number;
  created_at: string;
}

export interface MemberProgress {
  id: string;
  member_id: string;
  lesson_id: string;
  completed_at: string;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  features?: string[];
  is_active: boolean;
  created_at: string;
}
