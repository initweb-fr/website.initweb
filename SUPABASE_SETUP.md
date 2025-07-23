# Configuration Supabase

## 📋 Prérequis

1. **Compte Supabase** : Créez un compte sur [supabase.com](https://supabase.com)
2. **Projet Supabase** : Créez un nouveau projet
3. **Variables d'environnement** : Configurez vos clés d'API

## 🔧 Configuration

### 1. Variables d'environnement

Créez un fichier `.env` à la racine du projet avec :

```env
SUPABASE_URL=https://<ton-projet>.supabase.co
SUPABASE_ANON_KEY=<ta-clé-anon-public>
```

### 2. Structure de la base de données

Créez les tables suivantes dans votre projet Supabase :

#### Table `users`

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  memberstack_id TEXT UNIQUE NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table `courses`

```sql
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table `course_progress`

```sql
CREATE TABLE course_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID NOT NULL,
  lesson_id UUID NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(member_id, lesson_id)
);
```

### 3. Politiques de sécurité (RLS)

Activez Row Level Security et configurez les politiques :

```sql
-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;

-- Politique pour les utilisateurs (lecture/écriture de leurs propres données)
CREATE POLICY "Users can manage their own data" ON users
  FOR ALL USING (memberstack_id = current_setting('request.jwt.claims')::json->>'sub');

-- Politique pour les cours (lecture publique)
CREATE POLICY "Courses are viewable by everyone" ON courses
  FOR SELECT USING (true);

-- Politique pour la progression (lecture/écriture de ses propres données)
CREATE POLICY "Members can manage their own progress" ON course_progress
  FOR ALL USING (true);
```

## 🚀 Utilisation

### Importation du client Supabase

```typescript
import { supabase } from '$utils/supabase/config';
```

### Exemple d'utilisation

```typescript
// Sauvegarder la progression
await saveLessonProgress(memberstackId, courseId, lessonId, true);

// Récupérer la progression
const progress = await getUserCourseProgress(memberstackId, courseId);
```

## 🔍 Vérification

1. Vérifiez que votre fichier `.env` contient les bonnes valeurs
2. Testez la connexion avec :
   ```typescript
   const { data, error } = await supabase.from('users').select('count');
   console.log('Connexion Supabase:', error ? '❌' : '✅');
   ```

## 🛠️ Dépannage

- **Erreur de connexion** : Vérifiez vos variables d'environnement
- **Erreur de permissions** : Vérifiez vos politiques RLS
- **Erreur de types** : Vérifiez que les types correspondent à votre schéma

## Tables existantes

### Table `members`

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_msid TEXT UNIQUE NOT NULL,
  firstname TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table `course_progress`

```sql
CREATE TABLE course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_sbid UUID REFERENCES members(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  lesson_iwid TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_sbid, lesson_id)
);
```

## Vue pour automatiser la jointure

### Vue `course_progress_with_member`

```sql
CREATE VIEW course_progress_with_member AS
SELECT
  cp.id,
  cp.member_sbid,
  cp.lesson_id,
  cp.lesson_iwid,
  cp.completed_at,
  cp.created_at,
  m.member_msid,
  m.email,
  m.firstname
FROM course_progress cp
INNER JOIN members m ON cp.member_sbid = m.id;
```

### Utilisation de la vue

```sql
-- Récupérer toutes les leçons d'un membre avec ses infos
SELECT * FROM course_progress_with_member
WHERE member_sbid = 'votre-member-id';

-- Récupérer par Memberstack ID
SELECT * FROM course_progress_with_member
WHERE member_msid = 'votre-memberstack-id';
```

## Politiques RLS

### Politique pour course_progress

```sql
-- Permettre l'accès anonyme pour le développement
CREATE POLICY "Allow anonymous access to course_progress" ON course_progress
FOR ALL USING (true);
```

### Politique pour la vue

```sql
-- Permettre l'accès anonyme à la vue
CREATE POLICY "Allow anonymous access to course_progress_with_member" ON course_progress_with_member
FOR ALL USING (true);
```
