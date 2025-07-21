import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialisation Supabase avec clé publique (ANON)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { event, payload } = req.body;

  if (event !== 'member.created') {
    return res.status(400).json({ error: 'Unsupported event type' });
  }

  try {
    const member_msid = payload.id;
    const email = payload.auth?.email;
    const firstname = payload.customFields?.['first-name'] || null;
    const lastname = payload.customFields?.['last-name'] || null;

    if (!member_msid || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Upsert dans la table "members"
    const { error } = await supabase.from('members').upsert(
      {
        member_msid,
        email,
        firstname,
        lastname,
      },
      { onConflict: 'member_msid' } // Remplace si déjà existant
    );

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Supabase insert/update failed' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
