This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), usando WordPress como CMS headless.

## Requisitos previos

- Node.js 20+
- Docker y Docker Compose

## WordPress local

El backend corre en Docker. Levántalo con:

```bash
docker compose -f docker/docker-compose.yml up -d
```

El panel de administración estará disponible en [http://localhost:8080/wp-admin](http://localhost:8080/wp-admin).

> El `docker-compose.yml` incluye `WORDPRESS_CONFIG_EXTRA: define('WP_ENVIRONMENT_TYPE', 'local');`  
> Esto es necesario para habilitar las **Application Passwords** sin HTTPS en entornos de desarrollo.

## Configurar el usuario de WordPress

La comunicación entre Next.js y la REST API de WordPress se autentica mediante **Application Passwords** (nativas desde WP 5.6). La contraseña de acceso al panel **no sirve** para esto.

Pasos:

1. Accede al panel → **Usuarios → Tu perfil**
2. Baja hasta la sección **Contraseñas de aplicación**
3. Escribe un nombre (ej. `Blog Next.js`) y pulsa **Añadir nueva contraseña de aplicación**
4. Copia el valor generado (sin espacios)

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores:

```bash
cp .env.example .env.local
```

```env
# URL base del REST API de WordPress (sin trailing slash)
WORDPRESS_API_URL=http://localhost:8080/wp-json

# Credenciales de la REST API (Application Password, no la de login)
WP_USER=tu_usuario
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx

# URL pública del sitio Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Mi Blog
```

> `WORDPRESS_API_URL` **no** usa el prefijo `NEXT_PUBLIC_` porque solo se consume en el servidor (Server Components y Route Handlers). Nunca se expone al bundle del cliente.

## Getting Started

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)

## Deploy on Vercel

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
