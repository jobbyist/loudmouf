CREATE TABLE public.member_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  city text,
  province text,
  date_of_birth date not null,
  id_last4 text not null,
  id_verified boolean not null default false,
  tier text not null default 'standard',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

GRANT INSERT ON public.member_applications TO anon, authenticated;
GRANT ALL ON public.member_applications TO service_role;

ALTER TABLE public.member_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a membership application"
ON public.member_applications FOR INSERT TO anon, authenticated
WITH CHECK (true);