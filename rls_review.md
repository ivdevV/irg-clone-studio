# Revisión de RLS (solo lectura)

Fecha: 2026-10-23. No se aplicó SQL, no se cambió ninguna policy y no se rotó ninguna clave. La sonda usó solo `GET` con la clave anon del checkout. No hay contenido de filas, datos personales ni valores de claves en este informe.

## Resumen

El repositorio ya no define tablas en el esquema generado, y la última migración elimina las dos tablas que había creado. La sonda anon coincide: `profiles` y `module_progress` no están en la caché de PostgREST. No aparece ninguna policy `USING (true)` ni ninguna policy dirigida a `anon`. El listado de buckets con la clave anon está vacío.

La clave anon sigue siendo válida y sigue en el historial público de Git. Quitar `.env` del índice no la revoca.

## Tablas en el repositorio

`src/integrations/supabase/types.ts` declara `public.Tables`, `Views`, `Functions`, `Enums` y `CompositeTypes` vacíos (`[_ in never]: never`). La versión de PostgREST anotada es `13.0.5`. El cliente (`src/integrations/supabase/client.ts`) no consulta ninguna tabla; solo construye el cliente con `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`.

### Migración `20251009115401` — crea las tablas y activa RLS

`public.profiles`

| Columna | Notas |
| --- | --- |
| `id` | UUID, PK, FK a `auth.users(id)` ON DELETE CASCADE |
| `full_name` | texto, dato personal |
| `email` | texto, dato personal |
| `created_at`, `updated_at` | timestamps |

`ENABLE ROW LEVEL SECURITY` en `public.profiles`.

| Policy | Comando | Expresión | `TO` |
| --- | --- | --- | --- |
| Users can view their own profile | SELECT | `USING (auth.uid() = id)` | no indicado (todas las roles) |
| Users can update their own profile | UPDATE | `USING (auth.uid() = id)` | no indicado |

No hay policy de INSERT ni de DELETE. No hay `USING (true)` ni `WITH CHECK (true)`.

`public.module_progress`

| Columna | Notas |
| --- | --- |
| `id` | UUID PK |
| `user_id` | FK a `profiles(id)`, NOT NULL |
| `module_number` | entero 1–8 |
| `completed`, `completed_at`, `created_at` | progreso del usuario |
| único | `(user_id, module_number)` |

`ENABLE ROW LEVEL SECURITY` en `public.module_progress`.

| Policy | Comando | Expresión | `TO` |
| --- | --- | --- | --- |
| Users can view their own progress | SELECT | `USING (auth.uid() = user_id)` | no indicado |
| Users can insert their own progress | INSERT | `WITH CHECK (auth.uid() = user_id)` | no indicado |
| Users can update their own progress | UPDATE | `USING (auth.uid() = user_id)` | no indicado |

No hay policy de DELETE. No hay `USING (true)`.

Para `anon`, `auth.uid()` es null, así que esas expresiones no se cumplen. Con RLS activo, anon no leería filas aunque la tabla existiera. El diseño es de dueño de la fila, no de tabla pública. El `TO` implícito las hace depender de que `auth.uid()` sea null para anon; no hay un `TO authenticated` explícito.

También crea `handle_new_user()` (`SECURITY DEFINER`, `search_path = public`) y el trigger `on_auth_user_created`, más `update_updated_at()` como trigger de `profiles`.

### Migración `20251009115424`

Sustituye `update_updated_at()` y la pasa a `SECURITY DEFINER` con `search_path = public`. No toca RLS. `SECURITY DEFINER` no hace falta para actualizar `updated_at`.

### Migración `20251009115819` — estado final del repo

Elimina los triggers, `update_updated_at()`, `handle_new_user()`, `module_progress` y `profiles`. A partir de esta migración el repo no tiene esas tablas ni sus policies.

No hay más SQL en el repositorio. No hay policies de Storage.

## Sonda anon (GET)

Objetivo: saber qué tablas responde la clave anon y cuántas filas deja ver. Se descartó el cuerpo de cada respuesta de tabla. No se llamó a ningún RPC y no se escribió en Storage.

| Tabla | HTTP | Filas visibles para anon | Nota |
| --- | --- | --- | --- |
| `profiles` | 404 | ninguna (la tabla no está en la caché) | `PGRST205` Could not find the table `public.profiles` in the schema cache |
| `module_progress` | 404 | ninguna | `PGRST205` Could not find the table `public.module_progress` in the schema cache |

`GET /rest/v1/` (especificación OpenAPI) respondió **401**. El mensaje fue `Invalid API key` y la pista: solo la clave `service_role` puede usar ese endpoint. No se usó `service_role`. Consecuencia: con la clave anon no se puede enumerar el catálogo. La sonda cubre las tablas de las migraciones y de `types.ts`, no un inventario completo del proyecto.

### Buckets

`GET /storage/v1/bucket` respondió **200** con una lista vacía. No hay buckets visibles para anon y, por tanto, ningún bucket público visible. No se listaron objetos ni se subió nada.

Evidencia sin secretos: `artifacts/anon_probe.json`.

## Qué expone hoy la clave anon

- Autenticación de la API como `role=anon`. La clave es un JWT legacy (el cliente la llama publishable). Está pensada para ir en el navegador; el control real es el RLS y los grants.
- No puede leer `profiles` ni `module_progress` porque esas relaciones no están en la caché.
- No puede descargar el OpenAPI del proyecto.
- Puede consultar la lista de buckets y hoy esa lista está vacía.
- Sigue siendo válida hasta que se desactive en el panel. El historial público de Git la conserva desde el commit `1035b98`. Esta PR no reescribe ese historial.

No se observó ninguna fila. Un HTTP 200 con `Content-Range` habría contado solo filas visibles para anon, no el total de la tabla. Ese caso no se dio.

## Huecos si esas tablas se vuelven a crear

El SQL histórico era razonable (RLS activo y predicado por `auth.uid()`), con estos huecos:

- No hay `FORCE ROW LEVEL SECURITY`.
- Las policies no dicen `TO authenticated`, así que también se evalúan para `anon`.
- El `UPDATE` de `profiles` no tiene `WITH CHECK`, así que una fila propia podría cambiar `id`.
- El `UPDATE` de `module_progress` no impide cambiar `user_id`.
- No se documentan `REVOKE` a `anon`. En proyectos Supabase los grants por defecto de `public` suelen dejar a `anon` con privilegio de tabla, y el RLS es la única barrera.
- `update_updated_at()` quedó como `SECURITY DEFINER` sin necesidad.

## SQL propuesto (no aplicado)

No ejecutar esto como parte de esta PR. Si el producto no necesita esas tablas, el estado actual (tablas ausentes) es el más cerrado y no hace falta recrearlas.

Comprobación que debe hacer una persona con acceso de SQL al proyecto, no este cambio:

```sql
select n.nspname, c.relname, c.relrowsecurity, c.relforcerowsecurity
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind in ('r', 'v', 'm', 'p')
order by c.relname;
```

Si se recrean `profiles` y `module_progress`, preferir este patrón en lugar del de la primera migración:

```sql
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.profiles force row level security;

revoke all on table public.profiles from anon, authenticated;
grant select, update on table public.profiles to authenticated;

create policy profiles_select_own
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy profiles_update_own
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create table public.module_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  module_number integer not null check (module_number between 1 and 8),
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, module_number)
);

alter table public.module_progress enable row level security;
alter table public.module_progress force row level security;

revoke all on table public.module_progress from anon, authenticated;
grant select, insert, update on table public.module_progress to authenticated;

create policy module_progress_select_own
  on public.module_progress
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy module_progress_insert_own
  on public.module_progress
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy module_progress_update_own
  on public.module_progress
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

No conceder `INSERT` sobre `profiles` a `anon` ni a `authenticated` si el alta sigue haciéndola un trigger `SECURITY DEFINER` sobre `auth.users`. No añadir policies `USING (true)` ni `TO anon` sobre tablas con email o nombre. No volver a marcar `update_updated_at()` como `SECURITY DEFINER`.

Storage, si más adelante hay ficheros de usuarios: crear el bucket como privado y no otorgar `select` a `anon` sobre `storage.objects`. Hoy no hay buckets que cerrar.

## Rotación de la clave anon (propuesta, no ejecutada)

La clave filtrada es el JWT legacy `anon`, no una clave `sb_publishable_...`. Supabase está retirando `anon` y `service_role` a finales de 2026. Crear una clave publishable no revoca la legacy: las dos conviven hasta desactivar las legacy.

Documentación usada:

- https://supabase.com/docs/guides/getting-started/api-keys
- https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys
- https://supabase.com/docs/guides/troubleshooting/rotating-anon-service-and-jwt-secrets-1Jq6yd

Pasos en el panel, en este orden:

1. Dejar de versionar `.env` (esta PR) antes de rotar. El historial público sigue conteniendo la clave; esta PR no lo reescribe y no cambia la visibilidad del repo. La rotación es lo que invalida la copia ya publicada.
2. En el Dashboard: **Project Settings → API Keys**, pestaña de claves publishable y secret. Si el proyecto aún no las tiene, **Create new API keys**. Eso añade una clave publishable (`sb_publishable_...`) y una secret (`sb_secret_...`) al lado de `anon` y `service_role`. Las legacy siguen funcionando.
3. Sustituir el JWT anon por la clave publishable en cada cliente y comprobar que nadie sigue enviando la clave vieja (el panel muestra último uso).
4. Desactivar las claves legacy en **Settings → API Keys**. Eso apaga `anon` y `service_role` a la vez. Es reversible. Antes, cualquier servidor que aún use `service_role` tiene que pasar a una clave secret. No hace falta regenerar el JWT secret del proyecto para este incidente; esa vía invalida también las sesiones de usuario y el documento de troubleshooting la desaconseja frente a las claves nuevas.
5. No pegar la clave nueva en Git, en la descripción de una PR ni en `.env.example`.

Dónde actualizar el valor después de emitirlo:

| Sitio | Qué hacer |
| --- | --- |
| `.env` local (ya no versionado) | Cambiar `VITE_SUPABASE_PUBLISHABLE_KEY`. `VITE_SUPABASE_URL` y `VITE_SUPABASE_PROJECT_ID` no cambian al rotar la clave. |
| Lovable | Volver a publicar (Share → Publish) para que el build incruste la clave nueva. Cambiar solo el panel de Supabase no actualiza el JavaScript ya publicado. |
| Docker | `Dockerfile` hace `COPY . .` y después `npm run build`. La clave tiene que estar en el contexto de build y no en Git. Conviene un `.dockerignore` con `.env` (no añadido en esta PR): sin él, la imagen se queda con el valor copiado. |
| Historial de Git y bundles ya publicados | Siguen llevando la clave vieja hasta desactivarla en el paso 4. |
| `supabase/config.toml` | Tiene `project_id` (referencia del proyecto, no la clave anon). No se rota con este procedimiento y no se modifica aquí. |

## Limitaciones de esta revisión

- No se enumeraron tablas creadas fuera de las migraciones del repo. Hace falta la consulta SQL de arriba, con un rol de base de datos, para cerrar ese hueco.
- No se inspeccionó el contenido de filas ni de objetos.
- No se comprobó el estado real de `pg_policy` en el servidor; el 404 indica que esas dos relaciones no están expuestas, que es coherente con la migración que las borra.
