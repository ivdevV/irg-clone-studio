# Changelog

## 2026-10-23

### Security

- `.env` deja de estar en el índice de Git. Sigue en el historial; no se reescribe.
- `.gitignore` excluye `.env`, `.env.local` y `.env.*.local`.
- Se añade `.env.example` con las variables de Supabase vacías.
- El README explica cómo rellenarlas en local y que Vite las incrusta en el build.
- Se documenta la revisión de RLS y una propuesta de rotación de la clave anon, sin aplicarlas (`rls_review.md`).
