drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;

drop policy if exists "shifts_select_own" on public.shifts;
drop policy if exists "shifts_insert_own" on public.shifts;
drop policy if exists "shifts_update_own" on public.shifts;
drop policy if exists "shifts_delete_own" on public.shifts;

alter table public.profiles
  drop constraint if exists profiles_role_check;

update public.profiles
set role = 'member'
where role = 'user';

alter table public.profiles
  alter column role set default 'member',
  add constraint profiles_role_check check (role in ('admin', 'member'));

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

create or replace function public.profile_role(profile_id uuid)
returns text
language sql
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = profile_id;
$$;

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
    case
      when new.raw_user_meta_data->>'role' = 'admin' then 'admin'
      else 'member'
    end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create policy "profiles_select_own_or_admin"
on public.profiles for select
using (auth.uid() = id or public.is_admin());

create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id and role = public.profile_role(auth.uid()));

create policy "shifts_select_own_or_admin"
on public.shifts for select
using (auth.uid() = user_id or public.is_admin());

create policy "shifts_insert_own"
on public.shifts for insert
with check (auth.uid() = user_id);

create policy "shifts_update_pending_by_admin"
on public.shifts for update
using (public.is_admin() and status = 'pending')
with check (public.is_admin() and status in ('approved', 'rejected'));

create policy "shifts_delete_own_pending"
on public.shifts for delete
using (auth.uid() = user_id and status = 'pending');
