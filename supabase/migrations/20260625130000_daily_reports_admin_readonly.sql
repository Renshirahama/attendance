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

alter table public.profiles enable row level security;
alter table public.daily_reports enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_select_own_or_admin" on public.profiles;

create policy "profiles_select_own_or_admin"
on public.profiles for select
using (auth.uid() = id or public.is_admin());

drop policy if exists "daily_reports_select_own" on public.daily_reports;
drop policy if exists "daily_reports_select_own_or_admin" on public.daily_reports;

create policy "daily_reports_select_own_or_admin"
on public.daily_reports for select
using (auth.uid() = user_id or public.is_admin());
