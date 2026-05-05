# Next.js + WordPress Headless Blog

Template de blog con Next.js (App Router) y WordPress como CMS headless. Diseñado para ser una base reutilizable para proyectos de cliente.

## Stack

- **Next.js** — App Router, Server Components, Suspense + streaming
- **WordPress** — CMS headless vía REST API (`/wp/v2`)
- **Tailwind CSS v4** — Diseño con tokens, dark mode via `next-themes`
- **TypeScript** — strict mode

## Requisitos previos

- Node.js 20+
- Una instancia de WordPress accesible (local o remota)

## Configuración

### 1. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto (no se incluye en el repositorio):

```env
# URL base del REST API de WordPress (sin trailing slash)
WORDPRESS_API_URL=http://localhost:8080/wp-json

# Credenciales de la REST API (Application Password, no la contraseña de login)
WP_USER=tu_usuario
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx

# URL pública del sitio Next.js (sin trailing slash)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Nombre del sitio (usado en metadata)
NEXT_PUBLIC_SITE_NAME=Mi Blog
```

> `WORDPRESS_API_URL` no lleva el prefijo `NEXT_PUBLIC_` porque solo se consume en el servidor. Nunca se expone al cliente.

### 2. WordPress — Application Password

La autenticación con la REST API usa **Application Passwords** (nativas desde WP 5.6). La contraseña de acceso al panel **no sirve** para esto.

1. Accede al panel → **Usuarios → Tu perfil**
2. Baja hasta **Contraseñas de aplicación**
3. Escribe un nombre (ej. `Blog Next.js`) y pulsa **Añadir nueva contraseña de aplicación**
4. Copia el valor generado y úsalo en `WP_APP_PASSWORD`

### 3. WordPress local con Docker

> El `docker-compose.yml` no está incluido en el repositorio. Créalo manualmente o usa tu propia instancia de WordPress.

Si quieres levantar WordPress en local, crea `docker/docker-compose.yml`:

```yaml
services:
  db:
    image: mysql:8.0
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    volumes:
      - db_data:/var/lib/mysql

  wordpress:
    image: wordpress:latest
    restart: unless-stopped
    depends_on:
      - db
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_CONFIG_EXTRA: |
        define('WP_ENVIRONMENT_TYPE', 'local');
    volumes:
      - wp_data:/var/www/html

volumes:
  db_data:
  wp_data:
```

```bash
docker compose -f docker/docker-compose.yml up -d
```

Panel disponible en [http://localhost:8080/wp-admin](http://localhost:8080/wp-admin).

> `WP_ENVIRONMENT_TYPE: local` es necesario para habilitar las Application Passwords sin HTTPS.

## Arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
src/
├── app/                   # Rutas (App Router)
│   ├── page.tsx           # Home — post destacado + grid
│   ├── blog/
│   │   ├── page.tsx       # Listado paginado
│   │   └── [slug]/        # Detalle de post
│   └── categoria/[slug]/  # Posts por categoría
├── domains/
│   ├── posts/             # Servicios, modelos, componentes y utils de posts
│   └── categories/        # Servicios, modelos y componentes de categorías
├── shared/                # Lib (Axios), contextos, iconos, utils
├── ui/                    # Componentes genéricos (Pill, Pagination, Breadcrumb…)
└── styles/                # Design tokens CSS
```

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Home con post destacado y grid de últimos artículos |
| `/blog` | Listado paginado de todos los posts |
| `/blog/[slug]` | Detalle de post con posts relacionados |
| `/categoria/[slug]` | Posts filtrados por categoría |

## Despliegue

Cualquier plataforma compatible con Next.js (Vercel, Railway, etc.). Asegúrate de configurar las variables de entorno en el panel de la plataforma.

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## Referencias

- [Next.js Docs](https://nextjs.org/docs)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
