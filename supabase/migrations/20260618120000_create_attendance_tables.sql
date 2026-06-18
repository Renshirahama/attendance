create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role text not null default 'user' check (role in ('user', 'admin')),
  department text,
  employment_type text not null default 'part_time',
  paid_leave_days numeric(4, 1) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attendances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  work_date date not null,
  clock_in_at timestamptz,
  break_start_at timestamptz,
  break_end_at timestamptz,
  clock_out_at timestamptz,
  status text not null default 'not_started' check (status in ('not_started', 'working', 'on_break', 'finished')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, work_date)
);

create table if not exists public.shifts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  shift_date date not null,
  start_time time not null,
  end_time time not null,
  reason text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  rejection_comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  report_date date not null,
  title text not null,
  body text not null,
  status text not null default 'draft' check (status in ('draft', 'submitted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, report_date)
);

create table if not exists public.action_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action_type text not null,
  target_table text not null,
  target_id uuid,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists attendances_user_date_idx on public.attendances (user_id, work_date desc);
create index if not exists shifts_user_date_idx on public.shifts (user_id, shift_date desc);
create index if not exists shifts_status_idx on public.shifts (status);
create index if not exists daily_reports_user_date_idx on public.daily_reports (user_id, report_date desc);
create index if not exists action_logs_user_created_idx on public.action_logs (user_id, created_at desc);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_attendances_updated_at on public.attendances;
create trigger set_attendances_updated_at
before update on public.attendances
for each row execute function public.set_updated_at();

drop trigger if exists set_shifts_updated_at on public.shifts;
create trigger set_shifts_updated_at
before update on public.shifts
for each row execute function public.set_updated_at();

drop trigger if exists set_daily_reports_updated_at on public.daily_reports;
create trigger set_daily_reports_updated_at
before update on public.daily_reports
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.attendances enable row level security;
alter table public.shifts enable row level security;
alter table public.daily_reports enable row level security;
alter table public.action_logs enable row level security;

create policy "profiles_select_own_or_admin"
on public.profiles for select
using (
  auth.uid() = id
  or public.is_admin()
);

create policy "profiles_update_own_or_admin"
on public.profiles for update
using (
  auth.uid() = id
  or public.is_admin()
)
with check (
  auth.uid() = id
  or public.is_admin()
);

create policy "profiles_insert_self"
on public.profiles for insert
with check (auth.uid() = id);

create policy "attendances_select_own_or_admin"
on public.attendances for select
using (
  auth.uid() = user_id
  or public.is_admin()
);

create policy "attendances_insert_own"
on public.attendances for insert
with check (auth.uid() = user_id);

create policy "attendances_update_own_or_admin"
on public.attendances for update
using (
  auth.uid() = user_id
  or public.is_admin()
)
with check (
  auth.uid() = user_id
  or public.is_admin()
);

create policy "shifts_select_own_or_admin"
on public.shifts for select
using (
  auth.uid() = user_id
  or public.is_admin()
);

create policy "shifts_insert_own"
on public.shifts for insert
with check (auth.uid() = user_id);

create policy "shifts_update_own_pending_or_admin"
on public.shifts for update
using (
  (auth.uid() = user_id and status = 'pending')
  or public.is_admin()
)
with check (
  auth.uid() = user_id
  or public.is_admin()
);

create policy "daily_reports_select_own_or_admin"
on public.daily_reports for select
using (
  auth.uid() = user_id
  or public.is_admin()
);

create policy "daily_reports_insert_own"
on public.daily_reports for insert
with check (auth.uid() = user_id);

create policy "daily_reports_update_own"
on public.daily_reports for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "daily_reports_delete_own"
on public.daily_reports for delete
using (auth.uid() = user_id);

create policy "action_logs_select_own_or_admin"
on public.action_logs for select
using (
  auth.uid() = user_id
  or public.is_admin()
);

create policy "action_logs_insert_own"
on public.action_logs for insert
with check (auth.uid() = user_id);
