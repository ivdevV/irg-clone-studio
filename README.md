# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2e818f3d-aeba-4c7c-b042-402271eb174c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2e818f3d-aeba-4c7c-b042-402271eb174c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Variables de entorno

Vite lee estas variables en el build (`import.meta.env`). No las subas al repositorio.

| Variable | Uso |
| --- | --- |
| `VITE_SUPABASE_URL` | URL del proyecto Supabase |
| `VITE_SUPABASE_PROJECT_ID` | Referencia del proyecto |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clave anon (JWT legacy) o clave publishable del cliente |

Configuración local:

```sh
cp .env.example .env
```

Rellena `.env` con los valores del panel de Supabase (Project Settings → API Keys). `.env`, `.env.local` y `.env.*.local` están en `.gitignore`.

`npm run build` incrusta las variables `VITE_*` en el JavaScript de `dist`. Después de cambiarlas hay que volver a compilar y publicar. En Lovable eso ocurre al usar Share → Publish. No uses `git add -f .env`: un alta forzada volvería a versionar el secreto.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2e818f3d-aeba-4c7c-b042-402271eb174c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
