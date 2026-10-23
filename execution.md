# Ejecución

## Decisión de TDD (anterior a la implementación)

TDD no es viable. El cambio no añade lógica de aplicación, ramas ni contratos ejecutables: es una baja del índice de Git, reglas de `.gitignore`, una plantilla sin valores y documentación. No existe un comportamiento de runtime nuevo que un test RED pueda fallar antes del cambio.

Alternativa, definida antes de editar:

1. `git ls-files .env` debe quedar vacío tras `git rm --cached .env`.
2. `git check-ignore -v -- .env .env.local .env.production.local` debe marcar los tres.
3. Un script comprueba que `.env.example` tiene las tres claves con valor vacío y que los archivos nuevos no contienen la URL, el project id ni la clave del `.env` real.
4. `npm run build` con un `.env` local de valores ficticios, sin commitearlo, y restauración del `.env` original.
5. El commit raíz y la presencia histórica de `.env` en `1035b98` no cambian.

Esas comprobaciones se repiten en la validación independiente y se registran en `verification.json`.

## Investigación previa (solo lectura)

- Rama de trabajo: `cursor/untrack-env-rls-review-31e1`, creada desde `main` (`51749d9`).
- `HEAD` remoto por defecto: `main`. Visibilidad del repo: pública. No se modifica.
- `.env` versionado desde `1035b98`, no desde el commit raíz `ce8c0ff`. Sigue en `HEAD`. 39 commits. No se reescribe historial.
- Variables presentes (solo nombres): `VITE_SUPABASE_URL`, `VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_PUBLISHABLE_KEY`. Formato de la clave: JWT legacy, `role=anon`.
- Búsqueda en el árbol versionado: la URL y la clave no aparecen fuera de `.env`. `supabase/config.toml` contiene `project_id` sin que el valor se copie a este informe.
- Migraciones y `types.ts` leídos. Resultado volcado en `rls_review.md`.
- Sonda HTTP únicamente con método GET. No hubo POST, PATCH, DELETE ni RPC. No se subió nada a Storage. Los cuerpos de respuesta de las tablas se descartaron; solo se conservaron tabla, HTTP, `Content-Range` y, en el 404, el código `PGRST205` y el mensaje de caché de esquema (no hay filas).
- Resultado de la sonda guardado en `artifacts/anon_probe.json` después de comprobar que ese JSON no contiene la URL, el project id ni la clave.

## Comandos previstos

```sh
git rm --cached .env
# edición de .gitignore, .env.example, README.md, rls_review.md, CHANGELOG.md
npm ci
# .env real apartado fuera del repo; .env de prueba con valores ficticios
npm run build
# restaurar .env real y borrar dist de prueba
```

Los comandos reales, el código de salida y cualquier reintento se añaden debajo al ejecutarlos.

## Bitácora

- 2026-10-23: revisión estática y sonda completadas antes de editar archivos de producto. Revisión de seguridad previa: [YES] (ver `plan.md`). Implementación aún no empezada en el momento de crear este archivo.
- `npm ci` en el workspace: exit 0. 394 paquetes. `node_modules` sigue ignorado.
- `git rm --cached .env`: exit 0. El archivo permanece en disco. `git status` muestra `D  .env` (solo el índice).
- `git check-ignore -v` marca `.env` (línea 16), `.env.local` (línea 17) y `.env.production.local` (línea 18). `.env.example` no coincide (exit 1 de `git check-ignore -q`).
- Escaneo de secretos sobre `.gitignore`, `README.md`, `.env.example`, `CHANGELOG.md`, `plan.md`, `execution.md`, `rls_review.md` y `artifacts/anon_probe.json`: ninguna coincidencia con los valores del `.env` real. No se imprimieron valores.
- Build de prueba: se apartó el `.env` real a un archivo temporal fuera del repo (modo 0600), se escribió un `.env` con URL `http://127.0.0.1:54321`, project id `local-test-project` y clave `test-anon-key-not-a-real-secret`, y se ejecutó `npm run build`. Exit 0 (`vite v5.4.19`, built in 1.99s). El `dist` no contenía los valores reales. Tampoco contenía el marcador de prueba: `src/integrations/supabase/client.ts` no está importado por ninguna vista, así que el bundler lo elimina. `loadEnv('production')` sí leyó las tres variables de prueba (`url_is_placeholder`, `id_is_placeholder`, `key_is_placeholder` en true). Se restauró el `.env` real, se borró la copia temporal y se eliminó `dist`.
- No hubo reintentos. No se ha hecho commit ni push en este punto.
- Review de código (rol distinto, sin leer `.env`): APROBADO, sin bloqueantes. Observación no bloqueante: la nota de variables partía la sección inglesa del README. Se movió detrás de Codespaces, antes de “What technologies are used”. `verification.json` queda para la validación.
- Validación independiente: `verification.json` con `status=passed`. Checks: `git_env_untracked`, `gitignore_patterns`, `env_example_empty`, `secrets_absent_from_added_docs`, `build_with_placeholder_env`, `history_not_rewritten`, `anon_probe_matches_report` y `visibility_unchanged` en pass. `e2e_testsprite` en skipped por alcance (el diff no toca `src/` ni superficie web). No se lanzó TestSprite y no se considera una E2E ejecutada. El build de la validación volvió a usar un `.env` de prueba, no dejó secretos reales en `dist`, restauró `.env` y borró `dist` y la copia temporal.
- La validación se hizo con `HEAD` todavía en `51749d9`. El commit de publicación, si se crea después, es un hijo de ese commit; no reescribe `ce8c0ff` ni el blob de `.env` en `1035b98`.
