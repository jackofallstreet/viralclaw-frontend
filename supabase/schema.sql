-- ViralClaw — Supabase schema
-- Run this in Supabase SQL editor to bootstrap the database

-- Users / brand profiles
create table if not exists brand_profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  niche       text,
  audience    text,
  voice       text,
  pillars     text[] default '{}',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Missions
create table if not exists missions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  input       text not null,
  status      text default 'queued' check (status in ('queued','decomposing','running','awaiting-review','complete','failed','cancelled')),
  tasks       jsonb default '[]',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Content assets
create table if not exists content_assets (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  mission_id    uuid references missions(id) on delete set null,
  title         text,
  body          text,
  type          text check (type in ('video-script','short-script','thread','carousel','email','caption','newsletter')),
  platform      text check (platform in ('youtube','youtube-shorts','x','tiktok','linkedin','instagram','telegram')),
  status        text default 'draft' check (status in ('draft','review','approved','published','rejected')),
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Agent events (activity feed)
create table if not exists agent_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  agent       text not null,
  type        text not null,
  message     text not null,
  metadata    jsonb default '{}',
  created_at  timestamptz default now()
);

-- RLS policies — each user sees only their own data
alter table brand_profiles enable row level security;
alter table missions        enable row level security;
alter table content_assets  enable row level security;
alter table agent_events    enable row level security;

create policy "own rows" on brand_profiles  for all using (auth.uid() = user_id);
create policy "own rows" on missions        for all using (auth.uid() = user_id);
create policy "own rows" on content_assets  for all using (auth.uid() = user_id);
create policy "own rows" on agent_events    for all using (auth.uid() = user_id);

-- Updated_at trigger
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger trg_brand_profiles_updated_at  before update on brand_profiles  for each row execute procedure set_updated_at();
create trigger trg_missions_updated_at         before update on missions         for each row execute procedure set_updated_at();
create trigger trg_content_assets_updated_at   before update on content_assets   for each row execute procedure set_updated_at();
