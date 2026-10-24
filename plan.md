# Plan de misión — dejar de versionar `.env` y revisar RLS

## Clasificación

- Clasificación: **full**. El cambio toca secretos ya versionados, la configuración de despliegue (variables `VITE_*` incrustadas en el build) y un informe de seguridad. No es una edición mecánica de un solo archivo.
- Tier: **standard**. Hay secretos y configuración de despliegue. No hay cambio de lógica de autenticación, ni migración aplicada, ni borrado de datos.
- Política del repo: no hay `AGENTS.md` ni otra política local. Se aplica este protocolo.
- Autorización: una rama propia, un commit/push y una PR hacia `main`. Sin fusión, sin despliegue, sin reescritura de historial, sin cambiar la visibilidad del repositorio (público), sin modificar RLS y sin rotar claves.

## Revisión de seguridad previa

[YES] Reason: El cambio autorizado deja de seguir `.env` en el índice, añade exclusiones y una plantilla sin valores, y documenta el RLS con una sonda de solo lectura. No reescribe historial, no cambia la visibilidad del repo, no altera políticas, no rota claves y no escribe en Supabase. El riesgo residual —la clave anon sigue recuperable en el historial público— queda explícito y solo se mitiga con una rotación posterior, fuera de esta PR.

## Alcance

Incluye:

1. `git rm --cached .env` (el archivo local permanece; no se borra del disco ni del historial).
2. `.gitignore`: `.env`, `.env.local`, `.env.*.local`.
3. `.env.example` con `VITE_SUPABASE_URL`, `VITE_SUPABASE_PROJECT_ID` y `VITE_SUPABASE_PUBLISHABLE_KEY` vacías.
4. Nota en `README.md` sobre cómo configurarlas en local y el hecho de que Vite las incrusta en el build.
5. Informe `rls_review.md` (estático + sonda GET) con SQL propuesto no aplicado y pasos de rotación no ejecutados.
6. Artefactos de misión: este plan, `execution.md`, `verification.json`, `artifacts/` y `CHANGELOG.md`.

Fuera de alcance:

- `git filter-repo`, rebase, o cualquier reescritura de historia.
- Cambiar el repositorio de público a privado.
- Aplicar SQL, cambiar RLS, crear o borrar buckets, rotar claves, desplegar o fusionar.
- Cualquier POST, PATCH, DELETE o RPC de escritura contra Supabase. Storage solo para listar buckets, sin subir objetos.
- Editar `Dockerfile`, migraciones o el cliente de Supabase.

## Hechos ya comprobados (solo lectura, sin valores)

- `.env` está en el índice en `HEAD`. No está en el commit raíz; entra en `1035b98` (`Implement full application structure`) y sigue en los commits posteriores. El historial tiene 39 commits. El remoto `origin/HEAD` es `main` y el repositorio es público.
- Las únicas variables del `.env` son las tres indicadas. La clave del cliente es un JWT legacy con `role=anon` (no es `sb_publishable_...`).
- Ningún otro archivo versionado contiene la URL ni la clave. `supabase/config.toml` sí contiene `project_id` (la referencia del proyecto, no la clave). No se cita el valor.
- `src/integrations/supabase/types.ts` declara el esquema `public` vacío.
- Las migraciones crean `profiles` y `module_progress` con RLS y, en una migración posterior, las eliminan. Detalle y policies en `rls_review.md`.
- Sonda ya ejecutada, solo GET, clave anon: `profiles` y `module_progress` responden 404 `PGRST205` (no están en la caché de esquema). `GET /rest/v1/` responde 401 y el cuerpo indica que el OpenAPI de ese endpoint exige `service_role` (no se usó). `GET /storage/v1/bucket` responde 200 con lista vacía. No se registró contenido de filas.

## Criterios de aceptación

- `.env` deja de estar en el índice (`git ls-files` no lo lista) y sigue existiendo en el disco, ignorado.
- `git check-ignore` aplica a `.env`, `.env.local` y `.env.production.local`.
- `.env.example` tiene las tres variables sin valor y no contiene los secretos del `.env` real.
- El diff de archivos nuevos o modificados, excluido el parche de borrado de `.env`, no contiene la URL, el project id ni la clave.
- `npm run build` termina con éxito usando un `.env` local de prueba (valores ficticios). Ese archivo no se commitea; se restaura el `.env` real al terminar.
- El historial no se reescribe: el commit raíz sigue siendo el actual y `.env` sigue existiendo en `1035b98`.
- `rls_review.md` lista tablas, RLS, policies, resultado de la sonda (tabla, HTTP, filas visibles) y recomendaciones, sin datos personales ni claves.
- No hay cambios de RLS ni rotación.

## Riesgos

- Quitar el archivo del índice no invalida la clave. Sigue en el historial público hasta que alguien la rote en Supabase. Esta PR no lo hace.
- El diff de borrado de `.env` en la pestaña Files changed de GitHub muestra las líneas que ya estaban en el historial. La descripción de la PR no las reproduce.
- `Dockerfile` hace `COPY . .` y luego `npm run build`. Un `.env` presente en el contexto de build queda incrustado en `dist`. No hay `.dockerignore`. Recomendación no aplicada, descrita en el informe.
- Lovable puede volver a commitear `.env` (`git add -f`) en un cambio futuro. `.gitignore` no lo impide si el alta es forzada.
- La sonda no puede enumerar tablas desconocidas: el listado OpenAPI está cerrado a `service_role`. Solo se contrastaron las tablas de las migraciones y de `types.ts`.
- Un conteo `0` con HTTP 200 significaría filas visibles para anon, no el total de la tabla. En esta sonda no hubo HTTP 200 de tablas.

## Pruebas

TDD de aplicación no es viable (no hay lógica nueva). La alternativa, anotada en `execution.md` antes de implementar, son comprobaciones ejecutables: `git ls-files`, `git check-ignore`, escaneo de secretos sobre los archivos nuevos, `npm run build` con `.env` de prueba y comprobación de que el historial no se reescribió.

## E2E (TestSprite)

No se dispara. El diff no toca vistas, plantillas, assets estáticos, controladores HTTP ni código frontend. El check `e2e_testsprite` queda `skipped` por alcance.

## Publicación

Una sola PR de `cursor/untrack-env-rls-review-31e1` hacia `main`, después de validar. Sin merge y sin deploy.
