alter table public.profiles enable row level security;
alter table public.attendances enable row level security;
alter table public.shifts enable row level security;
alter table public.daily_reports enable row level security;
alter table public.action_logs enable row level security;

alter table public.profiles force row level security;
alter table public.attendances force row level security;
alter table public.shifts force row level security;
alter table public.daily_reports force row level security;
alter table public.action_logs force row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
drop policy if exists "profiles_update_own_or_admin" on public.profiles;
drop policy if exists "profiles_insert_self" on public.profiles;

drop policy if exists "attendances_select_own_or_admin" on public.attendances;
drop policy if exists "attendances_insert_own" on public.attendances;
drop policy if exists "attendances_update_own_or_admin" on public.attendances;

drop policy if exists "shifts_select_own_or_admin" on public.shifts;
drop policy if exists "shifts_insert_own" on public.shifts;
drop policy if exists "shifts_update_own_pending_or_admin" on public.shifts;

drop policy if exists "daily_reports_select_own_or_admin" on public.daily_reports;
drop policy if exists "daily_reports_insert_own" on public.daily_reports;
drop policy if exists "daily_reports_update_own" on public.daily_reports;
drop policy if exists "daily_reports_delete_own" on public.daily_reports;

drop policy if exists "action_logs_select_own_or_admin" on public.action_logs;
drop policy if exists "action_logs_insert_own" on public.action_logs;

create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "attendances_select_own"
on public.attendances for select
using (auth.uid() = user_id);

create policy "attendances_insert_own"
on public.attendances for insert
with check (auth.uid() = user_id);

create policy "attendances_update_own"
on public.attendances for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "attendances_delete_own"
on public.attendances for delete
using (auth.uid() = user_id);

create policy "shifts_select_own"
on public.shifts for select
using (auth.uid() = user_id);

create policy "shifts_insert_own"
on public.shifts for insert
with check (auth.uid() = user_id);

create policy "shifts_update_own"
on public.shifts for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "shifts_delete_own"
on public.shifts for delete
using (auth.uid() = user_id);

create policy "daily_reports_select_own"
on public.daily_reports for select
using (auth.uid() = user_id);

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

create policy "action_logs_select_own"
on public.action_logs for select
using (auth.uid() = user_id);

create policy "action_logs_insert_own"
on public.action_logs for insert
with check (auth.uid() = user_id);
